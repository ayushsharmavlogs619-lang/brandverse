export class AvailabilityEngine {
  constructor(calendarService, clientConfigService) {
    this.calendarService = calendarService;
    this.clientConfigService = clientConfigService;
  }

  async getAvailableSlots(clientId, date, service) {
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) throw new Error('Invalid date format');

    const client = await this.clientConfigService.getClientConfig(clientId);
    if (!client.calendar_id?.trim()) throw new Error('Calendar integration required - calendar_id is empty');

    const serviceDuration = client.services[service];
    if (!serviceDuration) throw new Error(`Service not found: ${service}`);

    const workingHours = await this.clientConfigService.getWorkingHoursForDate(clientId, targetDate);
    if (!workingHours) {
      return { date, service, availableSlots: [], message: 'Business is closed on this date' };
    }

    const startTime = new Date(targetDate);
    const endTime = new Date(targetDate);
    const [startHour, startMinute] = workingHours.start.split(':');
    const [endHour, endMinute] = workingHours.end.split(':');
    startTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
    endTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

    const events = await this.calendarService.getEvents(client.calendar_id, startTime, endTime, client.timezone);
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