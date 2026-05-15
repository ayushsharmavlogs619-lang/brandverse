// Booking Engine - Real appointment booking with calendar integration
// Handles creating, confirming, and managing appointments

export class BookingEngine {
  constructor(calendarService, sheetsService, smsService) {
    this.calendarService = calendarService;
    this.sheetsService = sheetsService;
    this.smsService = smsService;
  }

  // Create a new booking
  async createBooking(clientId, bookingData) {
    try {
      const { name, phone, email, service, dateTime, notes } = bookingData;
      
      // Validate booking data
      if (!name || !phone || !service || !dateTime) {
        return {
          success: false,
          error: 'Missing required fields',
          message: 'Name, phone, service, and date/time are required'
        };
      }

      // Get client configuration
      const clientConfig = await this.getClientConfig(clientId);
      
      // Validate phone number
      const validPhone = this.smsService.validatePhoneNumber(phone);
      if (!validPhone) {
        return {
          success: false,
          error: 'Invalid phone number',
          message: 'Please provide a valid phone number'
        };
      }

      // Parse and validate date/time
      const bookingDateTime = new Date(dateTime);
      if (isNaN(bookingDateTime.getTime())) {
        return {
          success: false,
          error: 'Invalid date/time',
          message: 'Please provide a valid date and time'
        };
      }

      // Check if booking is in the past
      if (bookingDateTime < new Date()) {
        return {
          success: false,
          error: 'Booking in past',
          message: 'Cannot book appointments in the past'
        };
      }

      // Get service duration
      const serviceDuration = clientConfig.services[service];
      if (!serviceDuration) {
        return {
          success: false,
          error: 'Invalid service',
          message: `Service '${service}' is not available`
        };
      }

      // Calculate end time
      const endTime = new Date(bookingDateTime.getTime() + (serviceDuration * 60 * 1000));

      // Check if slot is still available
      const isAvailable = await this.calendarService.isSlotAvailable(
        clientConfig.calendar_id,
        bookingDateTime,
        endTime,
        clientConfig.timezone
      );

      if (!isAvailable) {
        return {
          success: false,
          error: 'Slot not available',
          message: 'This time slot is no longer available. Please select another time.'
        };
      }

      // Create calendar event
      const eventData = {
        summary: `${service} - ${name}`,
        description: `Booking details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nService: ${service}\nNotes: ${notes || 'None'}`,
        startTime: bookingDateTime,
        endTime: endTime,
        timezone: clientConfig.timezone,
        location: clientConfig.address,
        attendees: email ? [{ email: email, displayName: name }] : [],
        clientId: clientId,
        service: service,
        phone: validPhone
      };

      const calendarResult = await this.calendarService.createEvent(
        clientConfig.calendar_id,
        eventData
      );

      if (!calendarResult.success) {
        return {
          success: false,
          error: 'Calendar booking failed',
          message: calendarResult.message || 'Failed to create calendar event'
        };
      }

      // Send SMS confirmation
      const smsResult = await this.smsService.sendBookingConfirmation(
        name,
        validPhone,
        clientConfig.name,
        service,
        bookingDateTime,
        clientConfig.address
      );

      // Log the booking
      const logData = {
        type: 'booking',
        channel: 'api',
        name: name,
        phone: validPhone,
        email: email || '',
        service: service,
        requestedTime: bookingDateTime.toISOString(),
        bookedTime: bookingDateTime.toISOString(),
        status: 'confirmed',
        outcome: 'Booking successful',
        notes: notes || '',
        calendarEventId: calendarResult.eventId,
        smsSent: smsResult.success,
        duration: serviceDuration
      };

      await this.sheetsService.logInteraction(clientConfig.sheet_id, logData);

      return {
        success: true,
        bookingId: calendarResult.eventId,
        calendarEventId: calendarResult.eventId,
        eventLink: calendarResult.eventLink,
        message: 'Appointment booked successfully',
        confirmationSent: smsResult.success,
        bookingDetails: {
          name: name,
          phone: validPhone,
          service: service,
          dateTime: bookingDateTime.toISOString(),
          duration: serviceDuration,
          businessName: clientConfig.name,
          address: clientConfig.address
        }
      };

    } catch (error) {
      console.error('Error creating booking:', error);
      return {
        success: false,
        error: 'Booking failed',
        message: error.message
      };
    }
  }

