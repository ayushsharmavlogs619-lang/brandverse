// Vapi Service - Voice AI integration
// Handles Vapi webhooks, outbound calls, and assistant configuration

import { buildAssistantConfig } from './assistant-config.js';

const VAPI_BASE = 'https://api.vapi.ai';

export class VapiService {
  constructor(env, clientConfigService, loggingEngine, notificationService) {
    this.env = env;
    this.apiKey = env.VAPI_API_KEY;
    this.clientConfigService = clientConfigService;
    this.loggingEngine = loggingEngine;
    this.notificationService = notificationService || null;
  }

  // Verify webhook signature. Vapi sends the configured webhook secret in
  // the "x-vapi-secret" header. For compatibility, "x-vapi-signature" is
  // also accepted. If no secret is configured, allow (dev) only when
  // ALLOW_INSECURE_WEBHOOKS=true; otherwise the webhook is rejected.
  verifySignature(request) {
    const secret = this.env.VAPI_WEBHOOK_SECRET;
    if (!secret) {
      if (this.env.ALLOW_INSECURE_WEBHOOKS === 'true') return true;
      return false;
    }
    const signature = request.headers.get('x-vapi-secret') || request.headers.get('x-vapi-signature') || '';
    if (!signature) return false;
    return signature === secret;
  }

  // Handle incoming Vapi webhook
  async handleWebhook(request) {
    if (!this.verifySignature(request)) {
      return { status: 401, body: { error: 'Invalid webhook signature (VAPI_WEBHOOK_SECRET mismatch)' } };
    }
    const body = await request.json();
    const message = body.message || body;

    if (!message || !message.type) {
      return { status: 400, body: { error: 'Invalid webhook: missing message.type' } };
    }

    switch (message.type) {
      case 'assistant-request':
        return await this.handleAssistantRequest(message);
      case 'status-update':
        return await this.handleStatusUpdate(message);
      case 'end-of-call-report':
        return await this.handleEndOfCallReport(message);
      case 'function-call':
        return await this.handleFunctionCall(message);
      default:
        return { status: 200, body: { received: true } };
    }
  }

  // Handle assistant-request: return the assistant config for the client
  // matched to the inbound number. The demo client is resolved through
  // DEMO_PHONE_NUMBER (set in client config), so the demo number NEVER
  // falls through to the generic fallback assistant.
  async handleAssistantRequest(message) {
    const call = message.call || {};
    const calledNumber = call.phoneNumber?.number || '';
    const customerNumber = call.customer?.number || '';

    const client = await this.clientConfigService.getClientByPhoneNumber(calledNumber);

    if (!client) {
      // No client matched this number. Provide a minimal, honest fallback so
      // unconfigured numbers are never handled as a specific business.
      console.warn(`No client found for inbound number: ${calledNumber}`);
      return {
        status: 200,
        body: {
          assistant: {
            name: 'Brandverse Receptionist',
            model: { provider: 'openai', model: 'gpt-4o-mini' },
            firstMessage: this.env.DEMO_FALLBACK_FIRST_MESSAGE || 'Hello, thank you for calling. How can I help you today?',
            voice: 'jennifer-playht',
            transcriber: { provider: 'deepgram', model: 'nova-2' },
            messages: [
              {
                type: 'system-message',
                message: 'You are a Brandverse receptionist. The business for this number could not be identified. Be honest, take the caller name and phone number, and offer that a team member will call them back. Do not book, do not promise transfers, do not invent a business name.',
              },
            ],
          },
        },
      };
    }

    if (client.is_demo) {
      console.log(`[demo] Demo client matched via phone: ${calledNumber}`);
    }

    const config = buildAssistantConfig(client, this.env);
    return { status: 200, body: config };
  }

  // Handle status-update: log call state changes
  async handleStatusUpdate(message) {
    const call = message.call || {};
    const calledNumber = call.phoneNumber?.number || '';
    const client = await this.clientConfigService.getClientByPhoneNumber(calledNumber);

    if (client) {
      await this.loggingEngine.logIncomingCall(client.id, {
        callerNumber: call.customer?.number || '',
        callerName: call.customer?.name || '',
        outcome: message.status || 'unknown',
        notes: `Call status: ${message.status} at ${new Date().toISOString()}`,
        callId: call.id,
      }).catch(() => {});
    }

    return { status: 200, body: { received: true } };
  }

  // Handle end-of-call-report: log transcript, duration, outcome
  async handleEndOfCallReport(message) {
    const call = message.call || {};
    const calledNumber = call.phoneNumber?.number || '';
    const client = await this.clientConfigService.getClientByPhoneNumber(calledNumber);

    if (client) {
      await this.loggingEngine.logIncomingCall(client.id, {
        callerNumber: call.customer?.number || '',
        callerName: call.customer?.name || '',
        outcome: message.endedReason || 'completed',
        notes: message.summary || '',
        duration: message.durationSeconds || call.durationSeconds || 0,
        callId: call.id,
        recordingUrl: message.recordingUrl || call.recordingUrl || '',
      }).catch(() => {});

      if (this.notificationService) {
        this.notificationService.sendCallNotification(client, {
          callerNumber: call.customer?.number || '',
          callerName: call.customer?.name || '',
          outcome: message.endedReason || 'completed',
          notes: message.summary || '',
          duration: message.durationSeconds || call.durationSeconds || 0,
        }).catch(() => {});
      }

      if (message.transcript) {
        await this.loggingEngine.logInteraction(client.id, {
          type: 'call_transcript',
          channel: 'phone',
          name: call.customer?.name || '',
          phone: call.customer?.number || '',
          intent: 'inbound_call',
          status: 'completed',
          outcome: message.endedReason || 'completed',
          notes: `Transcript: ${message.transcript.substring(0, 10000)}`,
          duration: message.durationSeconds || call.durationSeconds || 0,
        }).catch(() => {});
      }
    }

    return { status: 200, body: { received: true } };
  }

  // Handle function-call: used only for custom backend actions. All other
  // tools execute through their server URLs directly.
  async handleFunctionCall(message) {
    const functionName = message.functionCall?.name;
    return {
      status: 200,
      body: {
        result: `Function ${functionName} is handled via direct API call.`,
      },
    };
  }

  // Trigger an outbound call via Vapi API
  async triggerOutboundCall(clientId, customerNumber, assistantOverrides = {}) {
    if (!this.apiKey) {
      throw new Error('VAPI_API_KEY not configured');
    }

    const client = await this.clientConfigService.getClientConfig(clientId);

    const response = await fetch(`${VAPI_BASE}/call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: {
          twilioPhoneNumber: client.phone_number,
          customerNumber: customerNumber,
        },
        assistant: {
          name: `${client.name} Receptionist`,
          model: { provider: 'openai', model: 'gpt-4o-mini' },
          firstMessage: assistantOverrides.firstMessage || `Hello, this is ${client.name}. How can I help you today?`,
          voice: 'jennifer-playht',
          transcriber: { provider: 'deepgram', model: 'nova-2' },
          recordingEnabled: true,
          ...assistantOverrides,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Vapi outbound call failed: ${response.status} - ${err}`);
    }

    return await response.json();
  }
}