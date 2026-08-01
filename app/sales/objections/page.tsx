'use client';

import { useState } from 'react';
import { Plus, Search, Sparkles, Trash2, Wand2, X } from 'lucide-react';
import type { Objection, ObjectionCategory } from '@/lib/sales/types';
import { OBJECTION_CATEGORIES } from '@/lib/sales/types';
import { uid } from '@/lib/sales/storage';
import { COLLECTIONS } from '@/lib/sales/storage';
import { useCollection } from '@/lib/sales/hooks';
import { generateObjectionResponse, generateResponseForText } from '@/lib/sales/objections';
import { CopyButton, EmptyState, FieldLabel, inputClass } from '@/app/crm/components/ui';

export default function ObjectionLibraryPage() {
  const library = useCollection<Objection>(COLLECTIONS.objections);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ObjectionCategory>('all');

  const [form, setForm] = useState({
    category: 'price' as ObjectionCategory,
    title: '',
    objection: '',
    response: '',
    notes: '',
  });

  const [genCategory, setGenCategory] = useState<ObjectionCategory>('price');
  const [genContext, setGenContext] = useState({ business: '', owner: '', product: 'our AI voice agent' });
  const [genOut, setGenOut] = useState<{ title: string; body: string; matched: ObjectionCategory | null } | null>(null);
  const [genText, setGenText] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const saveObjection = () => {
    if (!form.objection.trim() || !form.response.trim()) {
      showToast('Objection and response are both required');
      return;
    }
    library.add({
      id: uid(),
      category: form.category,
      title: form.title.trim() || form.objection.trim().slice(0, 60),
      objection: form.objection.trim(),
      response: form.response.trim(),
      notes: form.notes.trim(),
      createdAt: new Date().toISOString(),
    });
    setForm({ category: 'price', title: '', objection: '', response: '', notes: '' });
    showToast('Objection saved to library');
  };

  const generateByCategory = () => {
    const ctx = {
      business: genContext.business.trim() || 'your business',
      owner: genContext.owner.trim() || 'there',
      product: genContext.product.trim() || 'our AI voice agent',
    };
    setGenOut({ ...generateObjectionResponse(genCategory, ctx), matched: genCategory });
  };

  const generateFromText = () => {
    if (!genText.trim()) return;
    const ctx = {
      business: genContext.business.trim() || 'your business',
      owner: genContext.owner.trim() || 'there',
      product: genContext.product.trim() || 'our AI voice agent',
    };
    setGenOut({ ...generateResponseForText(genText, ctx), matched: null });
  };

  const filtered = library.items.filter((o) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      [o.title, o.objection, o.response, o.notes].join(' ').toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || o.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm shadow-2xl animate-fade-in">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Objection <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">Library</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Store what prospects say, and never be caught without a response again.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Library */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
            <h2 className="font-bold text-sm mb-4">Add an Objection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <FieldLabel>Category</FieldLabel>
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ObjectionCategory }))}
                >
                  {OBJECTION_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Title</FieldLabel>
                <input className={inputClass} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Too expensive" />
              </div>
            </div>
            <div className="mt-3">
              <FieldLabel required>What they say</FieldLabel>
              <textarea className={`${inputClass} min-h-[60px]`} value={form.objection} onChange={(e) => setForm((f) => ({ ...f, objection: e.target.value }))} placeholder="Your competitor is half the price…" />
            </div>
            <div className="mt-3">
              <FieldLabel required>Your response</FieldLabel>
              <textarea className={`${inputClass} min-h-[80px]`} value={form.response} onChange={(e) => setForm((f) => ({ ...f, response: e.target.value }))} placeholder="The response that wins this one…" />
            </div>
            <div className="mt-3">
              <FieldLabel>Notes</FieldLabel>
              <input className={inputClass} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="When this comes up, how it worked…" />
            </div>
            <button
              onClick={saveObjection}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" /> Save Objection
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  className={`${inputClass} pl-9`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search objections…"
                />
              </div>
              <select
                className={`${inputClass} w-auto`}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as 'all' | ObjectionCategory)}
              >
                <option value="all">All categories</option>
                {OBJECTION_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <EmptyState title="No objections saved" blurb="Add your first objection above — the library builds itself as you close deals." />
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {filtered.map((o) => (
                  <div key={o.id} className="rounded-xl bg-zinc-900/60 border border-white/10 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                          {OBJECTION_CATEGORIES.find((c) => c.id === o.category)?.label}
                        </span>
                        <p className="font-bold mt-2 text-sm">{o.title}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <CopyButton text={`"${o.objection}"\n\n→ ${o.response}`} label="Copy pair" />
                        <button
                          onClick={() => library.remove(o.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-red-300/80 mt-2 italic">&ldquo;{o.objection}&rdquo;</p>
                    <p className="text-sm text-zinc-300 mt-2">{o.response}</p>
                    {o.notes && <p className="text-[11px] text-zinc-600 mt-2">{o.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Response generator */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 space-y-4">
            <h2 className="font-bold text-sm flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-pink-400" /> Generate a Response
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <FieldLabel>Prospect context</FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  <input className={inputClass} value={genContext.business} onChange={(e) => setGenContext((c) => ({ ...c, business: e.target.value }))} placeholder="Business name" />
                  <input className={inputClass} value={genContext.owner} onChange={(e) => setGenContext((c) => ({ ...c, owner: e.target.value }))} placeholder="Owner name" />
                </div>
                <input className={`${inputClass} mt-2`} value={genContext.product} onChange={(e) => setGenContext((c) => ({ ...c, product: e.target.value }))} placeholder="What you're selling (e.g. our AI voice agent)" />
              </div>
              <div>
                <FieldLabel>Method A — pick category</FieldLabel>
                <select className={inputClass} value={genCategory} onChange={(e) => setGenCategory(e.target.value as ObjectionCategory)}>
                  {OBJECTION_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
                <button
                  onClick={generateByCategory}
                  className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-3 py-2.5 text-xs font-bold hover:brightness-110 active:scale-95 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Generate
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5">
              <FieldLabel>Method B — paste the objection</FieldLabel>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={genText}
                  onChange={(e) => setGenText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') generateFromText(); }}
                  placeholder='"That seems too expensive…"'
                />
                <button
                  onClick={generateFromText}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 text-xs font-bold text-zinc-300 hover:bg-white/10 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Match
                </button>
              </div>
              <p className="text-[10px] text-zinc-600 mt-1.5">Auto-detects the category (price, timing, trust…) and tailors the response.</p>
            </div>
          </div>

          {genOut && (
            <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-600/10 to-purple-600/5 p-5 animate-fade-in">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="font-bold text-sm">
                  {genOut.title}
                  {genOut.matched && (
                    <span className="ml-2 rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      {OBJECTION_CATEGORIES.find((c) => c.id === genOut.matched)?.label}
                    </span>
                  )}
                </p>
                <CopyButton text={genOut.body} />
              </div>
              <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{genOut.body}</p>
              <button
                onClick={() => setGenOut(null)}
                className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
