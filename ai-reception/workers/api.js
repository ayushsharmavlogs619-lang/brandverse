import { GoogleCalendarService } from '../services/calendar.js';
import { GoogleSheetsService } from '../services/sheets.js';
import { ClientConfigService } from '../services/client-config.js';
import { AvailabilityEngine } from '../services/availability.js';
import { BookingEngine } from '../services/booking.js';
import { LoggingEngine } from '../services/logging.js';
import { VapiService } from '../services/vapi.js';
import { NotificationService } from '../services/notify.js';
import { createLogger } from '../services/logger.js';
import { RateLimiter, validateBookingInput, validateLogInput, sanitizeStr } from '../services/validate.js';

const rateLimiter = new RateLimiter();

// Authorize a server-side tool call (booking, callback, transfer, etc).
// The Vapi-generated assistant config includes the X-Tool-Key header for
// every server tool (see assistant-config.js), so legitimate calls carry
// the key transparently. Requests without a valid key are rejected with
// 401; if TOOL_API_KEY is not configured the endpoint refuses to act.
function toolAuthorized(request, env) {
  const key = env.TOOL_API_KEY;
  if (!key) return false;
  const supplied = request.headers.get('X-Tool-Key');
  if (!supplied) return false;
  return supplied === key;
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const allowed = new Set([
    env.APP_BASE_URL,
    'https://brandverse.tech',
    'https://www.brandverse.tech',
    'https://edge.brandverse.tech',
  ].filter(Boolean));
  const allow = origin && allowed.has(origin) ? origin : 'https://brandverse.tech';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;
    const log = createLogger(request, '');
    const ch = corsHeaders(request, env);

    if (method === 'OPTIONS') return new Response(null, { headers: ch });

    const clientId = path.split('/')[2];

    const rateKey = request.headers.get('CF-Connecting-IP') || clientId || 'unknown';
    const rateCheck = rateLimiter.check(rateKey);
    if (!rateCheck.allowed) {
      log.warn('rate_limited', { rateKey });
      return json({ error: 'Too many requests' }, 429, { ...ch, 'Retry-After': String(Math.ceil(rateCheck.resetMs / 1000)) });
    }

    try {
      if (path === '/health') {
        log.info('health_check');
        return json({
          status: 'healthy', timestamp: new Date().toISOString(), version: '1.1.0',
        }, 200, ch);
      }

      if (path === '/api/vapi/webhook' && method === 'POST') {
        return await handleVapiWebhook(request, env, ch, log);
      }

      if (path === '/api/vapi/call' && method === 'POST') {
        return await handleVapiOutboundCall(request, env, ch, log);
      }

      if (!clientId) return json({ error: 'Client ID required' }, 400, ch);

      const clientLog = log.child(clientId);
      const clientConfig = new ClientConfigService(env);
      const calendarService = new GoogleCalendarService(env);
      const sheetsService = new GoogleSheetsService(env);
      const availabilityEngine = new AvailabilityEngine(calendarService, clientConfig);
      const bookingEngine = new BookingEngine(calendarService, sheetsService, null, clientConfig);
      const loggingEngine = new LoggingEngine(sheetsService, clientConfig);
      const notificationService = new NotificationService(env);

      if (path === `/api/${clientId}/availability` && method === 'GET') {
        return await handleAvailability(clientId, url.searchParams, availabilityEngine, ch, clientLog);
      }

      if (path === `/api/${clientId}/book` && method === 'POST') {
        // Authenticated: book creates real calendar events. Reject calls
        // without the Vapi tool key / unconfigured key so actors cannot spike.
        if (!toolAuthorized(request, env)) {
          return json({ error: 'Unauthorized: missing or invalid X-Tool-Key' }, 401, ch);
        }
        return await handleBooking(clientId, await request.json(), bookingEngine, loggingEngine, notificationService, ch, clientLog);
      }

      if (path === `/api/${clientId}/callback` && method === 'POST') {
        // Callback requests are stored and (if configured) pushed to the
        // notification webhook. Same auth requirement as booking.
        if (!toolAuthorized(request, env)) {
          return json({ error: 'Unauthorized: missing or invalid X-Tool-Key' }, 401, ch);
        }
        return await handleCallback(clientId, await request.json(), loggingEngine, clientConfig, notificationService, ch, clientLog);
      }

      if (path === `/api/${clientId}/transfer` && method === 'POST') {
        // Real human handoff via Vapi. Gated by same tool key.
        if (!toolAuthorized(request, env)) {
          return json({ error: 'Unauthorized: missing or invalid X-Tool-Key' }, 401, ch);
        }
        return await handleTransfer(clientId, env, request, clientConfig, loggingEngine, ch, clientLog);
      }

      if (path === `/api/${clientId}/cancel` && method === 'POST') {
        if (!toolAuthorized(request, env)) {
          return json({ error: 'Unauthorized: missing or invalid X-Tool-Key' }, 401, ch);
        }
        return await handleCancel(clientId, await request.json(), bookingEngine, loggingEngine, ch, clientLog);
      }

      if (path === `/api/${clientId}/reschedule` && method === 'POST') {
        if (!toolAuthorized(request, env)) {
          return json({ error: 'Unauthorized: missing or invalid X-Tool-Key' }, 401, ch);
        }
        return await handleReschedule(clientId, await request.json(), bookingEngine, loggingEngine, ch, clientLog);
      }

      if (path === `/api/${clientId}/log` && method === 'POST') {
        return await handleLog(clientId, await request.json(), loggingEngine, ch, clientLog);
      }

      if (path === `/api/${clientId}/client-config` && method === 'GET') {
        return await handleClientConfig(clientId, clientConfig, ch, clientLog);
      }

      // Apex brandverse.tech/api/* is routed to this Worker. Paths that were
      // previously served by Pages Functions (e.g. /api/subscribe,
      // /api/send-push, /api/mailchimp/subscribe, /api/push-stats,
      // /api/leads/apps-script) are proxied back to the Pages deployment so
      // they keep working. Everything else is a genuine 404 from Pages.
      return proxyToPages(request, env, ch);

    } catch (error) {
      log.error('unhandled_error', { path, method, error: error.message });
      return json({ error: 'Internal server error', message: error.message }, 500, ch);
    }
  },
};

