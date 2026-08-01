'use client';

import { useState } from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { useLeads } from '@/lib/sales/useLeads';
import { buildColdCallScript } from '@/lib/sales/scripts';
import { LEAD_PAIN_POINTS } from '@/lib/sales/types';
import { FieldLabel, inputClass } from '@/app/crm/components/ui';
import { CopyButton } from '@/app/crm/components/ui';
import { EmptyState } from '@/app/crm/components/ui';

export default function ColdCallPage() {
  const leads = useLeads();
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState({
    business: '',
    owner: '',
    city: '',
    niche: '',
    painPoint: LEAD_PAIN_POINTS[0],
  });
  const [output, setOutput] = useState('');

  if (!leads.loaded) {
    return <div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" /></div>;
  }

  const pickLead = (id: string) => {
    setSelectedId(id);
    const l = leads.leads.find((x) => x.id === id);
    if (l) {
      setForm({
        business: l.business,
        owner: l.owner,
        city: l.city,
        niche: l.niche,
        painPoint: l.painPoints[0] || LEAD_PAIN_POINTS[0],
      });
    }
  };

  const generate = () => {
    setOutput(
      buildColdCallScript({
        business: form.business.trim() || 'your business',
        owner: form.owner.trim() || 'there',
        city: form.city.trim() || 'your city',
        niche: form.niche.trim() || 'local',
        painPoint: form.painPoint,
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Cold Call <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Scripts</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Scripts built around the prospect&apos;s real pain — from hello to booked meeting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 space-y-4">
          <h2 className="font-bold text-sm flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" /> Prospect
          </h2>
          <div>
            <FieldLabel>From lead database</FieldLabel>
            <select className={inputClass} value={selectedId} onChange={(e) => pickLead(e.target.value)}>
              <option value="">— pick a lead —</option>
              {leads.leads.map((l) => (
                <option key={l.id} value={l.id}>{l.business} ({l.city})</option>
              ))}
            </select>
            <p className="text-[10px] text-zinc-600 mt-1">Or type details manually below:</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Business</FieldLabel>
              <input className={inputClass} value={form.business} onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))} />
            </div>
            <div>
              <FieldLabel>Owner</FieldLabel>
              <input className={inputClass} value={form.owner} onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))} />
            </div>
            <div>
              <FieldLabel>City</FieldLabel>
              <input className={inputClass} value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
            </div>
            <div>
              <FieldLabel>Niche</FieldLabel>
              <input className={inputClass} value={form.niche} onChange={(e) => setForm((f) => ({ ...f, niche: e.target.value }))} />
            </div>
          </div>
          <div>
            <FieldLabel>Pain point to lead with</FieldLabel>
            <select className={inputClass} value={form.painPoint} onChange={(e) => setForm((f) => ({ ...f, painPoint: e.target.value }))}>
              {LEAD_PAIN_POINTS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <button
            onClick={generate}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 text-sm font-bold shadow-lg shadow-emerald-600/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Generate Script
          </button>
        </div>

        <div className="lg:col-span-2">
          {output ? (
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-sm">Your Script</p>
                <CopyButton text={output} />
              </div>
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans">{output}</pre>
            </div>
          ) : (
            <EmptyState
              title="No script yet"
              blurb="Pick a lead or fill in the details, then hit Generate — you'll get a full cold call script with openers, objections, and a date-based close."
            />
          )}
        </div>
      </div>
    </div>
  );
}
