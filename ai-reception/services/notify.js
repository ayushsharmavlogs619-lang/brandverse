export class NotificationService {
  constructor(env) {
    this.env = env;
    this.webhookUrl = env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    this.secret = env.GOOGLE_APPS_SCRIPT_SECRET;
  }

  async sendBookingNotification(client, bookingData) {
    if (!this.webhookUrl || !this.secret) return;

    try {
      const payload = {
        secret: this.secret,
        type: 'booking_notification',
        date: new Date().toISOString(),
        client_id: client?.id || '',
        client_name: client?.name || '',
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email || '',
        service: bookingData.service,
        dateTime: bookingData.dateTime,
        notes: bookingData.notes || '',
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        console.warn('Booking notification webhook returned', response.status);
      }
    } catch (error) {
      console.warn('Booking notification failed (non-blocking):', error.message);
    }
  }

  async sendCallNotification(client, callData) {
    if (!this.webhookUrl || !this.secret) return;

    try {
      const payload = {
        secret: this.secret,
        type: 'call_notification',
        date: new Date().toISOString(),
        client_id: client?.id || '',
        client_name: client?.name || '',
        callerName: callData.callerName || '',
        callerNumber: callData.callerNumber || '',
        outcome: callData.outcome || '',
        duration: callData.duration || 0,
        summary: callData.notes || '',
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        console.warn('Call notification webhook returned', response.status);
      }
    } catch (error) {
      console.warn('Call notification failed (non-blocking):', error.message);
    }
  }

  // Send a callback request notification. Resolves with { confirmed: true }
  // ONLY when the delivery actually succeeded, so the voice assistant can
  // truthfully tell callers whether the team was actually notified.
  async sendCallbackNotification(client, callbackData) {
    if (!this.webhookUrl || !this.secret) {
      return { confirmed: false, reason: 'notification_webhook_not_configured' };
    }

    try {
      const payload = {
        secret: this.secret,
        type: 'callback_request',
        date: new Date().toISOString(),
        client_id: client?.id || '',
        client_name: client?.name || '',
        name: callbackData.name || '',
        phone: callbackData.phone || '',
        reason: callbackData.reason || '',
        urgency: callbackData.urgency || 'normal',
        service: callbackData.service || '',
        notes: callbackData.notes || '',
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        console.warn('Callback notification webhook returned', response.status);
        return { confirmed: false, reason: `webhook_http_${response.status}` };
      }

      return { confirmed: true };
    } catch (error) {
      console.warn('Callback notification failed (non-blocking):', error.message);
      return { confirmed: false, reason: 'webhook_error' };
    }
  }
}