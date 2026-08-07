'use client';

import { useState } from 'react';
import { History, Save, Sparkles, Trash2 } from 'lucide-react';
import type { SavedScript } from '@/lib/sales/types';
import { uid } from '@/lib/sales/storage';
import { COLLECTIONS } from '@/lib/sales/storage';
import { useCollection } from '@/lib/sales/hooks';
import { buildDemoScript, type DemoContext } from '@/lib/sales/scripts';
import { CopyButton, EmptyState, FieldLabel, inputClass } from '@/app/crm/components/ui';

const DEFAULTS: DemoContext = {
  company: '',
  owner: '',
  niche: '',
  product: 'AI Voice Agent',
  goal: 'stop missing calls after hours',
};

export default function DemoScriptsPage() {
  const [form, setForm] = useState<DemoContext>(DEFAULTS);
  const [output, setOutput] = useState('');
  const scripts = useCollection<SavedScript>(COLLECTIONS.scripts);

  const set = <K extends keyof DemoContext>(key: K, value: DemoContext[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const generate = () => {
    setOutput(buildDemoScript({
      company: form.company.trim() || 'the prospect',
      owner: form.owner.trim() || 'there',
      niche: form.niche.trim() || 'local',
      product: form.product.trim() || 'AI Voice Agent',
      goal: form.goal.trim(),
    }));
  };

  const save = () => {
    scripts.add({
      id: uid(),
      kind: 'demo',
      title: form.company.trim() || 'Untitled demo',
      content: output,
      createdAt: new Date().toISOString(),
    });
  };

  const load = (s: SavedScript) => {
    if (s.kind !== 'demo') return;
    setOutput(s.content);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Demo Script <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Generator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Structured scripts that walk prospects from hello to proposal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 space-y-4">
          <h2 className="font-bold text-sm">Prospect Details</h2>
          <div>
            <FieldLabel>Company</FieldLabel>
            <input className={inputClass} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="e.g. Carter Electric" />
          </div>
          <div>
            <FieldLabel>Owner / Contact</FieldLabel>
            <input className={inputClass} value={form.owner} onChange={(e) => set('owner', e.target.value)} placeholder="e.g. Mike" />
          </div>
          <div>
            <FieldLabel>Niche</FieldLabel>
            <input className={inputClass} value={form.niche} onChange={(e) => set('niche', e.target.value)} placeholder="e.g. Electrician" />
          </div>
          <div>
            <FieldLabel>Product</FieldLabel>
            <select className={inputClass} value={form.product} onChange={(e) => set('product', e.target.value)}>
              {['AI Voice Agent', 'Business Automation', 'Website & Funnel', 'Paid Ads', 'OnlyFans Management', 'Content Management', 'Other'].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Demo Goal (their pain)</FieldLabel>
            <input className={inputClass} value={form.goal} onChange={(e) => set('goal', e.target.value)} placeholder="e.g. stop missing calls after hours" />
          </div>
          <button
            onClick={generate}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-sm font-bold shadow-lg shadow-purple-600/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Generate Script
          </button>
          {output && (
            <button
              onClick={save}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Script
            </button>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
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
              blurb="Fill in the prospect details and hit Generate — you'll get a complete discovery-to-close demo script."
            />
          )}

          {scripts.items.some((s) => s.kind === 'demo') && (
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
              <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
                <History className="w-4 h-4 text-purple-400" /> Saved Demo Scripts
              </h2>
              <div className="space-y-2">
                {scripts.items.filter((s) => s.kind === 'demo').slice(0, 6).map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <button
                      onClick={() => load(s)}
                      className="flex-1 text-left rounded-xl bg-zinc-900/60 border border-white/10 px-4 py-2.5 hover:border-purple-500/40 transition-colors"
                    >
                      <p className="text-sm font-semibold truncate">{s.title}</p>
                      <p className="text-[10px] text-zinc-500">{new Date(s.createdAt).toLocaleString()}</p>
                    </button>
                    <button
                      onClick={() => scripts.remove(s.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
