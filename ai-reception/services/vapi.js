// Vapi Service - Voice AI integration
// Handles Vapi webhooks, outbound calls, and assistant configuration

const VAPI_BASE = 'https://api.vapi.ai';

// Industry-specific prompt modules for production
function getIndustryModule(niche, client) {
  const modules = {
    electrician: `
# Electrical Service Context
You understand common electrical-service conversations:
- power outage, partial power loss, breaker repeatedly tripping
- outlets not working, lights flickering, electrical panel issues
- burning smell, sparking, electrical installation
- EV charger installation, ceiling fans, lighting, switches/outlets
- rewiring, inspections, commercial electrical work

Ask relevant questions naturally:
- "What exactly is happening?"
- "Is the whole property without power or just part of it?"
- "Are you seeing sparks, smoke, or a burning smell?"
- "Is anyone currently in danger?"
- "What's the address?"
- "Is this residential or commercial?"

DO NOT diagnose electrical faults. For dangerous situations, prioritize safety and follow the configured emergency protocol. Never tell someone to perform dangerous electrical work themselves.
`,

    chiropractic: `
# Chiropractic Front Desk Context
You understand common chiropractic front-desk conversations:
- new patient appointments, existing patient appointments
- follow-ups, rescheduling, cancellations
- office hours, location, insurance/payment questions
- first-visit questions, treatment availability, general clinic information

Ask naturally:
- "Is this your first visit with us?"
- "What are you hoping to come in for?"
- "Are you looking for an initial consultation or are you already a patient?"
- "What day works best for you?"
- "Do you have a preferred provider?"

DO NOT diagnose conditions. DO NOT recommend treatment. DO NOT make promises about outcomes. DO NOT tell someone that a symptom definitely represents a particular condition. For potentially urgent medical situations, follow the configured emergency guidance and recommend appropriate urgent/emergency care. Your role is scheduling, intake, and routing.
`,

    podiatry: `
# Podiatry Front Desk Context
You understand common podiatry front-desk conversations:
- new patient appointments, foot pain, ankle complaints
- toenail concerns, diabetic foot-care appointments
- orthotics consultations, follow-ups, post-procedure scheduling
- cancellations, rescheduling, insurance/payment questions
- referral questions, office/location questions

Ask naturally:
- "What are you looking to be seen for?"
- "Is this your first visit with us?"
- "How long have you been dealing with the issue?"
- "Are you looking to schedule a routine appointment or is this something that needs attention quickly?"
- "Do you have a preferred day?"

DO NOT diagnose. DO NOT recommend treatment. DO NOT prescribe treatment. DO NOT recommend medications. DO NOT promise a medical outcome. For potentially urgent situations, follow the configured emergency protocol.
`,

    'universal-demo': `
# Universal Demo Mode
You are demonstrating the Brandverse AI receptionist to a business owner. Your goal is to identify their industry and demonstrate relevant capabilities.

## Industry Detection
Listen for the caller to mention their business type:
- "electrician", "electrical" → electrician mode
- "chiropractor", "chiropractic", "spine", "adjustment" → chiropractic mode  
- "podiatrist", "podiatry", "foot", "ankle" → podiatry mode

If the industry is obvious from their opening statement, immediately use that industry's behavior without asking redundant questions.

If unclear, ask naturally: "Absolutely. What type of business do you run?"

## Demo Opening
After identifying the industry, say: "Perfect. Let's run a realistic call for your business. You can pretend you're one of your customers and ask me anything you'd normally hear."

## Industry-Specific Behavior
Once you've identified the industry, use the relevant industry module:
- For electrician: use electrical service context
- For chiropractic: use chiropractic front desk context
- For podiatry: use podiatry front desk context

## Unknown Industries
If they mention an unsupported industry (e.g., HVAC, plumbing, etc.):
Say: "Absolutely. I can still show you the core receptionist workflow. Tell me what a typical customer call sounds like for your business."

Then demonstrate: call answering, intent recognition, lead qualification, appointment handling, objection handling, human handoff, lead capture.

DO NOT falsely claim to know industry-specific policies for unsupported industries.

## Safety Boundaries
Maintain all safety boundaries:
- For medical: DO NOT diagnose, prescribe, or promise outcomes
- For electrical: DO NOT diagnose faults or instruct dangerous work
- For any: Follow emergency protocols appropriately

## Demo Context
This is a demonstration. Be helpful and show the capabilities while maintaining realistic boundaries.
`,

    default: ''
  };

  return modules[niche] || modules.default;
}

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
    if (!this.verifySignature(request)) {
      return { status: 401, body: { error: 'Invalid webhook signature' } };
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
                `prioritize getting them help immediately.` +
                `${getIndustryModule(client.niche || '', client)}` +
                `

# Intent recognition
Recognize the caller's intent before choosing the workflow:
- new customer, existing customer, emergency, appointment request
- rescheduling, cancellation, pricing question, service question
- availability question, location/service-area question
- insurance/payment question, status/follow-up, human request
- complaint, general information

Never force every caller through the same script. Use the caller's answer to determine the next question.

# Objection handling
Handle realistic objections naturally:
- "I just need to know the price" → Explain pricing policy, offer consult
- "Can someone call me back?" → Capture details, confirm callback
- "I don't want to talk to a robot" → Acknowledge, offer human if configured
- "Are you open right now?" → Check hours, state current status
- "Do you take insurance?" → Use configured FAQ or offer team confirmation
- "Can you come today?" → Check availability, offer options
- "I've used someone else before" → Acknowledge, focus on current need
- "I need to think about it" → Respect, offer follow-up
- "I have an emergency" → Follow emergency protocol

Never argue. Acknowledge → answer what is known → offer the next useful action.

# Conversation quality
- Sound like an experienced employee. Be warm and professional.
- Use short conversational sentences. Ask one useful question at a time.
- Remember information already provided. Avoid repeating questions.
- Handle interruptions naturally. Avoid sounding scripted.
- Avoid corporate language. Avoid excessive enthusiasm.
- Adapt your next question to the caller's answer.
- Confirm details before booking (spell names, confirm phone numbers).
- Collect the caller's name and phone number early.
- Do not hang up without a clear outcome: a booking, a callback, or a confirmed transfer.

# Call ending
Before ending:
- Summarize the outcome
- Confirm appointment details if applicable
- Confirm any required follow-up
- Thank the caller naturally

Example: "Perfect. I've got you down for Tuesday at 2:30 PM. You'll receive the confirmation shortly. Anything else I can help with?"`,
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
