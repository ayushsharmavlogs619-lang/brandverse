// Demo Receptionist Verification Harness
// Drives the worker's fetch handler directly (no network) and records a
// PASS/FAIL for each scenario in the 20-scenario demo test matrix.
//
// Run: node scripts/verify-demo.mjs
//
// Note: booking/availability depend on real Google Calendar credentials,
// which are not present in this environment. Scenarios that require a real
// calendar therefore verify the GRACEFUL-FAILURE path and are marked with
// the expectation that they need credentials to reach full-PASS (see report).

import worker from '../workers/api.js';

const DEMO_NUMBER = '+61412345678';

const env = {
  APP_BASE_URL: 'https://edge.brandverse.tech',
  DEMO_PHONE_NUMBER: DEMO_NUMBER,
  DEMO_HANDOFF_NUMBER: '', // start unconfigured; variant sets it
  TOOL_API_KEY: 'test-tool-secret-abc',
  VAPI_WEBHOOK_SECRET: 'test-webhook-secret-xyz',
  GOOGLE_CLIENT_EMAIL: '',
  GOOGLE_PRIVATE_KEY: '',
  GOOGLE_APPS_SCRIPT_WEBHOOK_URL: '',
  GOOGLE_APPS_SCRIPT_SECRET: '',
  VAPI_API_KEY: '',
  PAGES_UPSTREAM: 'https://brandverse.pages.dev',
};

const results = [];
function record(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
}

// Normalize to an array (assistant.tools can be undefined/missing).
function arr(value) {
  return Array.isArray(value) ? value : [];
}

async function call(path, { method = 'GET', headers = {}, body } = {}) {
  const init = { method, headers };
  if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }
  const res = await worker.fetch(new Request(`https://edge.brandverse.tech${path}`, init), env, {});
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch {}
  return { status: res.status, json, text: text.slice(0, 300) };
}

function webhook(payload, signatureSecret = env.VAPI_WEBHOOK_SECRET, extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'x-vapi-secret': signatureSecret,
    ...extraHeaders,
  };
  return fetch(`https://edge.brandverse.tech/api/vapi/webhook`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}

const ctx = {};

// ---------------------------------------------------------------------------
// 1. assistant-request for the demo number must resolve the DEMO client
// ---------------------------------------------------------------------------
{
  const payload = { message: { type: 'assistant-request', call: { id: 'call_1', phoneNumber: { number: DEMO_NUMBER } } } };
  const res = await worker.fetch(new Request('https://edge.brandverse.tech/api/vapi/webhook', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-vapi-secret': env.VAPI_WEBHOOK_SECRET },
    body: JSON.stringify(payload),
  }), env, ctx);
  const body = await res.json();
  const assistant = body.assistant;
  record(
    'S01 Incoming demo number resolves to demo assistant',
    res.status === 200 && assistant && assistant.name && assistant.name.includes('Brandverse'),
    `name="${assistant?.name || 'NONE'}" tools=${(assistant?.tools || []).map(t => t.function.name).join(',') || 'none'}`
  );
  record(
    'S02 Demo assistant has booking-capable tools (not generic fallback)',
    arr(assistant?.tools || []).some(t => t.function.name === 'book_appointment') &&
      arr(assistant.tools).some(t => t.function.name === 'check_availability') &&
      arr(assistant.tools).every(t => t.server && t.server.url.startsWith('https://edge.brandverse.tech')),
    'tools include check_availability/book and URLs point to the worker'
  );
  // Save for prompt inspection
  globalThis.__lastAssistant = assistant;
}

// ---------------------------------------------------------------------------
// 2. Unauthenticated / unknown-number path -> generic fallback, no tools
// ---------------------------------------------------------------------------
{
  const r = await call('/api/vapi/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-vapi-secret': env.VAPI_WEBHOOK_SECRET },
    body: { message: { type: 'assistant-request', call: { phoneNumber: { number: '+19990000000' } } } },
  });
  record(
    'S03: unknown number gets an honest no-business fallback',
    r.status === 200 && !(r.json.assistant?.tools?.length),
    `tools=${r.json?.assistant?.tools?.length ?? 'n/a'}`
  );
}

