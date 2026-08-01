/**
 * BRANDVERSE SALES SYSTEM — data model & constants.
 * Covers: business lead prospecting, proposals, contracts, objections,
 * demo/cold-call scripts, pricing, discovery notes, follow-up scheduling.
 */

// ---------------------------------------------------------------------------
// Local business leads (prospecting system)
// ---------------------------------------------------------------------------

export type LeadStage =
  | 'prospect'
  | 'contacted'
  | 'qualified'
  | 'meeting'
  | 'proposal'
  | 'won'
  | 'lost';

export type LeadStatus = 'active' | 'on-hold' | 'closed';

export interface BusinessLead {
  id: string;
  business: string;
  owner: string;
  phone: string;
  email: string;
  website: string;
  rating: number | null; // Google rating 0–5
  niche: string;
  city: string;
  state: string;
  country: string;
  painPoints: string[];
  notes: string;
  stage: LeadStage;
  status: LeadStatus;
  lastContact: string | null;
  nextFollowUp: string | null;
  proposal: string; // link/description of sent proposal
  revenue: number | null; // expected monthly revenue
  createdAt: string;
  updatedAt: string;
  stageChangedAt: string;
}

export type BusinessLeadInput = Omit<
  BusinessLead,
  'id' | 'createdAt' | 'updatedAt' | 'stageChangedAt'
>;

export const LEAD_STAGES: LeadStage[] = [
  'prospect',
  'contacted',
  'qualified',
  'meeting',
  'proposal',
  'won',
  'lost',
];

export const LEAD_STAGE_META: Record<
  LeadStage,
  { label: string; blurb: string; dot: string; badge: string; chip: string; columnHeader: string }
