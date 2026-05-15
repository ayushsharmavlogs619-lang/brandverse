// Google Calendar Service - Real calendar integration
// Handles real Google Calendar operations for booking and availability

export class GoogleCalendarService {
  constructor(env) {
    this.env = env;
    this.baseURL = 'https://www.googleapis.com/calendar/v3';
  }

  // Get Google Calendar access token
  async getAccessToken() {
    try {
      console.log('[DEBUG] Getting Google Calendar access token');
      
      // Validate required environment variables
      if (!this.env.GOOGLE_CLIENT_EMAIL) {
        throw new Error('Missing GOOGLE_CLIENT_EMAIL environment variable');
      }
      
      if (!this.env.GOOGLE_PRIVATE_KEY) {
        throw new Error('Missing GOOGLE_PRIVATE_KEY environment variable');
      }

      // Use service account authentication
      const header = {
        alg: 'RS256',
        typ: 'JWT'
      };

      const now = Math.floor(Date.now() / 1000);
      const claim = {
        iss: this.env.GOOGLE_CLIENT_EMAIL,
        scope: 'https://www.googleapis.com/auth/calendar',
        aud: 'https://www.googleapis.com/oauth2/v4/token',
        exp: now + 3600,
        iat: now
      };

      console.log('[DEBUG] Creating JWT with service account:', this.env.GOOGLE_CLIENT_EMAIL);
      
      // Create JWT
      const jwt = await this.createJWT(header, claim);
      
      console.log('[DEBUG] Exchanging JWT for access token');
      
      const tokenResponse = await fetch('https://www.googleapis.com/oauth2/v4/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt
        })
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('[DEBUG] Token exchange failed:', errorText);
        throw new Error(`Google token exchange failed: ${tokenResponse.status} - ${errorText}`);
      }

      const tokenData = await tokenResponse.json();
      
      if (!tokenData.access_token) {
        console.error('[DEBUG] No access token in response:', tokenData);
        throw new Error('No access token received from Google');
      }
      
