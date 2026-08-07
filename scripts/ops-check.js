// Brandverse Ops Check — verify all system components from CLI
// Usage: node scripts/ops-check.js [--base-url=<url>]

const BASE = process.argv.find(a => a.startsWith('--base-url='))?.split('=')[1] || 'https://edge.brandverse.tech';
const TIMEOUT = 10000;

async function fetchJson(url, opts = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout || TIMEOUT);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    const body = await res.text();
    let json;
    try { json = JSON.parse(body); } catch { json = { raw: body }; }
    return { status: res.status, ok: res.ok, body: json };
  } catch (e) {
    return { status: 0, ok: false, body: { error: e.message } };
  } finally {
    clearTimeout(timer);
  }
}

function icon(ok) { return ok ? '✅' : '❌'; }

async function checkHealth() {
  const res = await fetchJson(`${BASE}/health`);
  const ok = res.ok && res.body.status === 'healthy';
  console.log(`  ${icon(ok)} Health endpoint  → ${res.status} ${ok ? `v${res.body.version || '?'}` : (res.body.error || res.body.message || 'FAIL')}`);
  return ok;
}

async function checkClientConfig() {
  const res = await fetchJson(`${BASE}/api/health/client-config`);
  // This endpoint returns the embedded config list from example-client.json if deployed
  // Actually, there's no such endpoint. Let me check the known clients from embedded config.

  // Try known clients
  const knownIds = ['dental_melbourne_1', 'hvac_sydney_1', 'electrician_brisbane_1', 'plastic_surgery_melbourne_1'];
  let found = 0;
  for (const id of knownIds) {
    const r = await fetchJson(`${BASE}/api/${id}/client-config`);
    if (r.ok) found++;
  }

  // Also try the example client if it exists
  const example = await fetchJson(`${BASE}/api/acme_dental/client-config`);

  console.log(`  ${icon(found > 0)} Client configs   → ${found}/${knownIds.length} embedded clients reachable`);
  if (example.ok) console.log(`                     → +1 example client (acme_dental)`);

  // Show all reachable client names
  for (const id of knownIds) {
    const r = await fetchJson(`${BASE}/api/${id}/client-config`);
    if (r.ok) console.log(`                       ${r.body.name || id}`);
  }

  return found > 0;
}

async function checkEmptyClient() {
  const res = await fetchJson(`${BASE}/api/nonexistent_client/client-config`);
  const ok = res.status === 404;
  console.log(`  ${icon(ok)} Missing client    → ${res.status} (expect 404)`);
  return ok;
}

async function checkCalendarConnectivity() {
  // The worker doesn't expose a direct calendar test endpoint.
  // We infer connectivity from booking endpoint behavior.
  const clientId = 'dental_melbourne_1';
  const res = await fetchJson(`${BASE}/api/${clientId}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ops Check',
      phone: '+12125551234',
      service: 'consultation',
      dateTime: new Date(Date.now() + 86400000 * 7).toISOString(),
      notes: 'Ops connectivity test',
    }),
  });

  // Expected: 400 with "Calendar booking failed" (because no real calendar_id)
  // Or 200 if calendar_id is set
  const hasCalendar = res.body.success === true;
  const calendarNotConfigured = res.status === 400 && (res.body.error?.includes('Calendar') || res.body.error?.includes('calendar') || res.body.message?.includes('Calendar'));
  const otherError = res.status === 400 && !calendarNotConfigured && !hasCalendar;

  if (hasCalendar) {
    console.log(`  ✅ Calendar         → connected (booking succeeded)`);
  } else if (calendarNotConfigured) {
    console.log(`  ⚠️  Calendar         → not configured (booking expectedly failed)`);
  } else if (otherError) {
    console.log(`  ⚠️  Calendar         → validation error (${res.body.error || res.body.message})`);
  } else {
    console.log(`  ❌ Calendar         → unexpected: ${res.status} ${JSON.stringify(res.body)}`);
  }
  return { hasCalendar, calendarNotConfigured };
}

async function checkSheetsConnectivity() {
  const clientId = 'dental_melbourne_1';
  const res = await fetchJson(`${BASE}/api/${clientId}/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'ops_check',
      channel: 'api',
      name: 'Ops Check',
      phone: '+12125551234',
      intent: 'connectivity_test',
      notes: `Ops connectivity test ${new Date().toISOString()}`,
    }),
  });

  const hasSheets = res.body.success === true;
  const sheetsNotConfigured = res.status === 200 && res.body.success === false;
  const error = !res.ok && res.status !== 200;

  if (hasSheets) {
    console.log(`  ✅ Sheets           → connected (log wrote)`);
  } else if (res.status === 200 && res.body.success === false) {
    console.log(`  ⚠️  Sheets           → not configured`);
  } else if (res.status >= 400 && res.status < 500) {
    console.log(`  ⚠️  Sheets           → returned ${res.status} (${res.body.error || res.body.message || ''})`);
  } else {
    console.log(`  ❌ Sheets           → unexpected: ${res.status}`);
  }
  return hasSheets;
}

async function checkVapiWebhook() {
  const res = await fetchJson(`${BASE}/api/vapi/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { type: 'status-update' } }),
  });

  const ok = res.status === 200 || res.status === 401;

  if (res.status === 200) {
    console.log(`  ✅ Vapi webhook     → accepting requests (no secret configured)`);
  } else if (res.status === 401) {
    console.log(`  ✅ Vapi webhook     → rejecting unsigned (secret configured)`);
  } else {
    console.log(`  ${icon(false)} Vapi webhook     → ${res.status} ${res.body.error || ''}`);
  }
  return ok;
}

async function checkRateLimiter() {
  let got429 = false;
  for (let i = 0; i < 120; i++) {
    const res = await fetchJson(`${BASE}/health`);
    if (res.status === 429) { got429 = true; break; }
  }
  console.log(`  ${icon(got429)} Rate limiter     → ${got429 ? 'active (429 observed)' : 'not observed (may need more requests)'}`);
  return got429;
}

async function main() {
  console.log();
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║     Brandverse Ops Check                     ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log();
  console.log(`  Target: ${BASE}`);
  console.log();

  const healthOk = await checkHealth();
  if (!healthOk) {
    console.log();
    console.log('  ❌ Worker not healthy — aborting remaining checks.');
    console.log();
    process.exit(1);
  }

  await checkClientConfig();
  await checkEmptyClient();
  await checkCalendarConnectivity();
  await checkSheetsConnectivity();
  await checkVapiWebhook();
  await checkRateLimiter();

  console.log();
  console.log('───────────────────────────────────────────────');
  console.log('  SUMMARY');
  console.log('───────────────────────────────────────────────');
  console.log();
  console.log(`    npm run deploy:worker       — deploy latest changes`);
  console.log(`    npm run onboard             — onboard a new client`);
  console.log(`    npm run ops:check           — re-run this check`);
  console.log();
}

main().catch(e => { console.error(e); process.exit(1); });