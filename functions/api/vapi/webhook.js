/**
 * POST /api/vapi/webhook
 *
 * Cloudflare Pages Function. Receives webhooks from Vapi for AI receptionist
 * calls. Captures lead information and delivers it to configured channels.
 *
 * Expects Vapi to send:
 *   - "function-call" events (when the AI calls captureLeadInfo)
 *   - "end-of-call-report" events (when the call ends)
 *
 * Env vars (set in Cloudflare Pages dashboard, NOT .env.local):
 *   VAPI_WEBHOOK_SECRET     — Optional, for signature verification
 *   FORMSUBMIT_ACTION       — Override FormSubmit URL (default: https://formsubmit.co/ayush@brandverse.tech)
 *   WORKER_URL              — Override edge worker URL (default: https://edge.brandverse.tech)
 */

const FORM_SUBMIT_DEFAULT = 'https://formsubmit.co/ayush%40brandverse.tech';
const WORKER_URL_DEFAULT = 'https://edge.brandverse.tech';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // POST only
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // Verify webhook signature if secret is configured
  const signature = request.headers.get('x-vapi-signature') || '';
  const webhookSecret = env.VAPI_WEBHOOK_SECRET || '';
  if (webhookSecret && signature !== webhookSecret) {
    console.error('[vapi/webhook] Invalid signature');
    return jsonResponse({ error: 'Invalid signature' }, 401);
  }

  // Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const message = body.message || body;
  if (!message || !message.type) {
    return jsonResponse({ error: 'Missing message.type' }, 400);
  }

  const call = message.call || {};
  const callerPhone = call.customer?.number || message.callerPhoneNumber || '';

  switch (message.type) {
    case 'function-call': {
      const fn = message.functionCall || {};
      if (fn.name === 'captureLeadInfo') {
        const args = fn.parameters || {};
        const leadData = {
          name: args.name || '',
          phoneNumber: args.phoneNumber || callerPhone,
          reasonForCalling: args.reasonForCalling || '',
          appointmentRequest: args.appointmentRequest || '',
          email: args.email || '',
          callId: call.id || '',
          source: 'vapi_phone_call',
          capturedAt: new Date().toISOString(),
        };

        console.log('[vapi/webhook] Function call lead:', JSON.stringify(leadData));
        await deliverLead(leadData, env).catch((e) =>
          console.error('[vapi/webhook] deliverLead error:', e)
        );
      } else {
        console.log('[vapi/webhook] Unknown function:', fn.name);
      }
      return jsonResponse({ result: 'Received' });
    }

    case 'end-of-call-report': {
      const analysis = message.analysis || {};
      const leadData = {
        name: call.customer?.name || analysis.customerName || '',
        phoneNumber: call.customer?.number || callerPhone,
        reasonForCalling: analysis.summary || analysis.intent || '',
        appointmentRequest: extractAppointmentRequest(analysis),
        email: call.customer?.email || analysis.customerEmail || '',
        callId: call.id || '',
        duration: message.durationSeconds || call.durationSeconds || 0,
        transcript: message.transcript || '',
        source: 'vapi_phone_call',
        capturedAt: new Date().toISOString(),
      };

      console.log('[vapi/webhook] End-of-call lead:', JSON.stringify(leadData));
      await deliverLead(leadData, env).catch((e) =>
        console.error('[vapi/webhook] deliverLead error:', e)
      );
      return jsonResponse({ received: true });
    }

    case 'status-update':
    default:
      return jsonResponse({ received: true });
  }
}

function extractAppointmentRequest(analysis) {
  if (analysis.structuredData?.appointmentRequest) return analysis.structuredData.appointmentRequest;
  if (analysis.structuredData?.bookingRequest) return analysis.structuredData.bookingRequest;
  return '';
}

async function deliverLead(leadData, env) {
  const formSubmitUrl = env.FORMSUBMIT_ACTION || FORM_SUBMIT_DEFAULT;
  const workerUrl = env.WORKER_URL || WORKER_URL_DEFAULT;

  const channels = [
    // Channel 1: Edge worker lead endpoint
    fetch(`${workerUrl}/api/brandverse/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    }).catch((e) => console.warn('[vapi/deliver] Worker failed:', e.message)),
  ];

  // Channel 2: FormSubmit email
  const formBody = new URLSearchParams({
    _subject: `[Phone Lead] ${leadData.name || 'Unknown'} - ${leadData.phoneNumber}`,
    _captcha: 'false',
    _template: 'table',
    name: leadData.name,
    phone: leadData.phoneNumber,
    reason: leadData.reasonForCalling,
    appointment: leadData.appointmentRequest,
    email: leadData.email,
    callId: leadData.callId,
    source: leadData.source,
  });

  channels.push(
    fetch(formSubmitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
    }).catch((e) => console.warn('[vapi/deliver] FormSubmit failed:', e.message))
  );

  const results = await Promise.allSettled(channels);
  const ok = results.filter((r) => r.status === 'fulfilled').length;
  console.log(`[vapi/deliver] ${ok}/${channels.length} channels delivered`);
}