      console.log('[DEBUG] Successfully obtained access token');
      return tokenData.access_token;
    } catch (error) {
      console.error('[DEBUG] Error getting Google Calendar access token:', error);
      throw new Error(`Failed to authenticate with Google Calendar: ${error.message}`);
    }
  }

  // Create JWT for Google service account
  async createJWT(header, claim) {
    try {
      console.log('[DEBUG] Creating JWT for Google authentication');
      
      // Import crypto for signing
      const encoder = new TextEncoder();
      let privateKey = this.env.GOOGLE_PRIVATE_KEY;
      
      console.log('[DEBUG] Private key length:', privateKey.length);
      
      // Fix newline issues in private key
      privateKey = privateKey.replace(/\\n/g, '\n');
      
      // Ensure proper PEM format
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        privateKey = '-----BEGIN PRIVATE KEY-----\n' + privateKey + '\n-----END PRIVATE KEY-----';
      }
      
      console.log('[DEBUG] Processing private key format');
      
      // Convert PEM to DER
      const derBase64 = privateKey
        .replace(/-----BEGIN PRIVATE KEY-----/g, '')
        .replace(/-----END PRIVATE KEY-----/g, '')
        .replace(/\s/g, '');
      
      console.log('[DEBUG] DER base64 length:', derBase64.length);
      
      // Create JWT header and payload
      const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
      const encodedPayload = this.base64UrlEncode(JSON.stringify(claim));
      
      // Create signature input
      const signatureInput = `${encodedHeader}.${encodedPayload}`;
      
      // Import private key for signing
      const keyData = this.base64Decode(derBase64);
      const privateKeyData = await crypto.subtle.importKey(
        'pkcs8',
        keyData,
        {
          name: 'RSASSA-PKCS1-v1_5',
          hash: 'SHA-256',
        },
        false,
        ['sign']
      );
      
      console.log('[DEBUG] Private key imported successfully');
      
      // Sign the JWT
      const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        privateKeyData,
        encoder.encode(signatureInput)
      );
      
      // Encode signature
      const encodedSignature = this.base64UrlEncode(
        String.fromCharCode(...new Uint8Array(signature))
      );
      
      const jwt = `${signatureInput}.${encodedSignature}`;
      console.log('[DEBUG] JWT created successfully');
      
      return jwt;
    } catch (error) {
      console.error('[DEBUG] JWT creation error:', error);
      throw new Error(`Failed to create JWT for Google authentication: ${error.message}`);
    }
  }

  // Base64 URL encode helper
  base64UrlEncode(str) {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Base64 decode helper
  base64Decode(base64) {
    const cleaned = base64.replace(/-/g, '+').replace(/_/g, '/');
    const padded = cleaned + '='.repeat((4 - cleaned.length % 4) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Get events for a specific date range
  async getEvents(calendarId, startTime, endTime, timezone = 'UTC') {
    try {
      console.log('[DEBUG] Getting calendar events:', {
        calendarId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        timezone
      });

      // CRITICAL: Validate calendar ID
      if (!calendarId || calendarId.trim() === '') {
        throw new Error('Calendar ID is required - cannot fetch events from empty calendar');
      }

      const accessToken = await this.getAccessToken();
      
      const params = new URLSearchParams({
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
        timeZone: timezone
      });

      const url = `${this.baseURL}/calendars/${calendarId}/events?${params}`;
      console.log('[DEBUG] Fetching from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[DEBUG] Calendar API error:', response.status, errorText);
        throw new Error(`Google Calendar API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const events = data.items || [];
      
      console.log(`[DEBUG] Retrieved ${events.length} events from calendar`);
      
      // Log event details for debugging
      events.forEach((event, index) => {
        console.log(`[DEBUG] Event ${index + 1}:`, {
          summary: event.summary,
          start: event.start?.dateTime || event.start?.date,
          end: event.end?.dateTime || event.end?.date
        });
      });

      return events;
    } catch (error) {
      console.error('[DEBUG] Error fetching calendar events:', error);
      throw new Error(`Failed to fetch calendar events: ${error.message}`);
    }
  }

  // Create a new calendar event
  async createEvent(calendarId, eventData) {
    try {
      const accessToken = await this.getAccessToken();

      const event = {
        summary: eventData.summary || `Appointment - ${eventData.service}`,
        description: eventData.description || '',
        start: {
          dateTime: eventData.startTime.toISOString(),
          timeZone: eventData.timezone || 'UTC'
        },
        end: {
          dateTime: eventData.endTime.toISOString(),
          timeZone: eventData.timezone || 'UTC'
        },
        attendees: eventData.attendees || [],
        location: eventData.location || '',
        extendedProperties: {
          private: {
            client_id: eventData.clientId,
            service: eventData.service,
            phone: eventData.phone,
            source: 'ai-receptionist'
          }
        }
      };

      const response = await fetch(`${this.baseURL}/calendars/${calendarId}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create calendar event: ${errorData.error?.message || response.status}`);
      }

      const createdEvent = await response.json();
      return {
        success: true,
        eventId: createdEvent.id,
        eventLink: createdEvent.htmlLink,
        message: 'Appointment booked successfully'
      };
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return {
        success: false,
        error: 'Failed to create calendar event',
        message: error.message
      };
    }
  }

  // Check if a time slot is available
  async isSlotAvailable(calendarId, startTime, endTime, timezone = 'UTC') {
    try {
      const events = await this.getEvents(calendarId, startTime, endTime, timezone);
      
      // Check for overlapping events
      for (const event of events) {
        const eventStart = new Date(event.start.dateTime || event.start.date);
        const eventEnd = new Date(event.end.dateTime || event.end.date);
        
        // Check for overlap
        if (startTime < eventEnd && endTime > eventStart) {
          return false; // Slot is not available
        }
      }
      
      return true; // Slot is available
    } catch (error) {
      console.error('Error checking slot availability:', error);
      throw new Error('Failed to check slot availability');
    }
  }

  // Delete an event
  async deleteEvent(calendarId, eventId) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(`${this.baseURL}/calendars/${calendarId}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.status}`);
      }

      return { success: true, message: 'Event deleted successfully' };
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      return {
        success: false,
        error: 'Failed to delete calendar event',
        message: error.message
      };
    }
  }

  // Update an event
  async updateEvent(calendarId, eventId, updateData) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(`${this.baseURL}/calendars/${calendarId}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update event: ${response.status}`);
      }

      const updatedEvent = await response.json();
      return {
        success: true,
        event: updatedEvent,
        message: 'Event updated successfully'
      };
    } catch (error) {
      console.error('Error updating calendar event:', error);
      return {
        success: false,
        error: 'Failed to update calendar event',
        message: error.message
      };
    }
  }
}
