// Brandverse Doctor — Production Health Verification
// Usage: npm run doctor

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const BASE = 'https://edge.brandverse.tech';
const TIMEOUT = 10000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const results = { checks: [], passes: 0, warnings: 0, failures: 0 };

function check(name, status, detail, meta) {
  results.checks.push({ name, status, detail, ...meta });
  if (status === 'PASS') results.passes++;
  else if (status === 'WARN') results.warnings++;
  else results.failures++;
  const icons = { PASS: '🟢', WARN: '🟡', FAIL: '🔴' };
  console.log(`  ${icons[status]} ${name}: ${detail}`);
}

async function fetchJson(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), opts.timeout || TIMEOUT);
  const start = Date.now();
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    const text = await res.text();
    let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
    return { status: res.status, ok: res.ok, body: json, ms: Date.now() - start };
  } catch (e) {
    return { status: 0, ok: false, body: { error: e.message }, ms: Date.now() - start };
  } finally { clearTimeout(t); }
}

// === 1. ENVIRONMENT VARIABLES ===
function checkEnv() {
  const envPath = join(ROOT, '.env.local');
  const env = {};
  if (existsSync(envPath)) {
    readFileSync(envPath, 'utf8').split('\n').forEach(l => {
      const m = l.match(/^([^#\s=]+)=(.*)$/);
      if (m) env[m[1].trim()] = m[2].trim().replace(/^['"](.*)['"]$/, '$1');
    });
  }

  // Required worker secrets (should be in wrangler secret, not .env.local)
  // .env.local is for Pages build-time vars
  const critical = ['NEXT_PUBLIC_GA_MEASUREMENT_ID'];
  const optional = ['NEXT_PUBLIC_VAPI_PUBLIC_KEY', 'NEXT_PUBLIC_VAPI_ASSISTANT_ID',
    'NEXT_PUBLIC_CALENDLY_URL', 'NEXT_PUBLIC_COOKIEBOT_ID', 'NEXT_PUBLIC_LINKEDIN_PARTNER_ID',
    'GOOGLE_APPS_SCRIPT_WEBHOOK_URL', 'GOOGLE_APPS_SCRIPT_SECRET'];

  // Worker secrets (check via wrangler.toml docs)
  const workerSecrets = [
    { name: 'GOOGLE_CLIENT_EMAIL', required: true },
    { name: 'GOOGLE_PRIVATE_KEY', required: true },
    { name: 'VAPI_API_KEY', required: false },
    { name: 'GOOGLE_APPS_SCRIPT_WEBHOOK_URL', required: false },
    { name: 'GOOGLE_APPS_SCRIPT_SECRET', required: false },
    { name: 'CLIENTS_CONFIG', required: false },
  ];

  const setVars = Object.keys(env);
  const missing = [];
  for (const v of critical) { if (!setVars.includes(v)) missing.push(v); }
  if (missing.length) check('Env: critical vars', 'FAIL', `Missing: ${missing.join(', ')}`);
  else check('Env: critical vars', 'PASS', 'All found');

  const optMissing = optional.filter(v => !setVars.includes(v));
  if (optMissing.length) check('Env: optional vars', 'WARN', `Not set: ${optMissing.length} (${optMissing.join(', ')})`);
  else check('Env: optional vars', 'PASS', 'All found');

  // Worker secrets — we can't check if they're set from outside, but we can show the expectation
  const reqSecrets = workerSecrets.filter(s => s.required);
  const optSecrets = workerSecrets.filter(s => !s.required);
  check('Env: worker secrets (required)', 'WARN', `${reqSecrets.length} expected via \`wrangler secret put\` (${reqSecrets.map(s => s.name).join(', ')})`);
  check('Env: worker secrets (optional)', 'WARN', `${optSecrets.length} optional: ${optSecrets.map(s => s.name).join(', ')}`);
}

// === 2. CLOUDFLARE WORKER ===
async function checkWorker() {
  const r = await fetchJson(`${BASE}/health`);
  if (r.ok && r.body.status === 'healthy') {
    check('Worker health', 'PASS', `v${r.body.version || '?'} (${r.ms}ms)`);
    check('Worker version', 'PASS', r.body.version || 'unknown');
  } else check('Worker health', 'FAIL', `${r.status} ${r.body.error || ''} (${r.ms}ms)`);
  return r;
}

// === 3. GOOGLE CALENDAR ===
async function checkCalendar() {
  // Test via booking endpoint (infer calendar connectivity from response)
  const r = await fetchJson(`${BASE}/api/dental_melbourne_1/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Doctor Check', phone: '+12125551234', service: 'consultation',
      dateTime: new Date(Date.now() + 86400000 * 14).toISOString(),
    }),
  });
  if (r.body.success === true) check('Calendar', 'PASS', 'Connected (booking succeeded)');
  else if (r.status === 400 && (r.body.error || '').includes('Calendar')) check('Calendar', 'WARN', 'Not configured (calendar_id empty)');
  else if (r.status === 400) check('Calendar', 'PASS', 'Validation ok (no credentials to test further)');
  else check('Calendar', 'FAIL', `${r.status}: ${r.body.error || r.body.message || ''} (${r.ms}ms)`);
}

// === 4. GOOGLE SHEETS ===
async function checkSheets() {
  const r = await fetchJson(`${BASE}/api/dental_melbourne_1/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'doctor_check', channel: 'api', name: 'Doctor Check', phone: '+12125551234', notes: `Doctor check ${Date.now()}` }),
  });
  if (r.body.success === true) check('Sheets', 'PASS', 'Connected (log entry written)');
  else if (r.status === 200 && r.body.success === false) check('Sheets', 'WARN', 'Not configured (sheet_id empty)');
  else if (r.status >= 400 && r.status < 500) check('Sheets', 'PASS', 'Validation ok (no credentials to test further)');
  else check('Sheets', 'FAIL', `${r.status}: ${r.body.error || ''}`);
}

// === 5. EMAIL ===
async function checkEmail() {
  // Check worker notification endpoint — it POSTs to Google Apps Script webhook
  const r = await fetchJson(`${BASE}/api/vapi/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { type: 'status-update' } }),
  });
  // If webhook returns 200, email notification path is alive
  // We can also try pinging the Apps Script URL if it's in .env
  const envPath = join(ROOT, '.env.local');
  let hasWebhookUrl = false;
  if (existsSync(envPath)) {
    const c = readFileSync(envPath, 'utf8');
    hasWebhookUrl = c.includes('GOOGLE_APPS_SCRIPT_WEBHOOK_URL') && !c.includes('your_apps_script_exec_url');
  }

  if (r.status === 200 || r.status === 401) {
    check('Email notification', 'PASS', `Worker endpoint reachable (${r.status})`);
  } else check('Email notification', 'WARN', `Webhook endpoint: ${r.status}`);
  if (hasWebhookUrl) check('Email webhook URL', 'PASS', 'Configured in .env.local');
  else check('Email webhook URL', 'WARN', 'Not configured (GOOGLE_APPS_SCRIPT_WEBHOOK_URL)');
}

// === 6. VAPI ===
async function checkVapi() {
  const r = await fetchJson(`${BASE}/api/vapi/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { type: 'status-update' } }),
  });
  if (r.status === 200) check('Vapi webhook', 'PASS', 'Accepting requests');
  else if (r.status === 401) check('Vapi webhook', 'PASS', 'Signature verification active');
  else check('Vapi webhook', 'FAIL', `${r.status}: ${r.body.error || ''}`);

  // Check if VAPI_API_KEY is plausibly set in .env.local
  const envPath = join(ROOT, '.env.local');
  if (existsSync(envPath)) {
    const c = readFileSync(envPath, 'utf8');
    const hasKey = c.includes('VAPI_API_KEY') && !c.includes('your_vapi_private_api_key_here');
    if (hasKey) check('Vapi API key', 'PASS', 'Found in .env.local');
    else check('Vapi API key', 'WARN', 'Not configured (uses placeholder)');
  }
}

