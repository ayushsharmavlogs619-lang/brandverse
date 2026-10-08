// Google OAuth 2.0 service for multi-tenant calendar integration
import { OAuthStorage } from './oauth-storage.js';
import { encryptRefreshToken, decryptRefreshToken } from './google-token-crypto.js';

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

export class GoogleOAuthService {
  constructor(env) {
    this.env = env;
    this.storage = new OAuthStorage(env);
  }

  /**
   * Generate OAuth authorization URL
   */
  async getAuthorizationUrl(clientId, sessionToken, redirectUri) {
    if (!this.env.GOOGLE_OAUTH_CLIENT_ID) {
      throw new Error('GOOGLE_OAUTH_CLIENT_ID not configured');
    }

    const state = this.storage.generateSecureToken();
    const params = new URLSearchParams({
      client_id: this.env.GOOGLE_OAUTH_CLIENT_ID,
      redirect_uri: redirectUri,
      scope: CALENDAR_SCOPE,
      response_type: 'code',
      access_type: 'offline', // Request refresh token
      include_granted_scopes: 'true',
      state: state,
      prompt: 'consent' // Force consent to ensure refresh token is returned
    });

    // Store state for CSRF protection
    // Persist state before returning the authorization URL so the callback
    // cannot beat the D1 write in a fast browser/Google redirect.
    await this.storage.storeOAuthState(state, clientId, sessionToken, 10);

    return {
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
      state
    };
  }

  /**
   * Handle OAuth callback - exchange code for tokens
   */
  async handleCallback(code, state) {
    // Validate state first
    const stateValidation = await this.storage.validateOAuthState(state);
    if (!stateValidation.valid) {
      throw new Error(`Invalid OAuth state: ${stateValidation.reason}`);
    }

    const clientId = stateValidation.clientId;

    // Exchange authorization code for tokens
    const tokenResponse = await this.exchangeCodeForTokens(code);
    
    if (!tokenResponse.refresh_token) {
      throw new Error('Google did not return a refresh token. User may have already authorized.');
    }

    // Get user info
    const userInfo = await this.getUserInfo(tokenResponse.access_token);

    // Encrypt and store refresh token
    const encrypted = await encryptRefreshToken(tokenResponse.refresh_token, this.env);

    await this.storage.storeCredentials(clientId, {
      googleAccountId: userInfo.id,
      googleAccountEmail: userInfo.email,
      encryptedRefreshToken: `${encrypted.iv}:${encrypted.ciphertext}`,
      connectionStatus: 'connected'
    });

    return {
      clientId,
      googleAccountEmail: userInfo.email,
      connected: true
    };
  }

  /**
   * Exchange authorization code for access and refresh tokens
   */
  async exchangeCodeForTokens(code) {
    const redirectUri = this.env.GOOGLE_OAUTH_REDIRECT_URI || `${this.env.APP_BASE_URL}/api/auth/google/callback`;

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: this.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: this.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${error}`);
    }

    return response.json();
  }

  /**
   * Get user info from Google
   */
  async getUserInfo(accessToken) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return response.json();
  }

  /**
   * Get valid access token for a client (refreshes if needed)
   */
  async getAccessToken(clientId) {
    const credentials = await this.storage.getCredentials(clientId);

    if (!credentials) {
      throw new Error('No OAuth credentials found for client');
    }

    if (credentials.connection_status !== 'connected') {
      throw new Error('Google Calendar is not connected. Please reconnect.');
    }

    // Parse encrypted token (format: iv:ciphertext)
    const [iv, ciphertext] = credentials.encrypted_refresh_token.split(':');

    try {
      const refreshToken = await decryptRefreshToken(ciphertext, iv, this.env);
      return await this.refreshAccessToken(refreshToken);
    } catch (error) {
      // If refresh fails, mark as disconnected
      await this.storage.updateConnectionStatus(clientId, 'reconnect_required');
      throw new Error('Google Calendar needs to be reconnected');
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken) {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: this.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: this.env.GOOGLE_OAUTH_CLIENT_SECRET,
        grant_type: 'refresh_token'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Token refresh failed: ${error.error || 'unknown'}`);
    }

    const data = await response.json();
    return data.access_token;
  }

  /**
   * Get list of calendars for authenticated user
   */
  async getCalendars(clientId) {
    const accessToken = await this.getAccessToken(clientId);

    const response = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch calendars');
    }

    const data = await response.json();

    // Return only safe metadata
    return data.items.map(cal => ({
      id: cal.id,
      summary: cal.summary,
      description: cal.description,
      accessRole: cal.accessRole,
      primary: cal.primary
    }));
  }

  /**
   * Disconnect Google Calendar for a client
   */
  async disconnect(clientId) {
    await this.storage.deleteCredentials(clientId);
    return { success: true };
  }

  /**
   * Get connection status for a client
   */
  async getConnectionStatus(clientId) {
    const credentials = await this.storage.getCredentials(clientId);

    if (!credentials) {
      return { connected: false, status: 'not_connected' };
    }

    return {
      connected: credentials.connection_status === 'connected',
      status: credentials.connection_status,
      googleAccountEmail: credentials.google_account_email,
      calendarId: credentials.calendar_id
    };
  }
}
