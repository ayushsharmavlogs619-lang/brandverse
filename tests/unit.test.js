import { RateLimiter, validateBookingInput, validateLogInput, sanitizeStr } from '../ai-reception/services/validate.js';
import { createLogger } from '../ai-reception/services/logger.js';

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) { passed++; console.log(`  ✅ ${label}`); }
  else { failed++; console.error(`  ❌ ${label}`); }
}

function assertEq(actual, expected, label) {
  const ok = actual === expected;
  if (ok) { passed++; console.log(`  ✅ ${label}`); }
  else { failed++; console.error(`  ❌ ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`); }
}

console.log('\n=== RateLimiter ===\n');
{
  const rl = new RateLimiter(60000, 3);
  const r1 = rl.check('test1');
  assert(r1.allowed, 'first request allowed');
  assertEq(r1.remaining, 2, 'remaining = 2');

  rl.check('test1'); rl.check('test1');
  const r4 = rl.check('test1');
  assert(!r4.allowed, '4th request blocked');
  assertEq(r4.remaining, 0, 'remaining = 0');

  const rOther = rl.check('other');
  assert(rOther.allowed, 'different key not blocked');
}

console.log('\n=== validateBookingInput ===\n');
{
  const empty = validateBookingInput({});
  assert(empty.length > 0, 'empty body returns errors');
  assert(empty.some(e => e.includes('name')), 'name error present');

  const valid = validateBookingInput({
    name: 'John', phone: '+12125551234', service: 'cleaning', dateTime: '2026-08-15T10:00:00Z',
  });
  assertEq(valid.length, 0, 'valid booking passes');

  const badPhone = validateBookingInput({
    name: 'John', phone: 'abc', service: 'cleaning', dateTime: '2026-08-15T10:00:00Z',
  });
  assert(badPhone.some(e => e.includes('phone')), 'bad phone rejected');

  const badDate = validateBookingInput({
    name: 'John', phone: '+12125551234', service: 'cleaning', dateTime: 'not-a-date',
  });
  assert(badDate.some(e => e.includes('dateTime')), 'bad date rejected');
}

console.log('\n=== validateLogInput ===\n');
{
  const empty = validateLogInput({});
  assertEq(empty.length, 0, 'empty log passes');

  const bad = validateLogInput({ phone: 'abc' });
  assert(bad.some(e => e.includes('phone')), 'bad phone in log rejected');
}

console.log('\n=== sanitizeStr ===\n');
{
  assertEq(sanitizeStr('  hello  '), 'hello', 'trims whitespace');
  assertEq(sanitizeStr('a'.repeat(2000)).length, 1000, 'truncates to 1000');
  assertEq(sanitizeStr('<script>alert(1)</script>'), 'scriptalert(1)/script', 'strips HTML angle brackets');
  assertEq(sanitizeStr(123), '', 'non-string returns empty');
}

console.log('\n=== logger.js ===\n');
{
  const log = createLogger(null, 'test-client');
  assert(log.id.startsWith('req_'), 'logger id starts with req_');
  assert(typeof log.info === 'function', 'log.info is function');
  assert(typeof log.error === 'function', 'log.error is function');
  assert(typeof log.complete === 'function', 'log.complete is function');

  const ms = log.complete('/api/test/book', true);
  assert(typeof ms === 'number' && ms >= 0, 'complete returns duration');

  const child = log.child('sub-client');
  assert(child.id === log.id, 'child shares request id');
}

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
process.exit(failed > 0 ? 1 : 0);