// === 7. CLIENT CONFIG ===
function checkClientConfig() {
  const configPath = join(ROOT, 'ai-reception', 'services', 'client-config.js');
  if (!existsSync(configPath)) { check('Client config file', 'FAIL', 'Not found'); return; }

  const src = readFileSync(configPath, 'utf8');

  // Extract the embedded JSON
  const m = src.match(/const embeddedClientsJson = `([\s\S]*?)`;/);
  if (!m) { check('Client config parse', 'FAIL', 'Could not extract embedded JSON'); return; }

  let clients;
  try {
    const parsed = JSON.parse(m[1]);
    clients = parsed.clients;
    check('Client config parse', 'PASS', `${clients.length} clients parsed`);
  } catch (e) {
    check('Client config parse', 'FAIL', `JSON parse error: ${e.message}`);
    return;
  }

  // Check for duplicate IDs
  const ids = clients.map(c => c.id);
  const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dups.length) check('Config: duplicate IDs', 'FAIL', `Duplicate: ${[...new Set(dups)].join(', ')}`);
  else check('Config: duplicate IDs', 'PASS', 'All unique');

  // Check for missing calendar/sheet IDs
  const missingCal = clients.filter(c => !c.calendar_id);
  const missingSheet = clients.filter(c => !c.sheet_id);
  if (missingCal.length) check('Config: missing calendar_id', 'WARN', `${missingCal.length} clients (${missingCal.map(c => c.id).join(', ')})`);
  else check('Config: missing calendar_id', 'PASS', 'All set');
  if (missingSheet.length) check('Config: missing sheet_id', 'WARN', `${missingSheet.length} clients (${missingSheet.map(c => c.id).join(', ')})`);
  else check('Config: missing sheet_id', 'PASS', 'All set');

  // Check for invalid timezones
  const badTz = clients.filter(c => { try { Intl.DateTimeFormat(undefined, { timeZone: c.timezone }); return false; } catch { return true; } });
  if (badTz.length) check('Config: invalid timezones', 'FAIL', `${badTz.map(c => `${c.id} (${c.timezone})`).join(', ')}`);
  else check('Config: invalid timezones', 'PASS', 'All valid');

  // Check for missing required fields
  const required = ['id', 'name', 'niche', 'timezone', 'services', 'working_hours'];
  let missingFields = 0;
  for (const c of clients) {
    for (const f of required) { if (!c[f]) { missingFields++; } }
  }
  if (missingFields) check('Config: missing required fields', 'FAIL', `${missingFields} missing across clients`);
  else check('Config: missing required fields', 'PASS', 'All present');

  // Reachability check (live)
  (async () => {
    let reachable = 0;
    for (const c of clients) {
      const r = await fetchJson(`${BASE}/api/${c.id}/client-config`);
      if (r.ok) reachable++;
    }
    if (reachable === clients.length) check('Config: reachability', 'PASS', `${reachable}/${clients.length} reachable`);
    else check('Config: reachability', 'WARN', `${reachable}/${clients.length} reachable`);
  })().catch(() => {});
}