  // Cancel a booking
  async cancelBooking(clientId, bookingId, reason = '') {
    try {
      const clientConfig = await this.getClientConfig(clientId);
      
      // Get event details before deleting
      const eventDetails = await this.getEventDetails(clientConfig.calendar_id, bookingId);
      
      // Delete calendar event
      const deleteResult = await this.calendarService.deleteEvent(
        clientConfig.calendar_id,
        bookingId
      );

      if (!deleteResult.success) {
        return {
          success: false,
          error: 'Cancellation failed',
          message: deleteResult.message || 'Failed to cancel appointment'
        };
      }

      // Send cancellation SMS if we have phone number
      if (eventDetails && eventDetails.phone) {
        await this.smsService.sendCancellationConfirmation(
          eventDetails.name,
          eventDetails.phone,
          clientConfig.name
        );
      }

      // Log the cancellation
      const logData = {
        type: 'cancellation',
        channel: 'api',
        name: eventDetails?.name || 'Unknown',
        phone: eventDetails?.phone || '',
        email: eventDetails?.email || '',
        service: eventDetails?.service || '',
        requestedTime: eventDetails?.startTime || '',
        bookedTime: eventDetails?.startTime || '',
        status: 'cancelled',
        outcome: 'Appointment cancelled',
        notes: reason || 'Client requested cancellation',
        calendarEventId: bookingId,
        duration: eventDetails?.duration || 0
      };

      await this.sheetsService.logInteraction(clientConfig.sheet_id, logData);

      return {
        success: true,
        message: 'Appointment cancelled successfully',
        bookingId: bookingId
      };

    } catch (error) {
      console.error('Error cancelling booking:', error);
      return {
        success: false,
        error: 'Cancellation failed',
        message: error.message
      };
    }
  }

  // Reschedule a booking
  async rescheduleBooking(clientId, bookingId, newDateTime, newService = null) {
    try {
      const clientConfig = await this.getClientConfig(clientId);
      
      // Get current event details
      const eventDetails = await this.getEventDetails(clientConfig.calendar_id, bookingId);
      
      if (!eventDetails) {
        return {
          success: false,
          error: 'Booking not found',
          message: 'Cannot find the specified booking'
        };
      }

      // Validate new date/time
      const newBookingDateTime = new Date(newDateTime);
      if (isNaN(newBookingDateTime.getTime())) {
        return {
          success: false,
          error: 'Invalid date/time',
          message: 'Please provide a valid date and time'
        };
      }

      // Get service duration (use new service if provided, otherwise keep current)
      const service = newService || eventDetails.service;
      const serviceDuration = clientConfig.services[service];
      
      if (!serviceDuration) {
        return {
          success: false,
          error: 'Invalid service',
          message: `Service '${service}' is not available`
        };
      }

      // Calculate new end time
      const newEndTime = new Date(newBookingDateTime.getTime() + (serviceDuration * 60 * 1000));

      // Check if new slot is available
      const isAvailable = await this.calendarService.isSlotAvailable(
        clientConfig.calendar_id,
        newBookingDateTime,
        newEndTime,
        clientConfig.timezone
      );

      if (!isAvailable) {
        return {
          success: false,
          error: 'New slot not available',
          message: 'The requested time slot is not available'
        };
      }

      // Update calendar event
      const updateData = {
        start: {
          dateTime: newBookingDateTime.toISOString(),
          timeZone: clientConfig.timezone
        },
        end: {
          dateTime: newEndTime.toISOString(),
          timeZone: clientConfig.timezone
        },
        summary: service !== eventDetails.service ? `${service} - ${eventDetails.name}` : undefined
      };

      const updateResult = await this.calendarService.updateEvent(
        clientConfig.calendar_id,
        bookingId,
        updateData
      );

      if (!updateResult.success) {
        return {
          success: false,
          error: 'Reschedule failed',
          message: updateResult.message || 'Failed to reschedule appointment'
        };
      }

      // Send reschedule SMS
      await this.smsService.sendRescheduleConfirmation(
        eventDetails.name,
        eventDetails.phone,
        clientConfig.name,
        service,
        newBookingDateTime,
        clientConfig.address
      );

      // Log the reschedule
      const logData = {
        type: 'reschedule',
        channel: 'api',
        name: eventDetails.name,
        phone: eventDetails.phone,
        email: eventDetails.email || '',
        service: service,
        requestedTime: newBookingDateTime.toISOString(),
        bookedTime: newBookingDateTime.toISOString(),
        status: 'rescheduled',
        outcome: 'Appointment rescheduled',
        notes: `Rescheduled from ${eventDetails.startTime} to ${newBookingDateTime.toISOString()}`,
        calendarEventId: bookingId,
        duration: serviceDuration
      };

      await this.sheetsService.logInteraction(clientConfig.sheet_id, logData);

      return {
        success: true,
        message: 'Appointment rescheduled successfully',
        bookingId: bookingId,
        newDateTime: newBookingDateTime.toISOString(),
        service: service
      };

    } catch (error) {
      console.error('Error rescheduling booking:', error);
      return {
        success: false,
        error: 'Reschedule failed',
        message: error.message
      };
    }
  }

