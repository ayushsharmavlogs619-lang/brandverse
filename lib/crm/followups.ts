/**
 * BRANDVERSE CREATOR OUTREACH ENGINE — Follow-up generator.
 * Produces personalized outreach messages across channels, with a
 * progressive follow-up sequence (initial → #1 → #2 → final).
 */

import type { Creator, MessageChannel, ServiceId } from './types';

export interface GeneratedMessage {
  id: string;
  channel: 'instagram' | 'email' | 'x';
  label: string;
  sequence: 'initial' | 'followup-1' | 'followup-2' | 'final';
  subject?: string;
  body: string;
}

const BRAND = 'Brandverse';

function firstName(creator: Creator): string {
  return creator.name.trim().split(/\s+/)[0] || creator.name;
}

function followersText(creator: Creator): string {
  if (!creator.followers) return 'your audience';
  return `your ${formatCompact(creator.followers)} followers`;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 100_000 ? 0 : 1)}K`;
  return String(n);
}

interface ValueProp {
  headline: string;
  detail: string;
  proof: string;
}

function valueProp(service: ServiceId, creator: Creator): ValueProp {
  const f = followersText(creator);
  switch (service) {
    case 'ai-receptionist':
      return {
        headline: `an AI voice agent that answers every call and books appointments for you 24/7`,
        detail: `no more missing collab inquiries, bookings, or fan questions — the agent responds instantly, captures details, and calendars the call while you create.`,
        proof: `brands and creators we work with now recover calls they used to lose to voicemail — often 30%+ more booked conversations in the first month`,
      };
    case 'onlyfans-management':
      return {
        headline: `full OnlyFans management — DMs, posting, PPV, and revenue growth on autopilot`,
        detail: `we run the entire business side: personalized fan DMs, content scheduling, PPV campaigns, and promotion so you just film.`,
        proof: `creators on our roster typically see fan DM response times drop to under an hour and PPV revenue climb in the first 2–3 weeks`,
      };
    case 'content-management':
      return {
        headline: `a done-for-you content pipeline — planning, editing, and publishing`,
        detail: `your ideas become finished posts on schedule: scripts, hooks, edits, captions, and posting across ${followersText(creator)}, so you never stare at a blank calendar again.`,
        proof: `clients post 3–4× more consistently without spending extra hours in the edit bay`,
      };
    case 'lead-generation':
      return {
        headline: `turn ${f} into booked calls and paying clients`,
        detail: `we build the funnel — capture, qualify, and book — so every post you publish actually drives revenue instead of just views.`,
        proof: `our funnel setups have booked 100+ calls in a single month for a single creator`,
      };
    case 'automation':
      return {
        headline: `automation for the ops that eat your day — DMs, bookings, invoicing, onboarding`,
        detail: `we wire up the tools so replies go out instantly, calendars fill themselves, and you stop doing manual admin after midnight.`,
        proof: `clients routinely cut 10+ hours of weekly busywork after the first two weeks`,
      };
    case 'paid-ads':
      return {
        headline: `paid ads engineered for creators — growth and monetization that scales`,
        detail: `we design and run the campaigns, landing pages, and offers so ad spend turns into followers who actually buy.`,
        proof: `we typically get CAC down below $1.50 for creator funnels within 60 days`,
      };
    case 'social-growth':
      return {
        headline: `a growth system for ${f} — content strategy, hooks, and retention`,
        detail: `we audit, fix, and scale: retention edits, hook optimization, and posting strategy engineered for watch time and shares.`,
        proof: `creators we've scaled have seen follower growth accelerate 2–5× in a quarter`,
      };
    default:
      return {
        headline: `a done-for-you system that frees you up to create`,
        detail: `we handle the operational side of being a creator — so you can spend your time doing the only thing that actually matters: making great content.`,
        proof: `we build these systems for creators full-time, with measurable results in weeks`,
      };
  }
}

function initialInstagram(creator: Creator, service: ServiceId): GeneratedMessage {
  const vp = valueProp(service, creator);
  const hook = [
    `Hey ${firstName(creator)} 👋 love what you're building with ${creator.platform === 'X' ? 'X' : creator.platform}.`,
    `Hey ${firstName(creator)} 👋 just watched your latest post — genuinely impressive stuff.`,
    `Hey ${firstName(creator)} 👋 big fan of your page.`,
  ][creator.name.length % 3];

  return {
    id: `ig-${creator.id}`,
    channel: 'instagram',
    label: 'Instagram DM',
    sequence: 'initial',
    body: `${hook}

Quick one: we help creators set up ${vp.headline}, while you stay 100% focused on creating.

${vp.detail}

We're working with creators at a similar level to you right now and ${vp.proof}.

Would it be cool if I sent a short 2-min breakdown of how it'd work for you? No pressure at all 🙌`,
  };
}

