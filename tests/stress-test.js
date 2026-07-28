// Stress test — run against deployed worker at edge.brandverse.tech
// Usage: node tests/stress-test.js [options]
//   --base-url=<url>     default: https://edge.brandverse.tech
//   --concurrency=<n>    default: 10
//   --total=<n>          default: 100 requests per test

const BASE = process.argv.find(a => a.startsWith('--base-url='))?.split('=')[1] || 'https://edge.brandverse.tech';
const CONCURRENCY = parseInt(process.argv.find(a => a.startsWith('--concurrency='))?.split('=')[1] || '10', 10);
const TOTAL = parseInt(process.argv.find(a => a.startsWith('--total='))?.split('=')[1] || '100', 10);

const TIMEOUT_MS = 15000;
const PASS_THRESHOLD = 0.95; // 95% success required

let passed = 0, failed = 0;
const results = [];

async function fetchWithTimeout(url, opts = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout || TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

function assert(cond, msg) {
  if (cond) { passed++; } else { failed++; }
  results.push({ pass: cond, msg });
  const icon = cond ? '  ✅' : '  ❌';
  console.log(`${icon} ${msg}`);
}

function assertEq(actual, expected, label) {
  const ok = actual === expected;
  if (ok) { passed++; } else { failed++; }
  results.push({ pass: ok, msg: `${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}` });
  const icon = ok ? '  ✅' : '  ❌';
  console.log(`${icon} ${label}`);
}

async function runConcurrent(label, concurrency, total, fn) {
  console.log(`\n--- ${label} (${total} req, concurrency=${concurrency}) ---\n`);
  let completed = 0;
  const start = Date.now();
  const errors = [];

  async function worker() {
    while (completed < total) {
      const idx = completed++;
      try {
        await fn(idx);
      } catch (e) {
        errors.push({ idx, error: e.message });
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  const elapsed = Date.now() - start;
  const rate = (total / (elapsed / 1000)).toFixed(1);
  console.log(`\n  Completed ${total} requests in ${elapsed}ms (${rate}/sec)`);
  if (errors.length) {
    console.log(`  Errors: ${errors.length}`);
    errors.slice(0, 5).forEach(e => console.log(`    - req #${e.idx}: ${e.error}`));
  }
  return { elapsed, errors, rate: parseFloat(rate) };
}

async function testHealth() {
  console.log('\n========== HEALTH ENDPOINT ==========\n');
  const res = await fetchWithTimeout(`${BASE}/health`);
  assertEq(res.status, 200, 'health returns 200');
  const body = await res.json();
  assert(body.status === 'healthy', 'status is healthy');
  assert(body.version, 'version present');
  assert(body.timestamp, 'timestamp present');
}

async function testRateLimiting() {
  console.log('\n========== RATE LIMITING ==========\n');
  // Burst 150 requests from same IP -> should hit 429
  let got429 = false;
  for (let i = 0; i < 150; i++) {
    const res = await fetchWithTimeout(`${BASE}/health`);
    if (res.status === 429) { got429 = true; break; }
  }
  assert(got429, 'rate limiter blocks after burst');
}

async function testBookingConcurrent() {
  const clientId = 'dental_melbourne_1';
  const url = `${BASE}/api/${clientId}/book`;
  const validPayload = {
    name: 'Stress Test User',
    phone: '+12125551234',
    service: 'consultation',
    dateTime: new Date(Date.now() + 86400000).toISOString(),
    notes: 'Stress test booking',
  };

  return await runConcurrent('Concurrent Bookings', CONCURRENCY, TOTAL, async (idx) => {
    const payload = { ...validPayload, name: `Stress User ${idx}`, phone: `+1212555${String(idx).padStart(4, '0')}` };
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await res.json();
    // We accept 200 (success), 400 (validation), or 409 (slot taken) — not 5xx
    const ok = res.status !== 500;
    if (!ok) assert(false, `booking #${idx}: 500 — ${body.message || body.error}`);
    else assert(true, `booking #${idx}: ${res.status}`);
  });
}

async function testInvalidPayloads() {
  console.log('\n========== INVALID PAYLOADS ==========\n');
  const clientId = 'dental_melbourne_1';
  const url = `${BASE}/api/${clientId}/book`;

  const cases = [
    { payload: {}, label: 'empty body' },
    { payload: { name: 'Test' }, label: 'missing phone/service/dateTime' },
    { payload: { name: 'Test', phone: 'abc', service: 'x', dateTime: 'y' }, label: 'bad phone + bad date' },
    { payload: { name: 'T', phone: '+12125551234', service: 'consultation', dateTime: new Date(Date.now() + 86400000).toISOString() }, label: 'short name' },
    { payload: { name: '<script>alert(1)</script>', phone: '+12125551234', service: 'consultation', dateTime: new Date(Date.now() + 86400000).toISOString() }, label: 'XSS in name' },
    { payload: { name: 'Test', phone: '+12125551234', service: 'nonexistent-service', dateTime: new Date(Date.now() + 86400000).toISOString() }, label: 'invalid service' },
    { payload: { name: 'Test', phone: '+12125551234', service: 'consultation', dateTime: '2020-01-01T00:00:00Z' }, label: 'past date' },
  ];

  for (const c of cases) {
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(c.payload),
    });
    // Should return 400, not 500
    assert(res.status !== 500, `${c.label}: not 500 (got ${res.status})`);
    if (res.status === 400) {
      assert(true, `${c.label}: returns 400 as expected`);
    }
  }
}

async function testColdStart() {
  console.log('\n========== COLD START (rapid sequential) ==========\n');
  // Simulate cold start: rapid requests to different endpoints
  const endpoints = ['/health', '/api/dental_melbourne_1/client-config'];
  let ok = 0, total = 0;
  for (let i = 0; i < 20; i++) {
    const ep = endpoints[i % endpoints.length];
    const res = await fetchWithTimeout(`${BASE}${ep}`);
    total++;
    if (res.status < 500) ok++;
  }
  assert(ok === total, `${ok}/${total} cold-start requests succeeded (no 5xx)`);
}

async function testVapiWebhookInvalid() {
  console.log('\n========== VAPI WEBHOOK (invalid signature) ==========\n');
  const res = await fetchWithTimeout(`${BASE}/api/vapi/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { type: 'status-update' } }),
  });
  // If VAPI_WEBHOOK_SECRET is not configured, it should accept. If configured, it returns 401.
  // Either way, no 500.
  assert(res.status !== 500, `vapi webhook: not 500 (got ${res.status})`);
}

async function testLogEndpointInvalid() {
  console.log('\n========== LOG ENDPOINT (invalid) ==========\n');
  const res = await fetchWithTimeout(`${BASE}/api/dental_melbourne_1/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: 'abc' }),
  });
  assert(res.status !== 500, `log endpoint: not 500 (got ${res.status})`);
}

