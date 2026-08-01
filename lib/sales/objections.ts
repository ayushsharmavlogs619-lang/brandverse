/**
 * BRANDVERSE SALES SYSTEM — objection handling engine.
 * Stores objections and generates tailored responses by category,
 * personalized with the prospect's business context.
 */

import type { ObjectionCategory } from './types';

export interface ObjectionContext {
  business: string;
  owner: string;
  product: string; // e.g. "our AI voice agent"
}

// Keyword → category matching for unknown objections
const CATEGORY_KEYWORDS: Record<ObjectionCategory, string[]> = {
  price: ['expensive', 'cost', 'price', 'budget', 'afford', 'too much', 'cheap', 'dollars', 'costs', 'fee'],
  need: ["don't need", "don’t need", "no need", "not needed", "don't want", "don’t want", "not interested", 'unnecessary'],
  time: ['later', 'busy', 'not now', 'someday', 'this quarter', 'next year', 'timing', 'no time', 'too busy'],
  trust: ['who are you', 'scam', 'trust', 'unknown', 'heard of', 'reviews', 'credibility', 'prove'],
  competition: ['another', 'competitor', 'other company', 'we already', 'shop around', 'comparing', 'different company', 'another agency'],
  'existing-solution': ['have a service', 'already have', 'answering service', 'receptionist', 'current provider', 'we have one', 'current setup'],
  procurement: ['contract', 'paperwork', 'manager', 'procurement', 'approval', 'owner', 'board', 'sign off'],
  other: [],
};

export function matchCategory(text: string): ObjectionCategory {
  const lower = text.toLowerCase();
  let best: ObjectionCategory = 'other';
  let bestScore = 0;
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.reduce((s, k) => s + (lower.includes(k) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = cat as ObjectionCategory;
    }
  }
  return best;
}

interface ResponseTemplate {
  title: string;
  body: (ctx: ObjectionContext) => string;
}

const TEMPLATES: Record<ObjectionCategory, ResponseTemplate> = {
  price: {
    title: 'Price / Budget',
    body: ({ business, owner, product }) => `Totally fair question, ${owner}. The way I look at it: ${product} pays for itself.

You told me you're currently missing calls — every one of those is a potential customer who just hangs up and calls the next guy. Based on what we discussed, recovering even a few of those calls a month covers the entire cost.

And unlike hiring someone, there's no onboarding ramp, no sick days, and it works 24/7. We can also scale the plan down to fit your budget at ${business} — would it help if I showed you a breakdown of the math on your actual call volume?`,
  },
  need: {
    title: 'No Need',
    body: ({ business, owner }) => `I appreciate you being direct, ${owner}. Most owners I talk to think they don't have a problem — until they look at their missed-call log.

Last month, ${business} likely missed around 10-20% of incoming calls during business hours, and almost all after hours. Each one is a customer who tried to give you money.

Here's what I'd suggest: let me pull your last 30 days of missed calls and we'll see if there's a number worth protecting. If it's genuinely zero, I'll shake your hand and walk away. Fair?`,
  },
  time: {
    title: 'Timing',
    body: ({ business, owner, product }) => `I get it, ${owner} — this time of year is busy. That's actually exactly why owners come to us: ${product} handles the phones while you handle the work.

Here's what I'll do: I'll book a 15-minute call for next week at whatever time suits you. No prep needed on your end. If you end up swamped, we reschedule — no hard feelings.

One thing I'll note: ${business} is losing calls every week we wait. Setting up the agent takes about a week, so the sooner we lock a time, the sooner you stop missing calls. Does next Tuesday or Wednesday work better?`,
  },
  trust: {
    title: 'Trust / Credibility',
    body: ({ owner, business }) => `${owner}, that's the smartest question anyone can ask before handing over their phone lines. Let me address it head-on:

1. We work with local businesses exactly like ${business} — I can share references from your industry.
2. You keep full control: the agent follows a script you approve, and we record every call so you can listen in any time.
3. We start with a pilot: 14 days, and if you don't see the value, we part ways cleanly. No long-term lock.

Could I set up a quick call and bring a reference from a business in your industry?`,
  },
  competition: {
    title: 'Competition',
    body: ({ business, owner, product }) => `That's the right way to shop, ${owner} — this is your business on the line.

The honest difference: most providers sell you a tool and disappear. We set up ${product} specifically for ${business}, train it on your services, prices and booking flow, and monitor it monthly.

Also worth knowing: we're the only option locally that records every call, works in multiple languages, and lets you swap scripts anytime without extra fees.

I'd say let the others quote you — and bring me their best offer. If I can't beat it on value, you should take it. Deal?`,
  },
  'existing-solution': {
    title: 'Already Have Something',
    body: ({ business, product }) => `Good — that means you already know the value of a fast answer. Most owners I talk to at ${business} haven't tried anything yet.

What's costing you today? If your current setup is:
- An answering service → it can't book into your calendar, record leads, or work after hours
- A receptionist → they can't cover nights, weekends, and holidays
- Nothing → you're losing calls as we speak

${product} doesn't replace your people — it fills the gaps they physically can't cover, for less than the cost of a few lost jobs a month. Would you be open to a 15-minute side-by-side comparison?`,
  },
  procurement: {
    title: 'Procurement / Paperwork',
    body: ({ owner, product }) => `No problem, ${owner} — I handle the paperwork side of ${product} all the time, so it won't hold things up.

I can provide: a simple one-page contract, a monthly invoice that fits your accounting, and references for whoever needs to sign off.

Since you're the one who'll feel the pain of missed calls either way, would it help if I drafted the proposal in the exact format your decision-maker needs?`,
  },
  other: {
    title: 'Generic',
    body: ({ owner, business, product }) => `That's a fair thing to raise, ${owner}. Let me make sure I understand it properly — is it mainly about ${'how this fits'} the day-to-day at ${business}, or is there a bigger concern?

Here's my honest take: ${product} is designed to pay for itself by recovering calls you're losing today, and we de-risk it with a pilot period so ${business} only pays once you see it work. If there's a specific concern you want covered first, tell me what it is and I'll answer it directly — no sales script, I promise.`,
  },
};

export function generateObjectionResponse(
  category: ObjectionCategory,
  ctx: ObjectionContext
): { title: string; body: string } {
  const t = TEMPLATES[category] ?? TEMPLATES.other;
  return { title: t.title, body: t.body(ctx) };
}

export function generateResponseForText(
  text: string,
  ctx: ObjectionContext
): { title: string; body: string; matchedCategory: ObjectionCategory } {
  const category = matchCategory(text);
  const { title, body } = generateObjectionResponse(category, ctx);
  return { title, body, matchedCategory: category };
}
