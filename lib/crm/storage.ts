/**
 * BRANDVERSE CREATOR OUTREACH ENGINE — persistence layer.
 * Pure client-side JSON storage (localStorage) with defensive fallbacks,
 * JSON export/import for backup, and sample data seeding.
 */

import type {
  ConversationMessage,
  Creator,
  CreatorInput,
  FollowUpReminder,
} from './types';

const STORAGE_KEY = 'brandverse.crm.creators.v1';
const SEED_FLAG_KEY = 'brandverse.crm.seeded.v1';

export function uid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function hoursAgo(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// Sample data (first run only, so the pipeline is never empty)
// ---------------------------------------------------------------------------

function buildSampleCreators(): Creator[] {
  const now = Date.now();
  const mk = (
    name: string,
    stage: Creator['stage'],
    platform: Creator['platform'],
    followers: number | null,
    country: string,
    extra: Partial<Creator> & { daysInStage: number }
  ): Creator => ({
    id: uid(),
    name,
    stage,
    status: stage === 'won' || stage === 'lost' ? 'closed' : 'active',
    platform,
    followers,
    country,
    email: '',
    instagram: '',
    x: '',
    reddit: '',
    agency: '',
    notes: '',
    painPoints: [],
    servicesInterested: [],
    pricingDiscussed: '',
    dealValue: null,
    lastContact: null,
    nextFollowUp: null,
    conversation: [],
    reminders: [],
    createdAt: new Date(now - extra.daysInStage * 86400000 * 2).toISOString(),
    updatedAt: new Date(now - extra.daysInStage * 86400000).toISOString(),
    stageChangedAt: daysFromNow(-extra.daysInStage),
    ...extra,
  });

  return [
    mk('Mia Carter', 'won', 'Instagram', 128000, 'United States', {
      daysInStage: 12,
      email: 'mia@miascontent.com',
      instagram: '@miacarter',
      x: '@miacarter',
      agency: 'Fresh Talent Mgmt',
      followers: 128000,
      country: 'United States',
      dealValue: 4500,
      servicesInterested: ['onlyfans-management', 'content-management'],
      painPoints: ['Fans want more exclusivity', 'No time to create content'],
      pricingDiscussed: '$4,500/mo — 20% of OnlyFans rev share + content package',
      lastContact: hoursAgo(30),
      nextFollowUp: daysFromNow(6),
      conversation: [
        {
          id: uid(),
          type: 'outbound',
          channel: 'instagram',
          content:
            'Hey Mia! Your reels are fire — saw you mention fans asking for exclusive content. We handle that side for creators so you can keep filming. Open to a quick call?',
          date: hoursAgo(240),
        },
        {
          id: uid(),
          type: 'inbound',
          channel: 'instagram',
          content: 'Yes!! So interested. DMing you my email now.',
          date: hoursAgo(220),
        },
        {
          id: uid(),
          type: 'call',
          channel: 'call',
          content: 'Discovery call — locked scope: OnlyFans management + 8 reels/mo. She wants to start in 2 weeks.',
          date: hoursAgo(120),
        },
      ],
      notes:
        'Prefers Telegram over email. Budget confirmed. Signed contract — kickoff call booked for Monday.',
      reminders: [{ id: uid(), dueDate: daysFromNow(6), note: 'Kickoff call check-in', completed: false }],
    }),
    mk('Jake Torres', 'proposal', 'TikTok', 342000, 'Canada', {
      daysInStage: 4,
      email: 'jake.torres@gmail.com',
      instagram: '@jaketorres',
      x: '@jaketorres',
      dealValue: 2800,
      servicesInterested: ['social-growth', 'automation'],
      painPoints: ['Low engagement', 'Missing leads after hours'],
      pricingDiscussed: '$2,800/mo — growth + auto-reply system',
      lastContact: hoursAgo(50),
      nextFollowUp: daysFromNow(2),
      conversation: [
        {
          id: uid(),
          type: 'outbound',
          channel: 'email',
          content: 'Hi Jake, proposal attached...',
          date: hoursAgo(50),
        },
      ],
      notes: 'Asked to compare us with his current VA. Wants a payment plan option.',
      reminders: [{ id: uid(), dueDate: daysFromNow(2), note: 'Follow up on proposal', completed: false }],
    }),
    mk('Sofia Reyes', 'discovery', 'YouTube', 890000, 'Mexico', {
      daysInStage: 3,
      email: 'hello@sofiareyes.mx',
      instagram: '@sofiareyes',
      x: '@sofia_reyes',
      reddit: 'u/sofiareyes',
      agency: 'Latam Creators',
      servicesInterested: ['lead-generation', 'ai-receptionist'],
      painPoints: ['Missing leads after hours', 'Scheduling calls manually'],
      pricingDiscussed: 'TBD on call',
      lastContact: hoursAgo(8),
      nextFollowUp: daysFromNow(1),
      conversation: [
        {
          id: uid(),
          type: 'outbound',
          channel: 'x',
          content: 'Hi Sofia — love the collab channel. DMed you about the AI receptionist idea.',
          date: hoursAgo(72),
        },
        {
          id: uid(),
          type: 'inbound',
          channel: 'email',
          content: 'Sounds perfect. Booked the call for Friday 11am EST.',
          date: hoursAgo(30),
        },
      ],
      notes: 'Call Friday. Spanish + English — needs bilingual agent.',
    }),
    mk('Liam O’Brien', 'replied', 'X', 54000, 'Ireland', {
      daysInStage: 2,
      email: 'liam@obrienmedia.ie',
      x: '@liamobrien',
      servicesInterested: ['automation'],
      painPoints: ['Inconsistent posting'],
      pricingDiscussed: '',
      lastContact: hoursAgo(20),
      nextFollowUp: daysFromNow(3),
      conversation: [
        {
          id: uid(),
          type: 'outbound',
          channel: 'x',
          content: 'Hey Liam, saw your thread on automation — we build exactly this for creators. Open to a chat?',
          date: hoursAgo(60),
        },
        {
          id: uid(),
          type: 'inbound',
          channel: 'x',
          content: 'Interesting! What does the setup look like?',
          date: hoursAgo(20),
        },
      ],
      notes: 'Wants a 2-min Loom explainer before any call.',
    }),
    mk('Priya Sharma', 'contacted', 'Instagram', 210000, 'India', {
      daysInStage: 6,
      email: 'priya.sharma.creator@gmail.com',
      instagram: '@priyacreates',
      servicesInterested: ['content-management'],
      painPoints: ['No time to create content'],
      pricingDiscussed: '',
      lastContact: hoursAgo(100),
      nextFollowUp: daysFromNow(1),
      conversation: [
        {
          id: uid(),
          type: 'outbound',
          channel: 'instagram',
          content: 'Hey Priya — 5 posts a week plus brand collabs is a lot alone. We handle the pipeline for creators. Interested?',
          date: hoursAgo(100),
        },
      ],
      notes: 'No reply yet. Timezone IST — send follow-up in morning IST.',
    }),
    mk('Noah Kim', 'prospect', 'Twitch', 76000, 'South Korea', {
      daysInStage: 9,
      x: '@noahkimtv',
      servicesInterested: ['ai-receptionist'],
      painPoints: ['Drowning in DMs'],
      pricingDiscussed: '',
      nextFollowUp: daysFromNow(4),
    }),
    mk('Ava Thompson', 'lost', 'Reddit', 1200000, 'United Kingdom', {
      daysInStage: 20,
      email: 'ava@avathompson.uk',
      reddit: 'u/avathompson',
      dealValue: 0,
      servicesInterested: ['paid-ads'],
      painPoints: ['Budget constraints'],
      pricingDiscussed: 'Wanted $1,200/mo — our floor is $2,000.',
      lastContact: hoursAgo(400),
      conversation: [
        {
          id: uid(),
          type: 'outbound',
          channel: 'email',
          content: 'Proposal sent at $2,000/mo for paid ads + funnel.',
          date: hoursAgo(420),
        },
        {
          id: uid(),
          type: 'inbound',
          channel: 'email',
          content: 'Appreciate the proposal — over budget this quarter. Maybe Q4.',
          date: hoursAgo(400),
        },
      ],
      notes: 'Revisit in Q4. Kept on list — likes us, just timing.',
    }),
  ];
}

// ---------------------------------------------------------------------------
// Core storage API
// ---------------------------------------------------------------------------

function safeRead(): Creator[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = buildSampleCreators();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      window.localStorage.setItem(SEED_FLAG_KEY, '1');
      return seeded;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('[CRM] Failed to read storage:', error);
    return [];
  }
}