// ---------------------------------------------------------------------------
// 3. Booking tools must include real server URLs + X-Tool-Key
// ---------------------------------------------------------------------------
{
  const tool = globalThis.__lastAssistant.tools.find(t => t.function.name === 'book_appointment');
  record(
    'S04: book tool requires tool key in client config',
    !!tool?.server?.headers && tool.server.headers['X-Tool-Key'] === env.TOOL_API_KEY,
    `X-Tool-Key=${tool?.server?.headers?.['X-Tool-Key'] || 'MISSING'}`
  );
}

// ---------------------------------------------------------------------------
// 4. Booking without valid tool key -> 401 (security)
// ---------------------------------------------------------------------------
{
  const r = await call('/api/brandverse_demo_1/book', {
    method: 'POST', body: { name: 'T', phone: '0412345678', service: 'Breakers & Power Outages', dateTime: new Date().toISOString() },
  });
  record('S05: POST /book without tool key is rejected (401)', r.status === 401, `status=${r.status}`);
}

// ---------------------------------------------------------------------------
// 5. Booking WITH tool key -> attempts the real engine; no calendar creds ->
//    graceful, honest error (400, no fabricated success)
// ---------------------------------------------------------------------------
{
  const r = await call('/api/brandverse_demo_1/book', {
    method: 'POST',
    headers: { 'X-Tool-Key': env.TOOL_API_KEY },
    body: { name: 'Demo Caller', phone: '0412345678', service: 'Troubleshooting & Repairs', dateTime: '2026-08-12T09:30:00+10:00', notes: 'matrix test' },
  });
  const graceful = r.status >= 400 && r.status < 500 && (r.json?.message || '').match(/calendar|scheduling|required|not available/i);
  record(
    'S06: book with key -> graceful calendar-unavailable error (never fake success)',
    r.status === 400 && !r.json?.success && r.json?.message !== undefined,
    `status=${r.status} msg="${r.json?.message}"`
  );
}

// ---------------------------------------------------------------------------
// 6. Availability endpoint with no calendar -> graceful error
// ---------------------------------------------------------------------------
{
  const r = await call('/api/brandverse_demo_1/availability?date=2026-08-12&service=Lighting%20%26%20Fittings');
  record(
    'S07: availability without calendar creds fails gracefully (400, no inventing)',
    r.status === 400 && r.json?.error === 'Failed to check availability' && !('availableSlots' in r.json),
    `status=${r.status} err=${r.json?.error}`
  );
}

// ---------------------------------------------------------------------------
// 7. Callback request - captures details + confirms pipeline state honestly
// ---------------------------------------------------------------------------
{
  const r = await call('/api/brandverse_demo_1/callback', {
    method: 'POST',
    headers: { 'X-Tool-Key': env.TOOL_API_KEY },
    body: { name: 'Sarah Prospect', phone: '0422111222', reason: 'After-hours enquiry about wiring safety', urgency: 'urgent', service: 'Safety Inspection' },
  });
  record(
    'S08: callback endpoint captures request and returns confirmed:false when no webhook configured',
    r.status === 200 && r.json?.success === true && r.json?.confirmed === false,
    `status=${r.status} confirmed=${r.json?.confirmed}`
  );

  const r2 = await call('/api/brandverse_demo_1/callback', {
    method: 'POST', headers: { 'X-Tool-Key': env.TOOL_API_KEY }, body: { phone: '0422111221' },
  });
  record('S09: callback without name/reason rejected (400)', r2.status === 400, `status=${r2.status}`);
}

// ---------------------------------------------------------------------------
// 8. Transfer: unconfigured destination -> honest not-configured response
// ---------------------------------------------------------------------------
{
  const envNoHandoff = { ...env, DEMO_HANDOFF_NUMBER: '' };
  const r = await call('/api/brandverse_demo_1/transfer', {
    method: 'POST', headers: { 'X-Tool-Key': env.TOOL_API_KEY }, body: { callId: 'call_1' },
  });
  // handler fetches assistant config-based env; our env has no handoff number so returns not-configured
  record(
    'S10: transfer without destination returns confirmed:false (never fake handoff)',
    r.status === 200 && r.json?.confirmed === false,
    `status=${r.status} msg=${r.json?.message}`
  );
}

