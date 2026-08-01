'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import type { BusinessLead, BusinessLeadInput, LeadStage, LeadStatus } from '@/lib/sales/types';
import {
  BUSINESS_NICHES,
  LEAD_PAIN_POINTS,
  LEAD_STAGES,
  LEAD_STAGE_META,
  LEAD_STATUS_META,
} from '@/lib/sales/types';
import { toLeadInput } from '@/lib/sales/useLeads';
import { FieldLabel, Modal, inputClass } from '@/app/crm/components/ui';

const emptyLead = (): BusinessLeadInput => ({
  business: '',
  owner: '',
  phone: '',
  email: '',
  website: '',
  rating: null,
  niche: 'Other',
  city: '',
  state: '',
  country: '',
  painPoints: [],
  notes: '',
  stage: 'prospect',
  status: 'active',
  lastContact: null,
  nextFollowUp: null,
  proposal: '',
  revenue: null,
});

function dateToInput(iso: string | null): string {
  if (!iso) return '';
  return iso.slice(0, 10);
}

export default function LeadForm({
  open,
  onClose,
  onSave,
  lead,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (input: BusinessLeadInput, id?: string) => void;
  lead: BusinessLead | null;
}) {
  const [form, setForm] = useState<BusinessLeadInput>(
    lead
      ? { ...toLeadInput(lead), lastContact: dateToInput(lead.lastContact) || null, nextFollowUp: dateToInput(lead.nextFollowUp) || null }
      : emptyLead()
  );
  const [error, setError] = useState('');

  const set = <K extends keyof BusinessLeadInput>(key: K, value: BusinessLeadInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const togglePain = (p: string) =>
    setForm((f) => ({
      ...f,
      painPoints: f.painPoints.includes(p) ? f.painPoints.filter((x) => x !== p) : [...f.painPoints, p],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.business.trim()) {
      setError('Business name is required');
      return;
    }
    onSave(
      {
        ...form,
        business: form.business.trim(),
        owner: form.owner.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        website: form.website.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country.trim(),
        notes: form.notes.trim(),
        proposal: form.proposal.trim(),
        rating: form.rating !== null && form.rating >= 1 ? form.rating : null,
        revenue: form.revenue && form.revenue > 0 ? form.revenue : null,
        lastContact: form.lastContact ? new Date(`${form.lastContact}T12:00:00`).toISOString() : null,
        nextFollowUp: form.nextFollowUp ? new Date(`${form.nextFollowUp}T12:00:00`).toISOString() : null,
      },
      lead?.id
    );
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={lead ? 'Edit Lead' : 'Add Lead'} wide>
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Business</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <FieldLabel required>Business</FieldLabel>
              <input className={inputClass} value={form.business} onChange={(e) => set('business', e.target.value)} placeholder="e.g. Carter Electric" />
            </div>
            <div>
              <FieldLabel>Owner</FieldLabel>
              <input className={inputClass} value={form.owner} onChange={(e) => set('owner', e.target.value)} placeholder="e.g. Mike Carter" />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <input className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(512) 555-0141" />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <input type="email" className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="owner@business.com" />
            </div>
            <div>
              <FieldLabel>Website</FieldLabel>
              <input className={inputClass} value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="business.com" />
            </div>
            <div>
              <FieldLabel>Google Rating</FieldLabel>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                className={inputClass}
                value={form.rating ?? ''}
                onChange={(e) => set('rating', e.target.value === '' ? null : Number(e.target.value))}
                placeholder="4.5"
              />
            </div>
            <div>
              <FieldLabel>Niche</FieldLabel>
              <select className={inputClass} value={form.niche} onChange={(e) => set('niche', e.target.value)}>
                {BUSINESS_NICHES.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>City</FieldLabel>
              <input className={inputClass} value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="e.g. Austin" />
            </div>
            <div>
              <FieldLabel>State</FieldLabel>
              <input className={inputClass} value={form.state} onChange={(e) => set('state', e.target.value)} placeholder="TX" />
            </div>
            <div>
              <FieldLabel>Country</FieldLabel>
              <input className={inputClass} value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="United States" />
            </div>
            <div>
              <FieldLabel>Stage</FieldLabel>
              <select className={inputClass} value={form.stage} onChange={(e) => set('stage', e.target.value as LeadStage)}>
                {LEAD_STAGES.map((s) => (
                  <option key={s} value={s}>{LEAD_STAGE_META[s].label}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Status</FieldLabel>
              <select className={inputClass} value={form.status} onChange={(e) => set('status', e.target.value as LeadStatus)}>
                {Object.entries(LEAD_STATUS_META).map(([key, meta]) => (
                  <option key={key} value={key}>{meta.label}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Expected Revenue ($/mo)</FieldLabel>
              <input type="number" min={0} className={inputClass} value={form.revenue ?? ''} onChange={(e) => set('revenue', e.target.value === '' ? null : Number(e.target.value))} placeholder="e.g. 799" />
            </div>
            <div>
              <FieldLabel>Last Contact</FieldLabel>
              <input type="date" className={inputClass} value={form.lastContact ? form.lastContact.slice(0, 10) : ''} onChange={(e) => set('lastContact', e.target.value ? e.target.value : null)} />
            </div>
            <div>
              <FieldLabel>Next Follow-up</FieldLabel>
              <input type="date" className={inputClass} value={form.nextFollowUp ? form.nextFollowUp.slice(0, 10) : ''} onChange={(e) => set('nextFollowUp', e.target.value ? e.target.value : null)} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Pipeline Details</h4>
          <div>
            <FieldLabel>Proposal</FieldLabel>
            <input className={inputClass} value={form.proposal} onChange={(e) => set('proposal', e.target.value)} placeholder="e.g. Pro AI Agent $799/mo — sent 07/25" />
          </div>
          <div>
            <FieldLabel>Pain Points</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {LEAD_PAIN_POINTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePain(p)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                    form.painPoints.includes(p)
                      ? 'bg-red-500/10 border-red-500/40 text-red-300'
                      : 'bg-zinc-900/70 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {p}
                  {form.painPoints.includes(p) && <X className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel>Notes</FieldLabel>
            <textarea className={`${inputClass} min-h-[90px]`} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Call notes, quirks, best times to reach them…" />
          </div>
        </section>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-600/25 hover:brightness-110 active:scale-95 transition-all">
            {lead ? 'Save Changes' : 'Add Lead'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