export default worker;

async function handleAvailability(clientId, params, engine, ch, log) {
  const date = params.get('date');
  const service = params.get('service');
  if (!date || !service) return json({ error: 'Date and service parameters required' }, 400, ch);

  try {
    const slots = await engine.getAvailableSlots(clientId, date, service);
    log.complete(`/api/${clientId}/availability`, true, { date, service });
    return json({ clientId, date, service, availableSlots: slots, timestamp: new Date().toISOString() }, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/availability`, false, { error: error.message });
    const isConfigError = error.message?.includes('calendar_id') || error.message?.includes('Service not found') || error.message?.includes('Invalid date');
    return json({ error: 'Failed to check availability', message: error.message }, isConfigError ? 400 : 500, ch);
  }
}

async function handleBooking(clientId, body, engine, loggingEngine, notificationService, ch, log) {
  const errors = validateBookingInput(body);
  if (errors.length) return json({ error: 'Validation failed', details: errors }, 400, ch);

  const name = sanitizeStr(body.name, 200);
  const phone = sanitizeStr(body.phone, 20);
  const email = sanitizeStr(body.email, 200);
  const service = sanitizeStr(body.service, 100);
  const notes = sanitizeStr(body.notes, 2000);

  try {
    const result = await engine.createBooking(clientId, { name, phone, email, service, dateTime: new Date(body.dateTime), notes });
    await loggingEngine.logInteraction(clientId, {
      type: 'booking', channel: 'api', name, phone, email, service, requestedTime: body.dateTime,
      status: result.success ? 'confirmed' : 'failed', outcome: result.message, timestamp: new Date().toISOString(),
    });

    if (result.success) {
      notificationService.sendBookingNotification(null, { name, phone, email, service, dateTime: body.dateTime, notes }).catch(() => {});
    }

    log.complete(`/api/${clientId}/book`, result.success, { service });
    return json(result, result.success ? 200 : 400, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/book`, false, { error: error.message });
    return json({ error: 'Failed to create booking', message: error.message }, 500, ch);
  }
}

async function handleLog(clientId, body, loggingEngine, ch, log) {
  const logErrors = validateLogInput(body);
  if (logErrors.length) return json({ error: 'Validation failed', details: logErrors }, 400, ch);

  try {
    await loggingEngine.logInteraction(clientId, { ...body, timestamp: body.timestamp || new Date().toISOString() });
    log.complete(`/api/${clientId}/log`, true);
    return json({ success: true, message: 'Log entry created' }, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/log`, false, { error: error.message });
    return json({ error: 'Failed to create log entry', message: error.message }, 500, ch);
  }
}

async function handleClientConfig(clientId, clientConfig, ch, log) {
  try {
    const config = await clientConfig.getClientConfig(clientId);
    if (!config) {
      log.complete(`/api/${clientId}/client-config`, false, { error: 'not_found' });
      return json({ error: 'Client configuration not found' }, 404, ch);
    }
    log.complete(`/api/${clientId}/client-config`, true);
    return json(config, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/client-config`, false, { error: error.message });
    return json({ error: 'Failed to load client configuration', message: error.message }, 500, ch);
  }
}