function safeWrite(creators: Creator[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(creators));
  } catch (error) {
    console.error('[CRM] Failed to write storage:', error);
  }
}

export function isSampleDataLoaded(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(SEED_FLAG_KEY) === '1';
}

export function loadCreators(): Creator[] {
  return safeRead();
}

export function saveCreators(creators: Creator[]): void {
  safeWrite(creators);
}

export function createCreator(input: CreatorInput): Creator {
  const now = new Date().toISOString();
  return {
    ...input,
    id: uid(),
    conversation: [],
    reminders: [],
    createdAt: now,
    updatedAt: now,
    stageChangedAt: now,
  };
}

export function toInput(creator: Creator): CreatorInput {
  const { id, createdAt, updatedAt, stageChangedAt, conversation, reminders, ...rest } = creator;
  void id;
  void createdAt;
  void updatedAt;
  void stageChangedAt;
  void conversation;
  void reminders;
  return rest;
}

export function addMessageToCreator(
  creator: Creator,
  message: Omit<ConversationMessage, 'id' | 'date'>
): Creator {
  return {
    ...creator,
    conversation: [
      ...creator.conversation,
      { ...message, id: uid(), date: new Date().toISOString() },
    ],
    updatedAt: new Date().toISOString(),
  };
}

export function addReminderToCreator(
  creator: Creator,
  reminder: Omit<FollowUpReminder, 'id' | 'completed'>
): Creator {
  return {
    ...creator,
    reminders: [
      ...creator.reminders,
      { ...reminder, id: uid(), completed: false },
    ],
    updatedAt: new Date().toISOString(),
  };
}