  // Get booking details
  async getBookingDetails(clientId, bookingId) {
    try {
      const clientConfig = await this.getClientConfig(clientId);
      const eventDetails = await this.getEventDetails(clientConfig.calendar_id, bookingId);
      
      if (!eventDetails) {
        return {
          success: false,
          error: 'Booking not found',
          message: 'Cannot find the specified booking'
        };
      }

      return {
        success: true,
        booking: eventDetails
      };

    } catch (error) {
      console.error('Error getting booking details:', error);
      return {
        success: false,
        error: 'Failed to get booking details',
        message: error.message
      };
    }
  }

  // Get event details from calendar
  async getEventDetails(calendarId, eventId) {
    try {
      // This would need to be implemented in the calendar service
      // For now, return a placeholder
      return null;
    } catch (error) {
      console.error('Error getting event details:', error);
      return null;
    }
  }

  // Get client configuration (placeholder - would be injected)
  async getClientConfig(clientId) {
    // This would be injected or passed to the constructor
    // For now, return a basic structure
    return {
      calendar_id: '',
      sheet_id: '',
      name: 'Business Name',
      address: 'Business Address',
      services: {},
      timezone: 'UTC'
    };
  }

  // Get upcoming bookings for a client
  async getUpcomingBookings(clientId, days = 7) {
    try {
      const clientConfig = await this.getClientConfig(clientId);
      const startTime = new Date();
      const endTime = new Date();
      endTime.setDate(endTime.getDate() + days);

      const events = await this.calendarService.getEvents(
        clientConfig.calendar_id,
        startTime,
        endTime,
        clientConfig.timezone
      );

      const bookings = events.map(event => ({
        id: event.id,
        summary: event.summary,
        startTime: event.start.dateTime,
        endTime: event.end.dateTime,
        description: event.description,
        location: event.location,
        attendees: event.attendees
      }));

      return {
        success: true,
        bookings: bookings
      };

    } catch (error) {
      console.error('Error getting upcoming bookings:', error);
      return {
        success: false,
        error: 'Failed to get upcoming bookings',
        message: error.message
      };
    }
  }

  // Check for booking conflicts
  async checkBookingConflicts(clientId, dateTime, service, excludeBookingId = null) {
    try {
      const clientConfig = await this.getClientConfig(clientId);
      const serviceDuration = clientConfig.services[service];
      
      if (!serviceDuration) {
        return {
          hasConflict: true,
          error: 'Invalid service'
        };
      }

      const bookingDateTime = new Date(dateTime);
      const endTime = new Date(bookingDateTime.getTime() + (serviceDuration * 60 * 1000));

      const events = await this.calendarService.getEvents(
        clientConfig.calendar_id,
        bookingDateTime,
        endTime,
        clientConfig.timezone
      );

      // Filter out the excluded booking if provided
      const conflictingEvents = events.filter(event => 
        event.id !== excludeBookingId
      );

      return {
        hasConflict: conflictingEvents.length > 0,
        conflictingEvents: conflictingEvents
      };

    } catch (error) {
      console.error('Error checking booking conflicts:', error);
      return {
        hasConflict: true,
        error: error.message
      };
    }
  }

  // Send reminder for upcoming booking
  async sendBookingReminder(clientId, bookingId, reminderType = '24_hours') {
    try {
      const bookingDetails = await this.getBookingDetails(clientId, bookingId);
      
      if (!bookingDetails.success) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }

      const clientConfig = await this.getClientConfig(clientId);
      
      let smsResult;
      switch (reminderType) {
        case '24_hours':
          smsResult = await this.smsService.sendReminder(
            bookingDetails.booking.name,
            bookingDetails.booking.phone,
            clientConfig.name,
            bookingDetails.booking.service,
            bookingDetails.booking.startTime,
            clientConfig.address
          );
          break;
        default:
          return {
            success: false,
            error: 'Invalid reminder type'
          };
      }

      return {
        success: true,
        message: 'Reminder sent successfully',
        smsSent: smsResult.success
      };

    } catch (error) {
      console.error('Error sending booking reminder:', error);
      return {
        success: false,
        error: 'Failed to send reminder',
        message: error.message
      };
    }
  }
}
