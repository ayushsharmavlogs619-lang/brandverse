// SMS Service - Real SMS notifications via Twilio
// Handles SMS confirmations, reminders, and notifications

export class SMSService {
  constructor(env) {
    this.env = env;
    this.twilioBaseURL = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_SID}`;
  }

  // Send SMS via Twilio
  async sendSMS(to, message, from = null) {
    try {
      const phoneNumber = from || this.env.TWILIO_PHONE_NUMBER;
      
      if (!phoneNumber) {
        throw new Error('Twilio phone number not configured');
      }

      const auth = btoa(`${this.env.TWILIO_SID}:${this.env.TWILIO_AUTH_TOKEN}`);
      
      const response = await fetch(`${this.twilioBaseURL}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          To: to,
          From: phoneNumber,
          Body: message
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Twilio API error: ${errorData.message || response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        sid: result.sid,
        status: result.status,
        message: 'SMS sent successfully'
      };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return {
        success: false,
        error: 'Failed to send SMS',
        message: error.message
      };
    }
  }

  // Send booking confirmation
  async sendBookingConfirmation(clientName, phoneNumber, businessName, service, dateTime, address) {
    try {
      const formattedDate = new Date(dateTime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const message = `Hi ${clientName}! Your ${service} appointment at ${businessName} is confirmed for ${formattedDate}. 

Address: ${address}

Please arrive 10 minutes early. Reply CANCEL to reschedule or call us if you need changes.

Thank you!`;

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error('Error sending booking confirmation:', error);
      return {
        success: false,
        error: 'Failed to send booking confirmation',
        message: error.message
      };
    }
  }

  // Send appointment reminder (24 hours before)
  async sendReminder(clientName, phoneNumber, businessName, service, dateTime, address) {
    try {
      const formattedDate = new Date(dateTime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const message = `Hi ${clientName}! This is a reminder about your ${service} appointment at ${businessName} tomorrow at ${formattedDate}.

Address: ${address}

Please arrive 10 minutes early. Reply RESCHEDULE if you need to change your appointment.

See you soon!`;

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error('Error sending reminder:', error);
      return {
        success: false,
        error: 'Failed to send reminder',
        message: error.message
      };
    }
  }

  // Send cancellation confirmation
  async sendCancellationConfirmation(clientName, phoneNumber, businessName) {
    try {
      const message = `Hi ${clientName}! Your appointment at ${businessName} has been cancelled as requested.

If you'd like to reschedule, please call us or book online at your convenience.

Thank you for letting us know!`;

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error('Error sending cancellation confirmation:', error);
      return {
        success: false,
        error: 'Failed to send cancellation confirmation',
        message: error.message
      };
    }
  }

  // Send reschedule confirmation
  async sendRescheduleConfirmation(clientName, phoneNumber, businessName, service, newDateTime, address) {
    try {
      const formattedDate = new Date(newDateTime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const message = `Hi ${clientName}! Your ${service} appointment at ${businessName} has been rescheduled to ${formattedDate}.

Address: ${address}

Please arrive 10 minutes early. Reply CANCEL if you need to make further changes.

Thank you!`;

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error('Error sending reschedule confirmation:', error);
      return {
        success: false,
        error: 'Failed to send reschedule confirmation',
        message: error.message
      };
    }
  }

  // Send missed appointment notification
  async sendMissedAppointmentNotification(clientName, phoneNumber, businessName) {
    try {
      const message = `Hi ${clientName}! We missed you for your appointment at ${businessName} today.

Please call us to reschedule. We'd be happy to find a time that works better for you.

Hope to see you soon!`;

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error('Error sending missed appointment notification:', error);
      return {
        success: false,
        error: 'Failed to send missed appointment notification',
        message: error.message
      };
    }
  }

  // Send follow-up message (post-appointment)
  async sendFollowUpMessage(clientName, phoneNumber, businessName, service) {
    try {
      const message = `Hi ${clientName}! Thank you for visiting ${businessName} for your ${service} appointment.

We hope you're doing well! If you have any questions or need to schedule your next visit, please don't hesitate to call us.

Your feedback is important to us. Reply with any comments about your experience.

Take care!`;

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error('Error sending follow-up message:', error);
      return {
        success: false,
        error: 'Failed to send follow-up message',
        message: error.message
      };
    }
  }

  // Send emergency appointment confirmation
  async sendEmergencyConfirmation(clientName, phoneNumber, businessName, service, estimatedArrival) {
    try {
      const message = `Hi ${clientName}! We've received your emergency request for ${service} at ${businessName}.

Our technician will arrive approximately: ${estimatedArrival}

We'll call you 30 minutes before arrival. If this changes, we'll notify you immediately.

Reply EMERGENCY if this becomes more urgent. Thank you!`;

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error('Error sending emergency confirmation:', error);
      return {
        success: false,
        error: 'Failed to send emergency confirmation',
        message: error.message
      };
    }
  }

  // Send promotional message (with opt-out)
  async sendPromotionalMessage(phoneNumber, businessName, promotion) {
    try {
      const message = `${promotion}

This message is from ${businessName}. Reply STOP to unsubscribe from marketing messages.

Msg&Data rates may apply.`;

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error('Error sending promotional message:', error);
      return {
        success: false,
        error: 'Failed to send promotional message',
        message: error.message
      };
    }
  }

  // Check SMS delivery status
  async getDeliveryStatus(messageSid) {
    try {
      const auth = btoa(`${this.env.TWILIO_SID}:${this.env.TWILIO_AUTH_TOKEN}`);
      
      const response = await fetch(`${this.twilioBaseURL}/Messages/${messageSid}.json`, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get message status: ${response.status}`);
      }

      const message = await response.json();
      return {
        success: true,
        status: message.status,
        errorCode: message.error_code,
        errorMessage: message.error_message,
        dateCreated: message.date_created,
        dateSent: message.date_sent,
        dateUpdated: message.date_updated
      };
    } catch (error) {
      console.error('Error getting delivery status:', error);
      return {
        success: false,
        error: 'Failed to get delivery status',
        message: error.message
      };
    }
  }

  // Validate phone number format
  validatePhoneNumber(phoneNumber) {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if it's a valid mobile number (basic validation)
    if (cleaned.length < 10) {
      return false;
    }
    
    // Add country code if missing (assuming US/Canada for now)
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
    
    if (cleaned.startsWith('+')) {
      return cleaned;
    }
    
    return false;
  }

  // Format phone number for display
  formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return phoneNumber; // Return original if can't format
  }
}
