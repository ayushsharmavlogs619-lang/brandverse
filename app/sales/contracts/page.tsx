'use client';

import { useState } from 'react';
import { Eye, Save } from 'lucide-react';
import type { ContractData, SavedDocument } from '@/lib/sales/types';
import { uid } from '@/lib/sales/storage';
import { COLLECTIONS } from '@/lib/sales/storage';
import { useCollection } from '@/lib/sales/hooks';
import { renderContractHtml } from '@/lib/sales/proposals';
import { FieldLabel, inputClass } from '@/app/crm/components/ui';
import PrintView from '../components/PrintView';

const emptyContract = (): ContractData => ({
  clientName: '',
  clientCompany: '',
  serviceName: 'AI Voice Agent — Managed Service',
  scope: '24/7 AI call answering on the business number\nAppointment booking into the client calendar\nWeekly call transcript report',
  monthlyFee: 799,
  oneTimeFee: 499,
  termMonths: 12,
  paymentTerms: 'Invoiced monthly, due within 14 days. Setup fee billed on signature.',
  ipClause: '',
  cancellation: '',
  liability: '',
  effectiveDate: new Date().toISOString().slice(0, 10),
  clientAddress: '',
});

export default function ContractsPage() {
  const [form, setForm] = useState<ContractData>(emptyContract());
  const [preview, setPreview] = useState(false);
  const [html, setHtml] = useState('');
  const [saved, setSaved] = useState(false);
  const docs = useCollection<SavedDocument>(COLLECTIONS.docs);

  const set = <K extends keyof ContractData>(key: K, value: ContractData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const openPreview = () => {
    setHtml(renderContractHtml(form));
    setPreview(true);
  };

  const save = () => {
    docs.add({
      id: uid(),
      kind: 'contract',
      title: `Contract — ${form.clientCompany || form.clientName}`,
      data: form,
      createdAt: new Date().toISOString(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const load = (doc: SavedDocument) => {
    if (doc.kind !== 'contract') return;
    setForm(doc.data as ContractData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Contract <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Generator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Signed deals start with a clean agreement — parties, fees, terms, IP, and signatures.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel required>Client Name</FieldLabel>
              <input className={inputClass} value={form.clientName} onChange={(e) => set('clientName', e.target.value)} placeholder="e.g. Mike Carter" />
            </div>
            <div>
              <FieldLabel>Client Company</FieldLabel>
              <input className={inputClass} value={form.clientCompany} onChange={(e) => set('clientCompany', e.target.value)} placeholder="e.g. Carter Electric LLC" />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Client Address</FieldLabel>
              <input className={inputClass} value={form.clientAddress} onChange={(e) => set('clientAddress', e.target.value)} placeholder="Street, City, State, ZIP" />
            </div>
            <div>
              <FieldLabel>Service Name</FieldLabel>
              <input className={inputClass} value={form.serviceName} onChange={(e) => set('serviceName', e.target.value)} />
            </div>
            <div>
              <FieldLabel>Effective Date</FieldLabel>
              <input type="date" className={inputClass} value={form.effectiveDate.slice(0, 10)} onChange={(e) => set('effectiveDate', e.target.value || new Date().toISOString().slice(0, 10))} />
            </div>
          </div>

          <div>
            <FieldLabel>Scope of Services (one line each)</FieldLabel>
            <textarea className={`${inputClass} min-h-[100px]`} value={form.scope} onChange={(e) => set('scope', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <FieldLabel>Monthly Fee ($)</FieldLabel>
              <input type="number" min={0} className={inputClass} value={form.monthlyFee ?? ''} onChange={(e) => set('monthlyFee', e.target.value === '' ? null : Number(e.target.value))} />
            </div>
            <div>
              <FieldLabel>One-time Fee ($)</FieldLabel>
              <input type="number" min={0} className={inputClass} value={form.oneTimeFee ?? ''} onChange={(e) => set('oneTimeFee', e.target.value === '' ? null : Number(e.target.value))} />
            </div>
            <div>
              <FieldLabel>Term (months)</FieldLabel>
              <input type="number" min={1} className={inputClass} value={form.termMonths} onChange={(e) => set('termMonths', Number(e.target.value))} />
            </div>
          </div>

          <div>
            <FieldLabel>Payment Terms</FieldLabel>
            <textarea className={`${inputClass} min-h-[60px]`} value={form.paymentTerms} onChange={(e) => set('paymentTerms', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <FieldLabel>Intellectual Property Clause</FieldLabel>
              <textarea className={`${inputClass} min-h-[60px]`} value={form.ipClause} onChange={(e) => set('ipClause', e.target.value)} placeholder="Defaults to: Client owns their data; Brandverse retains platform ownership." />
            </div>
            <div>
              <FieldLabel>Cancellation Clause</FieldLabel>
              <textarea className={`${inputClass} min-h-[60px]`} value={form.cancellation} onChange={(e) => set('cancellation', e.target.value)} />
            </div>
            <div>
              <FieldLabel>Liability Clause</FieldLabel>
              <textarea className={`${inputClass} min-h-[60px]`} value={form.liability} onChange={(e) => set('liability', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 space-y-3">
            <h2 className="font-bold text-sm">Generate</h2>
            <button
              onClick={openPreview}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-bold shadow-lg shadow-cyan-600/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Eye className="w-4 h-4" /> Preview Contract
            </button>
            <button
              onClick={save}
              className={`w-full inline-flex items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                saved ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <Save className="w-4 h-4" /> {saved ? 'Saved' : 'Save Draft'}
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
            <h2 className="font-bold text-sm mb-3">Saved Contracts</h2>
            {docs.items.filter((d) => d.kind === 'contract').length === 0 ? (
              <p className="text-xs text-zinc-600">Nothing saved yet.</p>
            ) : (
              <div className="space-y-2">
                {docs.items.filter((d) => d.kind === 'contract').slice(0, 6).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => load(d)}
                    className="w-full text-left rounded-xl bg-zinc-900/60 border border-white/10 p-3 hover:border-cyan-500/40 transition-colors"
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

      <PrintView open={preview} onClose={() => setPreview(false)} title="Contract Preview">
        <iframe title="Contract" srcDoc={html} className="w-full h-[80vh] bg-white" />
      </PrintView>
    </div>
  );
}
