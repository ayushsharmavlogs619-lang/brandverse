// Brandverse Client Onboarding — interactive CLI
// Usage: node scripts/onboard-client.js              (interactive)
//        node scripts/onboard-client.js --json=data.json  (from JSON file)
// Outputs the config JSON + exact deploy commands.

import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';
import { readFileSync } from 'fs';

const JSON_FILE = process.argv.find(a => a.startsWith('--json='))?.split('=')[1];

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'new_client';
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const TIMEOFFSET_RE = /^[+-]\d{2}:\d{2}$/;

const COMMON_NICHES = ['dental', 'hvac', 'electrician', 'plastic-surgery', 'legal', 'chiro', 'massage', 'spa', 'fitness', 'auto', 'other'];
const COMMON_SERVICES = [
  { label: 'Consultation (30 min)', key: 'consultation', dur: 30 },
  { label: 'New Patient Exam (30 min)', key: 'new_patient_exam', dur: 30 },
  { label: 'Cleaning (30 min)', key: 'cleaning', dur: 30 },
  { label: 'Checkup (30 min)', key: 'checkup', dur: 30 },
  { label: 'Filling (45 min)', key: 'filling', dur: 45 },
  { label: 'Root Canal (60 min)', key: 'root_canal', dur: 60 },
  { label: 'Repair (90 min)', key: 'repair', dur: 90 },
  { label: 'Installation (120 min)', key: 'installation', dur: 120 },
  { label: 'Emergency (60 min)', key: 'emergency', dur: 60 },
  { label: 'Follow-up (30 min)', key: 'follow_up', dur: 30 },
];

function validatePhone(v) {
  return /^[\+]?[0-9\s\-()]{7,20}$/.test(v.trim());
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function validateTimezone(v) {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: v.trim() });
    return true;
  } catch { return false; }
}

function formatWorkingHours(weekday, saturday, sunday) {
  const wh = {};
  for (const d of DAYS) {
    if (d === 'sunday') {
      wh[d] = sunday;
    } else if (d === 'saturday') {
      wh[d] = saturday;
    } else {
      wh[d] = weekday;
    }
  }
  return wh;
}

function clientConfigSnippet(client) {
  return JSON.stringify({ clients: [client] }, null, 2);
}

function envSecretCommand(clientId, fullJson) {
  const existing = `wrangler secret put CLIENTS_CONFIG --env production`;
  return existing;
}

function generateAndPrint(client) {
  // Fill defaults for any missing fields
  const id = client.id || slug(client.name || 'new_client');
  const clean = {
    id,
    name: client.name || id,
    niche: client.niche || 'other',
    timezone: client.timezone || 'America/New_York',
    services: client.services || { consultation: 30 },
    working_hours: client.working_hours || {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: 'closed', end: 'closed' },
      sunday: { start: 'closed', end: 'closed' },
    },
    calendar_id: client.calendar_id || '',
    sheet_id: client.sheet_id || '',
    phone_number: client.phone_number || '',
    subdomain: 'edge.brandverse.tech',
    business_description: client.business_description || `${client.name || id} — ${client.niche || 'other'}`,
    after_hours_booking: client.after_hours_booking !== undefined ? client.after_hours_booking : true,
    buffer_minutes: client.buffer_minutes || 10,
    max_booking_days_ahead: client.max_booking_days_ahead || 30,
  };
  if (client.email) clean.email = client.email;
  if (client.address) clean.address = client.address;

  console.log();
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║              CLIENT CONFIG GENERATED                        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log();
  console.log(`  Client ID:     ${clean.id}`);
  console.log(`  Business Name: ${clean.name}`);
  console.log(`  Niche:         ${clean.niche}`);
  console.log(`  Timezone:      ${clean.timezone}`);
  console.log(`  Services:      ${Object.keys(clean.services).join(', ')}`);
  console.log(`  Calendar ID:   ${clean.calendar_id || '(not set)'}`);
  console.log(`  Sheet ID:      ${clean.sheet_id || '(not set)'}`);
  console.log();

  console.log('───────────────────────────────────────────────────────────────');
  console.log('CONFIG JSON (for CLIENTS_CONFIG env var or embedded config)');
  console.log('───────────────────────────────────────────────────────────────');
  console.log();
  const fullConfig = { clients: [clean] };
  console.log(JSON.stringify(fullConfig, null, 2));
  console.log();

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  NEXT STEPS');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log();
  console.log('  Option A — Set CLIENTS_CONFIG secret (recommended for live):');
  console.log();
  console.log('    npx wrangler secret put CLIENTS_CONFIG --env production');
  console.log('    (paste the JSON above, then Ctrl+D)');
  console.log();
  console.log('  Option B — Add to embedded config in ai-reception/services/client-config.js:');
  console.log();
  console.log('    Open client-config.js, find loadClientsData(),');
  console.log('    and add this client object to the "clients" array:');
  console.log();
  console.log(JSON.stringify(clean, null, 4));
  console.log();
  console.log('  Then run:');
  console.log();
  console.log('    npm run deploy:worker');
  console.log();
  console.log('  Verify deployment:');
  console.log();
  console.log(`    curl https://edge.brandverse.tech/api/${clean.id}/client-config`);
  console.log();
  console.log('  Set remaining secrets if not already set:');
  console.log();
  console.log('    npx wrangler secret put GOOGLE_CLIENT_EMAIL --env production');
  console.log('    npx wrangler secret put GOOGLE_PRIVATE_KEY --env production');
  console.log('    npx wrangler secret put GOOGLE_APPS_SCRIPT_WEBHOOK_URL --env production (optional)');
  console.log('    npx wrangler secret put GOOGLE_APPS_SCRIPT_SECRET --env production (optional)');
  console.log('    npx wrangler secret put VAPI_API_KEY --env production (optional)');
  console.log();
  console.log('  Test your new client with:');
  console.log();
  console.log('    npm run ops:check');
  console.log();
}