export function toggleReminder(creator: Creator, reminderId: string): Creator {
  return {
    ...creator,
    reminders: creator.reminders.map((r) =>
      r.id === reminderId ? { ...r, completed: !r.completed } : r
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function deleteReminder(creator: Creator, reminderId: string): Creator {
  return {
    ...creator,
    reminders: creator.reminders.filter((r) => r.id !== reminderId),
    updatedAt: new Date().toISOString(),
  };
}

export function clearAllCreators(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(SEED_FLAG_KEY);
  } catch (error) {
    console.error('[CRM] Failed to clear storage:', error);
  }
}

export function exportCreatorsToJson(creators: Creator[]): void {
  const blob = new Blob([JSON.stringify(creators, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `brandverse-crm-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseCreatorsJson(text: string): Creator[] {
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed)) throw new Error('Backup file must be an array of creators');
  return parsed.map((item: Partial<Creator>) => ({
    id: typeof item.id === 'string' ? item.id : uid(),
    name: typeof item.name === 'string' ? item.name : 'Unknown Creator',
    stage: item.stage ?? 'prospect',
    status: item.status ?? 'active',
    platform: item.platform ?? 'Other',
    followers: typeof item.followers === 'number' ? item.followers : null,
    country: item.country ?? '',
    email: item.email ?? '',
    instagram: item.instagram ?? '',
    x: item.x ?? '',
    reddit: item.reddit ?? '',
    agency: item.agency ?? '',
    notes: item.notes ?? '',
    painPoints: Array.isArray(item.painPoints) ? item.painPoints : [],
    servicesInterested: Array.isArray(item.servicesInterested) ? item.servicesInterested : [],
    pricingDiscussed: item.pricingDiscussed ?? '',
    dealValue: typeof item.dealValue === 'number' ? item.dealValue : null,
    lastContact: item.lastContact ?? null,
    nextFollowUp: item.nextFollowUp ?? null,
    conversation: Array.isArray(item.conversation) ? item.conversation : [],
    reminders: Array.isArray(item.reminders) ? item.reminders : [],
    createdAt: item.createdAt ?? new Date().toISOString(),
    updatedAt: item.updatedAt ?? new Date().toISOString(),
    stageChangedAt: item.stageChangedAt ?? new Date().toISOString(),
  }));
}
