import { GoogleAuth } from './google-auth.js';

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

export class GoogleCalendarService {
  constructor(env) {
    this.env = env;
    this.auth = new GoogleAuth(env);
    this.baseURL = 'https://www.googleapis.com/calendar/v3';
    this.appsScriptWebhookUrl = this.env.NEXUS_CALENDAR_WEBHOOK_URL || '';
    this.appsScriptWebhookSecret = this.env.NEXUS_CALENDAR_WEBHOOK_SECRET || '';
  }

  async getEvents(calendarId, startTime, endTime, timezone = 'UTC') {
    if (!calendarId || !calendarId.trim()) {
      throw new Error('Calendar ID is required');
    }
    if (this.appsScriptWebhookUrl && this.appsScriptWebhookSecret) {
      const result = await this.callAppsScript('get_events', {
        calendarId, startTime: startTime.toISOString(), endTime: endTime.toISOString(), timezone,
      });
      return result.events || [];
    }
    const token = await this.auth.getAccessToken(CALENDAR_SCOPE);
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

  async createEvent(calendarId, eventData) {
    try {
      if (this.appsScriptWebhookUrl && this.appsScriptWebhookSecret) {
        return await this.callAppsScript('create_event', {
          calendarId,
          summary: eventData.summary || `Appointment - ${eventData.service}`,
          description: eventData.description || '',
          startTime: eventData.startTime.toISOString(),
          endTime: eventData.endTime.toISOString(),
          timezone: eventData.timezone || 'UTC',
          location: eventData.location || '',
          guests: (eventData.attendees || []).map(a => a.email).filter(Boolean),
        });
      }
      const token = await this.auth.getAccessToken(CALENDAR_SCOPE);
      const event = {
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

  async getEvent(calendarId, eventId) {
    if (!calendarId || !eventId) return null;
    try {
      if (this.appsScriptWebhookUrl && this.appsScriptWebhookSecret) {
        const result = await this.callAppsScript('get_event', { calendarId, eventId });
        return result.event || null;
      }
      const token = await this.auth.getAccessToken(CALENDAR_SCOPE);
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
      };
    } catch (error) {
      return null;
    }
  }
  async callAppsScript(action, payload = {}) {
    const resp = await fetch(this.appsScriptWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: this.appsScriptWebhookSecret,
        action,
        ...payload,
      }),
      signal: AbortSignal.timeout(15000),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok || data.success !== true) {
      throw new Error(data.message || data.error || `Apps Script calendar error: ${resp.status}`);
    }
    return data;
  }


  async isSlotAvailable(calendarId, startTime, endTime, timezone = 'UTC') {
    const events = await this.getEvents(calendarId, startTime, endTime, timezone);
    for (const ev of events) {
      const es = new Date(ev.start.dateTime || ev.start.date);
      const ee = new Date(ev.end.dateTime || ev.end.date);
      if (startTime < ee && endTime > es) return false;
    }
    return true;
  }

  async deleteEvent(calendarId, eventId) {
    try {
      if (this.appsScriptWebhookUrl && this.appsScriptWebhookSecret) {
        return await this.callAppsScript('delete_event', { calendarId, eventId });
      }
      const token = await this.auth.getAccessToken(CALENDAR_SCOPE);
      const resp = await fetch(`${this.baseURL}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) throw new Error(`Delete failed: ${resp.status}`);
      return { success: true, message: 'Event deleted' };
    } catch (error) {
      return { success: false, error: 'Failed to delete event', message: error.message };
    }
  }

  async updateEvent(calendarId, eventId, updateData) {
    try {
      if (this.appsScriptWebhookUrl && this.appsScriptWebhookSecret) {
        return await this.callAppsScript('update_event', {
          calendarId,
          eventId,
          startTime: updateData.start?.dateTime,
          endTime: updateData.end?.dateTime,
          summary: updateData.summary,
          description: updateData.description,
          location: updateData.location,
        });
      }
      const token = await this.auth.getAccessToken(CALENDAR_SCOPE);
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
}