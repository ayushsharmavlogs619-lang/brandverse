/**
 * Nexus Calendar Webhook
 *
 * Google Apps Script web app used by the Brandverse Cloudflare Worker to
 * read/write the NEXUS Google Calendar without a service-account key.
 *
 * Script properties:
 *   NEXUS_CALENDAR_ID     = the private calendar ID to use
 *   NEXUS_CALENDAR_SECRET = strong shared secret
 *
 * Deploy as a Web app:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * The owner must authorize Calendar access once from the Apps Script editor.
 */

const CALENDAR_ID_KEY = 'NEXUS_CALENDAR_ID';
const SECRET_KEY = 'NEXUS_CALENDAR_SECRET';

function prop_(key) {
  return PropertiesService.getScriptProperties().getProperty(key) || '';
}

function calendar_() {
  const id = prop_(CALENDAR_ID_KEY);
  if (!id) throw new Error('NEXUS_CALENDAR_ID is not configured');
  const calendar = CalendarApp.getCalendarById(id);
  if (!calendar) throw new Error('NEXUS calendar is not accessible to the script owner');
  return calendar;
}

function ok_(body) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, ...body }))
    .setMimeType(ContentService.MimeType.JSON);
}

function fail_(error, code) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: code || 'internal_error',
      message: String(error && error.message ? error.message : error),
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseDate_(value) {
  const d = new Date(value);
  if (isNaN(d.getTime())) throw new Error('Invalid date/time');
  return d;
}

function doGet() {
  return ok_({
    service: 'nexus-calendar-webhook',
    ok: true,
    calendar: calendar_().getName(),
  });
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw) return fail_('empty_body', 'empty_body');

    const data = JSON.parse(raw);
    if (data.secret !== prop_(SECRET_KEY)) {
      return fail_('unauthorized', 'unauthorized');
    }

    const action = String(data.action || '');
    const calendar = calendar_();

    if (action === 'get_events') {
      const start = parseDate_(data.startTime);
      const end = parseDate_(data.endTime);
      const events = calendar.getEvents(start, end).map(function(event) {
        return {
          id: event.getId(),
          summary: event.getTitle(),
          description: event.getDescription(),
          start: event.getStartTime().toISOString(),
          end: event.getEndTime().toISOString(),
          location: event.getLocation(),
          status: event.isDeletedEvent ? 'cancelled' : 'confirmed',
        };
      });
      return ok_({ events: events });
    }

    if (action === 'create_event') {
      const start = parseDate_(data.startTime);
      const end = parseDate_(data.endTime);
      if (end <= start) throw new Error('Event end must be after event start');

      const options = {
        description: String(data.description || ''),
        location: String(data.location || ''),
        guests: Array.isArray(data.guests) ? data.guests.filter(Boolean).join(',') : '',
        sendInvites: false,
      };

      const event = calendar.createEvent(
        String(data.summary || 'Appointment'),
        start,
        end,
        options
      );

      return ok_({
        eventId: event.getId(),
        eventLink: '',
        message: 'Appointment booked',
      });
    }

    if (action === 'get_event') {
      const eventId = String(data.eventId || '');
      if (!eventId) throw new Error('eventId is required');
      const event = calendar.getEventById(eventId);
      if (!event) return ok_({ event: null });

      return ok_({
        event: {
          id: event.getId(),
          summary: event.getTitle(),
          description: event.getDescription(),
          startTime: event.getStartTime().toISOString(),
          endTime: event.getEndTime().toISOString(),
          location: event.getLocation(),
          status: 'confirmed',
        },
      });
    }

    if (action === 'delete_event') {
      const eventId = String(data.eventId || '');
      if (!eventId) throw new Error('eventId is required');
      const event = calendar.getEventById(eventId);
      if (!event) return ok_({ message: 'Event not found' });
      event.deleteEvent();
      return ok_({ message: 'Event deleted' });
    }

    if (action === 'update_event') {
      const eventId = String(data.eventId || '');
      if (!eventId) throw new Error('eventId is required');
      const event = calendar.getEventById(eventId);
      if (!event) throw new Error('Event not found');

      if (data.startTime && data.endTime) {
        event.setTime(parseDate_(data.startTime), parseDate_(data.endTime));
      }
      if (data.summary) event.setTitle(String(data.summary));
      if (data.description !== undefined) event.setDescription(String(data.description));
      if (data.location !== undefined) event.setLocation(String(data.location));

      return ok_({
        event: {
          id: event.getId(),
          summary: event.getTitle(),
          startTime: event.getStartTime().toISOString(),
          endTime: event.getEndTime().toISOString(),
        },
        message: 'Event updated',
      });
    }

    return fail_('Unknown action: ' + action, 'unknown_action');
  } catch (err) {
    console.error(err);
    return fail_(err, 'internal_error');
  }
}
