/**
 * API Integration Tests
 * Run with: node tests/api.test.js
 * Requires wrangler dev running on http://localhost:8787
 *
 * Or test against production:
 *   BASE_URL=https://edge.brandverse.tech node tests/api.test.js
 */

const BASE = process.env.BASE_URL || 'http://localhost:8787';
const CLIENT_ID = process.env.TEST_CLIENT_ID || 'dental_melbourne_1';

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) { passed++; console.log(`  ✅ ${label}`); }
  else { failed++; console.error(`  ❌ ${label}`); }
}

async function get(path) {
  const r = await fetch(`${BASE}${path}`);
  return { status: r.status, body: await r.json().catch(() => null) };
}

async function post(path, data) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return { status: r.status, body: await r.json().catch(() => null) };
}

console.log(`\nTesting against: ${BASE}\n`);

// Health
{
  console.log('--- Health ---');
  const r = await get('/health');
  assert(r.status === 200, 'health returns 200');
  assert(r.body?.status === 'healthy', 'health body has status=healthy');
}

// Client config
{
  console.log('\n--- Client Config ---');
  const r = await get(`/api/${CLIENT_ID}/client-config`);
  assert(r.status === 200, 'client-config returns 200');
  assert(r.body?.id === CLIENT_ID, 'client-config has correct id');
  assert(r.body?.services, 'client-config has services');

  const r404 = await get('/api/nonexistent/client-config');
  assert(r404.status === 404, 'nonexistent client returns 404');
}

// Availability
{
  console.log('\n--- Availability ---');
  const r = await get(`/api/${CLIENT_ID}/availability?date=2026-08-15&service=cleaning`);
  if (r.status === 200) {
    assert(true, 'availability returns 200');
    assert(r.body?.availableSlots, 'availableSlots array present');
  } else {
    assert(false, `availability returned ${r.status}`);
    console.log('  Body:', JSON.stringify(r.body));
  }

  const rMissing = await get(`/api/${CLIENT_ID}/availability`);
  assert(rMissing.status === 400, 'missing params returns 400');
}

// Booking
{
  console.log('\n--- Booking ---');
  // Missing fields
  const rEmpty = await post(`/api/${CLIENT_ID}/book`, {});
  assert(rEmpty.status === 400, 'empty booking returns 400');
  assert(rEmpty.body?.details, 'validation details present');

  // Invalid phone
  const rBadPhone = await post(`/api/${CLIENT_ID}/book`, {
    name: 'Test', phone: 'abc', service: 'cleaning', dateTime: '2026-08-15T10:00:00Z',
  });
  assert(rBadPhone.status === 400, 'bad phone returns 400');

  // Valid booking (will likely fail on calendar auth since no real creds, but should be 400/500 not 200)
  const rValid = await post(`/api/${CLIENT_ID}/book`, {
    name: 'Jane Doe',
    phone: '+12125551234',
    email: 'jane@example.com',
    service: 'cleaning',
    dateTime: '2026-08-15T10:00:00Z',
    notes: 'Integration test booking',
  });
  // Should get either 200 (success) or 500 (no real credentials) — not 400
  assert(rValid.status !== 400, 'valid booking payload not rejected at validation layer');
}

// Log
{
  console.log('\n--- Log ---');
  const rLog = await post(`/api/${CLIENT_ID}/log`, {
    type: 'test', channel: 'api_test', name: 'Test User', phone: '+12125551234',
  });
  // May fail with 500 for missing credentials, but should not be 400
  assert(rLog.status !== 400, 'log payload passes validation');

  const rBadLog = await post(`/api/${CLIENT_ID}/log`, { phone: 'bad' });
  assert(rBadLog.status === 400, 'bad phone in log returns 400');
}

// 404
{
  console.log('\n--- 404 ---');
  const r = await get(`/api/${CLIENT_ID}/nonexistent`);
  assert(r.status === 404, 'unknown endpoint returns 404');
}

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
process.exit(failed > 0 ? 1 : 0);