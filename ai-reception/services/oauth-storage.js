// D1 storage operations for OAuth credentials and state management

export class OAuthStorage {
  constructor(env) {
    this.db = env.DB;
  }

  /**
   * Store OAuth credentials for a client
   */
  async storeCredentials(clientId, credentials) {
    const stmt = this.db.prepare(`
      INSERT INTO oauth_credentials
        (client_id, google_account_id, google_account_email, encrypted_refresh_token, calendar_id, connection_status)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(client_id) DO UPDATE SET
        google_account_id = excluded.google_account_id,
        google_account_email = excluded.google_account_email,
        encrypted_refresh_token = excluded.encrypted_refresh_token,
        calendar_id = excluded.calendar_id,
        connection_status = excluded.connection_status,
        updated_at = CURRENT_TIMESTAMP
    `);

    await stmt.bind(
      clientId,
      credentials.googleAccountId,
      credentials.googleAccountEmail,
      credentials.encryptedRefreshToken,
      credentials.calendarId || null,
      credentials.connectionStatus || 'connected'
    ).all();
  }

  /**
   * Get OAuth credentials for a client
   */
  async getCredentials(clientId) {
    const stmt = this.db.prepare(`
      SELECT client_id, google_account_id, google_account_email, encrypted_refresh_token,
             calendar_id, connection_status, created_at, updated_at
      FROM oauth_credentials
      WHERE client_id = ?
    `);

    const result = await stmt.bind(clientId).first();
    return result;
  }

  /**
   * Update connection status for a client
   */
  async updateConnectionStatus(clientId, status) {
    const stmt = this.db.prepare(`
      UPDATE oauth_credentials
      SET connection_status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE client_id = ?
    `);

    await stmt.bind(status, clientId).all();
  }

  /**
   * Update selected calendar for a client
   */
  async updateCalendarId(clientId, calendarId) {
    const stmt = this.db.prepare(`
      UPDATE oauth_credentials
      SET calendar_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE client_id = ?
    `);

    await stmt.bind(calendarId, clientId).all();
  }

  /**
   * Delete OAuth credentials for a client (disconnect)
   */
  async deleteCredentials(clientId) {
    const stmt = this.db.prepare(`
      DELETE FROM oauth_credentials WHERE client_id = ?
    `);

    await stmt.bind(clientId).all();
  }

  /**
   * Store OAuth state for CSRF protection
   */
  async storeOAuthState(state, clientId, sessionToken, expiresInMinutes = 10) {
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000).toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO oauth_states (state, client_id, session_token, expires_at)
      VALUES (?, ?, ?, ?)
    `);

    await stmt.bind(state, clientId, sessionToken, expiresAt).all();
  }

  /**
   * Validate and consume OAuth state
   */
  async validateOAuthState(state) {
    const stmt = this.db.prepare(`
      SELECT client_id, session_token, expires_at
      FROM oauth_states
      WHERE state = ?
    `);

    const result = await stmt.bind(state).first();

    if (!result) {
      return { valid: false, reason: 'not_found' };
    }

    // Check expiration
    if (new Date(result.expires_at) < new Date()) {
      await this.deleteOAuthState(state);
      return { valid: false, reason: 'expired' };
    }

    // Delete state after validation (single-use)
    await this.deleteOAuthState(state);

    return { valid: true, clientId: result.client_id, sessionToken: result.session_token };
  }

  /**
   * Delete OAuth state
   */
  async deleteOAuthState(state) {
    const stmt = this.db.prepare(`
      DELETE FROM oauth_states WHERE state = ?
    `);

    await stmt.bind(state).all();
  }

  /**
   * Clean up expired OAuth states (maintenance)
   */
  async cleanupExpiredStates() {
    const stmt = this.db.prepare(`
      DELETE FROM oauth_states WHERE expires_at < datetime('now')
    `);

    await stmt.all();
  }

  /**
   * Create dashboard session for tenant authentication
   */
  async createDashboardSession(clientId, expiresInHours = 24) {
    const sessionToken = this.generateSecureToken();
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO dashboard_sessions (session_token, client_id, expires_at)
      VALUES (?, ?, ?)
    `);

    await stmt.bind(sessionToken, clientId, expiresAt).all();

    return { sessionToken, expiresAt };
  }

  /**
   * Validate dashboard session and return client_id
   */
  async validateDashboardSession(sessionToken) {
    const stmt = this.db.prepare(`
      SELECT client_id, expires_at
      FROM dashboard_sessions
      WHERE session_token = ?
    `);

    const result = await stmt.bind(sessionToken).first();

    if (!result) {
      return { valid: false, reason: 'not_found' };
    }

    // Check expiration
    if (new Date(result.expires_at) < new Date()) {
      await this.deleteDashboardSession(sessionToken);
      return { valid: false, reason: 'expired' };
    }

    return { valid: true, clientId: result.client_id };
  }

  /**
   * Delete dashboard session
   */
  async deleteDashboardSession(sessionToken) {
    const stmt = this.db.prepare(`
      DELETE FROM dashboard_sessions WHERE session_token = ?
    `);

    await stmt.bind(sessionToken).all();
  }

  /**
   * Generate cryptographically secure random token
   */
  generateSecureToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
