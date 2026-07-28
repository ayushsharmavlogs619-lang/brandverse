import { GoogleAuth } from './google-auth.js';

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

export class GoogleCalendarService {
  constructor(env) {
    this.env = env;
    this.auth = new GoogleAuth(env);
    this.baseURL = 'https://www.googleapis.com/calendar/v3';
  }

  async getEvents(calendarId, startTime, endTime, timezone = 'UTC') {
    if (!calendarId || !calendarId.trim()) {
      throw new Error('Calendar ID is required');
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