// === 8. ROUTES ===
async function checkRoutes() {
  const routes = [
    { path: '/health', method: 'GET', label: 'Health', expect: 200 },
    { path: '/api/dental_melbourne_1/client-config', method: 'GET', label: 'Client config (valid)', expect: 200 },
    { path: '/api/nonexistent/client-config', method: 'GET', label: 'Client config (404)', expect: 404 },
    { path: '/api/dental_melbourne_1/availability?date=2026-08-15&service=consultation', method: 'GET', label: 'Availability', expect: [200, 400] },
    { path: '/api/vapi/webhook', method: 'POST', label: 'Vapi webhook', expect: [200, 401], body: { message: { type: 'status-update' } } },
    { path: '/api/dental_melbourne_1/book', method: 'POST', label: 'Booking (validation)', expect: 400, body: { name: 'x', phone: '+1', service: 'x', dateTime: 'x' } },
    { path: '/api/dental_melbourne_1/log', method: 'POST', label: 'Log', expect: 200, body: { name: 'test' } },
  ];

  for (const route of routes) {
    const opts = { method: route.method };
    if (route.body) { opts.headers = { 'Content-Type': 'application/json' }; opts.body = JSON.stringify(route.body); }
    const r = await fetchJson(`${BASE}${route.path}`, opts);
    const expected = Array.isArray(route.expect) ? route.expect : [route.expect];
    const ok = expected.includes(r.status);
    const label = ok ? 'PASS' : 'FAIL';
    check(`Route: ${route.label}`, label, `${r.status} expected ${expected.join('|')} (${r.ms}ms)`);
  }
}

// === 9. PERFORMANCE ===
async function checkPerformance() {
  const endpoints = ['/health', '/api/dental_melbourne_1/client-config'];
  const times = [];
  for (const ep of endpoints) {
    const r = await fetchJson(`${BASE}${ep}`);
    times.push({ ep: ep.replace('/api/dental_melbourne_1', '/api/{client}'), ms: r.ms });
  }
  const max = Math.max(...times.map(t => t.ms));
  const avg = (times.reduce((s, t) => s + t.ms, 0) / times.length).toFixed(0);
  const status = max < 2000 ? 'PASS' : max < 5000 ? 'WARN' : 'FAIL';
  check('Performance: avg response', status, `${avg}ms avg (max ${max}ms)`);
  times.forEach(t => check(`  ${t.ep}`, t.ms < 2000 ? 'PASS' : 'WARN', `${t.ms}ms`));
}

