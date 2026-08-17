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
import { API_VERSION, buildRouteIndex } from '../services/route-registry.js';
import { SheetLogWriter, ClientSheetWriter, probeWebhook } from '../services/sheet-logger.js';
import { GoogleAuth } from '../services/google-auth.js';

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
          status: 'healthy', timestamp: new Date().toISOString(), version: API_VERSION,
        }, 200, ch);
      }

      // Self-documenting /api/ index - intentionally no auth and no clientId.
      if (path === '/api' || path === '/api/') {
        if (method === 'GET') {
          log.info('api_index');
          return json(buildRouteIndex(), 200, ch);
        }
        return json({ error: 'Method not allowed' }, 405, { ...ch, 'Allow': 'GET' });
      }

      // Dependency health for the API layer - no auth. Reuses the route
      // registry from the /api/ index above.
      if (path === '/api/health' && method === 'GET') {
        return await handleApiHealth(request, env, ch, log);
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
      const sheetLogWriter = new SheetLogWriter(clientConfig, env);
      const clientSheetWriter = new ClientSheetWriter(clientConfig, sheetsService, sheetLogWriter);
      const availabilityEngine = new AvailabilityEngine(calendarService, clientConfig);
      const bookingEngine = new BookingEngine(calendarService, sheetsService, null, clientConfig, clientSheetWriter);
      const loggingEngine = new LoggingEngine(sheetsService, clientConfig, clientSheetWriter);
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
    const sheetLogWriter = new SheetLogWriter(clientConfig, env);
    const clientSheetWriter = new ClientSheetWriter(clientConfig, sheetsService, sheetLogWriter);
    const loggingEngine = new LoggingEngine(sheetsService, clientConfig, clientSheetWriter);
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
    const sheetLogWriter = new SheetLogWriter(clientConfig, env);
    const clientSheetWriter = new ClientSheetWriter(clientConfig, sheetsService, sheetLogWriter);
    const loggingEngine = new LoggingEngine(sheetsService, clientConfig, clientSheetWriter);
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

// ---------------------------------------------------------------------------
// Dependency health: verifies the actual things the API layer relies on,
// one status per dependency. Statuses: "ok" | "down" | "not_configured".
// Any "down" dependency flips the overall status to "degraded" + HTTP 503.
// The response embeds the /api/ route index (single source of truth from
// services/route-registry.js) so this endpoint never drifts from /api/.
// ---------------------------------------------------------------------------
async function handleApiHealth(request, env, ch, log) {
  const started = Date.now();
  const clientConfigService = new ClientConfigService(env);

  const [clientsConfig, googleAuth, vapi, sheetsWebhook, twilio] = await Promise.all([
    checkClientsConfig(clientConfigService),
    checkGoogleAuth(env),
    checkVapi(env),
    checkSheetsWebhooks(clientConfigService),
    checkTwilio(env),
  ]);

  const dependencies = {
    clients_config: clientsConfig,
    google_auth: googleAuth,
    vapi,
    sheets_webhook: sheetsWebhook,
    twilio,
  };

  const down = Object.values(dependencies).filter(d => d.status === 'down');
  const status = down.length ? 'degraded' : 'ok';
  const durationMs = Date.now() - started;

  log.info('api_health', {
    status,
    durationMs,
    deps: Object.fromEntries(Object.entries(dependencies).map(([k, v]) => [k, v.status])),
  });

  const body = {
    status,
    timestamp: new Date().toISOString(),
    version: API_VERSION,
    durationMs,
    dependencies,
    routes: buildRouteIndex().endpoints,
  };
  return json(body, down.length ? 503 : 200, ch);
}

async function checkClientsConfig(clientConfigService) {
  try {
    const clients = await clientConfigService.getAllClients();
    const withWebhook = clients.filter(c => c.sheet_webhook_url).length;
    return {
      status: 'ok',
      detail: `${clients.length} client(s) loaded, ${withWebhook} with a sheet webhook configured`,
    };
  } catch (error) {
    return { status: 'down', detail: `config load failed: ${error.message}` };
  }
}

async function checkGoogleAuth(env) {
  if (!env.GOOGLE_CLIENT_EMAIL || !env.GOOGLE_PRIVATE_KEY) {
    return { status: 'not_configured', detail: 'GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY not set (service-account path inactive)' };
  }
  try {
    const auth = new GoogleAuth(env);
    const token = await auth.getAccessToken('https://www.googleapis.com/auth/spreadsheets');
    return { status: token ? 'ok' : 'down', detail: 'service-account token acquired' };
  } catch (error) {
    return { status: 'down', detail: `token fetch failed: ${error.message}` };
  }
}

async function checkVapi(env) {
  try {
    if (env.VAPI_API_KEY) {
      const resp = await fetch('https://api.vapi.ai/call?limit=1', {
        headers: { Authorization: `Bearer ${env.VAPI_API_KEY}` },
        signal: AbortSignal.timeout(5000),
      });
      if (resp.status === 401 || resp.status === 403) {
        return { status: 'down', detail: `Vapi rejected the API key (http ${resp.status})` };
      }
      if (!resp.ok) return { status: 'down', detail: `Vapi API error (http ${resp.status})` };
      return { status: 'ok', detail: 'Vapi API reachable, key accepted' };
    }
    const resp = await fetch('https://api.vapi.ai/', { signal: AbortSignal.timeout(5000) });
    return { status: 'ok', detail: `Vapi reachable (http ${resp.status}, no VAPI_API_KEY set)` };
  } catch (error) {
    return { status: 'down', detail: `Vapi unreachable: ${error.message}` };
  }
}

async function checkSheetsWebhooks(clientConfigService) {
  let clients;
  try {
    clients = await clientConfigService.getAllClients();
  } catch (error) {
    return { status: 'down', detail: `client config load failed: ${error.message}` };
  }
  const webhooks = [...new Set(clients.filter(c => c.sheet_webhook_url).map(c => c.sheet_webhook_url))];
  if (!webhooks.length) {
    return { status: 'not_configured', detail: 'no client has sheet_webhook_url set' };
  }

  const results = await Promise.all(webhooks.map(url => probeWebhook(url)));
  const failed = results.filter(r => !r.reachable);
  const verified = results.filter(r => r.verified).length;
  if (failed.length) {
    return {
      status: 'down',
      detail: `${failed.length}/${results.length} webhook(s) unreachable; ${verified}/${results.length} verified`,
      webhooks: results.map(r => ({
        url: r.url,
        reachable: r.reachable,
        verified: r.verified,
        status: r.status || 0,
        ms: r.ms,
        error: r.error || null,
      })),
    };
  }
  return {
    status: 'ok',
    detail: `${results.length} webhook(s) reachable, ${verified} verified via doGet`,
    webhooks: results.map(r => ({ url: r.url, verified: r.verified, status: r.status, ms: r.ms })),
  };
}

async function checkTwilio(env) {
  if (!env.TWILIO_ACCOUNT_SID && !env.TWILIO_AUTH_TOKEN) {
    return { status: 'not_configured', detail: 'no TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN (Vapi owns the phone numbers)' };
  }
  try {
    const resp = await fetch('https://api.twilio.com/', { signal: AbortSignal.timeout(5000) });
    return { status: 'ok', detail: `Twilio reachable (http ${resp.status})` };
  } catch (error) {
    return { status: 'down', detail: `Twilio unreachable: ${error.message}` };
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