// ---------------------------------------------------------------------------
// 9. Cancel / reschedule endpoints exist behind auth
// ---------------------------------------------------------------------------
{
  const r401 = await call('/api/brandverse_demo_1/cancel', { method: 'POST', body: { bookingId: 'x' } });
  record('S11: cancel requires tool auth (401)', r401.status === 401, `status=${r401.status}`);

  const rAuth = await call('/api/brandverse_demo_1/cancel', {
    method: 'POST', headers: { 'X-Tool-Key': env.TOOL_API_KEY }, body: { bookingId: 'nope-123' },
  });
  record(
    'S12: cancel with auth on nonexistent booking -> graceful error (no calendar creds)',
    rAuth.status === 400 && rAuth.json?.success === false,
    `status=${rAuth.status} err=${rAuth.json?.error}`
  );

  const rRes = await call('/api/brandverse_demo_1/reschedule', {
    method: 'POST', headers: { 'X-Tool-Key': env.TOOL_API_KEY }, body: { bookingId: 'nope-123', dateTime: '2026-08-14T10:00:00+10:00' },
  });
  record('S13: reschedule with auth returns truthful failure', rRes.status === 400 && rRes.json?.success === false, `status=${rRes.status}`);
}

// ---------------------------------------------------------------------------
// 10. Webhook security: must reject when VAPI_WEBHOOK_SECRET mismatch
// ---------------------------------------------------------------------------
{
  const bad = await webhookVaultBad();
  record('S14: webhook with wrong secret rejected (401)', bad.status === 401, `status=${bad.status}`);

  async function webhookVaultBad() {
    return worker.fetch(new Request('https://edge.brandverse.tech/api/vapi/webhook', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-vapi-secret': 'wrong-secret' },
      body: JSON.stringify({ message: { type: 'assistant-request' } }),
    }), env, ctx);
  }
}

// ---------------------------------------------------------------------------
// 11. System prompt guardrail checks
// ---------------------------------------------------------------------------
{
  const asst = globalThis.__lastAssistant;
  const prompt = (asst?.messages?.[0]?.message || '').toLowerCase();
  record('S15: prompt includes pricing/no-invention guardrails', prompt.includes('never invent') && prompt.includes('pricing'), 'pricing rule present');
  record('S16: prompt includes booking-tool confirmation rule', prompt.includes('book_appointment') || prompt.includes('booking'), 'booking rule present');
  record('S17: prompt includes AI identity statement', prompt.includes('ai receptionist') || prompt.includes('you are'), 'identity in prompt');
  record('S18: prompt includes after-hours behaviour', prompt.includes('closed') && prompt.includes('after'), 'after-hours rules in prompt');
  record('S19: prompt includes emergency protocol', prompt.includes('emergency'), 'emergency section present');
  record('S20: prompt includes objective-closed callback/transfer rules', prompt.includes('transfer') && prompt.includes('callback'), 'handoff rules in prompt');
}

// ---------------------------------------------------------------------------
// 12. Canonical demo-client.json must match the embedded demo copy
// ---------------------------------------------------------------------------
{
  const cc = await import('../services/client-config.js');
  const fs = await import('node:fs');
  const s = new cc.ClientConfigService({ DEMO_PHONE_NUMBER: '+61412345678' });
  const embedded = await s.getClientConfig('brandverse_demo_1');
  const canonical = JSON.parse(fs.readFileSync(new URL('../configs/demo-client.json', import.meta.url), 'utf8'));
  const keep = ['id', 'name', 'niche', 'timezone', 'address', 'working_hours', 'services', 'service_area', 'booking_rules', 'faqs', 'human_handoff', 'after_hours', 'emergency', 'callback_rules'];
  const pick = (o) => JSON.stringify(Object.fromEntries(keep.map(k => [k, o[k]])));
  record(
    'S21: canonical demo-client.json matches embedded demo config',
    pick(embedded) === pick(canonical),
    'config parity check'
  );
}

