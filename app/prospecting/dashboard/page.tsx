'use client';

import Link from 'next/link';
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  FileText,
  Handshake,
  PhoneCall,
  Star,
  TrendingUp,
} from 'lucide-react';
import { LEAD_STAGES, LEAD_STAGE_META } from '@/lib/sales/types';
import { useLeads } from '@/lib/sales/useLeads';
import { formatDateTime, isOverdue } from '@/lib/crm/format';
import { EmptyState } from '@/app/crm/components/ui';

const rank: Record<string, number> = {
  prospect: 0,
  contacted: 1,
  qualified: 2,
  meeting: 3,
  proposal: 4,
  won: 5,
  lost: 5,
};

export default function ProspectingDashboardPage() {
  const leads = useLeads();

  if (!leads.loaded) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const all = leads.leads;
  const atOrAfter = (stage: string) => all.filter((l) => rank[l.stage] >= rank[stage] && l.stage !== 'lost');
  const contacted = atOrAfter('contacted');
  const qualified = atOrAfter('qualified');
  const meetings = atOrAfter('meeting');
  const proposals = atOrAfter('proposal');
  const won = all.filter((l) => l.stage === 'won');
  const revenue = won.reduce((sum, l) => sum + (l.revenue ?? 0), 0);
  const conversion = contacted.length > 0 ? (won.length / contacted.length) * 100 : 0;
  const avgRating = all.filter((l) => l.rating).length
    ? all.filter((l) => l.rating).reduce((s, l) => s + (l.rating ?? 0), 0) / all.filter((l) => l.rating).length
    : 0;

  const metrics = [
    { label: 'Leads', value: String(all.length), sub: 'in database', icon: Building2, color: 'from-zinc-600/20 to-zinc-600/5 border-zinc-500/30 text-zinc-300' },
    { label: 'Contacted', value: String(contacted.length), sub: 'outreach sent', icon: PhoneCall, color: 'from-blue-600/20 to-blue-600/5 border-blue-500/30 text-blue-300' },
    { label: 'Qualified', value: String(qualified.length), sub: 'fit ICP', icon: Star, color: 'from-cyan-600/20 to-cyan-600/5 border-cyan-500/30 text-cyan-300' },
    { label: 'Meetings', value: String(meetings.length), sub: 'calls booked', icon: CalendarClock, color: 'from-purple-600/20 to-purple-600/5 border-purple-500/30 text-purple-300' },
    { label: 'Proposals', value: String(proposals.length), sub: 'sent', icon: FileText, color: 'from-amber-600/20 to-amber-600/5 border-amber-500/30 text-amber-300' },
    { label: 'Won', value: String(won.length), sub: 'clients', icon: Handshake, color: 'from-emerald-600/20 to-emerald-600/5 border-emerald-500/30 text-emerald-300' },
    { label: 'Revenue', value: `$${revenue.toLocaleString()}/mo`, sub: `avg rating ${avgRating.toFixed(1)}★`, icon: BadgeCheck, color: 'from-pink-600/20 to-pink-600/5 border-pink-500/30 text-pink-300' },
    { label: 'Conversion', value: `${conversion.toFixed(1)}%`, sub: 'won ÷ contacted', icon: TrendingUp, color: 'from-emerald-600/20 to-emerald-600/5 border-emerald-500/30 text-emerald-300' },
  ];

  const maxStage = Math.max(1, ...LEAD_STAGES.map((s) => all.filter((l) => l.stage === s).length));
  const dueFollowups = all
    .filter((l) => l.nextFollowUp && !isOverdue(l.nextFollowUp))
    .sort((a, b) => (a.nextFollowUp ?? '').localeCompare(b.nextFollowUp ?? ''))
    .slice(0, 6);
  const overdueFollowups = all.filter((l) => l.nextFollowUp && isOverdue(l.nextFollowUp)).slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Prospecting <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">The local business lead machine at a glance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className={`rounded-2xl border bg-gradient-to-br p-4 flex flex-col gap-3 ${m.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{m.label}</span>
              <m.icon className="w-4 h-4 opacity-70" />
            </div>
            <p className="text-2xl font-bold leading-none">{m.value}</p>
            <p className="text-[11px] opacity-60">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0f] p-6">
          <h2 className="font-bold mb-5">Pipeline Funnel</h2>
          <div className="space-y-3">
            {LEAD_STAGES.map((stage) => {
              const count = all.filter((l) => l.stage === stage).length;
              const pct = Math.max(count > 0 ? 3 : 0, (count / maxStage) * 100);
              return (
                <div key={stage} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-32 shrink-0">
                    <span className={`w-2 h-2 rounded-full ${LEAD_STAGE_META[stage].dot}`} />
                    <span className="text-xs font-medium text-zinc-300">{LEAD_STAGE_META[stage].label}</span>
                  </div>
                  <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden">
                    <div className={`h-full rounded-lg ${LEAD_STAGE_META[stage].dot} opacity-80 transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-8 text-right text-sm font-bold">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 space-y-5">
          <h2 className="font-bold">Follow-up Queue</h2>
          {overdueFollowups.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-red-400">Overdue ({overdueFollowups.length})</p>
              {overdueFollowups.map((l) => (
                <Link key={l.id} href="/prospecting" className="block rounded-xl bg-red-500/5 border border-red-500/30 p-3 hover:border-red-500/60 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold truncate">{l.business}</p>
                    <span className="text-[10px] font-bold text-red-400">{formatDateTime(l.nextFollowUp)}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">{l.owner || l.niche}</p>
                </Link>
              ))}
            </div>
          )}
          {dueFollowups.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Upcoming ({dueFollowups.length})</p>
              {dueFollowups.map((l) => (
                <Link key={l.id} href="/prospecting" className="block rounded-xl bg-zinc-900/60 border border-white/10 p-3 hover:border-white/25 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold truncate">{l.business}</p>
                    <span className="text-[10px] font-bold text-cyan-400">{formatDateTime(l.nextFollowUp)}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">{l.owner || l.niche}</p>
                </Link>
              ))}
            </div>
          )}
          {overdueFollowups.length === 0 && dueFollowups.length === 0 && (
            <EmptyState title="Nothing due" blurb="No pending follow-ups. Set them on each lead." />
          )}
        </div>
      </div>
    </div>
  );
}
