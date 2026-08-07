'use client';

import { useState } from 'react';
import { CalendarPlus, Check, X } from 'lucide-react';
import type { FollowupTask } from '@/lib/sales/types';
import { FOLLOWUP_CHANNELS } from '@/lib/sales/types';
import { uid } from '@/lib/sales/storage';
import { COLLECTIONS } from '@/lib/sales/storage';
import { formatDateTime, isOverdue } from '@/lib/crm/format';
import { EmptyState, FieldLabel, inputClass } from '@/app/crm/components/ui';
import { type CollectionApi, useCollection } from '@/lib/sales/hooks';

export default function FollowupsPage() {
  const tasks = useCollection<FollowupTask>(COLLECTIONS.followups);
  const [form, setForm] = useState({ contact: '', company: '', channel: 'call' as FollowupTask['channel'], dueDate: '', note: '' });

  const add = () => {
    if (!form.dueDate) return;
    tasks.add({
      id: uid(),
      contact: form.contact.trim() || 'Contact',
      company: form.company.trim(),
      channel: form.channel,
      dueDate: new Date(`${form.dueDate}T12:00:00`).toISOString(),
      note: form.note.trim() || 'Follow up',
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setForm({ contact: '', company: '', channel: 'call', dueDate: '', note: '' });
  };

  const overdue = tasks.items
    .filter((t) => !t.completed && isOverdue(t.dueDate))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const upcoming = tasks.items
    .filter((t) => !t.completed && !isOverdue(t.dueDate))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const done = tasks.items.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Follow-up <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">Scheduler</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Deals die from silence. Schedule every touchpoint here.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <FieldLabel>Contact</FieldLabel>
            <input className={inputClass} value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} placeholder="e.g. Mike Carter" />
          </div>
          <div>
            <FieldLabel>Company</FieldLabel>
            <input className={inputClass} value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="e.g. Carter Electric" />
          </div>
          <div>
            <FieldLabel>Channel</FieldLabel>
            <select className={inputClass} value={form.channel} onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value as FollowupTask['channel'] }))}>
              {FOLLOWUP_CHANNELS.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Due Date</FieldLabel>
            <input type="date" className={inputClass} value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
          </div>
          <div className="flex items-end">
            <button
              onClick={add}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2.5 text-sm font-bold shadow-lg shadow-indigo-600/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <CalendarPlus className="w-4 h-4" /> Schedule
            </button>
          </div>
        </div>
        <input className={`${inputClass} mt-3`} value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} onKeyDown={(e) => { if (e.key === 'Enter') add(); }} placeholder="Follow-up note — what to say, what to send…" />
      </div>

      {tasks.items.length === 0 ? (
        <EmptyState title="Nothing scheduled" blurb="Schedule your first follow-up and never drop a deal again." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TaskColumn title="Overdue" count={overdue.length} tasks={overdue} api={tasks} tone="text-red-400" border="border-red-500/30" />
          <TaskColumn title="Upcoming" count={upcoming.length} tasks={upcoming} api={tasks} tone="text-cyan-400" border="border-cyan-500/30" />
          <TaskColumn title="Completed" count={done.length} tasks={done} api={tasks} tone="text-zinc-500" border="border-white/10" />
        </div>
      )}
    </div>
  );
}

function TaskColumn({
  title,
  count,
  tasks,
  api,
  tone,
  border,
}: {
  title: string;
  count: number;
  tasks: FollowupTask[];
  api: CollectionApi<FollowupTask>;
  tone: string;
  border: string;
}) {
  return (
    <div className={`rounded-2xl border ${border} bg-[#0a0a0f] p-5`}>
      <h2 className={`font-bold text-sm mb-3 ${tone}`}>{title} ({count})</h2>
      {tasks.length === 0 ? (
        <p className="text-xs text-zinc-600">None.</p>
      ) : (
        <div className="space-y-2.5">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} api={api} />
          ))}
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, api }: { task: FollowupTask; api: CollectionApi<FollowupTask> }) {
  const channelLabel = FOLLOWUP_CHANNELS.find((c) => c.id === task.channel)?.label ?? task.channel;
  const overdue = !task.completed && isOverdue(task.dueDate);
  return (
    <div
      className={`rounded-xl border p-3.5 ${
        task.completed
          ? 'border-white/5 bg-white/[0.02] opacity-50'
          : overdue
            ? 'border-red-500/30 bg-red-500/5'
            : 'border-white/10 bg-zinc-900/60'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => api.update(task.id, { completed: !task.completed })}
          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
            task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/25 hover:border-emerald-400'
          }`}
          title={task.completed ? 'Mark pending' : 'Mark done'}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className={`text-sm font-semibold truncate ${task.completed ? 'line-through' : ''}`}>
              {task.contact}
              {task.company && <span className="text-zinc-500 font-normal"> — {task.company}</span>}
            </p>
            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              {channelLabel}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">{task.note}</p>
          <p className={`text-[11px] mt-1 ${overdue ? 'text-red-400 font-semibold' : 'text-zinc-500'}`}>
            {formatDateTime(task.dueDate)}
            {overdue && ' — overdue'}
          </p>
        </div>
        <button
          onClick={() => api.remove(task.id)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
