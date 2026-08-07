'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  AtSign,
  CalendarPlus,
  Check,
  Edit3,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  Trash2,
  X,
  Zap,
} from 'lucide-react';
import type { ConversationMessage, Stage } from '@/lib/crm/types';
import { STAGES, STAGE_META, serviceLabel } from '@/lib/crm/types';
import { channelToLabel } from '@/lib/crm/followups';
import { getCreator, useCrm } from '@/lib/crm/useCrm';
import {
  formatCompact,
  formatCurrency,
  formatDateTime,
  formatDate,
  initials,
  isOverdue,
} from '@/lib/crm/format';
import CreatorForm from '../components/CreatorForm';
import { EmptyState, StageBadge, StatusChip, inputClass } from '../components/ui';

export default function CreatorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" /></div>}>
      <CreatorProfile />
    </Suspense>
  );
}

function CreatorProfile() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const crm = useCrm();
  const id = searchParams.get('id');
  const creator = useMemo(() => getCreator(crm.creators, id), [crm.creators, id]);

  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(creator?.notes ?? '');
  const [notesSaved, setNotesSaved] = useState(false);
  const [newMessage, setNewMessage] = useState<{
    type: ConversationMessage['type'];
    channel: ConversationMessage['channel'];
    content: string;
  }>({ type: 'inbound', channel: 'instagram', content: '' });
  const [newReminder, setNewReminder] = useState({ date: '', note: '' });

  if (!crm.loaded) {
    return <div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" /></div>;
  }

  if (!creator) {
    return (
      <EmptyState
        title="Creator not found"
        blurb="This creator doesn't exist (anymore). Head back to the pipeline."
        action={
          <Link
            href="/crm"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Pipeline
          </Link>
        }
      />
    );
  }

  const handleStageChange = (stage: Stage) => {
    crm.setStage(creator.id, stage);
    router.replace(`/crm/creator?id=${creator.id}`);
  };

  const saveNotes = () => {
    crm.updateCreator(creator.id, { notes });
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const logMessage = () => {
    if (!newMessage.content.trim()) return;
    crm.addMessage(creator.id, {
      type: newMessage.type,
      channel: newMessage.channel,
      content: newMessage.content.trim(),
    });
    if (newMessage.type === 'outbound') {
      crm.updateCreator(creator.id, { lastContact: new Date().toISOString() });
    }
    setNewMessage((m) => ({ ...m, content: '' }));
  };

  const addReminder = () => {
    if (!newReminder.date) return;
    crm.addReminder(creator.id, {
      dueDate: new Date(`${newReminder.date}T12:00:00`).toISOString(),
      note: newReminder.note.trim() || 'Follow up',
    });
    if (!creator.nextFollowUp || isOverdue(creator.nextFollowUp)) {
      crm.updateCreator(creator.id, { nextFollowUp: new Date(`${newReminder.date}T12:00:00`).toISOString() });
    }
    setNewReminder({ date: '', note: '' });
  };

  const overdueReminders = creator.reminders.filter((r) => !r.completed && isOverdue(r.dueDate));
  const openReminders = creator.reminders.filter((r) => !r.completed && !isOverdue(r.dueDate));
  const doneReminders = creator.reminders.filter((r) => r.completed);

  return (
    <div className="space-y-6 max-w-5xl">
      <Link href="/crm" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Pipeline
      </Link>

      {/* Header card */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0a0f] to-blue-950/20 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-600/30">
              {initials(creator.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{creator.name}</h1>
                <StageBadge stage={creator.stage} />
                <StatusChip status={creator.status} />
              </div>
              <p className="text-sm text-zinc-400 mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>{creator.platform}</span>
                {creator.followers && <span>{formatCompact(creator.followers)} followers</span>}
                {creator.country && <span>{creator.country}</span>}
                {creator.agency && <span>{creator.agency}</span>}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={creator.stage}
              onChange={(e) => handleStageChange(e.target.value as Stage)}
              className="bg-zinc-900/80 border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  Move to: {STAGE_META[s].label}
                </option>
              ))}
            </select>
            <Link
              href={`/crm/outreach?id=${creator.id}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-pink-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4" /> Generate Follow-ups
            </Link>
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete ${creator.name} from the CRM?`)) {
                  crm.deleteCreator(creator.id);
                  router.push('/crm');
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ContactTile
          icon={<Mail className="w-4 h-4 text-blue-400" />}
          label="Email"
          value={creator.email}
          href={creator.email ? `mailto:${creator.email}` : undefined}
          placeholder="No email"
        />
        <ContactTile
          icon={<AtSign className="w-4 h-4 text-pink-400" />}
          label="Instagram"
          value={creator.instagram}
          href={creator.instagram ? `https://instagram.com/${creator.instagram.replace('@', '')}` : undefined}
          placeholder="No Instagram"
          external
        />
        <ContactTile
          icon={<AtSign className="w-4 h-4 text-cyan-400" />}
          label="X (Twitter)"
          value={creator.x}
          href={creator.x ? `https://x.com/${creator.x.replace('@', '')}` : undefined}
          placeholder="No X handle"
          external
        />
        <ContactTile
          icon={<AtSign className="w-4 h-4 text-orange-400" />}
          label="Reddit"
          value={creator.reddit}
          href={creator.reddit ? `https://reddit.com/user/${creator.reddit.replace(/^u\//, '')}` : undefined}
          placeholder="No Reddit"
          external
        />
        <ContactTile
          icon={<Globe className="w-4 h-4 text-emerald-400" />}
          label="Agency"
          value={creator.agency}
          placeholder="No agency"
        />
        <ContactTile
          icon={<MessageSquare className="w-4 h-4 text-amber-400" />}
          label="Deal Value"
          value={formatCurrency(creator.dealValue)}
          placeholder="No deal value yet"
        />
      </div>

      {/* Services + pain points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
          <h2 className="font-bold text-sm mb-3">Services Interested In</h2>
          {creator.servicesInterested.length === 0 ? (
            <p className="text-sm text-zinc-600">Not specified yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {creator.servicesInterested.map((s) => (
                <span key={s} className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs text-cyan-300">
                  {serviceLabel(s)}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
          <h2 className="font-bold text-sm mb-3">Pain Points</h2>
          {creator.painPoints.length === 0 ? (
            <p className="text-sm text-zinc-600">Not specified yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {creator.painPoints.map((p) => (
                <span key={p} className="rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs text-red-300">
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing + notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
          <h2 className="font-bold text-sm mb-3">Pricing Discussed</h2>
          <p className="text-sm text-zinc-300 whitespace-pre-wrap">{creator.pricingDiscussed || 'Nothing discussed yet.'}</p>
          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-zinc-500 mb-1">Last Contact</p>
              <p className="font-semibold">{formatDate(creator.lastContact)}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1">Next Follow-up</p>
              <p className={`font-semibold ${isOverdue(creator.nextFollowUp) ? 'text-red-400' : ''}`}>
                {formatDate(creator.nextFollowUp)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm">Notes</h2>
            <button
              onClick={saveNotes}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                notesSaved
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              {notesSaved ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              {notesSaved ? 'Saved' : 'Save'}
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setNotesSaved(false);
            }}
            placeholder="Anything worth remembering about this creator…"
            className={`${inputClass} min-h-[150px]`}
          />
        </div>
      </div>

      {/* Conversation history */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
        <h2 className="font-bold mb-4">Conversation History</h2>

        <div className="rounded-xl bg-zinc-900/60 border border-white/10 p-4 mb-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <select
              value={newMessage.type}
              onChange={(e) => setNewMessage((m) => ({ ...m, type: e.target.value as ConversationMessage['type'] }))}
              className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none"
            >
              <option value="inbound">Inbound (they wrote)</option>
              <option value="outbound">Outbound (we wrote)</option>
              <option value="call">Call</option>
              <option value="note">Internal note</option>
            </select>
            <select
              value={newMessage.channel}
              onChange={(e) => setNewMessage((m) => ({ ...m, channel: e.target.value as ConversationMessage['channel'] }))}
              className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none"
            >
              <option value="instagram">Instagram</option>
              <option value="email">Email</option>
              <option value="x">X</option>
              <option value="call">Phone call</option>
              <option value="internal">Internal</option>
            </select>
          </div>
          <div className="flex gap-2">
            <textarea
              value={newMessage.content}
              onChange={(e) => setNewMessage((m) => ({ ...m, content: e.target.value }))}
              placeholder="Log a message, call summary, or note…"
              className={`${inputClass} min-h-[70px]`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) logMessage();
              }}
            />
            <button
              onClick={logMessage}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 text-sm font-semibold hover:brightness-110 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4" /> Log
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-2">Tip: Ctrl/Cmd + Enter to log.</p>
        </div>

        {creator.conversation.length === 0 ? (
          <EmptyState title="No conversations yet" blurb="Log the first touchpoint above — every interaction counts." />
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {[...creator.conversation]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.type === 'inbound' ? '' : ''}`}
                >
                  <div className={`w-2 shrink-0 rounded-full mt-1 ${m.type === 'inbound' ? 'bg-emerald-500/60' : m.type === 'outbound' ? 'bg-blue-500/60' : m.type === 'call' ? 'bg-purple-500/60' : 'bg-zinc-500/60'}`} />
                  <div className="flex-1 rounded-xl bg-zinc-900/60 border border-white/10 p-3.5">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          m.type === 'inbound'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : m.type === 'outbound'
                              ? 'bg-blue-500/15 text-blue-300'
                              : m.type === 'call'
                                ? 'bg-purple-500/15 text-purple-300'
                                : 'bg-zinc-500/15 text-zinc-400'
                        }`}
                      >
                        {m.type}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-semibold">{channelToLabel(m.channel)}</span>
                      <span className="text-[10px] text-zinc-600 ml-auto">{formatDateTime(m.date)}</span>
                    </div>
                    <p className="text-sm text-zinc-300 whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Follow-up reminders */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
        <h2 className="font-bold mb-4">Follow-up Reminders</h2>

        <div className="flex flex-wrap gap-2 mb-5">
          <input
            type="date"
            value={newReminder.date}
            onChange={(e) => setNewReminder((r) => ({ ...r, date: e.target.value }))}
            className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <input
            value={newReminder.note}
            onChange={(e) => setNewReminder((r) => ({ ...r, note: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addReminder();
            }}
            placeholder="Reminder note…"
            className="flex-1 min-w-[200px] bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <button
            onClick={addReminder}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 text-sm font-semibold hover:brightness-110 active:scale-95 transition-all"
          >
            <CalendarPlus className="w-4 h-4" /> Add
          </button>
        </div>

        {creator.reminders.length === 0 ? (
          <p className="text-sm text-zinc-600">No reminders yet. Add one above to never miss a follow-up.</p>
        ) : (
          <div className="space-y-2">
            {[...overdueReminders, ...openReminders, ...doneReminders].map((r) => (
              <div
                key={r.id}
                className={`flex items-center gap-3 rounded-xl border p-3.5 ${
                  r.completed
                    ? 'border-white/5 bg-white/[0.02] opacity-50'
                    : isOverdue(r.dueDate)
                      ? 'border-red-500/30 bg-red-500/5'
                      : 'border-white/10 bg-zinc-900/60'
                }`}
              >
                <button
                  onClick={() => crm.toggleReminderDone(creator.id, r.id)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    r.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-white/25 hover:border-emerald-400'
                  }`}
                  title={r.completed ? 'Mark as pending' : 'Mark as done'}
                >
                  {r.completed && <Check className="w-3 h-3" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${r.completed ? 'line-through' : ''}`}>{r.note}</p>
                  <p className={`text-[11px] ${isOverdue(r.dueDate) && !r.completed ? 'text-red-400' : 'text-zinc-500'}`}>
                    Due {formatDateTime(r.dueDate)}
                    {isOverdue(r.dueDate) && !r.completed && ' — overdue!'}
                  </p>
                </div>
                <button
                  onClick={() => crm.removeReminder(creator.id, r.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="flex items-center gap-2 text-xs text-zinc-600">
        <Sparkles className="w-3.5 h-3.5" />
        Need a fresh message? Use the <Link href={`/crm/outreach?id=${creator.id}`} className="text-amber-400 hover:underline">Follow-up Generator</Link>.
      </p>

      <CreatorForm
        open={editing}
        onClose={() => setEditing(false)}
        creator={creator}
        onSave={(input, id) => {
          if (id) crm.updateCreator(id, input);
          setNotes(input.notes);
        }}
      />
    </div>
  );
}

function ContactTile({
  icon,
  label,
  value,
  href,
  placeholder,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  placeholder: string;
  external?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{label}</span>
      </div>
      {value ? (
        href ? (
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="text-sm font-semibold text-blue-300 hover:underline break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-semibold break-all">{value}</p>
        )
      ) : (
        <p className="text-sm text-zinc-600">{placeholder}</p>
      )}
    </div>
  );
}
