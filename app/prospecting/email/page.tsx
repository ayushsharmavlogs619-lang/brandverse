'use client';

import { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { useLeads } from '@/lib/sales/useLeads';
import { buildColdEmail, buildFollowUpEmail, buildProposalEmail, EMAIL_PAIN_POINT_OPTIONS } from '@/lib/sales/emails';
import { CopyButton, FieldLabel, inputClass } from '@/app/crm/components/ui';

export default function EmailGeneratorPage() {
  const leads = useLeads();
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState({
    business: '',
    owner: '',
    city: '',
    niche: '',
    painPoint: EMAIL_PAIN_POINT_OPTIONS[0],
  });

  if (!leads.loaded) {
    return <div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" /></div>;
  }

  const selected = leads.leads.find((l) => l.id === selectedId);

  const pickLead = (id: string) => {
    setSelectedId(id);
    const l = leads.leads.find((x) => x.id === id);
    if (l) {
      setForm({
        business: l.business,
        owner: l.owner,
        city: l.city,
        niche: l.niche,
        painPoint: l.painPoints[0] || EMAIL_PAIN_POINT_OPTIONS[0],
      });
    }
  };

  const ctx = {
    business: form.business.trim() || selected?.business || 'your business',
    owner: form.owner.trim() || selected?.owner || 'there',
    city: form.city.trim() || selected?.city || 'your city',
    niche: form.niche.trim() || selected?.niche || 'local',
    painPoint: form.painPoint,
  };

  const cold = buildColdEmail(ctx);
  const followup = buildFollowUpEmail(ctx);
  const proposal = buildProposalEmail(ctx);

  const emails = [
    { label: 'Cold Outreach', ...cold },
    { label: 'Follow-up (no reply)', ...followup },
    { label: 'After Proposal Sent', ...proposal },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Email <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Generator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Cold emails that local business owners actually read.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 space-y-4">
          <h2 className="font-bold text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" /> Recipient
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
          <div>
            <FieldLabel>Business</FieldLabel>
            <input className={inputClass} value={form.business} onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Owner</FieldLabel>
              <input className={inputClass} value={form.owner} onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))} />
            </div>
            <div>
              <FieldLabel>City</FieldLabel>
              <input className={inputClass} value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
            </div>
          </div>
          <div>
            <FieldLabel>Niche</FieldLabel>
            <input className={inputClass} value={form.niche} onChange={(e) => setForm((f) => ({ ...f, niche: e.target.value }))} />
          </div>
          <div>
            <FieldLabel>Pain point to lead with</FieldLabel>
            <select className={inputClass} value={form.painPoint} onChange={(e) => setForm((f) => ({ ...f, painPoint: e.target.value }))}>
              {EMAIL_PAIN_POINT_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {emails.map((e) => (
            <div key={e.label} className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> {e.label}
                </p>
                <CopyButton text={`Subject: ${e.subject}\n\n${e.body}`} />
              </div>
              <p className="text-sm mb-2">
                <span className="text-zinc-500 font-semibold">Subject: </span>
                <span className="text-zinc-300">{e.subject}</span>
              </p>
              <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{e.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
