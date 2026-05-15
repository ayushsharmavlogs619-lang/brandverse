// Availability Engine - Real-time availability calculation
// Calculates actual available slots based on Google Calendar and working hours

export class AvailabilityEngine {
  constructor(calendarService, clientConfigService) {
    this.calendarService = calendarService;
    this.clientConfigService = clientConfigService;
  }

  // Get available slots for a specific date and service
  async getAvailableSlots(clientId, date, service) {
    try {
      console.log('[DEBUG] Getting real available slots:', { clientId, date, service });
      
      // Parse date
      const targetDate = new Date(date);
      if (isNaN(targetDate.getTime())) {
        throw new Error('Invalid date format');
      }

      // Get client configuration
      const client = await this.clientConfigService.getClientConfig(clientId);
      
      // CRITICAL: Validate calendar integration
      if (!client.calendar_id || client.calendar_id.trim() === '') {
        throw new Error('Calendar integration required - calendar_id is empty');
      }
      
      const serviceDuration = client.services[service];
      
      if (!serviceDuration) {
        throw new Error(`Service not found: ${service}`);
      }

      console.log('[DEBUG] Service duration:', serviceDuration, 'minutes');

      // Get working hours for the date
      const workingHours = await this.clientConfigService.getWorkingHoursForDate(clientId, targetDate);
      
      if (!workingHours) {
        console.log('[DEBUG] Business is closed on this date');
        return {
          date: date,
          service: service,
          availableSlots: [],
          message: 'Business is closed on this date'
        };
      }

      console.log('[DEBUG] Working hours:', workingHours);

      // Get existing events from Google Calendar
      const startTime = new Date(targetDate);
      const endTime = new Date(targetDate);
      
      // Set start and end times based on working hours
      const [startHour, startMinute] = workingHours.start.split(':');
      const [endHour, endMinute] = workingHours.end.split(':');
      
      startTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
      endTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

      console.log('[DEBUG] Querying calendar for events between:', {
        start: startTime.toISOString(),
        end: endTime.toISOString()
      });

      // Get REAL events from Google Calendar
      const events = await this.calendarService.getEvents(
        client.calendar_id,
        startTime,
        endTime,
        client.timezone
      );

      console.log(`[DEBUG] Found ${events.length} existing events`);

      // Calculate REAL available slots
      const availableSlots = this.calculateAvailableSlots(
        startTime,
        endTime,
        events,
        serviceDuration,
        client.buffer_minutes || 10
      );

      console.log(`[DEBUG] Generated ${availableSlots.length} real available slots`);

      return {
        date: date,
        service: service,
        availableSlots: availableSlots,
        workingHours: workingHours,
        serviceDuration: serviceDuration,
        timezone: client.timezone,
        totalEvents: events.length
      };

    } catch (error) {
      console.error('[DEBUG] Error getting available slots:', error);
      throw new Error(`Failed to get available slots: ${error.message}`);
    }
  }

  // Calculate available slots based on working hours and existing events
  calculateAvailableSlots(startTime, endTime, events, serviceDuration, bufferMinutes) {
    const availableSlots = [];
    const slotDuration = serviceDuration + bufferMinutes;
    
    // Convert events to time ranges
    const eventRanges = events.map(event => ({
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date)
    }));

    // Generate potential slots
    let currentSlotStart = new Date(startTime);
    
    while (currentSlotStart.getTime() + (serviceDuration * 60 * 1000) <= endTime.getTime()) {
      const currentSlotEnd = new Date(currentSlotStart.getTime() + (serviceDuration * 60 * 1000));
      
      // Check if slot conflicts with any existing event
      const hasConflict = eventRanges.some(event => 
        this.timeRangesOverlap(
          currentSlotStart,
          currentSlotEnd,
          event.start,
          event.end
        )
      );

      if (!hasConflict) {
        // Check if we have enough buffer time before and after
        const hasBufferConflict = eventRanges.some(event => 
          this.timeRangesOverlap(
            new Date(currentSlotStart.getTime() - (bufferMinutes * 60 * 1000)),
            new Date(currentSlotEnd.getTime() + (bufferMinutes * 60 * 1000)),
            event.start,
            event.end
          )
        );

        if (!hasBufferConflict) {
          availableSlots.push({
            start: currentSlotStart.toISOString(),
            end: currentSlotEnd.toISOString(),
            duration: serviceDuration,
            available: true
          });
        }
      }

      // Move to next slot (30-minute increments)
      currentSlotStart.setTime(currentSlotStart.getTime() + (30 * 60 * 1000));
    }