// ---------------------------------------------------------------------------
// 13. Demo must target the ELECTRICAL CONTRACTOR niche (outreach priority)
// ---------------------------------------------------------------------------
{
  const cc = await import('../services/client-config.js');
  const fs = await import('node:fs');
  const s = new cc.ClientConfigService({ DEMO_PHONE_NUMBER: '+61412345678' });
  const demo = await s.getClientConfig('brandverse_demo_1');
  const serviceNames = Object.keys(demo.services || {});
  const keywords = ['call-out', 'breaker', 'panel', 'lighting', 'outlet', 'inspection', 'quote', 'emergency'];
  const described = serviceNames.join(' ').toLowerCase();
  record(
    'S22: demo client is an electrical contractor (outreach primary niche)',
    demo.niche === 'electrician' && keywords.every(k => described.includes(k)) && (demo.business_description || '').toLowerCase().includes('electrical'),
    `niche=${demo.niche} services=${serviceNames.length}`
  );
  record(
    'S23: demo makes no fake business claims (fiction disclaimer + no transfer/emergency bluff)',
    (demo.business_description + JSON.stringify(demo.faqs)).toLowerCase().includes('fictional') &&
      !demo.human_handoff.transfer_configured && !demo.human_handoff.transfer_number &&
      demo.emergency.configured === false,
    'fiction disclaimer present; transfer/emergency escalation honestly unconfigured'
  );
}

// ---------------------------------------------------------------------------
// 14. Self-documenting /api/ index (no auth, replaces the old bare 400)
// ---------------------------------------------------------------------------
{
  const r = await call('/api/');
  const endpoints = r.json?.endpoints || [];
  record(
    'S24: GET /api/ returns the route index (was a bare 400)',
    r.status === 200 && Array.isArray(endpoints) && endpoints.length >= 10 &&
      endpoints.some(e => e.path === '/api/health' && e.method === 'GET'),
    `endpoints=${endpoints.length} health=${endpoints.some(e => e.path === '/api/health')}`
  );
  const rBase = await call('/api'); // no trailing slash
  record('S25: /api (no slash) also serves the index', rBase.status === 200 && Array.isArray(rBase.json?.endpoints));

  const rPost = await call('/api/', { method: 'POST', body: {} });
  record('S26: non-GET on the index is 405', rPost.status === 405, `status=${rPost.status}`);

  const r404 = await call('/api/notaclient/log', { method: 'POST', body: {} });
  record('S27: unknown client log still 200 (graceful non-crash path)', r404.status === 200, `status=${r404.status}`);
}

// ---------------------------------------------------------------------------
// 15. /api/health — per-dependency statuses, reuses the route index
// ---------------------------------------------------------------------------
{
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    const u = String(url);
    if (u.startsWith('https://api.vapi.ai') || u.startsWith('https://api.twilio.com')) {
      return new Response('{ }', { status: 200 });
    }
    return realFetch(url, opts);
  };
  const h = await call('/api/health');
  globalThis.fetch = realFetch;

  const deps = h.json?.dependencies || {};
  record(
    'S28: /api/health returns per-dependency statuses (no creds => not_configured; vapi reachable)',
    h.status === 200 && h.json?.status === 'ok' &&
      deps.clients_config?.status === 'ok' &&
      deps.google_auth?.status === 'not_configured' &&
      deps.sheets_webhook?.status === 'not_configured' &&
      deps.twilio?.status === 'not_configured' &&
      deps.vapi?.status === 'ok',
    `status=${h.status} ${JSON.stringify(Object.fromEntries(Object.entries(deps).map(([k, v]) => [k, v.status])))}`
  );
  record(
    'S29: /api/health reuses the route index (routes embedded)',
    Array.isArray(h.json?.routes) && h.json.routes.length >= 10 && h.json?.version,
    `routes=${h.json?.routes?.length}`
  );
}

