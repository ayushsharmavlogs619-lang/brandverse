#!/usr/bin/env node

/**
 * Creates a Vapi AI receptionist assistant for Brandverse.
 *
 * Usage:
 *   1. Set VAPI_API_KEY in your environment or .env.local
 *   2. node scripts/create-vapi-assistant.mjs
 *
 * The assistant is configured to:
 *   - Answer inbound calls as a professional receptionist
 *   - Gather caller name, phone number, reason for calling, and appointment requests
 *   - Call the "captureLeadInfo" server function when all info is collected
 *   - Send end-of-call reports to the webhook URL
 *
 * After creation, assign the assistant to a phone number in the Vapi dashboard
 * or use the returned assistant ID in the Vapi web SDK (app/demos/voice/page.tsx).
 */

const VAPI_BASE = 'https://api.vapi.ai';
const WEBHOOK_URL = 'https://brandverse.tech/api/vapi/webhook';

async function main() {
  const apiKey = process.env.VAPI_API_KEY;
  if (!apiKey) {
    console.error('Error: VAPI_API_KEY environment variable is required.');
    console.error('Set it in .env.local or export it before running this script.');
    process.exit(1);
  }

  const assistantPayload = {
    name: 'Brandverse AI Receptionist',
    model: {
      provider: 'openai',
      model: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 250,
      messages: [
        {
          role: 'system',
          content: `You are Brandverse's AI receptionist. Your job is to answer incoming calls professionally and gather information.

Rules:
1. Greet the caller warmly and ask how you can help.
2. Politely gather: their full name, phone number (if not already known), reason for calling, and whether they want to book an appointment.
3. If they want to book an appointment, ask for preferred date and time.
4. Be conversational and professional — this is a phone call, not a form.
5. Once you have all the information, call the captureLeadInfo function with the details.
6. If the caller seems frustrated or urgent, be empathetic and prioritize their needs.
7. Do NOT make up information. If the caller doesn't provide something, note it as "Not provided".`,
        },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'captureLeadInfo',
            description: 'Call this function when you have gathered all necessary information from the caller: their name, phone number, reason for calling, and whether they want to book an appointment.',
            parameters: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "The caller's full name",
                },
                phoneNumber: {
                  type: 'string',
                  description: "The caller's phone number",
                },
                reasonForCalling: {
                  type: 'string',
                  description: 'The primary reason the caller is reaching out',
                },
                appointmentRequest: {
                  type: 'string',
                  description: 'Details about any appointment they want to book, including date/time preference if provided',
                },
                email: {
                  type: 'string',
                  description: "The caller's email address (if provided)",
                },
              },
              required: ['name', 'phoneNumber', 'reasonForCalling'],
            },
            strict: false,
          },
        },
      ],
      toolIds: [],
    },
    voice: {
      provider: 'vapi',
      voiceId: 'Emma',
    },
    transcriber: {
      provider: 'deepgram',
      model: 'nova-2',
      language: 'en',
    },
    firstMessage: 'Hello, thank you for calling Brandverse. How can I help you today?',
    firstMessageMode: 'assistant-speaks-first',
    recordingEnabled: true,
    maxDurationSeconds: 600,
    backgroundSound: 'office',
    analysisPlan: {
      summaryPlan: { enabled: true },
      successEvaluationPlan: { enabled: true },
      structuredDataPlan: {
        enabled: true,
        schema: {
          type: 'object',
          properties: {
            customerName: { type: 'string' },
            customerEmail: { type: 'string' },
            reasonForCalling: { type: 'string' },
            appointmentRequest: { type: 'string' },
          },
          required: ['customerName', 'reasonForCalling'],
        },
      },
    },
    serverMessages: ['end-of-call-report', 'function-call', 'status-update'],
    server: {
      url: WEBHOOK_URL,
      timeoutSeconds: 10,
    },
  };

  console.log('Creating Vapi assistant...');
  console.log(`  Model: ${assistantPayload.model.provider}/${assistantPayload.model.model}`);
  console.log(`  Voice: ${assistantPayload.voice.provider}/${assistantPayload.voice.voiceId}`);
  console.log(`  Webhook: ${WEBHOOK_URL}`);
  console.log('');

  const response = await fetch(`${VAPI_BASE}/assistant`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assistantPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to create assistant (${response.status}): ${errorText}`);
    process.exit(1);
  }

  const assistant = await response.json();
  console.log('✅ Assistant created successfully!');
  console.log('');
  console.log(`  Assistant ID: ${assistant.id}`);
  console.log(`  Name: ${assistant.name}`);
  console.log('');

  console.log('Next steps:');
  console.log('  1. Go to https://dashboard.vapi.ai/assistants to review your assistant.');
  console.log('  2. Buy or import a phone number in Vapi dashboard and assign this assistant.');
  console.log(`  3. Or use the assistant ID in your Vapi SDK: start("${assistant.id}")`);
  console.log('  4. Make sure the webhook URLs in your assistant settings point to:');
  console.log(`     ${WEBHOOK_URL}`);
  console.log('');
  console.log(`Set this in your .env.local for local development:`);
  console.log(`  VAPI_API_KEY=<your-vapi-private-api-key>`);
  console.log(`  NEXT_PUBLIC_VAPI_PUBLIC_KEY=<your-vapi-public-key>`);
  console.log(`  NEXT_PUBLIC_VAPI_ASSISTANT_ID=${assistant.id}`);
  console.log(`  VAPI_WEBHOOK_SECRET= (optional, set in Cloudflare Pages dashboard)`);
}

main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