    return availableSlots;
  }

  // Check if two time ranges overlap
  timeRangesOverlap(start1, end1, start2, end2) {
    return start1 < end2 && end1 > start2;
  }

  // Get available slots for a date range
  async getAvailableSlotsForRange(clientId, startDate, endDate, service) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const allSlots = [];

      // Get max booking days ahead from client config
      const client = await this.clientConfigService.getClientConfig(clientId);
      const maxDaysAhead = client.max_booking_days_ahead || 30;
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + maxDaysAhead);

      if (end > maxDate) {
        end.setTime(maxDate.getTime());
      }

      // Iterate through each day
      const currentDate = new Date(start);
      while (currentDate <= end) {
        const dateStr = currentDate.toISOString().split('T')[0];
        
        try {
          const daySlots = await this.getAvailableSlots(clientId, dateStr, service);
          if (daySlots.availableSlots.length > 0) {
            allSlots.push({
              date: dateStr,
              slots: daySlots.availableSlots
            });
          }
        } catch (error) {
          console.error(`Error getting slots for ${dateStr}:`, error);
          // Continue with next day
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return {
        clientId: clientId,
        service: service,
        dateRange: {
          start: startDate,
          end: endDate
        },
        availableSlots: allSlots
      };

    } catch (error) {
      console.error('Error getting available slots for range:', error);
      throw new Error(`Failed to get available slots for range: ${error.message}`);
    }
  }

  // Get next available slot
  async getNextAvailableSlot(clientId, service, afterDate = null) {
    try {
      const searchDate = afterDate ? new Date(afterDate) : new Date();
      const client = await this.clientConfigService.getClientConfig(clientId);
      const maxDaysAhead = client.max_booking_days_ahead || 30;
      
      // Search for next available slot
      for (let i = 0; i < maxDaysAhead; i++) {
        const currentDate = new Date(searchDate);
        currentDate.setDate(currentDate.getDate() + i);
        
        const dateStr = currentDate.toISOString().split('T')[0];
        
        try {
          const daySlots = await this.getAvailableSlots(clientId, dateStr, service);
          
          if (daySlots.availableSlots.length > 0) {
            return {
              date: dateStr,
              slot: daySlots.availableSlots[0], // Return first available slot
              service: service
            };
          }
        } catch (error) {
          console.error(`Error checking ${dateStr}:`, error);
          // Continue searching
        }
      }

      return {
        error: 'No available slots found in the next ' + maxDaysAhead + ' days',
        service: service
      };

    } catch (error) {
      console.error('Error getting next available slot:', error);
      throw new Error(`Failed to get next available slot: ${error.message}`);
    }
  }

  // Check if specific slot is available
  async isSlotAvailable(clientId, dateTime, service) {
    try {
      const targetDateTime = new Date(dateTime);
      const dateStr = targetDateTime.toISOString().split('T')[0];
      
      const daySlots = await this.getAvailableSlots(clientId, dateStr, service);
      
      // Check if the requested time matches any available slot
      const requestedTime = targetDateTime.toISOString();
      const isAvailable = daySlots.availableSlots.some(slot => 
        slot.start === requestedTime || 
        (new Date(slot.start) <= targetDateTime && new Date(slot.end) >= targetDateTime)
      );
      
      return {
        available: isAvailable,
        dateTime: dateTime,
        service: service,
        alternatives: isAvailable ? [] : daySlots.availableSlots.slice(0, 3) // Return first 3 alternatives
      };

    } catch (error) {
      console.error('Error checking slot availability:', error);
      throw new Error(`Failed to check slot availability: ${error.message}`);
    }
  }

  // Get available slots for multiple services
  async getAvailableSlotsForMultipleServices(clientId, date, services) {
    try {
      const results = {};
      
      for (const service of services) {
        try {
          results[service] = await this.getAvailableSlots(clientId, date, service);
        } catch (error) {
          console.error(`Error getting slots for service ${service}:`, error);
          results[service] = {
            error: error.message,
            availableSlots: []
          };
        }
      }

      return {
        date: date,
        services: results
      };

    } catch (error) {
      console.error('Error getting slots for multiple services:', error);
      throw new Error(`Failed to get slots for multiple services: ${error.message}`);
    }
  }

  // Get business hours summary
  async getBusinessHoursSummary(clientId, startDate, endDate) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const summary = [];

      const currentDate = new Date(start);
      while (currentDate <= end) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        
        try {
          const workingHours = await this.clientConfigService.getWorkingHoursForDate(clientId, currentDate);
          
          summary.push({
            date: dateStr,
            day: dayName,
            workingHours: workingHours || { start: 'closed', end: 'closed' },
            isOpen: workingHours && workingHours.start !== 'closed'
          });
        } catch (error) {
          summary.push({
            date: dateStr,
            day: dayName,
            workingHours: { start: 'closed', end: 'closed' },
            isOpen: false,
            error: error.message
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return {
        clientId: clientId,
        dateRange: { start: startDate, end: endDate },
        summary: summary
      };

    } catch (error) {
      console.error('Error getting business hours summary:', error);
      throw new Error(`Failed to get business hours summary: ${error.message}`);
    }
  }

  // Format available slots for display
  formatSlotsForDisplay(slots, timezone = 'UTC') {
    return slots.map(slot => ({
      time: new Date(slot.start).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone
      }),
      date: new Date(slot.start).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: timezone
      }),
      duration: slot.duration,
      startIso: slot.start,
      endIso: slot.end
    }));
  }

  // Get available slots for today and tomorrow
  async getImmediateAvailability(clientId, service) {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const todayStr = today.toISOString().split('T')[0];
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      const [todaySlots, tomorrowSlots] = await Promise.all([
        this.getAvailableSlots(clientId, todayStr, service),
        this.getAvailableSlots(clientId, tomorrowStr, service)
      ]);

      return {
        today: todaySlots,
        tomorrow: tomorrowSlots,
        immediate: todaySlots.availableSlots.length > 0 ? 'today' : 'tomorrow'
      };

    } catch (error) {
      console.error('Error getting immediate availability:', error);
      throw new Error(`Failed to get immediate availability: ${error.message}`);
    }
  }
}
