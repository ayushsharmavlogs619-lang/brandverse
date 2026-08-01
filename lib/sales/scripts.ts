/**
 * BRANDVERSE SALES SYSTEM — cold call & demo script generators.
 */

import { serviceLabel } from '@/lib/crm/types';

export interface CallContext {
  business: string;
  owner: string;
  city: string;
  niche: string;
  painPoint: string;
}

export function buildColdCallScript(ctx: CallContext): string {
  return `# Cold Call Script — ${ctx.business}

## 1. Opening (first 15 seconds)
"Hi, is this ${ctx.owner}? I'm Ayush from Brandverse — we help ${ctx.niche.toLowerCase()} businesses in ${ctx.city} stop missing calls. I know you're busy, so I'll be quick. Fair?"

## 2. Permission + Hook
"Can I ask one thing? When a customer calls ${ctx.business} and nobody picks up, what happens?"

[PAUSE — let them answer]

"Right. Most owners tell me the caller just moves on to a competitor. We build AI agents that answer in one ring — 24/7 — so ${ctx.business} never misses a call again."

## 3. One painful question
"Roughly how many calls do you think you miss a day — either after hours or when you're slammed on a job?"

[LISTEN. Write down the number.]

## 4. Value pitch (keep to 45 seconds)
"Here's what we do: an AI receptionist that answers every call, books the appointment into your calendar, and texts you the lead instantly. It works nights, weekends, and holidays. Setup takes about a week, and we do it all for you."

## 5. Handle the first objection
- "How much?" → "For ${ctx.business} it'd be around X a month — less than the value of one missed job. I can show you the exact number with your call volume."
- "Not interested." → "Totally fair. Just to be clear — is it the timing, the budget, or that you already have something in place?"
- "We're fine." → "That's good to hear. Let me ask — are you missing any calls today? Because if you are, we both know that's lost money."

## 6. Close (always a date, never a pitch)
"Let's do this: I'll send a 2-minute breakdown of your numbers, and we book 15 minutes next week to walk through it. Does Tuesday or Wednesday work better?"

## 7. After the call
- Send the email within 10 minutes
- Log it in the CRM with last contact + next follow-up
- Follow up by text if no reply within 48 hours
`;
}

export interface DemoContext {
  company: string;
  owner: string;
  niche: string;
  product: string;
  goal: string;
}

export function buildDemoScript(ctx: DemoContext): string {
  const productLabel = ctx.product || serviceLabel('ai-receptionist');
  return `# Demo Script — ${productLabel} for ${ctx.company}

## Pre-demo checklist
- [ ] Confirm ${ctx.owner}'s biggest pain: ${ctx.goal || 'not confirmed yet'}
- [ ] Pull a real example of their missed-call situation (use their phone number in the demo if possible)
- [ ] Check mic, screen-share, and that the agent demo account is live

## 1. Setup (2 min)
"Thanks for the time, ${ctx.owner}. I'll keep this moving — 15 minutes, and you'll see exactly how ${productLabel} would work for ${ctx.company}. If you have to jump off early, no problem."

"Before I show anything — what's the single biggest frustration with your phones today?"

## 2. Discovery (5 min)
- "How many calls does ${ctx.company} get a day, and what % would you guess you miss?"
- "When someone calls, who answers? And what happens if they can't?"
- "Do you have online booking today, or does everything happen over the phone?"
- "What's the worst call you've lost recently?"

## 3. Live demo (5 min)
"Here's what a customer would experience after 8pm at ${ctx.company}." [MAKE THE CALL]

Walk them through:
- One-ring answer + friendly greeting
- Agent confirming the service they need
- Booking into the calendar + capturing name/phone
- The instant lead notification to your phone

## 4. Tie to their numbers (2 min)
"Now imagine that call was one of the ${'N'} you miss a month. At your average job value, that's roughly $X/month coming back — more than the cost of the agent."

## 5. Objections to be ready for
- "Our staff can handle it." → "Great — this covers nights, weekends, and when they're with a customer."
- "Too complicated." → "We do 100% of the setup. You approve a script, and you're live in a week."
- "Show me the ROI." → pull up the ROI calculator with their real numbers.

## 6. Close
"${ctx.owner}, I'd like to send a proposal with the exact pricing for ${ctx.company}. I'll also include a 14-day pilot so there's zero risk. Does that work — and would you like to start next week?"

## 7. Next steps
- [ ] Send proposal within 24h
- [ ] Book pilot kickoff call
- [ ] Log in CRM: stage → Proposal, last contact = today
`;
}