function initialEmail(creator: Creator, service: ServiceId): GeneratedMessage {
  const vp = valueProp(service, creator);
  return {
    id: `email-${creator.id}`,
    channel: 'email',
    label: 'Email',
    sequence: 'initial',
    subject: `Helping creators like you scale — ${vp.headline.split(' — ')[0].replace(/^[a-z]/, (c) => c.toUpperCase())}`,
    body: `Hi ${firstName(creator)},

I run ${BRAND}, a team that helps creators set up ${vp.headline}.

You have ${creator.followers ? formatCompact(creator.followers) : 'a strong'} following on ${creator.platform}, and I noticed you're likely spending time on the operational side that we can take completely off your plate. ${vp.detail.charAt(0).toUpperCase()}${vp.detail.slice(1)}

A few real results from creators we work with:
• ${vp.proof}
• Most clients see an impact within the first 2–3 weeks, not months.

If it's useful, I can send a quick, no-strings breakdown of what we'd recommend for your specific situation — takes 2 minutes to read.

Either way, keep killing it.

— Ayush
${BRAND} (brandverse.tech)`,
  };
}

function initialX(creator: Creator, service: ServiceId): GeneratedMessage {
  const vp = valueProp(service, creator);
  return {
    id: `x-${creator.id}`,
    channel: 'x',
    label: 'X DM',
    sequence: 'initial',
    body: `Hey ${firstName(creator)} — we help creators set up ${vp.headline}. ${vp.detail.replace(/\.$/, '')} — open to a quick chat?`,
  };
}

function followUp1(creator: Creator, service: ServiceId): GeneratedMessage {
  const vp = valueProp(service, creator);
  return {
    id: `f1-${creator.id}`,
    channel: 'instagram',
    label: 'Follow-up #1',
    sequence: 'followup-1',
    body: `Hey ${firstName(creator)} — just floating this back up in case it got lost in your DMs 👀

We help creators set up ${vp.headline}. ${vp.detail.charAt(0).toUpperCase()}${vp.detail.slice(1)}

If you're busy, totally fine — I'll check back in a couple weeks. If it sounds interesting, just reply "details" and I'll send over the 2-min breakdown.`,
  };
}

function followUp2(creator: Creator, service: ServiceId): GeneratedMessage {
  const vp = valueProp(service, creator);
  return {
    id: `f2-${creator.id}`,
    channel: 'email',
    label: 'Follow-up #2',
    sequence: 'followup-2',
    subject: `One last thing on the ${creator.platform} growth note`,
    body: `Hi ${firstName(creator)},

I know outreach like this usually gets ignored, so I'll make this worth 30 seconds.

We recently finished onboarding a creator with a similar audience size — ${vp.proof}. It's exactly the setup we'd recommend for your situation, and it's the kind of thing where starting 2 weeks earlier is worth more than perfect timing.

If you'd like, I'll send the exact 3-step plan we use. No call needed, no pressure — just the plan.

Worst case, you know we exist if things get busy again.

— Ayush
${BRAND}`,
  };
}

function finalFollowUp(creator: Creator, service: ServiceId): GeneratedMessage {
  const vp = valueProp(service, creator);
  return {
    id: `final-${creator.id}`,
    channel: 'x',
    label: 'Final Follow-up',
    sequence: 'final',
    body: `Last message from me on this, promise ✌️

We help creators like you set up ${vp.headline}. If the timing isn't right, no hard feelings — creators usually circle back when the busy season hits.

My door stays open if you ever want the 2-min breakdown or just want to chat about it. Best of luck either way!`,
  };
}

export function generateFollowups(creator: Creator, service: ServiceId): GeneratedMessage[] {
  return [
    initialInstagram(creator, service),
    initialEmail(creator, service),
    initialX(creator, service),
    followUp1(creator, service),
    followUp2(creator, service),
    finalFollowUp(creator, service),
  ];
}

export function channelToLabel(channel: MessageChannel): string {
  switch (channel) {
    case 'instagram':
      return 'Instagram';
    case 'email':
      return 'Email';
    case 'x':
      return 'X';
    case 'call':
      return 'Call';
    default:
      return 'Internal note';
  }
}
