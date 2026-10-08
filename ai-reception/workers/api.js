import { GoogleCalendarService } from '../services/calendar.js';
import { GoogleSheetsService } from '../services/sheets.js';
import { ClientConfigService } from '../services/client-config.js';
import { AvailabilityEngine } from '../services/availability.js';
import { BookingEngine } from '../services/booking.js';
import { LoggingEngine } from '../services/logging.js';
import { VapiService } from '../services/vapi.js';
import { NotificationService } from '../services/notify.js';
import { GoogleOAuthService } from '../services/google-oauth.js';
import { OAuthStorage } from '../services/oauth-storage.js';
import { createLogger } from '../services/logger.js';
import { RateLimiter, validateBookingInput, validateLogInput, sanitizeStr } from '../services/validate.js';
import { verifyClientToken, verifyVapiSignature, signClientToken } from '../services/security.js';

const rateLimiter = new RateLimiter();

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const allowed = new Set([
    env.APP_BASE_URL,
    'https://brandverse.tech',
    'https://www.brandverse.tech',
    'https://edge.brandverse.tech',
    'https://brandverse.pages.dev',
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
          status: 'healthy', timestamp: new Date().toISOString(), version: '1.1.1',
        }, 200, ch);
      }

      if (path === '/api/vapi/webhook' && method === 'POST') {
        return await handleVapiWebhook(request, env, ch, log);
      }

      if (path === '/api/vapi/call' && method === 'POST') {
        return await handleVapiOutboundCall(request, env, ch, log);
      }

      // OAuth endpoints (no client ID required for auth flow)
      if (path === '/api/auth/google' && method === 'POST') {
        return await handleGoogleAuth(request, env, ch, log);
      }

      if (path === '/api/auth/google/callback' && method === 'GET') {
        return await handleGoogleCallback(request, env, ch, log);
      }

      // Dashboard session endpoint
      if (path === '/api/dashboard/session' && method === 'POST') {
        return await handleDashboardSession(request, env, ch, log);
      }

      if (!clientId) return json({ error: 'Client ID required' }, 400, ch);

      // Dashboard OAuth routes use the D1-backed dashboard session, not the
      // Vapi HMAC token used by call/booking endpoints.
      if (path === `/api/${clientId}/oauth/status` && method === 'GET') {
        return await handleOAuthStatus(clientId, request, env, ch, log.child(clientId));
      }

      if (path === `/api/${clientId}/oauth/calendars` && method === 'GET') {
        return await handleOAuthCalendars(clientId, request, env, ch, log.child(clientId));
      }

      if (path === `/api/${clientId}/oauth/select-calendar` && method === 'POST') {
        return await handleSelectCalendar(clientId, await request.json(), request, env, ch, log.child(clientId));
      }

      if (path === `/api/${clientId}/oauth/disconnect` && method === 'POST') {
        return await handleOAuthDisconnect(clientId, request, env, ch, log.child(clientId));
      }

      // Every /api/{clientId}/* route is protected by a short-lived HMAC
      // token that the worker embeds in the Vapi assistant tool URLs.
      const token = url.searchParams.get('token') || '';
      if (!env.WORKER_HMAC_SECRET) {
        log.child(clientId).warn('security_not_configured', { path });
        return json({ error: 'Security not configured (WORKER_HMAC_SECRET required)' }, 503, ch);
      }
      const tokenOk = await verifyClientToken(env, clientId, token);
      if (!tokenOk) {
        log.warn('unauthorized', { path, method, clientId });
        return json({ error: 'Unauthorized' }, 403, ch);
      }

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
        return await handleBooking(clientId, await request.json(), bookingEngine, loggingEngine, notificationService, ch, clientLog);
      }

      if (path === `/api/${clientId}/log` && method === 'POST') {
        return await handleLog(clientId, await request.json(), loggingEngine, ch, clientLog);
      }

      if (path === `/api/${clientId}/client-config` && method === 'GET') {
        return await handleClientConfig(clientId, clientConfig, ch, clientLog);
      }

      clientLog.warn('route_not_found', { path, method });
      return json({ error: 'Endpoint not found' }, 404, ch);

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