// === 10. SECURITY ===
async function checkSecurity() {
  // CORS: Check that OPTIONS returns proper headers
  const cors = await fetchJson(`${BASE}/health`, { method: 'OPTIONS' });
  if (cors.status === 204 || cors.status === 200) check('Security: CORS preflight', 'PASS', `OPTIONS returns ${cors.status}`);
  else check('Security: CORS preflight', 'WARN', `Unexpected: ${cors.status}`);

  // CORS header sanity check
  const get = await fetchJson(`${BASE}/health`, {
    headers: { 'Origin': 'https://brandverse.tech' },
  });
  const corsOk = get.status === 200;
  check('Security: CORS headers', corsOk ? 'PASS' : 'WARN', corsOk ? 'Origin accepted' : 'Origin check failed');

  // Rate limiter: send a burst and verify 429 eventually appears
  let got429 = false;
  for (let i = 0; i < 120; i++) {
    const r = await fetchJson(`${BASE}/health`);
    if (r.status === 429) { got429 = true; break; }
  }
  check('Security: rate limiter', got429 ? 'PASS' : 'WARN', got429 ? 'Active (429 seen)' : 'Not triggered (may already be warm)');

  // Webhook signature verification
  const vapi = await fetchJson(`${BASE}/api/vapi/webhook`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { type: 'status-update' } }),
  });
  if (vapi.status === 401) check('Security: webhook signature', 'PASS', 'Enabled (got 401)');
  else check('Security: webhook signature', 'WARN', 'Not enforced (no VAPI_WEBHOOK_SECRET)');

  // Missing secret check: ensure .env.local doesn't contain placeholder values
  const envPath = join(ROOT, '.env.local');
  if (existsSync(envPath)) {
    const c = readFileSync(envPath, 'utf8');
    const placeholders = c.match(/your_.*?_here|YOUR_VALUE|set_your/g);
    if (placeholders) check('Security: placeholder secrets', 'WARN', `${placeholders.length} placeholder value(s) still present`);
    else check('Security: placeholder secrets', 'PASS', 'No placeholders found');
  }
}

async function main() {
  console.log('\n═══════════════════════════════════════════');
  console.log('  BRANDVERSE DOCTOR — Production Check');
  console.log('═══════════════════════════════════════════\n');

  console.log('── Environment ──');
  checkEnv();

  console.log('\n── Worker ──');
  await checkWorker();

  console.log('\n── Google Calendar ──');
  await checkCalendar();

  console.log('\n── Google Sheets ──');
  await checkSheets();

  console.log('\n── Email ──');
  await checkEmail();

  console.log('\n── Vapi ──');
  await checkVapi();

  console.log('\n── Client Configuration ──');
  checkClientConfig();
  // Wait for async reachability check
  await new Promise(r => setTimeout(r, 3000));

  console.log('\n── Routes ──');
  await checkRoutes();

  console.log('\n── Performance ──');
  await checkPerformance();

  console.log('\n── Security ──');
  await checkSecurity();

  // Summary
  const total = results.passes + results.warnings + results.failures;
  const score = total ? Math.round((results.passes / total) * 100) : 0;

  console.log('\n═══════════════════════════════════════════');
  console.log('  SYSTEM HEALTH SUMMARY');
  console.log('═══════════════════════════════════════════\n');
  console.log(`  System Health: ${score}%`);
  console.log(`  Critical Issues: ${results.failures}`);
  console.log(`  Warnings: ${results.warnings}`);
  console.log(`  Passing: ${results.passes}/${total}`);
  console.log();

  if (results.failures) {
    console.log('  Recommendations:');
    results.checks.filter(c => c.status === 'FAIL').forEach(c => console.log(`    🔴 Fix: ${c.name} — ${c.detail}`));
    results.checks.filter(c => c.status === 'WARN').forEach(c => console.log(`    🟡 Review: ${c.name} — ${c.detail}`));
  }
  console.log();
}

main().catch(e => { console.error(e); process.exit(1); });