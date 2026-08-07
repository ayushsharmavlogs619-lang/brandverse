/**
 * BRANDVERSE SALES SYSTEM — persistence layer.
 * Generic localStorage collections + seed lead data. Pure client-side JSON.
 */

import type { BusinessLead } from './types';

export function uid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const PREFIX = 'brandverse.sales.v1.';

export const COLLECTIONS = {
  leads: `${PREFIX}leads`,
  objections: `${PREFIX}objections`,
  scripts: `${PREFIX}scripts`,
  docs: `${PREFIX}docs`,
  discovery: `${PREFIX}discovery`,
  followups: `${PREFIX}followups`,
} as const;

// ---------------------------------------------------------------------------
// Generic collection helpers
// ---------------------------------------------------------------------------

export function loadCollection<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`[Sales] Failed to read ${key}:`, error);
    return [];
  }
}

export function saveCollection<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`[Sales] Failed to write ${key}:`, error);
  }
}

export function clearCollection(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Sales] Failed to clear ${key}:`, error);
  }
}

// ---------------------------------------------------------------------------
// Seed sample leads (first run)
// ---------------------------------------------------------------------------

const LEAD_KEY = COLLECTIONS.leads;
const SEED_FLAG = `${PREFIX}leads.seeded`;

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function isoInDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function seedLeads(): BusinessLead[] {
  const now = Date.now();
  const mk = (
    stage: BusinessLead['stage'],
    business: string,
    owner: string,
    niche: string,
    city: string,
    state: string,
    country: string,
    extra: Partial<BusinessLead> & { daysInStage: number }
  ): BusinessLead => ({
    id: uid(),
    business,
    owner,
    phone: '',
    email: '',
    website: '',
    rating: null,
    niche,
    city,
    state,
    country,
    painPoints: [],
    notes: '',
    stage,
    status: stage === 'won' || stage === 'lost' ? 'closed' : 'active',
    lastContact: null,
    nextFollowUp: null,
    proposal: '',
    revenue: null,
    createdAt: new Date(now - extra.daysInStage * 2 * 86400000).toISOString(),
    updatedAt: new Date(now - extra.daysInStage * 86400000).toISOString(),
    stageChangedAt: isoDaysAgo(extra.daysInStage),
    ...extra,
  });

  return [
    mk('won', 'Bright Smile Dental', 'Dr. Sarah Chen', 'Dental', 'Austin', 'TX', 'United States', {
      daysInStage: 10,
      phone: '(512) 555-0141',
      email: 'frontdesk@brightsmileaustin.com',
      website: 'brightsmile-austin.com',
      rating: 4.7,
      revenue: 799,
      proposal: 'Pro AI Agent + booking automation — accepted 07/18',
      painPoints: ['Missing calls after hours', 'No online booking system', 'High no-show rate'],
      lastContact: isoDaysAgo(2),
      nextFollowUp: isoInDays(14),
      notes: 'Wanted same-day appointment replies. Loves that the agent books into their dental software.',
    }),
    mk('proposal', 'Carter Electric', 'Mike Carter', 'Electrician', 'Denver', 'CO', 'United States', {
      daysInStage: 5,
      phone: '(303) 555-0177',
      email: 'mike@carterelectric.com',
      website: 'carterelectric.com',
      rating: 4.5,
      revenue: 499,
      proposal: 'Starter AI Agent — sent 07/25',
      painPoints: ['Losing leads to voicemail', 'Missing calls after hours'],
      lastContact: isoDaysAgo(1),
      nextFollowUp: isoInDays(3),
      notes: 'Comparing us with a local answering service. Highlight cost difference.',
    }),
    mk('meeting', 'Apex Automotive', 'Lisa Nguyen', 'Auto Repair', 'Phoenix', 'AZ', 'United States', {
      daysInStage: 3,
      phone: '(602) 555-0129',
      email: 'lisa@apexauto.net',
      website: 'apexautophoenix.com',
      rating: 4.3,
      revenue: 399,
      painPoints: ['Manual scheduling headaches', 'No follow-up process', 'Slow response to inquiries'],
      lastContact: isoDaysAgo(1),
      nextFollowUp: isoInDays(2),
      notes: 'Discovery call done. Budget confirmed ~$400/mo. Needs Spanish support for customers.',
    }),
    mk('qualified', 'Urban Roots Salon', 'Maria Lopez', 'Salon & Spa', 'Miami', 'FL', 'United States', {
      daysInStage: 6,
      phone: '(305) 555-0166',
      email: 'maria@urbanrootssalon.com',
      website: 'urbanrootsmiami.com',
      rating: 4.8,
      revenue: 299,
      painPoints: ['High no-show rate', 'Manual scheduling headaches', 'Relying on one person for everything'],
      lastContact: isoDaysAgo(4),
      nextFollowUp: isoInDays(1),
      notes: 'Open to automation. Wants reminder texts to cut no-shows.',
    }),
    mk('contacted', 'GreenLeaf Landscaping', 'Tom Baker', 'Landscaping', 'Nashville', 'TN', 'United States', {
      daysInStage: 8,
      phone: '(615) 555-0152',
      email: 'tom@greenleafland.com',
      website: 'greenleaf-landscaping.com',
      rating: 4.1,
      revenue: 399,
      painPoints: ['Losing leads to voicemail', 'Don\u2019t know where leads come from'],
      lastContact: isoDaysAgo(6),
      nextFollowUp: isoInDays(2),
      notes: 'Cold email sent. Seasonal business — he is ramping up for fall cleanup season.',
    }),
    mk('prospect', 'Harbor View Realty', 'Dana Fields', 'Real Estate', 'Seattle', 'WA', 'United States', {
      daysInStage: 12,
      phone: '(206) 555-0188',
      email: 'dana@harborviewrealty.com',
      website: 'harborviewrealty.com',
      rating: 4.6,
      revenue: 799,
      painPoints: ['Missing calls after hours', 'Slow response to inquiries'],
    }),
    mk('prospect', 'King\u2019s Gym & Fitness', 'Marcus King', 'Gym & Fitness', 'Chicago', 'IL', 'United States', {
      daysInStage: 15,
      phone: '(312) 555-0199',
      email: 'marcus@kingsgymchicago.com',
      website: 'kingsgymchicago.com',
      rating: 4.4,
      revenue: 499,
      painPoints: ['No online booking system', 'High no-show rate'],
    }),
    mk('lost', 'Silver Spoon Bistro', 'Chef Anna Reed', 'Restaurant', 'Portland', 'OR', 'United States', {
      daysInStage: 25,
      phone: '(503) 555-0133',
      email: 'anna@silverspoonpdx.com',
      website: 'silverspoonpdx.com',
      rating: 4.2,
      revenue: 0,
      painPoints: ['Low Google rating', 'Don\u2019t know where leads come from'],
      lastContact: isoDaysAgo(20),
      nextFollowUp: null,
      notes: 'Wanted us for $200/mo. Too low for the scope. Revisit next quarter.',
    }),
  ];
}

export function loadLeads(): BusinessLead[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LEAD_KEY);
    if (!raw) {
      const seeded = seedLeads();
      window.localStorage.setItem(LEAD_KEY, JSON.stringify(seeded));
      window.localStorage.setItem(SEED_FLAG, '1');
      return seeded;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('[Sales] Failed to load leads:', error);
    return [];
  }
}

export function leadsWereSeeded(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(SEED_FLAG) === '1';
}

export function clearLeads(): void {
  clearCollection(LEAD_KEY);
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SEED_FLAG);
}

// ---------------------------------------------------------------------------
// Document export helpers (JSON + HTML download)
// ---------------------------------------------------------------------------

export function downloadText(filename: string, content: string, mime = 'text/plain'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportJson(filename: string, data: unknown): void {
  downloadText(filename, JSON.stringify(data, null, 2), 'application/json');
}

export function parseJsonArray<T>(text: string): T[] {
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed)) throw new Error('File must contain an array');
  return parsed as T[];
}
