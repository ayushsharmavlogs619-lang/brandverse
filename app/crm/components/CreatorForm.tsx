'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Creator, CreatorInput, Stage, Status } from '@/lib/crm/types';
import {
  PAIN_POINT_SUGGESTIONS,
  PLATFORMS,
  SERVICES,
  STAGES,
  STAGE_META,
  STATUS_META,
} from '@/lib/crm/types';
import { toInput } from '@/lib/crm/storage';
import { FieldLabel, Modal, inputClass } from './ui';

const emptyInput = (): CreatorInput => ({
  name: '',
  stage: 'prospect',
  status: 'active',
  platform: 'Instagram',
  followers: null,
  country: '',
  email: '',
  instagram: '',
  x: '',
  reddit: '',
  agency: '',
  notes: '',
  painPoints: [],
  servicesInterested: [],
  pricingDiscussed: '',
  dealValue: null,
  lastContact: null,
  nextFollowUp: null,
});

function dateToInput(iso: string | null): string {
  if (!iso) return '';
  return iso.slice(0, 10);
}

export default function CreatorForm({
  open,
  onClose,
  onSave,
  creator,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (input: CreatorInput, id?: string) => void;
  creator: Creator | null;
}) {
  const [form, setForm] = useState<CreatorInput>(
    creator ? { ...toInput(creator), lastContact: dateToInput(creator.lastContact) || null, nextFollowUp: dateToInput(creator.nextFollowUp) || null } : emptyInput()
  );
  const [painPointInput, setPainPointInput] = useState('');
  const [error, setError] = useState('');

  const set = <K extends keyof CreatorInput>(key: K, value: CreatorInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const togglePainPoint = (pp: string) => {
    setForm((f) => ({
      ...f,
      painPoints: f.painPoints.includes(pp)
        ? f.painPoints.filter((p) => p !== pp)
        : [...f.painPoints, pp],
    }));
  };

  const addCustomPainPoint = () => {
    const value = painPointInput.trim();
    if (!value) return;
    if (!form.painPoints.includes(value)) {
      setForm((f) => ({ ...f, painPoints: [...f.painPoints, value] }));
    }
    setPainPointInput('');
  };

  const toggleService = (id: CreatorInput['servicesInterested'][number]) => {
    setForm((f) => ({
      ...f,
      servicesInterested: f.servicesInterested.includes(id)
        ? f.servicesInterested.filter((s) => s !== id)
        : [...f.servicesInterested, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Creator name is required');
      return;
    }
    const clean: CreatorInput = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      country: form.country.trim(),
      instagram: form.instagram.trim(),
      x: form.x.trim(),
      reddit: form.reddit.trim(),
      agency: form.agency.trim(),
      notes: form.notes.trim(),
      pricingDiscussed: form.pricingDiscussed.trim(),
      followers: form.followers && form.followers > 0 ? form.followers : null,
      dealValue: form.dealValue && form.dealValue > 0 ? form.dealValue : null,
      lastContact: form.lastContact ? new Date(`${form.lastContact}T12:00:00`).toISOString() : null,
      nextFollowUp: form.nextFollowUp ? new Date(`${form.nextFollowUp}T12:00:00`).toISOString() : null,
    };
    onSave(clean, creator?.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={creator ? 'Edit Creator' : 'Add Creator'} wide>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basics */}
        <section className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400">Basics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel required>Creator Name</FieldLabel>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Mia Carter"
              />
            </div>
            <div>
              <FieldLabel>Country</FieldLabel>
              <input
                className={inputClass}
                value={form.country}
                onChange={(e) => set('country', e.target.value)}
                placeholder="e.g. United States"
              />
            </div>
            <div>
              <FieldLabel>Platform</FieldLabel>
              <select
                className={inputClass}
                value={form.platform}
                onChange={(e) => set('platform', e.target.value as CreatorInput['platform'])}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Followers</FieldLabel>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.followers ?? ''}
                onChange={(e) =>
                  set('followers', e.target.value === '' ? null : Number(e.target.value))
                }
                placeholder="e.g. 125000"
              />
            </div>
            <div>
              <FieldLabel>Stage</FieldLabel>
              <select
                className={inputClass}
                value={form.stage}
                onChange={(e) => set('stage', e.target.value as Stage)}
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {STAGE_META[s].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Status</FieldLabel>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => set('status', e.target.value as Status)}
              >
                {Object.entries(STATUS_META).map(([key, meta]) => (
                  <option key={key} value={key}>
                    {meta.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Agency</FieldLabel>
              <input
                className={inputClass}
                value={form.agency}
                onChange={(e) => set('agency', e.target.value)}
                placeholder="e.g. Fresh Talent Mgmt"
              />
            </div>
            <div>
              <FieldLabel>Deal Value (USD)</FieldLabel>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.dealValue ?? ''}
                onChange={(e) =>
                  set('dealValue', e.target.value === '' ? null : Number(e.target.value))
                }
                placeholder="e.g. 3500"
              />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-purple-400">Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Email</FieldLabel>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="creator@email.com"
              />
            </div>
            <div>
              <FieldLabel>Instagram</FieldLabel>
              <input
                className={inputClass}
                value={form.instagram}
                onChange={(e) => set('instagram', e.target.value)}
                placeholder="@handle"
              />
            </div>
            <div>
              <FieldLabel>X (Twitter)</FieldLabel>
              <input
                className={inputClass}
                value={form.x}
                onChange={(e) => set('x', e.target.value)}
                placeholder="@handle"
              />
            </div>
            <div>
              <FieldLabel>Reddit</FieldLabel>
              <input
                className={inputClass}
                value={form.reddit}
                onChange={(e) => set('reddit', e.target.value)}
                placeholder="u/username"
              />
            </div>
            <div>
              <FieldLabel>Last Contact</FieldLabel>
              <input
                type="date"
                className={inputClass}
                value={form.lastContact ? form.lastContact.slice(0, 10) : ''}
                onChange={(e) => set('lastContact', e.target.value ? e.target.value : null)}
              />
            </div>
            <div>
              <FieldLabel>Next Follow-up</FieldLabel>
              <input
                type="date"
                className={inputClass}
                value={form.nextFollowUp ? form.nextFollowUp.slice(0, 10) : ''}
                onChange={(e) => set('nextFollowUp', e.target.value ? e.target.value : null)}
              />
            </div>
          </div>
        </section>

        {/* Services & Pain points */}
        <section className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Services & Pain Points
          </h4>
          <div>
            <FieldLabel>Services Interested In</FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICES.map((s) => {
                const selected = form.servicesInterested.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`text-left text-sm px-3.5 py-2.5 rounded-xl border transition-all ${
                      selected
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                        : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:border-white/25'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <FieldLabel>Pain Points</FieldLabel>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.painPoints.map((pp) => (
                <button
                  type="button"
                  key={pp}
                  onClick={() => togglePainPoint(pp)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs text-red-300 hover:bg-red-500/20 transition-colors"
                >
                  {pp}
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {PAIN_POINT_SUGGESTIONS.filter((s) => !form.painPoints.includes(s)).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => togglePainPoint(s)}
                  className="rounded-full bg-zinc-900/70 border border-white/10 px-3 py-1 text-xs text-zinc-400 hover:border-white/30 hover:text-white transition-colors"
                >
                  + {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input
                className={inputClass}
                value={painPointInput}
                onChange={(e) => setPainPointInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomPainPoint();
                  }
                }}
                placeholder="Add custom pain point…"
              />
              <button
                type="button"
                onClick={addCustomPainPoint}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 text-sm hover:bg-white/10 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
        </section>

        {/* Deal */}
        <section className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">Deal</h4>
          <div>
            <FieldLabel>Pricing Discussed</FieldLabel>
            <textarea
              className={`${inputClass} min-h-[80px]`}
              value={form.pricingDiscussed}
              onChange={(e) => set('pricingDiscussed', e.target.value)}
              placeholder="e.g. $3,500/mo + 20% rev share, 3-month minimum"
            />
          </div>
          <div>
            <FieldLabel>Notes</FieldLabel>
            <textarea
              className={`${inputClass} min-h-[100px]`}
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="Anything worth remembering about this creator…"
            />
          </div>
        </section>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25 hover:brightness-110 active:scale-95 transition-all"
          >
            {creator ? 'Save Changes' : 'Add Creator'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