// Store a callback request. Returns { success, confirmed } - "confirmed" is
// only true when a notification webhook actually acknowledged the request,
// so the voice assistant never claims a human was notified when it wasn't.
async function handleCallback(clientId, body, loggingEngine, clientConfig, notificationService, ch, log) {
  const name = sanitizeStr(body.name, 200);
  const phone = sanitizeStr(body.phone, 20);
  const reason = sanitizeStr(body.reason, 1000);
  const urgency = ['normal', 'urgent'].includes(body.urgency) ? body.urgency : 'normal';
  const service = sanitizeStr(body.service, 100);
  const notes = sanitizeStr(body.notes, 2000);

  const errors = [];
  if (!name) errors.push('name is required');
  if (!phone) errors.push('phone is required');
  if (!reason) errors.push('reason is required');
  if (errors.length) return json({ error: 'Validation failed', details: errors }, 400, ch);

  try {
    const configResult = await clientConfig.getClientConfig(clientId);
    if (!configResult) return json({ error: 'Client configuration not found' }, 404, ch);

    // Persist the callback through the existing logging pipeline.
    await loggingEngine.logInteraction(clientId, {
      type: 'callback_request',
      channel: 'phone',
      name,
      phone,
      service,
      intent: 'callback_request',
      status: 'requested',
      outcome: `Callback requested (${urgency}): ${reason}`,
      notes: notes || '',
      timestamp: new Date().toISOString(),
    }).catch(() => {});

    // Fire the notification pipeline (email/whatsapp/sheets) if configured.
    // Returns confirmed only when the pipeline actually succeeded.
    let confirmed = false;
    if (notificationService) {
      confirmed = await notificationService.sendCallbackNotification(configResult, {
        name, phone, reason, urgency, service, notes,
      }).then(r => !!r && r.confirmed === true).catch(() => false);
    }

    log.complete(`/api/${clientId}/callback`, true, { urgency });
    return json({ success: true, confirmed, message: 'Callback request captured' }, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/callback`, false, { error: error.message });
    return json({ error: 'Failed to capture callback', message: error.message }, 500, ch);
  }
}

// Initiate a real human handoff via Vapi's call transfer API. Only exposes
// the transfer when a destination number is configured (checked by the
// caller - the assistant tool is only added when transfer_number exists).
async function handleTransfer(clientId, env, request, clientConfig, loggingEngine, ch, log) {
  try {
    const client = await clientConfig.getClientConfig(clientId);
    if (!client) return json({ error: 'Client configuration not found' }, 404, ch);

    const transferNumber = client?.human_handoff?.transfer_number;
    if (!transferNumber) {
      log.complete(`/api/${clientId}/transfer`, false, { error: 'not_configured' });
      return json({ success: false, confirmed: false, message: 'Human handoff is not configured for this client', reason: 'no_destination' }, 200, ch);
    }

    if (!env.VAPI_API_KEY) {
      return json({ success: false, confirmed: false, message: 'VAPI_API_KEY is not configured - transfer unavailable' }, 200, ch);
    }

    // The callId comes from the Vapi request body or query (Vapi injects
    // {{call.id}} into the server-call query parameters).
    const body = await request.json().catch(() => ({}));
    const callId = body.callId || body.call_id || new URL(request.url).searchParams.get('callId') || '';
    if (!callId) {
      log.complete(`/api/${clientId}/transfer`, false, { error: 'missing_call_id' });
      return json({ success: false, confirmed: false, message: 'callId required to transfer this call' }, 400, ch);
    }

    const resp = await fetch(`https://api.vapi.ai/call/${encodeURIComponent(callId)}/transfer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination: transferNumber }),
      signal: AbortSignal.timeout(15000),
    });

    if (!resp.ok) {
      const err = await resp.text().catch(() => '');
      log.complete(`/api/${clientId}/transfer`, false, { error: `vapi_transfer_${resp.status}` });
      return json({ success: false, confirmed: false, message: 'Transfer could not be completed', error: err.slice(0, 200) }, 502, ch);
    }

    await loggingEngine.logInteraction(clientId, {
      type: 'human_transfer',
      channel: 'phone',
      intent: 'human_transfer',
      status: 'transferred',
      outcome: 'Call transferred to a human teammate',
      timestamp: new Date().toISOString(),
    }).catch(() => {});

    log.complete(`/api/${clientId}/transfer`, true);
    return json({ success: true, confirmed: true, message: 'Call transferred' }, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/transfer`, false, { error: error.message });
    return json({ success: false, confirmed: false, message: 'Transfer failed', error: error.message }, 500, ch);
  }
}

async function handleCancel(clientId, body, bookingEngine, loggingEngine, ch, log) {
  const bookingId = sanitizeStr(body.bookingId, 100);
  if (!bookingId) return json({ error: 'bookingId is required' }, 400, ch);

  try {
    const result = await bookingEngine.cancelBooking(clientId, bookingId, sanitizeStr(body.reason, 500));
    log.complete(`/api/${clientId}/cancel`, result.success);
    return json(result, result.success ? 200 : 400, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/cancel`, false, { error: error.message });
    return json({ error: 'Failed to cancel booking', message: error.message }, 500, ch);
  }
}