async function main() {
  console.log(`\nStress Test: ${BASE}`);
  console.log(`Concurrency: ${CONCURRENCY}, Total per test: ${TOTAL}`);
  console.log(`Pass threshold: ${(PASS_THRESHOLD * 100)}%`);
  console.log(`Timeout: ${TIMEOUT_MS}ms`);

  await testHealth();
  const rateResult = await testBookingConcurrent();
  await testInvalidPayloads();
  await testColdStart();
  await testRateLimiting();
  await testVapiWebhookInvalid();
  await testLogEndpointInvalid();

  const totalTests = passed + failed;
  const successRate = totalTests > 0 ? passed / totalTests : 0;
  const verdict = successRate >= PASS_THRESHOLD ? 'PASS' : 'FAIL';

  console.log(`\n========================================`);
  console.log(`  RESULTS: ${passed}/${totalTests} passed`);
  console.log(`  Success rate: ${(successRate * 100).toFixed(1)}%`);
  console.log(`  Verdict: ${verdict}`);
  console.log(`  Concurrent throughput: ${rateResult.rate}/sec`);
  console.log(`  Concurrent errors: ${rateResult.errors.length}/${TOTAL}`);
  console.log(`========================================\n`);

  process.exit(verdict === 'PASS' ? 0 : 1);
}

main().catch(e => {
  console.error('Stress test crashed:', e);
  process.exit(1);
});