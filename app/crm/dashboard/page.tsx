'use client';

import Link from 'next/link';
import {
  BadgeCheck,
  CalendarClock,
  Handshake,
  MessageSquare,
  PhoneCall,
  TrendingUp,
  Users,
} from 'lucide-react';
import { STAGES, STAGE_META, isAfterOrEqual } from '@/lib/crm/types';
import { useCrm } from '@/lib/crm/useCrm';
import { formatCurrency, formatDateTime, isOverdue } from '@/lib/crm/format';
import { EmptyState } from '../components/ui';

export default function CrmDashboardPage() {
  const crm = useCrm();

  if (!crm.loaded) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const all = crm.creators;
  const contacted = all.filter((c) => isAfterOrEqual(c.stage, 'contacted') && c.stage !== 'lost');
  const replies = all.filter((c) => isAfterOrEqual(c.stage, 'replied') && c.stage !== 'lost');
  const calls = all.filter((c) => isAfterOrEqual(c.stage, 'discovery') && c.stage !== 'lost');
  const won = all.filter((c) => c.stage === 'won');
  const revenue = won.reduce((sum, c) => sum + (c.dealValue ?? 0), 0);
  const conversion = contacted.length > 0 ? (won.length / contacted.length) * 100 : 0;
  const avgDeal = won.length > 0 ? revenue / won.length : 0;

  const metrics = [
    {
      label: 'Creators Contacted',
      value: String(contacted.length),
      sub: `${all.length} total in pipeline`,
      icon: Users,
      color: 'from-blue-600/20 to-blue-600/5 border-blue-500/30 text-blue-300',
    },
    {
      label: 'Replies',
      value: String(replies.length),
      sub: contacted.length > 0 ? `${((replies.length / contacted.length) * 100).toFixed(0)}% reply rate` : 'No contacts yet',
      icon: MessageSquare,
      color: 'from-cyan-600/20 to-cyan-600/5 border-cyan-500/30 text-cyan-300',
    },
    {
      label: 'Calls Booked',
      value: String(calls.length),
      sub: replies.length > 0 ? `${((calls.length / replies.length) * 100).toFixed(0)}% of replies` : 'No replies yet',
      icon: PhoneCall,
      color: 'from-purple-600/20 to-purple-600/5 border-purple-500/30 text-purple-300',
    },
    {
      label: 'Deals Won',
      value: String(won.length),
      sub: 'Closed clients',
      icon: Handshake,
      color: 'from-emerald-600/20 to-emerald-600/5 border-emerald-500/30 text-emerald-300',
    },
    {
      label: 'Revenue',
      value: formatCurrency(revenue),
      sub: `Avg deal ${formatCurrency(avgDeal)}`,
      icon: BadgeCheck,
      color: 'from-amber-600/20 to-amber-600/5 border-amber-500/30 text-amber-300',
    },
    {
      label: 'Conversion',
      value: `${conversion.toFixed(1)}%`,
      sub: 'Won ÷ contacted',
      icon: TrendingUp,
      color: 'from-pink-600/20 to-pink-600/5 border-pink-500/30 text-pink-300',
    },
  ];

  const maxStage = Math.max(1, ...STAGES.map((s) => all.filter((c) => c.stage === s).length));
  const overdueReminders = all
    .flatMap((c) =>
      c.reminders
        .filter((r) => !r.completed && isOverdue(r.dueDate))
        .map((r) => ({ ...r, creator: c }))
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const upcomingReminders = all
    .flatMap((c) =>
      c.reminders
        .filter((r) => !r.completed && !isOverdue(r.dueDate))
        .map((r) => ({ ...r, creator: c }))
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Outreach <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Live snapshot of the creator outreach engine.</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className={`rounded-2xl border bg-gradient-to-br p-4 flex flex-col gap-3 ${m.color}`}
          >
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
        {/* Pipeline funnel */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0f] p-6">
          <h2 className="font-bold mb-5">Pipeline Funnel</h2>
          <div className="space-y-3">
            {STAGES.map((stage) => {
              const count = all.filter((c) => c.stage === stage).length;
              const pct = Math.max(count > 0 ? 3 : 0, (count / maxStage) * 100);
              return (
                <div key={stage} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-36 shrink-0">
                    <span className={`w-2 h-2 rounded-full ${STAGE_META[stage].dot}`} />
                    <span className="text-xs font-medium text-zinc-300">{STAGE_META[stage].label}</span>
                  </div>
                  <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className={`h-full rounded-lg ${STAGE_META[stage].dot} opacity-80 transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-bold">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Follow-ups */}
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 space-y-5">
          <h2 className="font-bold">Follow-up Queue</h2>
          {overdueReminders.length === 0 && upcomingReminders.length === 0 ? (
            <EmptyState title="Nothing due" blurb="No pending follow-up reminders. Add them from any creator profile." />
          ) : (
            <>
              {overdueReminders.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Overdue ({overdueReminders.length})
                  </p>
                  {overdueReminders.slice(0, 5).map((r) => (
                    <ReminderRow key={r.id} creatorName={r.creator.name} creatorId={r.creator.id} note={r.note} date={r.dueDate} />
                  ))}
                </div>
              )}
              {upcomingReminders.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Upcoming ({upcomingReminders.length})
                  </p>
                  {upcomingReminders.slice(0, 5).map((r) => (
                    <ReminderRow key={r.id} creatorName={r.creator.name} creatorId={r.creator.id} note={r.note} date={r.dueDate} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-6">
        <h2 className="font-bold mb-5">Recent Conversation Activity</h2>
        {all.length === 0 ? (
          <EmptyState
            title="No activity yet"
            blurb="Add creators and log conversations to see recent activity here."
            action={
              <Link
                href="/crm"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Go to Pipeline
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {all
              .flatMap((c) => c.conversation.map((m) => ({ ...m, creator: c })))
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 8)
              .map((m) => (
                <div key={m.id} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {m.creator.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <Link href={`/crm/creator?id=${m.creator.id}`} className="font-semibold text-blue-300 hover:underline">
                        {m.creator.name}
                      </Link>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          m.type === 'inbound'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : m.type === 'call'
                              ? 'bg-purple-500/15 text-purple-300'
                              : m.type === 'outbound'
                                ? 'bg-blue-500/15 text-blue-300'
                                : 'bg-zinc-500/15 text-zinc-400'
                        }`}
                      >
                        {m.type}
                      </span>
                      <span className="text-zinc-600">{formatDateTime(m.date)}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{m.content}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <p className="flex items-center gap-2 text-xs text-zinc-600">
        <CalendarClock className="w-3.5 h-3.5" />
        Data is stored locally in this browser (local JSON). Use Export in the Pipeline to back it up.
      </p>
    </div>
  );
}

function ReminderRow({
  creatorName,
  creatorId,
  note,
  date,
}: {
  creatorName: string;
  creatorId: string;
  note: string;
  date: string;
}) {
  const overdue = isOverdue(date);
  return (
    <Link
      href={`/crm/creator?id=${creatorId}`}
      className="block rounded-xl bg-zinc-900/60 border border-white/10 p-3 hover:border-white/25 transition-colors"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold truncate">{creatorName}</p>
        <span className={`text-[10px] font-bold ${overdue ? 'text-red-400' : 'text-cyan-400'}`}>
          {formatDateTime(date)}
        </span>
      </div>
      <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{note}</p>
    </Link>
  );
}
