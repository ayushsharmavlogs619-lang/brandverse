// Logging Engine - Comprehensive interaction tracking
// Logs all calls, bookings, and interactions for follow-up and analytics

export class LoggingEngine {
  constructor(sheetsService, clientConfigService) {
    this.sheetsService = sheetsService;
    this.clientConfigService = clientConfigService;
  }

  // Log any interaction (calls, bookings, inquiries, etc.)
  async logInteraction(clientId, interactionData) {
    try {
      const clientConfig = await this.clientConfigService.getClientConfig(clientId);
      
      // Prepare log entry with all required fields
      const logEntry = {
        date: this.formatDate(interactionData.timestamp || new Date()),
        time: this.formatTime(interactionData.timestamp || new Date()),
        clientId: clientId,
        name: interactionData.name || '',
        phone: interactionData.phone || '',
        email: interactionData.email || '',
        channel: interactionData.channel || 'unknown',
        intent: interactionData.intent || '',
        status: interactionData.status || 'unknown',
        service: interactionData.service || '',
        requestedTime: interactionData.requestedTime || '',
        bookedTime: interactionData.bookedTime || '',
        outcome: interactionData.outcome || '',
        notes: interactionData.notes || '',
        duration: interactionData.duration || '',
        followUpRequired: this.determineFollowUpRequired(interactionData)
      };

      // Add additional fields based on interaction type
      if (interactionData.type) {
        logEntry.interactionType = interactionData.type;
      }

      if (interactionData.calendarEventId) {
        logEntry.calendarEventId = interactionData.calendarEventId;
      }

      if (interactionData.smsSent !== undefined) {
        logEntry.smsSent = interactionData.smsSent;
      }

      // Log to Google Sheets
      const result = await this.sheetsService.logInteraction(
        clientConfig.sheet_id,
        logEntry
      );

      if (!result.success) {
        console.error('Failed to log interaction to sheets:', result.error);
        // Continue with local logging even if sheets fail
      }

      // Also log to console for debugging
      console.log(`Interaction logged for client ${clientId}:`, logEntry);

      return {
        success: true,
        logId: result.row || 'local',
        message: 'Interaction logged successfully',
        followUpRequired: logEntry.followUpRequired
      };

    } catch (error) {
      console.error('Error logging interaction:', error);
      return {
        success: false,
        error: 'Failed to log interaction',
        message: error.message
      };
    }
  }

  // Log incoming call
  async logIncomingCall(clientId, callData) {
    return await this.logInteraction(clientId, {
      type: 'incoming_call',
      channel: 'phone',
      name: callData.callerName || '',
      phone: callData.callerNumber || '',
      intent: callData.intent || '',
      status: callData.outcome || 'missed',
      service: callData.requestedService || '',
      requestedTime: callData.requestedTime || '',
      bookedTime: callData.bookedTime || '',
      outcome: callData.outcome || '',
      notes: callData.notes || '',
      duration: callData.duration || '',
      callId: callData.callId,
      recordingUrl: callData.recordingUrl
    });
  }

  // Log missed call
  async logMissedCall(clientId, callData) {
    return await this.logInteraction(clientId, {
      type: 'missed_call',
      channel: 'phone',
      name: callData.callerName || 'Unknown',
      phone: callData.callerNumber || '',
      intent: 'callback_requested',
      status: 'missed',
      outcome: 'Callback required',
      notes: `Missed call at ${callData.callTime || 'unknown time'}`,
      followUpRequired: 'Immediate'
    });
  }

  // Log booking attempt
  async logBookingAttempt(clientId, bookingData) {
    return await this.logInteraction(clientId, {
      type: 'booking_attempt',
      channel: bookingData.channel || 'api',
      name: bookingData.name,
      phone: bookingData.phone,
      email: bookingData.email || '',
      intent: 'book_appointment',
      service: bookingData.service,
      requestedTime: bookingData.requestedTime,
      bookedTime: bookingData.bookedTime || '',
      status: bookingData.success ? 'confirmed' : 'failed',
      outcome: bookingData.message || '',
      notes: bookingData.notes || '',
      duration: bookingData.duration || '',
      calendarEventId: bookingData.calendarEventId
    });
  }

