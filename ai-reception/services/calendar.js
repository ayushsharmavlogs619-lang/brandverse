import { GoogleAuth } from './google-auth.js';
import { GoogleOAuthService } from './google-oauth.js';

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

export class GoogleCalendarService {
  constructor(env) {
    this.env = env;
    this.auth = new GoogleAuth(env);
    this.oauth = new GoogleOAuthService(env);
    this.baseURL = 'https://www.googleapis.com/calendar/v3';
  }

  /**
   * Get access token - tries OAuth first, falls back to service account
   */
  async getAccessToken(clientId = null) {
    // A client with stored OAuth credentials must use those credentials.
    // Never silently fall back to a global service account after OAuth has
    // been configured or revoked, or one tenant could touch another tenant's
    // calendar.
    if (clientId) {
      const credentials = await this.oauth.storage.getCredentials(clientId);
      if (credentials) {
        return await this.oauth.getAccessToken(clientId);
      }
    }

    // Legacy clients without OAuth credentials may still use the service account.
    return await this.auth.getAccessToken(CALENDAR_SCOPE);
  }

  async getCalendarId(clientId, fallbackCalendarId = null) {
    if (clientId) {
      const credentials = await this.oauth.storage.getCredentials(clientId);
      if (credentials?.calendar_id) return credentials.calendar_id;
    }

    if (fallbackCalendarId?.trim()) return fallbackCalendarId.trim();
    throw new Error('Calendar integration required - no calendar selected for this client');
  }

  async getEvents(calendarId, startTime, endTime, timezone = 'UTC', clientId = null) {
    if (!calendarId || !calendarId.trim()) {
      throw new Error('Calendar ID is required');
    }
    const token = await this.getAccessToken(clientId);
    const params = new URLSearchParams({
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      timeZone: timezone,
    });

    const resp = await fetch(`${this.baseURL}/calendars/${encodeURIComponent(calendarId)}/events?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15000),
    });
    if (!resp.ok) throw new Error(`Calendar API error: ${resp.status} ${await resp.text().catch(() => '')}`);
    const data = await resp.json();
    return data.items || [];
  }

  async createEvent(calendarId, eventData, clientId = null) {
    try {
      const token = await this.getAccessToken(clientId);
      
      // Generate deterministic event ID for idempotency
      const eventId = await this.generateEventId(eventData, calendarId);
      
      const event = {
        id: eventId,
        summary: eventData.summary || `Appointment - ${eventData.service}`,
        description: eventData.description || '',
        start: { dateTime: eventData.startTime.toISOString(), timeZone: eventData.timezone || 'UTC' },
        end: { dateTime: eventData.endTime.toISOString(), timeZone: eventData.timezone || 'UTC' },
        attendees: eventData.attendees || [],
        location: eventData.location || '',
        extendedProperties: {
          private: { client_id: eventData.clientId, service: eventData.service, phone: eventData.phone, source: 'ai-receptionist' },
        },
      };

      const resp = await fetch(`${this.baseURL}/calendars/${encodeURIComponent(calendarId)}/events`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        signal: AbortSignal.timeout(15000),
      });
      
      // Handle 409 conflict (event already exists)
      if (resp.status === 409) {
        const existing = await this.getEvent(calendarId, eventId, clientId);
        if (existing) {
          return { success: true, eventId: existing.id, eventLink: existing.htmlLink, message: 'Appointment already booked', existing: true };
        }
      }
      
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error?.message || `Calendar API error: ${resp.status}`);
      }
      const created = await resp.json();
      return { success: true, eventId: created.id, eventLink: created.htmlLink, message: 'Appointment booked' };
    } catch (error) {
      return { success: false, error: 'Failed to create calendar event', message: error.message };
    }
  }

  async getEvent(calendarId, eventId, clientId = null) {
    if (!calendarId || !eventId) return null;
    try {
      const token = await this.getAccessToken(clientId);
      const resp = await fetch(`${this.baseURL}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(10000),
      });
      if (resp.status === 404) return null;
      if (!resp.ok) throw new Error(`Calendar API error: ${resp.status}`);
      const event = await resp.json();
      const priv = event.extendedProperties?.private || {};
      return {
        id: event.id, summary: event.summary, description: event.description,
        startTime: event.start?.dateTime || event.start?.date, endTime: event.end?.dateTime || event.end?.date,
        location: event.location, attendees: event.attendees || [],
        name: priv.name || event.summary?.replace(/^.*?-\s*/, '') || 'Unknown',
        phone: priv.phone || '', email: priv.email || '', service: priv.service || '',
        duration: priv.duration ? parseInt(priv.duration) : 0, status: event.status,
        created: event.created, updated: event.updated,
        htmlLink: event.htmlLink,
      };
    } catch (error) {
      return null;
    }
  }

  async isSlotAvailable(calendarId, startTime, endTime, timezone = 'UTC', clientId = null) {
    const events = await this.getEvents(calendarId, startTime, endTime, timezone, clientId);
    for (const ev of events) {
      const es = new Date(ev.start.dateTime || ev.start.date);
      const ee = new Date(ev.end.dateTime || ev.end.date);
      if (startTime < ee && endTime > es) return false;
    }
    return true;
  }

  async deleteEvent(calendarId, eventId, clientId = null) {
    try {
      const token = await this.getAccessToken(clientId);
      const resp = await fetch(`${this.baseURL}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) throw new Error(`Delete failed: ${resp.status}`);
      return { success: true, message: 'Event deleted' };
    } catch (error) {
      return { success: false, error: 'Failed to delete event', message: error.message };
    }
  }

  async updateEvent(calendarId, eventId, updateData, clientId = null) {
    try {
      const token = await this.getAccessToken(clientId);
      const resp = await fetch(`${this.baseURL}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`, {
        method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData), signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) throw new Error(`Update failed: ${resp.status}`);
      const updated = await resp.json();
      return { success: true, event: updated, message: 'Event updated' };
    } catch (error) {
      return { success: false, error: 'Failed to update event', message: error.message };
    }
  }

  /**
   * Generate deterministic event ID for idempotency
   */
  async generateEventId(eventData, calendarId) {
    const data = `${calendarId}:${eventData.clientId}:${eventData.phone}:${eventData.service}:${eventData.dateTime.toISOString()}`;
    const encoder = new TextEncoder();
    const hash = await crypto.subtle.digest('SHA-256', encoder.encode(data));
    const bytes = new Uint8Array(hash);
    return Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 26); // Google event IDs max 26 chars
  }
}