async function main() {
  console.log();
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║     Brandverse Client Onboarding             ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log();

  if (JSON_FILE) {
    const raw = readFileSync(JSON_FILE, 'utf8').replace(/^\uFEFF/, '');
    let input;
    try { input = JSON.parse(raw); } catch { console.error('Invalid JSON file.'); process.exit(1); }
    const clientData = input.client || input;
    generateAndPrint(clientData);
    return;
  }

  const rl = createInterface({ input, output });
  const ask = (query) => new Promise(resolve => rl.question(query, resolve));

  const businessName = (await ask('Business name: ')).trim();
  if (!businessName) { console.error('Business name required.'); rl.close(); process.exit(1); }

  const clientId = slug(businessName);
  console.log(`  → Client ID will be: ${clientId}`);

  const displayName = (await ask(`Display name [${businessName}]: `)).trim() || businessName;

  const nicheRaw = (await ask(`Niche (${COMMON_NICHES.join(', ')}): `)).trim().toLowerCase();
  const niche = COMMON_NICHES.includes(nicheRaw) ? nicheRaw : 'other';
  if (nicheRaw && nicheRaw !== niche) console.log(`  → Normalized niche to: ${niche}`);

  const tz = (await ask('Timezone (e.g. America/New_York, Australia/Melbourne): ')).trim();
  if (!tz || !validateTimezone(tz)) { console.error('Invalid timezone.'); rl.close(); process.exit(1); }

  const phone = (await ask('Phone number (e.g. +12125551234): ')).trim();
  if (!phone || !validatePhone(phone)) { console.error('Invalid phone.'); rl.close(); process.exit(1); }

  const email = (await ask('Email (optional): ')).trim();
  if (email && !validateEmail(email)) { console.error('Invalid email.'); rl.close(); process.exit(1); }

  const calendarId = (await ask('Google Calendar ID (leave blank to set later): ')).trim();
  const sheetId = (await ask('Google Sheet ID (leave blank to set later): ')).trim();

  const address = (await ask('Business address (optional): ')).trim();

  console.log();
  console.log('--- Working Hours ---');
  console.log('Enter as HH:MM or "closed". Default: 09:00-18:00 weekdays, closed weekends.');
  const whStart = (await ask('  Weekday start [09:00]: ')).trim() || '09:00';
  const whEnd = (await ask('  Weekday end [18:00]: ')).trim() || '18:00';
  const satStart = (await ask('  Saturday start [closed]: ')).trim() || 'closed';
  const satEnd = satStart === 'closed' ? 'closed' : ((await ask('  Saturday end: ')).trim() || '14:00');
  const sunStart = (await ask('  Sunday start [closed]: ')).trim() || 'closed';

  const weekdayHours = { start: whStart, end: whEnd };
  const saturdayHours = satStart === 'closed' ? { start: 'closed', end: 'closed' } : { start: satStart, end: satEnd };
  const sundayHours = { start: 'closed', end: 'closed' };

  console.log();
  console.log('--- Services ---');
  console.log('Select services by number (comma-separated), or type custom names.');
  COMMON_SERVICES.forEach((s, i) => console.log(`  ${i + 1}. ${s.label}`));
  console.log('  c. Custom services (comma-separated "Name:duration")');
  const svcChoice = (await ask('Choose: ')).trim().toLowerCase();

  const services = {};
  if (svcChoice === 'c') {
    const custom = (await ask('  Custom services (e.g. "Consultation:30, Cleaning:30"): ')).trim();
    for (const part of custom.split(',')) {
      const [sn, sd] = part.split(':').map(s => s.trim());
      const dur = parseInt(sd, 10);
      if (sn && dur > 0) services[sn] = dur;
    }
  } else {
    const indices = svcChoice.split(',').map(s => parseInt(s.trim(), 10) - 1).filter(i => i >= 0 && i < COMMON_SERVICES.length);
    for (const i of indices) {
      const svc = COMMON_SERVICES[i];
      services[svc.key] = svc.dur;
    }
  }
  if (Object.keys(services).length === 0) {
    console.error('At least one service required.');
    rl.close(); process.exit(1);
  }

  const bufferMin = parseInt((await ask('Buffer minutes between appointments [10]: ')).trim() || '10', 10);
  const maxDays = parseInt((await ask('Max booking days ahead [30]: ')).trim() || '30', 10);
  const afterHours = (await ask('Allow after-hours booking? (y/n) [y]: ')).trim().toLowerCase() !== 'n';
  const notes = (await ask('Notes (optional): ')).trim();

  rl.close();

  const workingHours = formatWorkingHours(weekdayHours, saturdayHours, sundayHours);

  generateAndPrint({
    id: slug(displayName),
    name: displayName,
    niche,
    timezone: tz,
    services,
    working_hours: workingHours,
    calendar_id: calendarId || undefined,
    sheet_id: sheetId || undefined,
    phone_number: phone,
    email: email || undefined,
    address: address || undefined,
    subdomain: 'edge.brandverse.tech',
    business_description: notes || `${displayName} — ${niche}`,
    after_hours_booking: afterHours,
    buffer_minutes: bufferMin,
    max_booking_days_ahead: maxDays,
  });
}

main().catch(e => { console.error(e); process.exit(1); });