async function handleVapiWebhook(request, env, ch, log) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature') || '';
    const verification = await verifyVapiSignature(env, rawBody, signature);

    if (verification !== 'ok') {
      log.warn('vapi_webhook_rejected', { reason: verification });
      if (verification === 'missing_secret') {
        return json(
          { error: 'VAPI_WEBHOOK_SECRET is not configured. Set it on this Worker and mirror it in the Vapi dashboard before enabling webhooks.' },
          503,
          ch
        );
      }
      return json({ error: 'Invalid webhook signature' }, 401, ch);
    }

    const clientConfig = new ClientConfigService(env);
    const sheetsService = new GoogleSheetsService(env);
    const loggingEngine = new LoggingEngine(sheetsService, clientConfig);
    const notificationService = new NotificationService(env);
    const vapiService = new VapiService(env, clientConfig, loggingEngine, notificationService);
    const result = await vapiService.handleWebhookBody(rawBody);
    log.complete('/api/vapi/webhook', result.status < 500);
    return json(result.body, result.status, ch);
  } catch (error) {
    log.complete('/api/vapi/webhook', false, { error: error.message });
    return json({ error: 'Vapi webhook processing failed', message: error.message }, 500, ch);
  }
}

async function handleVapiOutboundCall(request, env, ch, log) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token') || '';
    if (!env.WORKER_HMAC_SECRET) {
      return json({ error: 'Security not configured (WORKER_HMAC_SECRET required)' }, 503, ch);
    }
    const body = await request.json();
    const { clientId, customerNumber, ...overrides } = body;
    if (!clientId || !customerNumber) {
      return json({ error: 'clientId and customerNumber are required' }, 400, ch);
    }
    const tokenOk = await verifyClientToken(env, clientId, token);
    if (!tokenOk) {
      log.warn('unauthorized', { path: '/api/vapi/call', clientId });
      return json({ error: 'Unauthorized' }, 403, ch);
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

async function handleGoogleAuth(request, env, ch, log) {
  try {
    const body = await request.json();
    const { clientId, sessionToken } = body;

    if (!clientId || !sessionToken) {
      return json({ error: 'clientId and sessionToken are required' }, 400, ch);
    }

    const oauthService = new GoogleOAuthService(env);
    const redirectUri = env.GOOGLE_OAUTH_REDIRECT_URI || `${env.APP_BASE_URL}/api/auth/google/callback`;

    const { authUrl } = await oauthService.getAuthorizationUrl(clientId, sessionToken, redirectUri);

    log.complete('/api/auth/google', true, { clientId });
    return json({ authUrl }, 200, ch);
  } catch (error) {
    log.complete('/api/auth/google', false, { error: error.message });
    return json({ error: 'Failed to generate OAuth URL', message: error.message }, 500, ch);
  }
}

async function handleGoogleCallback(request, env, ch, log) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code || !state) {
      return json({ error: 'code and state are required' }, 400, ch);
    }

    const oauthService = new GoogleOAuthService(env);
    const result = await oauthService.handleCallback(code, state);

    log.complete('/api/auth/google/callback', true, { clientId: result.clientId });

    // Redirect to dashboard with success
    const dashboardBase = env.APP_DASHBOARD_URL || 'https://brandverse.pages.dev';
    const dashboardUrl = `${dashboardBase}/dashboard?oauth=success&email=${encodeURIComponent(result.googleAccountEmail)}`;
    return Response.redirect(dashboardUrl, 302);
  } catch (error) {
    log.complete('/api/auth/google/callback', false, { error: error.message });
    // Redirect to dashboard with error
    const dashboardBase = env.APP_DASHBOARD_URL || 'https://brandverse.pages.dev';
    const dashboardUrl = `${dashboardBase}/dashboard?oauth=error&message=${encodeURIComponent(error.message)}`;
    return Response.redirect(dashboardUrl, 302);
  }
}

async function handleDashboardSession(request, env, ch, log) {
  try {
    const body = await request.json();
    const { clientId } = body;

    if (!clientId) {
      return json({ error: 'clientId is required' }, 400, ch);
    }

    const oauthStorage = new OAuthStorage(env);
    const { sessionToken, expiresAt } = await oauthStorage.createDashboardSession(clientId);

    log.complete('/api/dashboard/session', true, { clientId });
    return json({ sessionToken, expiresAt }, 200, ch);
  } catch (error) {
    log.complete('/api/dashboard/session', false, { error: error.message });
    return json({ error: 'Failed to create session', message: error.message }, 500, ch);
  }
}

