'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, Send, Sparkles, Zap } from 'lucide-react';
import type { ServiceId } from '@/lib/crm/types';
import { SERVICES } from '@/lib/crm/types';
import { generateFollowups, type GeneratedMessage } from '@/lib/crm/followups';
import { getCreator, useCrm } from '@/lib/crm/useCrm';
import { EmptyState } from '../components/ui';

export default function OutreachPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" /></div>}>
      <OutreachEngine />
    </Suspense>
  );
}

function OutreachEngine() {
  const searchParams = useSearchParams();
  const crm = useCrm();
  const urlId = searchParams.get('id');

  const [creatorId, setCreatorId] = useState<string>(urlId ?? '');
  const [service, setService] = useState<ServiceId>('ai-receptionist');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const creator = useMemo(() => getCreator(crm.creators, creatorId), [crm.creators, creatorId]);

  if (!crm.loaded) {
    return <div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" /></div>;
  }

  const messages: GeneratedMessage[] = creator
    ? generateFollowups(creator, service)
    : [];

  const copyMessage = async (msg: GeneratedMessage) => {
    const text = msg.subject ? `Subject: ${msg.subject}\n\n${msg.body}` : msg.body;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(msg.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setCopiedId(null);
    }
  };

  const copyAll = async () => {
    if (!creator) return;
    const text = messages
      .map((m) => `## ${m.label} (${m.channel})\n${m.subject ? `Subject: ${m.subject}\n` : ''}${m.body}`)
      .join('\n\n---\n\n');
    try {
      await navigator.clipboard.writeText(text);
      showToast('All messages copied');
    } catch {
      showToast('Copy failed — select text manually');
    }
  };

  const logToConversation = (msg: GeneratedMessage) => {
    if (!creator) return;
    crm.addMessage(creator.id, {
      type: 'outbound',
      channel: msg.channel,
      content: `${msg.label}: ${msg.subject ? `${msg.subject} — ` : ''}${msg.body}`,
    });
    crm.updateCreator(creator.id, { lastContact: new Date().toISOString() });
    setSavedId(msg.id);
    setTimeout(() => setSavedId(null), 1600);
    showToast(`Saved "${msg.label}" to ${creator.name}'s history`);
  };

  const showToast = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm shadow-2xl animate-fade-in">
          {toast}
        </div>
      )}

      <div>
        <Link href="/crm" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Pipeline
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Follow-up <span className="bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">Generator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Personalized outreach for every channel and stage — initial touch, follow-ups #1, #2, and the final close.
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Creator</label>
            <select
              value={creatorId}
              onChange={(e) => setCreatorId(e.target.value)}
              className="w-full bg-zinc-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              <option value="">Select a creator…</option>
              {crm.creators.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.platform}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Service Focus</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value as ServiceId)}
              className="w-full bg-zinc-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {creator && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/5">
            <span className="text-xs text-zinc-500">
              Generating for <span className="font-bold text-white">{creator.name}</span> ({creator.platform}
              {creator.followers ? `, ${creator.followers.toLocaleString()} followers` : ''}) · {SERVICES.find((s) => s.id === service)?.label}
            </span>
            <button
              onClick={copyAll}
              className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-pink-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Copy className="w-4 h-4" /> Copy All
            </button>
          </div>
        )}
      </div>

      {/* Generated messages */}
      {!creator ? (
        <EmptyState
          title="Select a creator"
          blurb="Pick a creator above and we'll generate personalized Instagram DMs, emails, X DMs, and a full follow-up sequence."
        />
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Zap className="w-4 h-4 text-amber-400" />
            Outreach sequence — adjust names and specifics before sending.
          </div>
          {messages.map((msg, i) => (
            <div key={msg.id} className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-zinc-500">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-bold text-sm">{msg.label}</span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    {msg.channel}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => logToConversation(msg)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                      savedId === msg.id
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {savedId === msg.id ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                    {savedId === msg.id ? 'Saved' : 'Log to history'}
                  </button>
                  <button
                    onClick={() => copyMessage(msg)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                      copiedId === msg.id
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === msg.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className="px-5 py-4 space-y-2">
                {msg.subject && (
                  <p className="text-sm">
                    <span className="text-zinc-500 font-semibold">Subject: </span>
                    <span className="text-zinc-300">{msg.subject}</span>
                  </p>
                )}
                <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{msg.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="flex items-center gap-2 text-xs text-zinc-600">
        <Sparkles className="w-3.5 h-3.5" />
        Pro tip: save each message to the creator&apos;s conversation history so your sequence never misses a beat.
      </p>
    </div>
  );
}