  // Log chat interaction
  async logChatInteraction(clientId, chatData) {
    return await this.logInteraction(clientId, {
      type: 'chat',
      channel: 'web_chat',
      name: chatData.name || '',
      email: chatData.email || '',
      phone: chatData.phone || '',
      intent: chatData.intent || '',
      status: chatData.status || 'completed',
      service: chatData.service || '',
      requestedTime: chatData.requestedTime || '',
      bookedTime: chatData.bookedTime || '',
      outcome: chatData.outcome || '',
      notes: chatData.messages ? JSON.stringify(chatData.messages) : '',
      duration: chatData.duration || '',
      chatSessionId: chatData.sessionId
    });
  }

  // Log form submission
  async logFormSubmission(clientId, formData) {
    return await this.logInteraction(clientId, {
      type: 'form_submission',
      channel: 'web_form',
      name: formData.name,
      email: formData.email || '',
      phone: formData.phone || '',
      intent: formData.intent || '',
      status: 'submitted',
      service: formData.service || '',
      requestedTime: formData.requestedTime || '',
      bookedTime: formData.bookedTime || '',
      outcome: 'Form submitted',
      notes: formData.message || '',
      formType: formData.formType || 'contact'
    });
  }

  // Log SMS interaction
  async logSMSInteraction(clientId, smsData) {
    return await this.logInteraction(clientId, {
      type: 'sms',
      channel: 'sms',
      name: smsData.name || '',
      phone: smsData.phone,
      intent: smsData.intent || '',
      status: smsData.status || 'sent',
      service: smsData.service || '',
      requestedTime: smsData.requestedTime || '',
      bookedTime: smsData.bookedTime || '',
      outcome: smsData.outcome || '',
      notes: smsData.message || '',
      smsType: smsData.smsType || 'notification',
      smsId: smsData.smsId
    });
  }

  // Get follow-up list
  async getFollowUpList(clientId, days = 7) {
    try {
      const clientConfig = await this.clientConfigService.getClientConfig(clientId);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const endDate = new Date();
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      const interactions = await this.sheetsService.getInteractionsByDateRange(
        clientConfig.sheet_id,
        startDateStr,
        endDateStr
      );

      if (!interactions.success) {
        return {
          success: false,
          error: 'Failed to get follow-up list'
        };
      }

      // Filter for follow-up required
      const followUpList = interactions.interactions.filter(interaction => 
        interaction.followuprequired && 
        interaction.followuprequired !== 'No' &&
        interaction.followuprequired !== ''
      );

      // Sort by priority and date
      followUpList.sort((a, b) => {
        const priorityOrder = {
          'Immediate': 1,
          'High': 2,
          'Medium': 3,
          'Low': 4
        };
        
        const aPriority = priorityOrder[a.followuprequired] || 5;
        const bPriority = priorityOrder[b.followuprequired] || 5;
        
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        
        // If same priority, sort by date (most recent first)
        return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
      });

      return {
        success: true,
        followUpList: followUpList,
        total: followUpList.length
      };

    } catch (error) {
      console.error('Error getting follow-up list:', error);
      return {
        success: false,
        error: 'Failed to get follow-up list',
        message: error.message
      };
    }
  }

  // Get interaction analytics
  async getInteractionAnalytics(clientId, days = 30) {
    try {
      const clientConfig = await this.clientConfigService.getClientConfig(clientId);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const endDate = new Date();
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      const interactions = await this.sheetsService.getInteractionsByDateRange(
        clientConfig.sheet_id,
        startDateStr,
        endDateStr
      );

      if (!interactions.success) {
        return {
          success: false,
          error: 'Failed to get analytics'
        };
      }

      const analytics = {
        totalInteractions: interactions.interactions.length,
        byChannel: {},
        byStatus: {},
        byService: {},
        byOutcome: {},
        followUpRequired: 0,
        bookingsCompleted: 0,
        missedCalls: 0,
        chatInteractions: 0,
        formSubmissions: 0
      };

      interactions.interactions.forEach(interaction => {
        // By channel
        const channel = interaction.channel || 'unknown';
        analytics.byChannel[channel] = (analytics.byChannel[channel] || 0) + 1;

        // By status
        const status = interaction.status || 'unknown';
        analytics.byStatus[status] = (analytics.byStatus[status] || 0) + 1;

        // By service
        const service = interaction.service || 'general';
        analytics.byService[service] = (analytics.byService[service] || 0) + 1;

        // By outcome
        const outcome = interaction.outcome || 'unknown';
        analytics.byOutcome[outcome] = (analytics.byOutcome[outcome] || 0) + 1;

        // Specific metrics
        if (interaction.followuprequired && interaction.followuprequired !== 'No') {
          analytics.followUpRequired++;
        }

        if (interaction.status === 'confirmed' || interaction.status === 'booked') {
          analytics.bookingsCompleted++;
        }

        if (interaction.status === 'missed') {
          analytics.missedCalls++;
        }

        if (interaction.channel === 'web_chat') {
          analytics.chatInteractions++;
        }

        if (interaction.type === 'form_submission') {
          analytics.formSubmissions++;
        }
      });

      return {
        success: true,
        analytics: analytics,
        period: {
          days: days,
          startDate: startDateStr,
          endDate: endDateStr
        }
      };

    } catch (error) {
      console.error('Error getting interaction analytics:', error);
      return {
        success: false,
        error: 'Failed to get analytics',
        message: error.message
      };
    }
  }

