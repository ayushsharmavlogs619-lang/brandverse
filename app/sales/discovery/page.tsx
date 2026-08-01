'use client';

import { useState } from 'react';
import { ClipboardList, Trash2 } from 'lucide-react';
import type { DiscoveryNote } from '@/lib/sales/types';
import { uid } from '@/lib/sales/storage';
import { COLLECTIONS } from '@/lib/sales/storage';
import { useCollection } from '@/lib/sales/hooks';
import { LEAD_PAIN_POINTS } from '@/lib/sales/types';
import { CopyButton, EmptyState, FieldLabel, inputClass } from '@/app/crm/components/ui';

const emptyNote = () => ({
  company: '',
  owner: '',
  industry: '',
  currentSituation: '',
  howManyCalls: '',
  bookingProcess: '',
  toolsUsed: '',
  decisionMaker: '',
  painPoints: [] as string[],
  budgetRange: '',
  timeline: '',
  nextSteps: '',
  notes: '',
});

export default function DiscoveryPage() {
  const notes = useCollection<DiscoveryNote>(COLLECTIONS.discovery);
  const [form, setForm] = useState(emptyNote());
  const [viewing, setViewing] = useState<DiscoveryNote | null>(null);
  const [toast, setToast] = useState('');

  const set = <K extends keyof ReturnType<typeof emptyNote>>(key: K, value: ReturnType<typeof emptyNote>[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const togglePain = (p: string) =>
    setForm((f) => ({
      ...f,
      painPoints: f.painPoints.includes(p) ? f.painPoints.filter((x) => x !== p) : [...f.painPoints, p],
    }));

  const save = () => {
    if (!form.company.trim()) {
      setToast('Company name is required');
      setTimeout(() => setToast(''), 2000);
      return;
    }
    notes.add({ ...form, id: uid(), date: new Date().toISOString() });
    setForm(emptyNote());
    setToast('Discovery notes saved');
    setTimeout(() => setToast(''), 2000);
  };

  const formatSummary = (n: DiscoveryNote) =>
    `DISCOVERY CALL — ${n.company}\nOwner: ${n.owner}\nIndustry: ${n.industry}\nDate: ${new Date(n.date).toLocaleDateString()}\n\n` +
    `Current situation: ${n.currentSituation}\nCalls per day: ${n.howManyCalls}\nBooking process: ${n.bookingProcess}\nTools used: ${n.toolsUsed}\nDecision maker: ${n.decisionMaker}\n` +
    `Pain points: ${n.painPoints.join(', ') || '—'}\nBudget: ${n.budgetRange}\nTimeline: ${n.timeline}\n\nNext steps: ${n.nextSteps}\nNotes: ${n.notes}`;

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm shadow-2xl animate-fade-in">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Discovery Call <span className="bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">Notes</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Walk into every call with structure, leave with a qualified deal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 space-y-5">
          <h2 className="font-bold text-sm flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-fuchsia-400" /> New Call Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel required>Company</FieldLabel>
              <input className={inputClass} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="e.g. Carter Electric" />
            </div>
            <div>
              <FieldLabel>Owner / Contact</FieldLabel>
              <input className={inputClass} value={form.owner} onChange={(e) => set('owner', e.target.value)} placeholder="e.g. Mike Carter" />
            </div>
            <div>
              <FieldLabel>Industry</FieldLabel>
              <input className={inputClass} value={form.industry} onChange={(e) => set('industry', e.target.value)} placeholder="e.g. Electrician" />
            </div>
            <div>
              <FieldLabel>Decision Maker?</FieldLabel>
              <input className={inputClass} value={form.decisionMaker} onChange={(e) => set('decisionMaker', e.target.value)} placeholder="Owner / Manager / Partner…" />
            </div>
          </div>
          <div>
            <FieldLabel>Current Situation</FieldLabel>
            <textarea className={`${inputClass} min-h-[70px]`} value={form.currentSituation} onChange={(e) => set('currentSituation', e.target.value)} placeholder="How do they handle calls/leads today?" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>How many calls/day?</FieldLabel>
              <input className={inputClass} value={form.howManyCalls} onChange={(e) => set('howManyCalls', e.target.value)} />
            </div>
            <div>
              <FieldLabel>Booking process</FieldLabel>
              <input className={inputClass} value={form.bookingProcess} onChange={(e) => set('bookingProcess', e.target.value)} />
            </div>
          </div>
          <div>
            <FieldLabel>Tools they use</FieldLabel>
            <input className={inputClass} value={form.toolsUsed} onChange={(e) => set('toolsUsed', e.target.value)} placeholder="Calendar, CRM, answering service…" />
          </div>
          <div>
            <FieldLabel>Pain points</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {LEAD_PAIN_POINTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePain(p)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    form.painPoints.includes(p)
                      ? 'bg-red-500/10 border-red-500/40 text-red-300'
                      : 'bg-zinc-900/70 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Budget range</FieldLabel>
              <input className={inputClass} value={form.budgetRange} onChange={(e) => set('budgetRange', e.target.value)} placeholder="e.g. $400–800/mo" />
            </div>
            <div>
              <FieldLabel>Timeline</FieldLabel>
              <input className={inputClass} value={form.timeline} onChange={(e) => set('timeline', e.target.value)} placeholder="e.g. next 30 days" />
            </div>
          </div>
          <div>
            <FieldLabel>Next steps</FieldLabel>
            <textarea className={`${inputClass} min-h-[60px]`} value={form.nextSteps} onChange={(e) => set('nextSteps', e.target.value)} placeholder="e.g. Send proposal by Friday, follow up Wednesday" />
          </div>
          <div>
            <FieldLabel>Notes</FieldLabel>
            <textarea className={`${inputClass} min-h-[60px]`} value={form.notes} onChange={(e) => set('notes', e.target.value)} />
          </div>
          <button
            onClick={save}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 px-5 py-2.5 text-sm font-bold shadow-lg shadow-fuchsia-600/25 hover:brightness-110 active:scale-95 transition-all"
          >
            Save Notes
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-sm">Past Calls</h2>
          {notes.items.length === 0 ? (
            <EmptyState title="No notes yet" blurb="Your discovery call notes will appear here, ready to copy into the CRM." />
          ) : (
            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
              {notes.items.slice(0, 30).map((n) => (
                <div key={n.id} className="rounded-xl bg-zinc-900/60 border border-white/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-sm">{n.company}</p>
                      <p className="text-[11px] text-zinc-500">
                        {new Date(n.date).toLocaleString()} · {n.owner || '—'} · {n.industry || '—'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setViewing(viewing?.id === n.id ? null : n)}
                        className="text-xs text-fuchsia-400 hover:text-fuchsia-300 font-semibold transition-colors"
                      >
                        {viewing?.id === n.id ? 'Hide' : 'View'}
                      </button>
                      <CopyButton text={formatSummary(n)} />
                      <button
                        onClick={() => notes.remove(n.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {viewing?.id === n.id && (
                    <div className="mt-3 pt-3 border-t border-white/5 text-sm text-zinc-300 space-y-2">
                      <p><b className="text-zinc-500">Situation:</b> {n.currentSituation || '—'}</p>
                      <p><b className="text-zinc-500">Calls/day:</b> {n.howManyCalls || '—'}</p>
                      <p><b className="text-zinc-500">Booking:</b> {n.bookingProcess || '—'}</p>
                      <p><b className="text-zinc-500">Tools:</b> {n.toolsUsed || '—'}</p>
                      <p><b className="text-zinc-500">Decision maker:</b> {n.decisionMaker || '—'}</p>
                      <p><b className="text-zinc-500">Pain points:</b> {n.painPoints.join(', ') || '—'}</p>
                      <p><b className="text-zinc-500">Budget:</b> {n.budgetRange || '—'}</p>
                      <p><b className="text-zinc-500">Timeline:</b> {n.timeline || '—'}</p>
                      <p><b className="text-zinc-500">Next steps:</b> {n.nextSteps || '—'}</p>
                      {n.notes && <p><b className="text-zinc-500">Notes:</b> {n.notes}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