> = {
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
    blurb: 'First touch made',
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    chip: 'bg-blue-500/15 text-blue-300',
    columnHeader: 'border-blue-500/40',
  },
  qualified: {
    label: 'Qualified',
    blurb: 'Fits our ICP',
    dot: 'bg-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    chip: 'bg-cyan-500/15 text-cyan-300',
    columnHeader: 'border-cyan-500/40',
  },
  meeting: {
    label: 'Meeting',
    blurb: 'Discovery call done',
    dot: 'bg-purple-400',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    chip: 'bg-purple-500/15 text-purple-300',
    columnHeader: 'border-purple-500/40',
  },
  proposal: {
    label: 'Proposal',
    blurb: 'Sent, awaiting decision',
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

export const LEAD_STATUS_META: Record<LeadStatus, { label: string; chip: string }> = {
  active: { label: 'Active', chip: 'bg-emerald-500/15 text-emerald-300' },
  'on-hold': { label: 'On Hold', chip: 'bg-amber-500/15 text-amber-300' },
  closed: { label: 'Closed', chip: 'bg-zinc-500/15 text-zinc-400' },
};

export const BUSINESS_NICHES = [
  'Electrician',
  'Plumbing',
  'HVAC',
  'Roofing',
  'Dental',
  'Medical Spa',
  'Salon & Spa',
  'Auto Repair',
  'Restaurant',
  'Gym & Fitness',
  'Law Firm',
  'Real Estate',
  'Cleaning Services',
  'Landscaping',
  'Home Security',
  'Other',
];

export const LEAD_PAIN_POINTS = [
  'Missing calls after hours',
  'Losing leads to voicemail',
  'No online booking system',
  'Slow response to inquiries',
  'Low Google rating',
  'High no-show rate',
  'Manual scheduling headaches',
  'Relying on one person for everything',
  'No follow-up process',
  'Don\u2019t know where leads come from',
];

// ---------------------------------------------------------------------------
// Objection library
// ---------------------------------------------------------------------------

export type ObjectionCategory =
  | 'price'
  | 'need'
  | 'time'
  | 'trust'
  | 'competition'
  | 'existing-solution'
  | 'procurement'
  | 'other';

export interface Objection {
  id: string;
  category: ObjectionCategory;
  title: string;
  objection: string;
  response: string;
  notes: string;
  createdAt: string;
}

export const OBJECTION_CATEGORIES: { id: ObjectionCategory; label: string }[] = [
  { id: 'price', label: 'Price / Budget' },
  { id: 'need', label: 'No Need' },
  { id: 'time', label: 'Timing' },
  { id: 'trust', label: 'Trust / Credibility' },
  { id: 'competition', label: 'Competition' },
  { id: 'existing-solution', label: 'Already Have Something' },
  { id: 'procurement', label: 'Procurement / Paperwork' },
  { id: 'other', label: 'Other' },
];

// ---------------------------------------------------------------------------
// Proposal / contract / pricing
// ---------------------------------------------------------------------------

export interface ProposalData {
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  serviceName: string;
  description: string;
  deliverables: string[];
  oneTimeFee: number | null;
  monthlyFee: number | null;
  setupFee: number | null;
  paymentTerms: string;
  validUntil: string; // ISO date
  notes: string;
  preparedBy: string;
  preparedByTitle: string;
}

export interface ContractData {
  clientName: string;
  clientCompany: string;
  serviceName: string;
  scope: string;
  monthlyFee: number | null;
  oneTimeFee: number | null;
  termMonths: number;
  paymentTerms: string;
  ipClause: string;
  cancellation: string;
  liability: string;
  effectiveDate: string; // ISO date
  clientAddress: string;
}

export interface PricingLine {
  id: string;
  name: string;
  type: 'one-time' | 'monthly';
  amount: number;
  qty: number;
}

export const PRICING_PRESETS: { name: string; type: PricingLine['type']; amount: number; description: string }[] = [
  { name: 'AI Voice Agent — Starter', type: 'monthly', amount: 399, description: 'Up to 1,000 minutes/mo, 1 flow' },
  { name: 'AI Voice Agent — Pro', type: 'monthly', amount: 799, description: 'Unlimited minutes, 3 flows' },
  { name: 'AI Voice Agent — Enterprise', type: 'monthly', amount: 1499, description: 'Multi-location, custom flows' },
  { name: 'Setup & Onboarding', type: 'one-time', amount: 499, description: 'One-time setup fee' },
  { name: 'Business Automation', type: 'monthly', amount: 299, description: 'CRM + booking automation' },
  { name: 'Website Development', type: 'one-time', amount: 1500, description: '5-page lead-gen site' },
  { name: 'Paid Ads Management', type: 'monthly', amount: 500, description: '+ ad spend' },
  { name: 'Social Media Management', type: 'monthly', amount: 800, description: '8 posts + engagement' },
];

// ---------------------------------------------------------------------------
// Discovery notes
// ---------------------------------------------------------------------------

export interface DiscoveryNote {
  id: string;
  company: string;
  owner: string;
  industry: string;
  date: string; // ISO
  currentSituation: string;
  howManyCalls: string;
  bookingProcess: string;
  toolsUsed: string;
  decisionMaker: string;
  painPoints: string[];
  budgetRange: string;
  timeline: string;
  nextSteps: string;
  notes: string;
}

// ---------------------------------------------------------------------------
// Follow-up tasks
// ---------------------------------------------------------------------------

export interface FollowupTask {
  id: string;
  contact: string;
  company: string;
  channel: 'call' | 'email' | 'dm' | 'visit';
  dueDate: string; // ISO
  note: string;
  completed: boolean;
  createdAt: string;
}

export const FOLLOWUP_CHANNELS: { id: FollowupTask['channel']; label: string }[] = [
  { id: 'call', label: 'Call' },
  { id: 'email', label: 'Email' },
  { id: 'dm', label: 'DM' },
  { id: 'visit', label: 'Walk-in' },
];

// ---------------------------------------------------------------------------
// Saved scripts & docs
// ---------------------------------------------------------------------------

export interface SavedScript {
  id: string;
  kind: 'demo' | 'cold-call';
  title: string;
  content: string;
  createdAt: string;
}

export interface SavedDocument {
  id: string;
  kind: 'proposal' | 'contract';
  title: string;
  data: ProposalData | ContractData;
  createdAt: string;
}