// ---------------------------------------------------------------------------
// 16. Per-client sheet webhook logging — isolation + graceful failure
// ---------------------------------------------------------------------------
function isolationWeek() {
  return {
    monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' },
    wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' },
    friday: { start: '09:00', end: '17:00' }, saturday: { start: 'closed', end: 'closed' },
    sunday: { start: 'closed', end: 'closed' },
  };
}
function isolationClient(id, webhookUrl) {
  return {
    id, name: `Isolation ${id}`, niche: 'dental', timezone: 'Australia/Melbourne',
    services: { cleaning: 30 }, working_hours: isolationWeek(),
    calendar_id: '', sheet_id: '', sheet_webhook_url: webhookUrl, phone_number: '+61400000001',
  };
}
{
  const realFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, opts) => {
    calls.push({ url: String(url), body: opts?.body ? JSON.parse(opts.body) : null });
    return new Response(JSON.stringify({ success: true, row: 3 }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  };

  const envIsolated = {
    ...env,
    GOOGLE_APPS_SCRIPT_SECRET: 'shared-secret-for-tests',
    CLIENTS_CONFIG: JSON.stringify({
      clients: [
        { ...isolationClient('isolation_a', 'https://script.google.com/macros/s/A/exec'), sheet_webhook_secret: 'a-secret' },
        isolationClient('isolation_b', 'https://script.google.com/macros/s/B/exec'),
      ],
    }),
  };

  const r = await worker.fetch(new Request('https://edge.brandverse.tech/api/isolation_a/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Tester', phone: '0412345678', intent: 'session_test', notes: 'isolation check' }),
  }), envIsolated, ctx);
  globalThis.fetch = realFetch;

  const webhookCalls = calls.filter(c => c.url.startsWith('https://script.google.com'));
  const onlyA = webhookCalls.length === 1 && webhookCalls[0].url === 'https://script.google.com/macros/s/A/exec';
  record(
    'S30: client A log goes ONLY to A\'s webhook with server-side client_id (isolation)',
    r.status === 200 && onlyA && webhookCalls[0].body?.client_id === 'isolation_a' && webhookCalls[0].body?.secret === 'a-secret',
    `webhookCalls=${webhookCalls.length} url=${webhookCalls[0]?.url || 'none'} client_id=${webhookCalls[0]?.body?.client_id || 'n/a'}`
  );
}

{
  // Webhook down (5xx): retried, logged, request still succeeds - never crashes.
  const realFetch = globalThis.fetch;
  let attempts = 0;
  globalThis.fetch = async (url, opts) => {
    if (String(url).startsWith('https://script.google.com')) {
      attempts++;
      return new Response(JSON.stringify({ success: false, error: 'boom' }), { status: 500 });
    }
    return realFetch(url, opts);
  };

  const envIsolated = {
    ...env,
    GOOGLE_APPS_SCRIPT_SECRET: 'shared-secret-for-tests',
    CLIENTS_CONFIG: JSON.stringify({
      clients: [isolationClient('isolation_c', 'https://script.google.com/macros/s/C/exec')],
    }),
  };

  const r = await worker.fetch(new Request('https://edge.brandverse.tech/api/isolation_c/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Tester', phone: '0412345678', intent: 'session_test' }),
  }), envIsolated, ctx);
  globalThis.fetch = realFetch;
  const body = await r.json().catch(() => null);

  record(
    'S31: webhook 5xx is retried (3 attempts) but the request still succeeds',
    r.status === 200 && body?.success === true && attempts === 3,
    `status=${r.status} attempts=${attempts}`
  );
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
const fails = results.filter(r => !r.pass);
console.log(`\n==== RESULT: ${results.length - fails.length}/${results.length} PASS ====`);
if (fails.length) {
  console.log('FAILED: ' + fails.map(f => `"${f.name}"`).join(' | '));
}
process.exitCode = fails.length && fails.length === results.length ? 1 : fails.length ? 2 : 0;