async function handleReschedule(clientId, body, bookingEngine, loggingEngine, ch, log) {
  const bookingId = sanitizeStr(body.bookingId, 100);
  const dateTime = body.dateTime || '';
  if (!bookingId || !dateTime || isNaN(new Date(dateTime).getTime())) {
    return json({ error: 'bookingId and valid dateTime are required' }, 400, ch);
  }

  try {
    const result = await bookingEngine.rescheduleBooking(clientId, bookingId, new Date(dateTime), sanitizeStr(body.service, 100) || null);
    return json(result, result.success ? 200 : 400, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/reschedule`, false, { error: error.message });
    return json({ error: 'Failed to reschedule booking', message: error.message }, 500, ch);
  }
}

async function handleVapiWebhook(request, env, ch, log) {
  try {
    const clientConfig = new ClientConfigService(env);
    const sheetsService = new GoogleSheetsService(env);
    const loggingEngine = new LoggingEngine(sheetsService, clientConfig);
    const notificationService = new NotificationService(env);
    const vapiService = new VapiService(env, clientConfig, loggingEngine, notificationService);
    const result = await vapiService.handleWebhook(request);
    log.complete('/api/vapi/webhook', result.status < 500);
    return json(result.body, result.status, ch);
  } catch (error) {
    log.complete('/api/vapi/webhook', false, { error: error.message });
    return json({ error: 'Vapi webhook processing failed', message: error.message }, 500, ch);
  }
}

async function handleVapiOutboundCall(request, env, ch, log) {
  try {
    const body = await request.json();
    const { clientId, customerNumber, ...overrides } = body;
    if (!clientId || !customerNumber) {
      return json({ error: 'clientId and customerNumber are required' }, 400, ch);
    }
    const clientConfig = new ClientConfigService(env);
    const sheetsService = new GoogleSheetsService(env);
    const loggingEngine = new LoggingEngine(sheetsService, clientConfig);
    const notificationService = new NotificationService(env);
    const vapiService = new VapiService(env, clientConfig, loggingEngine, notificationService);
    const callResult = await vapiService.triggerOutboundCall(clientId, customerNumber, overrides);
    log.complete('/api/vapi/call', true, { clientId });
    return json({ success: true, callId: callResult.id, message: 'Outbound call initiated' }, 200, ch);
  } catch (error) {
    log.complete('/api/vapi/call', false, { error: error.message });
    return json({ error: 'Failed to initiate outbound call', message: error.message }, 500, ch);
  }
}

/**
 * Forwards an unmatched /api/* request to the Cloudflare Pages deployment,
 * which hosts the Pages Functions (e.g. /api/leads/apps-script). The
 * upstream is the pages.dev host, NOT brandverse.tech — this Worker has a
 * route on brandverse.tech/api/*, so fetching the apex would re-enter this
 * Worker and loop forever. The pages.dev host is not covered by any Worker
 * route, so it resolves straight to Pages Functions and static assets.
 *
 * Upstream override: env.PAGES_UPSTREAM (e.g. https://brandverse.pages.dev).
 */
async function proxyToPages(request, env, ch) {
  const url = new URL(request.url);
  const upstreamBase = env.PAGES_UPSTREAM || 'https://brandverse.pages.dev';
  const targetUrl = new URL(url.pathname + url.search, upstreamBase);

  const headers = new Headers(request.headers);
  headers.delete('host');

  const init = { method: request.method, headers, redirect: 'follow' };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body;
  }

  const upstream = await fetch(targetUrl.toString(), init);

  const responseHeaders = new Headers(upstream.headers);
  // Browser callers need CORS even on upstream error responses.
  if (!responseHeaders.has('Access-Control-Allow-Origin')) {
    for (const [name, value] of Object.entries(ch)) {
      responseHeaders.set(name, value);
    }
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}