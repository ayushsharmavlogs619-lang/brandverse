/**
 * BRANDVERSE SALES SYSTEM — email generators for local business outreach.
 * Niche-aware cold emails, follow-ups, and proposal-sent notes.
 */

export interface EmailContext {
  business: string;
  owner: string;
  city: string;
  niche: string;
  painPoint: string;
}

export function buildColdEmail(ctx: EmailContext): { subject: string; body: string } {
  return {
    subject: `The ${ctx.painPoint.toLowerCase()} fix for ${ctx.business} (${ctx.city})`,
    body: `Hi ${ctx.owner},

I'll keep this short — I know ${ctx.business} has better things to do than read cold emails.

We build AI voice agents for ${ctx.niche.toLowerCase()} businesses like yours in ${ctx.city}. Instead of a voicemail saying "we'll call you back," ${ctx.business} could answer every call instantly, book appointments, and capture the caller's details — even after hours.

I've heard a few ${ctx.niche.toLowerCase()} owners mention ${ctx.painPoint.toLowerCase()} lately. That's exactly what our agents solve — usually in the first week.

If you want, I can send a 2-minute breakdown of what your missed calls are costing you. No call required, no commitment.

— Ayush
Brandverse · brandverse.tech`,
  };
}

export function buildFollowUpEmail(ctx: EmailContext): { subject: string; body: string } {
  return {
    subject: `Re: The ${ctx.painPoint.toLowerCase()} fix for ${ctx.business}`,
    body: `Hi ${ctx.owner},

Just floating this back up in case my last email got buried.

Here's the short version: ${ctx.business} misses calls it shouldn't — and every one of those calls was a customer who tried to give you money.

An AI agent from Brandverse answers in one ring, 24/7, books jobs and captures caller info. Local ${ctx.niche.toLowerCase()} businesses have recovered thousands by doing exactly this.

If it's not a good time, no problem — I'll check back in a month. If you want to see the numbers, just reply "breakdown" and I'll send it over.

— Ayush
Brandverse · brandverse.tech`,
  };
}

export function buildProposalEmail(ctx: EmailContext): { subject: string; body: string } {
  return {
    subject: `Proposal for ${ctx.business} — AI Voice Agent`,
    body: `Hi ${ctx.owner},

Thanks again for the call — really enjoyed hearing about ${ctx.business}.

As promised, here's the proposal. The short version:

• An AI voice agent that answers every call 24/7
• Books appointments and captures caller details
• Full setup, training on your services, and monitoring included
• Pilot period so you only pay once you see it work

Reply "yes" to get started, or "questions" and I'll answer anything. This proposal is valid until the date shown — after that we'll reconfirm pricing.

— Ayush
Brandverse · brandverse.tech`,
  };
}

export const EMAIL_PAIN_POINT_OPTIONS = [
  'Missing calls after hours',
  'Losing leads to voicemail',
  'No online booking',
  'Slow response to inquiries',
  'High no-show rate',
];