  // Determine if follow-up is required
  determineFollowUpRequired(interactionData) {
    // Auto-determine follow-up priority based on interaction type and outcome
    const { type, status, outcome, intent } = interactionData;

    // Immediate follow-up required
    if (type === 'missed_call' || status === 'missed') {
      return 'Immediate';
    }

    if (type === 'incoming_call' && status === 'callback_requested') {
      return 'Immediate';
    }

    // High priority follow-up
    if (type === 'booking_attempt' && status === 'failed') {
      return 'High';
    }

    if (intent === 'emergency' || intent === 'urgent') {
      return 'High';
    }

    // Medium priority follow-up
    if (type === 'form_submission' && status === 'submitted') {
      return 'Medium';
    }

    if (type === 'chat' && status === 'completed' && !outcome.includes('booked')) {
      return 'Medium';
    }

    // Low priority or no follow-up
    if (status === 'confirmed' || status === 'booked' || status === 'completed') {
      return 'No';
    }

    return 'Medium'; // Default to medium if unsure
  }

  // Format date for logging
  formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  // Format time for logging
  formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Update interaction follow-up status
  async updateFollowUpStatus(clientId, rowNumber, newStatus, notes = '') {
    try {
      const clientConfig = await this.clientConfigService.getClientConfig(clientId);
      
      const updateData = {
        followuprequired: newStatus,
        notes: notes
      };

      const result = await this.sheetsService.updateInteraction(
        clientConfig.sheet_id,
        rowNumber,
        updateData
      );

      return result;

    } catch (error) {
      console.error('Error updating follow-up status:', error);
      return {
        success: false,
        error: 'Failed to update follow-up status',
        message: error.message
      };
    }
  }

  // Export interactions to CSV
  async exportInteractionsCSV(clientId, startDate, endDate) {
    try {
      const interactions = await this.sheetsService.getInteractionsByDateRange(
        clientId,
        startDate,
        endDate
      );

      if (!interactions.success) {
        return {
          success: false,
          error: 'Failed to get interactions for export'
        };
      }

      // Convert to CSV format
      const headers = [
        'Date', 'Time', 'Name', 'Phone', 'Email', 'Channel', 'Intent',
        'Status', 'Service', 'Requested Time', 'Booked Time', 'Outcome',
        'Notes', 'Duration', 'Follow Up Required'
      ];

      const csvRows = [headers.join(',')];

      interactions.interactions.forEach(interaction => {
        const row = [
          interaction.date || '',
          interaction.time || '',
          interaction.name || '',
          interaction.phone || '',
          interaction.email || '',
          interaction.channel || '',
          interaction.intent || '',
          interaction.status || '',
          interaction.service || '',
          interaction.requestedtime || '',
          interaction.bookedtime || '',
          interaction.outcome || '',
          interaction.notes || '',
          interaction.duration || '',
          interaction.followuprequired || ''
        ];
        csvRows.push(row.map(field => `"${field}"`).join(','));
      });

      const csvContent = csvRows.join('\n');

      return {
        success: true,
        csvContent: csvContent,
        filename: `interactions_${clientId}_${startDate}_${endDate}.csv`
      };

    } catch (error) {
      console.error('Error exporting interactions:', error);
      return {
        success: false,
        error: 'Failed to export interactions',
        message: error.message
      };
    }
  }
}
