/**
 * BRANDVERSE CREATOR OUTREACH ENGINE — Data model & constants.
 * Client-side CRM. Data persists in localStorage as JSON (no auth, no backend).
 */

export type Stage =
  | 'prospect'
  | 'contacted'
  | 'replied'
  | 'discovery'
  | 'proposal'
  | 'won'
  | 'lost';

export type Status = 'active' | 'on-hold' | 'closed';

export type Platform =
  | 'Instagram'
  | 'YouTube'
  | 'TikTok'
  | 'X'
  | 'Reddit'
  | 'Twitch'
  | 'OnlyFans'
  | 'Snapchat'
  | 'Other';

export type ServiceId =
  | 'ai-receptionist'
  | 'onlyfans-management'
  | 'content-management'
  | 'lead-generation'
  | 'automation'
  | 'paid-ads'
  | 'social-growth'
  | 'other';

export type MessageChannel = 'instagram' | 'email' | 'x' | 'call' | 'internal';

export type MessageType = 'outbound' | 'inbound' | 'call' | 'note';

export interface ConversationMessage {
  id: string;
  type: MessageType;
  channel: MessageChannel;
  content: string;
  date: string; // ISO timestamp
}

export interface FollowUpReminder {
  id: string;
  dueDate: string; // ISO date
  note: string;
  completed: boolean;
}

export interface Creator {
  id: string;
  name: string;
  stage: Stage;
  status: Status;
  platform: Platform;
  followers: number | null;
  country: string;
  email: string;
  instagram: string;
  x: string;
  reddit: string;
  agency: string;
  notes: string;
  painPoints: string[];
  servicesInterested: ServiceId[];
  pricingDiscussed: string;
  dealValue: number | null;
  lastContact: string | null; // ISO
  nextFollowUp: string | null; // ISO date
  conversation: ConversationMessage[];
  reminders: FollowUpReminder[];
  createdAt: string;
  updatedAt: string;
  stageChangedAt: string;
}

export type CreatorInput = Omit<
  Creator,
  'id' | 'createdAt' | 'updatedAt' | 'stageChangedAt' | 'conversation' | 'reminders'
> & {
  conversation?: ConversationMessage[];
  reminders?: FollowUpReminder[];
};

// ---------------------------------------------------------------------------
// Pipeline definition
// ---------------------------------------------------------------------------

export const STAGES: Stage[] = [
  'prospect',
  'contacted',
  'replied',
  'discovery',
  'proposal',
  'won',
  'lost',
];

interface StageMeta {
  label: string;
  blurb: string;
  dot: string;
  badge: string;
  chip: string;
  columnHeader: string;
}

export const STAGE_META: Record<Stage, StageMeta> = {
  prospect: {
    label: 'Prospect',
    blurb: 'Not yet reached out',
    dot: 'bg-zinc-400',
    badge: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/30',
    chip: 'bg-zinc-500/15 text-zinc-300',
    columnHeader: 'border-zinc-500/40',
  },
  contacted: {
    label: 'Contacted',
    blurb: 'First message sent',
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    chip: 'bg-blue-500/15 text-blue-300',
    columnHeader: 'border-blue-500/40',
  },
  replied: {
    label: 'Replied',
    blurb: 'They responded',
    dot: 'bg-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    chip: 'bg-cyan-500/15 text-cyan-300',
    columnHeader: 'border-cyan-500/40',
  },
  discovery: {
    label: 'Discovery Call',
    blurb: 'Call booked',
    dot: 'bg-purple-400',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    chip: 'bg-purple-500/15 text-purple-300',
    columnHeader: 'border-purple-500/40',
  },
  proposal: {
    label: 'Proposal Sent',
    blurb: 'Waiting on decision',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    chip: 'bg-amber-500/15 text-amber-300',
    columnHeader: 'border-amber-500/40',
  },
  won: {
    label: 'Won',
    blurb: 'Client closed',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    chip: 'bg-emerald-500/15 text-emerald-300',
    columnHeader: 'border-emerald-500/40',
  },
  lost: {
    label: 'Lost',
    blurb: 'Did not close',
    dot: 'bg-red-400',
    badge: 'bg-red-500/10 text-red-300 border-red-500/30',
    chip: 'bg-red-500/15 text-red-300',
    columnHeader: 'border-red-500/40',
  },
};

export const STATUS_META: Record<Status, { label: string; chip: string }> = {
  active: { label: 'Active', chip: 'bg-emerald-500/15 text-emerald-300' },
  'on-hold': { label: 'On Hold', chip: 'bg-amber-500/15 text-amber-300' },
  closed: { label: 'Closed', chip: 'bg-zinc-500/15 text-zinc-400' },
};

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

export const PLATFORMS: Platform[] = [
  'Instagram',
  'YouTube',
  'TikTok',
  'X',
  'Reddit',
  'Twitch',
  'OnlyFans',
  'Snapchat',
  'Other',
];

export interface ServiceOption {
  id: ServiceId;
  label: string;
}

export const SERVICES: ServiceOption[] = [
  { id: 'ai-receptionist', label: 'AI Voice Agent / Receptionist' },
  { id: 'onlyfans-management', label: 'OnlyFans Management' },
  { id: 'content-management', label: 'Content Management' },
  { id: 'lead-generation', label: 'Lead Generation' },
  { id: 'automation', label: 'Business Automation' },
  { id: 'paid-ads', label: 'Paid Ads' },
  { id: 'social-growth', label: 'Social Growth' },
  { id: 'other', label: 'Other' },
];

export const PAIN_POINT_SUGGESTIONS = [
  'Drowning in DMs / messages',
  'No time to create content',
  'Inconsistent posting',
  'Low engagement',
  'Fans want more exclusivity',
  'Not converting audience to revenue',
  'Scheduling calls / bookings manually',
  'Missing leads after hours',
  'Wanting more brand deals',
  'No growth strategy',
];

export function serviceLabel(id: ServiceId): string {
  return SERVICES.find((s) => s.id === id)?.label ?? id;
}

export function isAfterOrEqual(stage: Stage, reference: Stage): boolean {
  const rank: Record<Stage, number> = {
    prospect: 0,
    contacted: 1,
    replied: 2,
    discovery: 3,
    proposal: 4,
    won: 5,
    lost: 5,
  };
  return rank[stage] >= rank[reference];
}