async function validateDashboardSession(request, env, expectedClientId) {
  const url = new URL(request.url);
  const sessionToken = url.searchParams.get('session_token') || request.headers.get('X-Session-Token');
  
  if (!sessionToken) {
    return { valid: false, reason: 'missing_token' };
  }

  const oauthStorage = new OAuthStorage(env);
  const validation = await oauthStorage.validateDashboardSession(sessionToken);

  if (!validation.valid) {
    return { valid: false, reason: validation.reason };
  }

  // Verify the session's client_id matches the requested client_id
  if (validation.clientId !== expectedClientId) {
    return { valid: false, reason: 'client_mismatch' };
  }

  return { valid: true };
}

async function handleOAuthStatus(clientId, request, env, ch, log) {
  try {
    const sessionValidation = await validateDashboardSession(request, env, clientId);
    if (!sessionValidation.valid) {
      log.warn(`oauth_status_unauthorized`, { clientId, reason: sessionValidation.reason });
      return json({ error: 'Unauthorized', reason: sessionValidation.reason }, 403, ch);
    }

    const oauthService = new GoogleOAuthService(env);
    const status = await oauthService.getConnectionStatus(clientId);

    log.complete(`/api/${clientId}/oauth/status`, true);
    return json(status, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/oauth/status`, false, { error: error.message });
    return json({ error: 'Failed to get OAuth status', message: error.message }, 500, ch);
  }
}

async function handleOAuthCalendars(clientId, request, env, ch, log) {
  try {
    const sessionValidation = await validateDashboardSession(request, env, clientId);
    if (!sessionValidation.valid) {
      log.warn(`oauth_calendars_unauthorized`, { clientId, reason: sessionValidation.reason });
      return json({ error: 'Unauthorized', reason: sessionValidation.reason }, 403, ch);
    }

    const oauthService = new GoogleOAuthService(env);
    const calendars = await oauthService.getCalendars(clientId);

    log.complete(`/api/${clientId}/oauth/calendars`, true);
    return json({ calendars }, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/oauth/calendars`, false, { error: error.message });
    return json({ error: 'Failed to fetch calendars', message: error.message }, 500, ch);
  }
}

async function handleSelectCalendar(clientId, body, request, env, ch, log) {
  try {
    const sessionValidation = await validateDashboardSession(request, env, clientId);
    if (!sessionValidation.valid) {
      log.warn(`oauth_select_calendar_unauthorized`, { clientId, reason: sessionValidation.reason });
      return json({ error: 'Unauthorized', reason: sessionValidation.reason }, 403, ch);
    }

    const { calendarId } = body;

    if (!calendarId) {
      return json({ error: 'calendarId is required' }, 400, ch);
    }

    const oauthStorage = new OAuthStorage(env);
    await oauthStorage.updateCalendarId(clientId, calendarId);

    log.complete(`/api/${clientId}/oauth/select-calendar`, true, { calendarId });
    return json({ success: true, calendarId }, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/oauth/select-calendar`, false, { error: error.message });
    return json({ error: 'Failed to select calendar', message: error.message }, 500, ch);
  }
}

async function handleOAuthDisconnect(clientId, request, env, ch, log) {
  try {
    const sessionValidation = await validateDashboardSession(request, env, clientId);
    if (!sessionValidation.valid) {
      log.warn(`oauth_disconnect_unauthorized`, { clientId, reason: sessionValidation.reason });
      return json({ error: 'Unauthorized', reason: sessionValidation.reason }, 403, ch);
    }

    const oauthService = new GoogleOAuthService(env);
    await oauthService.disconnect(clientId);

    log.complete(`/api/${clientId}/oauth/disconnect`, true);
    return json({ success: true, message: 'Google Calendar disconnected' }, 200, ch);
  } catch (error) {
    log.complete(`/api/${clientId}/oauth/disconnect`, false, { error: error.message });
    return json({ error: 'Failed to disconnect', message: error.message }, 500, ch);
  }
}