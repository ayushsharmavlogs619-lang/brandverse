function tzOffsetMs(date, tz) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(date);
  const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - date.getTime();
}

// Convert a wall-clock time in the given IANA timezone to a real UTC Date.
function zonedTimeToUtc(dateStr, hour, minute, tz) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const guess = Date.UTC(y, m - 1, d, hour, minute, 0);
  const off1 = tzOffsetMs(new Date(guess), tz);
  let utc = guess - off1;
  const off2 = tzOffsetMs(new Date(utc), tz);
  if (off2 !== off1) utc = guess - off2;
  return new Date(utc);
}
export class AvailabilityEngine {
  constructor(calendarService, clientConfigService) {
    this.calendarService = calendarService;
    this.clientConfigService = clientConfigService;
  }

  async getAvailableSlots(clientId, date, service) {
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) throw new Error('Invalid date format');

    const client = await this.clientConfigService.getClientConfig(clientId);
    const calendarId = await this.calendarService.getCalendarId(clientId, client.calendar_id);

    const serviceDuration = client.services[service];
    if (!serviceDuration) throw new Error(`Service not found: ${service}`);

    const workingHours = await this.clientConfigService.getWorkingHoursForDate(clientId, targetDate);
    if (!workingHours) {
      return { date, service, availableSlots: [], message: 'Business is closed on this date' };
    }

    // Working hours are wall-clock times in the CLIENT's timezone, not UTC.
    const tz = client.timezone || 'UTC';
    const dateStr = /^\d{4}-\d{2}-\d{2}/.test(String(date)) ? String(date).slice(0, 10) : targetDate.toISOString().slice(0, 10);
    const [startHour, startMinute] = workingHours.start.split(':');
    const [endHour, endMinute] = workingHours.end.split(':');
    const startTime = zonedTimeToUtc(dateStr, parseInt(startHour), parseInt(startMinute), tz);
    const endTime = zonedTimeToUtc(dateStr, parseInt(endHour), parseInt(endMinute), tz);

    const events = await this.calendarService.getEvents(calendarId, startTime, endTime, client.timezone, clientId);
    const availableSlots = this.calculateSlots(startTime, endTime, events, serviceDuration, client.buffer_minutes || 10);

    return { date, service, availableSlots, workingHours, serviceDuration, timezone: client.timezone, totalEvents: events.length };
  }

  calculateSlots(start, end, events, duration, buffer) {
    const slots = [];
    const eventRanges = events.map(e => ({ start: new Date(e.start.dateTime || e.start.date), end: new Date(e.end.dateTime || e.end.date) }));
    let current = new Date(start);

    while (current.getTime() + duration * 60000 <= end.getTime()) {
      const slotEnd = new Date(current.getTime() + duration * 60000);
      const conflict = eventRanges.some(e => current < e.end && slotEnd > e.start);
      const bufferConflict = buffer > 0 && eventRanges.some(e =>
        new Date(current.getTime() - buffer * 60000) < e.end && new Date(slotEnd.getTime() + buffer * 60000) > e.start
      );

      if (!conflict && !bufferConflict) {
        slots.push({ start: current.toISOString(), end: slotEnd.toISOString(), duration, available: true });
      }
      current.setTime(current.getTime() + 30 * 60000);
    }
    return slots;
  }

  async getAvailableSlotsForRange(clientId, startDate, endDate, service) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const client = await this.clientConfigService.getClientConfig(clientId);
    const maxDays = client.max_booking_days_ahead || 30;
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + maxDays);
    if (end > maxDate) end.setTime(maxDate.getTime());

    const results = [];
    const current = new Date(start);
    while (current <= end) {
      const ds = current.toISOString().split('T')[0];
      try {
        const day = await this.getAvailableSlots(clientId, ds, service);
        if (day.availableSlots.length) results.push({ date: ds, slots: day.availableSlots });
      } catch {}
      current.setDate(current.getDate() + 1);
    }
    return { clientId, service, dateRange: { start: startDate, end: endDate }, availableSlots: results };
  }

  async getNextAvailableSlot(clientId, service, afterDate = null) {
    const search = afterDate ? new Date(afterDate) : new Date();
    const client = await this.clientConfigService.getClientConfig(clientId);
    const maxDays = client.max_booking_days_ahead || 30;
    for (let i = 0; i < maxDays; i++) {
      const d = new Date(search);
      d.setDate(d.getDate() + i);
      const ds = d.toISOString().split('T')[0];
      try {
        const day = await this.getAvailableSlots(clientId, ds, service);
        if (day.availableSlots.length) return { date: ds, slot: day.availableSlots[0], service };
      } catch {}
    }
    return { error: `No available slots in the next ${maxDays} days`, service };
  }

  async isSlotAvailable(clientId, dateTime, service) {
    const target = new Date(dateTime);
    const dateStr = target.toISOString().split('T')[0];
    const day = await this.getAvailableSlots(clientId, dateStr, service);
    const avail = day.availableSlots.some(s => s.start === target.toISOString() || (new Date(s.start) <= target && new Date(s.end) >= target));
    return { available: avail, dateTime, service, alternatives: avail ? [] : day.availableSlots.slice(0, 3) };
  }

  async getBusinessHoursSummary(clientId, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const summary = [];
    const current = new Date(start);
    while (current <= end) {
      const ds = current.toISOString().split('T')[0];
      const dayName = current.toLocaleDateString('en-US', { weekday: 'long' });
      try {
        const wh = await this.clientConfigService.getWorkingHoursForDate(clientId, current);
        summary.push({ date: ds, day: dayName, workingHours: wh || { start: 'closed', end: 'closed' }, isOpen: !!(wh && wh.start !== 'closed') });
      } catch {
        summary.push({ date: ds, day: dayName, workingHours: { start: 'closed', end: 'closed' }, isOpen: false });
      }
      current.setDate(current.getDate() + 1);
    }
    return { clientId, dateRange: { start: startDate, end: endDate }, summary };
  }

  formatSlotsForDisplay(slots, tz = 'UTC') {
    return slots.map(s => ({
      time: new Date(s.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: tz }),
      date: new Date(s.start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: tz }),
      duration: s.duration, startIso: s.start, endIso: s.end,
    }));
  }
}