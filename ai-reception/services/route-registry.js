// Route Registry - single source of truth for the HTTP API surface.
//
// Both the self-documenting GET /api/ index and GET /api/health consume this
// table, so a new route only needs to be added here and in workers/api.js.
// Keep descriptions accurate - they are served to anyone hitting /api/.

export const API_NAME = 'Brandverse AI Receptionist API';
export const API_VERSION = '1.2.0';

export const API_ROUTES = [
  {
    path: '/api/',
    method: 'GET',
    auth: 'none',
    description: 'Route index (self-documenting, no auth)',
  },
  {
    path: '/api/health',
    method: 'GET',
    auth: 'none',
    description: 'Per-dependency health: clients_config, google_auth, vapi, sheets_webhook, twilio',
  },
  {
    path: '/api/vapi/webhook',
    method: 'POST',
    auth: 'x-vapi-secret header (VAPI_WEBHOOK_SECRET)',
    description: 'Vapi event webhook: assistant-request, status-update, end-of-call-report, function-call',
  },
  {
    path: '/api/vapi/call',
    method: 'POST',
    auth: 'none (server uses VAPI_API_KEY)',
    params: 'clientId, customerNumber (body)',
    description: 'Trigger an outbound call through the Vapi API',
  },
  {
    path: '/api/{clientId}/availability',
    method: 'GET',
    auth: 'none',
    params: 'date, service (query)',
    description: 'Available appointment slots for a date and service',
  },
  {
    path: '/api/{clientId}/book',
    method: 'POST',
    auth: 'X-Tool-Key header (TOOL_API_KEY)',
    params: 'name, phone, service, dateTime; optional email, notes (body)',
    description: 'Create a booking (calendar event) and log it to the client sheet',
  },
  {
    path: '/api/{clientId}/callback',
    method: 'POST',
    auth: 'X-Tool-Key header (TOOL_API_KEY)',
    params: 'name, phone, reason; optional urgency, service, notes (body)',
    description: 'Capture a callback request and notify the team if configured',
  },
  {
    path: '/api/{clientId}/transfer',
    method: 'POST',
    auth: 'X-Tool-Key header (TOOL_API_KEY)',
    params: 'callId (body or query)',
    description: 'Transfer a live call to a human teammate via Vapi',
  },
  {
    path: '/api/{clientId}/cancel',
    method: 'POST',
    auth: 'X-Tool-Key header (TOOL_API_KEY)',
    params: 'bookingId; optional reason (body)',
    description: 'Cancel an appointment',
  },
  {
    path: '/api/{clientId}/reschedule',
    method: 'POST',
    auth: 'X-Tool-Key header (TOOL_API_KEY)',
    params: 'bookingId, dateTime; optional service (body)',
    description: 'Reschedule an appointment',
  },
  {
    path: '/api/{clientId}/log',
    method: 'POST',
    auth: 'none',
    params: 'session/log event fields (body)',
    description: 'Append a session or call log event to the client\'s own Google Sheet',
  },
  {
    path: '/api/{clientId}/client-config',
    method: 'GET',
    auth: 'none',
    description: 'Client configuration feed used by the assistant tools',
  },
  {
    path: '/api/*',
    method: '*',
    auth: 'none',
    description: 'Unmatched paths proxy to Pages Functions (PAGES_UPSTREAM): /api/leads/apps-script, /api/create-order, /api/verify-payment, /api/subscribe, /api/send-push, /api/push-stats, /api/mailchimp/subscribe',
  },
];

const BASE_ROUTES = [
  {
    path: '/health',
    method: 'GET',
    auth: 'none',
    description: 'Worker liveness check',
  },
];

export function buildRouteIndex() {
  const endpoints = API_ROUTES.map(({ path, method, auth, params, description }) => ({
    path,
    method,
    auth,
    params: params || 'none',
    description,
  }));
  const base = BASE_ROUTES.map(({ path, method, auth, description }) => ({
    path,
    method,
    auth,
    params: 'none',
    description,
  }));

  return {
    name: API_NAME,
    version: API_VERSION,
    timestamp: new Date().toISOString(),
    base,
    endpoints,
  };
}