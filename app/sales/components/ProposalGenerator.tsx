'use client';

import { useState } from 'react';
import { Eye, Plus, Printer, Save, X } from 'lucide-react';
import type { ProposalData, SavedDocument } from '@/lib/sales/types';
import { uid, downloadText } from '@/lib/sales/storage';
import { renderProposalHtml } from '@/lib/sales/proposals';
import { useCollection } from '@/lib/sales/hooks';
import { COLLECTIONS } from '@/lib/sales/storage';
import { FieldLabel, inputClass } from '@/app/crm/components/ui';
import PrintView from './PrintView';

const emptyProposal = (): ProposalData => ({
  clientName: '',
  clientCompany: '',
  clientEmail: '',
  serviceName: 'AI Voice Agent',
  description: '',
  deliverables: ['24/7 AI answering on your business number'],
  oneTimeFee: null,
  monthlyFee: 799,
  setupFee: 499,
  paymentTerms: 'Invoiced monthly, due within 14 days. Setup fee billed on signature.',
  validUntil: new Date(new Date().getTime() + 30 * 86400000).toISOString().slice(0, 10),
  notes: '',
  preparedBy: 'Ayush Sharma',
  preparedByTitle: 'Founder, Brandverse',
});

export default function ProposalGenerator() {
  const [form, setForm] = useState<ProposalData>(emptyProposal());
  const [preview, setPreview] = useState(false);
  const [html, setHtml] = useState('');
  const [saved, setSaved] = useState(false);
  const docs = useCollection<SavedDocument>(COLLECTIONS.docs);

  const set = <K extends keyof ProposalData>(key: K, value: ProposalData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addDeliverable = () => set('deliverables', [...form.deliverables, '']);
  const updateDeliverable = (idx: number, value: string) =>
    set('deliverables', form.deliverables.map((d, i) => (i === idx ? value : d)));
  const removeDeliverable = (idx: number) =>
    set('deliverables', form.deliverables.filter((_, i) => i !== idx));

  const openPreview = () => {
    setHtml(renderProposalHtml({ ...form, deliverables: form.deliverables.filter((d) => d.trim()) }));
    setPreview(true);
  };

  const saveProposal = () => {
    docs.add({
      id: uid(),
      kind: 'proposal',
      title: `${form.clientCompany || form.clientName} — ${form.serviceName}`,
      data: form,
      createdAt: new Date().toISOString(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const loadSaved = (doc: SavedDocument) => {
    if (doc.kind !== 'proposal') return;
    setForm(doc.data as ProposalData);
  };

  const handleDownload = () => {
    downloadText(
      `proposal-${(form.clientCompany || form.clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.html`,
      html,
      'text/html'
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel required>Client Name</FieldLabel>
              <input className={inputClass} value={form.clientName} onChange={(e) => set('clientName', e.target.value)} placeholder="e.g. Mike Carter" />
            </div>
            <div>
              <FieldLabel>Client Company</FieldLabel>
              <input className={inputClass} value={form.clientCompany} onChange={(e) => set('clientCompany', e.target.value)} placeholder="e.g. Carter Electric" />
            </div>
            <div>
              <FieldLabel>Client Email</FieldLabel>
              <input className={inputClass} value={form.clientEmail} onChange={(e) => set('clientEmail', e.target.value)} placeholder="client@company.com" />
            </div>
            <div>
              <FieldLabel>Service Name</FieldLabel>
              <input className={inputClass} value={form.serviceName} onChange={(e) => set('serviceName', e.target.value)} />
            </div>
          </div>

          <div>
            <FieldLabel>Overview / Description</FieldLabel>
            <textarea
              className={`${inputClass} min-h-[100px]`}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="What you're solving for this client and how…"
            />
          </div>

          <div>
            <FieldLabel>What's Included</FieldLabel>
            <div className="space-y-2">
              {form.deliverables.map((d, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputClass}
                    value={d}
                    onChange={(e) => updateDeliverable(i, e.target.value)}
                    placeholder={`Deliverable ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeDeliverable(i)}
                    className="w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addDeliverable}
                className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add deliverable
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <FieldLabel>Monthly Fee ($)</FieldLabel>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.monthlyFee ?? ''}
                onChange={(e) => set('monthlyFee', e.target.value === '' ? null : Number(e.target.value))}
              />
            </div>
            <div>
              <FieldLabel>Setup Fee ($)</FieldLabel>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.setupFee ?? ''}
                onChange={(e) => set('setupFee', e.target.value === '' ? null : Number(e.target.value))}
              />
            </div>
            <div>
              <FieldLabel>One-time Fee ($)</FieldLabel>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.oneTimeFee ?? ''}
                onChange={(e) => set('oneTimeFee', e.target.value === '' ? null : Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Payment Terms</FieldLabel>
              <textarea className={`${inputClass} min-h-[70px]`} value={form.paymentTerms} onChange={(e) => set('paymentTerms', e.target.value)} />
            </div>
            <div>
              <FieldLabel>Valid Until</FieldLabel>
              <input type="date" className={inputClass} value={form.validUntil.slice(0, 10)} onChange={(e) => set('validUntil', e.target.value || new Date().toISOString().slice(0, 10))} />
              <div className="mt-3">
                <FieldLabel>Notes</FieldLabel>
                <textarea className={`${inputClass} min-h-[70px]`} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Anything else the client should know…" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: actions + saved proposals */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 space-y-3">
            <h2 className="font-bold text-sm">Generate</h2>
            <button
              onClick={openPreview}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Eye className="w-4 h-4" /> Preview Proposal
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" /> Save HTML
              </button>
              <button
                onClick={saveProposal}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                  saved
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <Save className="w-3.5 h-3.5" /> {saved ? 'Saved' : 'Save Draft'}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
            <h2 className="font-bold text-sm mb-3">Saved Proposals</h2>
            {docs.items.length === 0 ? (
              <p className="text-xs text-zinc-600">Nothing saved yet.</p>
            ) : (
              <div className="space-y-2">
                {docs.items
                  .filter((d) => d.kind === 'proposal')
                  .slice(0, 6)
                  .map((d) => (
                    <button
                      key={d.id}
                      onClick={() => loadSaved(d)}
                      className="w-full text-left rounded-xl bg-zinc-900/60 border border-white/10 p-3 hover:border-blue-500/40 transition-colors"
                    >
                      <p className="text-xs font-semibold truncate">{d.title}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{new Date(d.createdAt).toLocaleDateString()}</p>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <PrintView open={preview} onClose={() => setPreview(false)} title="Proposal Preview">
        <iframe title="Proposal" srcDoc={html} className="w-full h-[80vh] bg-white" />
      </PrintView>
    </div>
  );
}
