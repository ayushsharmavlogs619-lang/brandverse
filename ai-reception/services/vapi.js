// Vapi Service - Voice AI integration
// Handles Vapi webhooks, outbound calls, and assistant configuration

const VAPI_BASE = 'https://api.vapi.ai';

export class VapiService {
  constructor(env, clientConfigService, loggingEngine, notificationService) {
    this.env = env;
    this.apiKey = env.VAPI_API_KEY;
    this.clientConfigService = clientConfigService;
    this.loggingEngine = loggingEngine;
    this.notificationService = notificationService || null;
  }

  // Verify webhook signature (if VAPI_WEBHOOK_SECRET is configured)
  verifySignature(request) {
    const secret = this.env.VAPI_WEBHOOK_SECRET;
    if (!secret) return true; // skip verification if not configured
    const signature = request.headers.get('x-vapi-signature') || '';
    if (!signature) return false;
    return signature === secret;
  }

  // Handle incoming Vapi webhook
  async handleWebhook(request) {
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

  // Handle assistant-request: return dynamic assistant config for the client
  async handleAssistantRequest(message) {
    const call = message.call || {};
    const calledNumber = call.phoneNumber?.number || '';
    const customerNumber = call.customer?.number || '';

    const client = await this.clientConfigService.getClientByPhoneNumber(calledNumber);
    if (!client) {
      console.warn(`No client found for inbound number: ${calledNumber}`);
      return {
        status: 200,
        body: {
          assistant: {
            name: 'Brandverse Receptionist',
            model: { provider: 'openai', model: 'gpt-4o-mini' },
            firstMessage: 'Hello, thank you for calling. How can I help you today?',
            voice: 'jennifer-playht',
            transcriber: { provider: 'deepgram', model: 'nova-2' },
          },
        },
      };
    }

    const services = Object.entries(client.services || {}).map(([name, duration]) => ({
      name,
      durationMinutes: duration,
    }));

    const baseUrl = this.env.APP_BASE_URL || `https://edge.brandverse.tech`;

    return {
      status: 200,
      body: {
        assistant: {
          name: `${client.name} AI Receptionist`,
          model: { provider: 'openai', model: 'gpt-4o-mini' },
          firstMessage: `Hello, thank you for calling ${client.name}. How can I help you today?`,
          voice: 'jennifer-playht',
          transcriber: { provider: 'deepgram', model: 'nova-2' },
          recordingEnabled: true,
          semanticMemory: {
            enabled: true,
          },
          analysisPlan: {
            summaryPlan: { enabled: true },
            successEvaluationPlan: { enabled: true },
          },
          tools: [
            {
              type: 'function',
              function: {
                name: 'check_availability',
                description: 'Check available appointment slots for a given date and service.',
                parameters: {
                  type: 'object',
                  properties: {
                    date: { type: 'string', description: 'Date in YYYY-MM-DD format' },
                    service: { type: 'string', enum: Object.keys(client.services) },
                  },
                  required: ['date', 'service'],
                },
              },
              server: {
                url: `${baseUrl}/api/${client.id}/availability`,
                method: 'GET',
                queryParameters: {
                  date: '{{date}}',
                  service: '{{service}}',
                },
              },
            },
            {
              type: 'function',
              function: {
                name: 'book_appointment',
                description: 'Book an appointment for a customer.',
                parameters: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    phone: { type: 'string' },
                    email: { type: 'string' },
                    service: { type: 'string', enum: Object.keys(client.services) },
                    dateTime: { type: 'string', description: 'ISO 8601 date-time' },
                    notes: { type: 'string' },
                  },
                  required: ['name', 'phone', 'service', 'dateTime'],
                },
              },
              server: {
                url: `${baseUrl}/api/${client.id}/book`,
                method: 'POST',
                body: {
                  name: '{{name}}',
                  phone: '{{phone}}',
                  email: '{{email}}',
                  service: '{{service}}',
                  dateTime: '{{dateTime}}',
                  notes: '{{notes}}',
                },
              },
            },
            {
              type: 'function',
              function: {
                name: 'get_business_hours',
                description: 'Get the business hours and available services.',
                parameters: {
                  type: 'object',
                  properties: {},
                  required: [],
                },
              },
              server: {
                url: `${baseUrl}/api/${client.id}/client-config`,
                method: 'GET',
              },
            },
          ],
          messages: [
            {
              type: 'system-message',
              message: `You are the AI receptionist for ${client.name}. ` +
                `Business hours: ${JSON.stringify(client.working_hours)}. ` +
                `Available services: ${services.map(s => `${s.name} (${s.durationMinutes} min)`).join(', ')}. ` +
                `Address: ${client.address || 'Not provided'}. ` +
                `Be polite, professional, and efficient. Collect caller's name and phone number. ` +
                `Use check_availability to find slots, then book_appointment to schedule. ` +
                `If the caller has an emergency or urgent need and the business supports emergency services, ` +
                `prioritize getting them help immediately.`,
            },
          ],
        },
      },
    };
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

  // Handle function-call: execute a custom function requested by Vapi
  async handleFunctionCall(message) {
    const functionName = message.functionCall?.name;
    const args = message.functionCall?.parameters || {};

    console.log(`Vapi function call: ${functionName}`, args);

    // function-call is handled by Vapi's HTTP tool mechanism directly.
    // This endpoint is for server-side functions only.
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
          name: `${client.name} AI Receptionist`,
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
