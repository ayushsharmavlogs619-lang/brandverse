'use client';

import { useState } from 'react';
import { Code2, Download, Eye, Globe, Plus, Sparkles, X } from 'lucide-react';
import type { LandingPageData } from '@/lib/sales/proposals';
import { LANDING_BENEFITS, renderLandingPageHtml } from '@/lib/sales/proposals';
import { downloadText } from '@/lib/sales/storage';
import { FieldLabel, inputClass } from '@/app/crm/components/ui';

const ACCENTS: { id: LandingPageData['accent']; label: string }[] = [
  { id: 'blue', label: 'Blue' },
  { id: 'green', label: 'Green' },
  { id: 'amber', label: 'Amber' },
];

export default function LandingPagesPage() {
  const [form, setForm] = useState<LandingPageData>({
    business: '',
    niche: '',
    city: '',
    phone: '',
    headline: '',
    offer: '',
    cta: 'Call Now',
    benefits: [...LANDING_BENEFITS],
    accent: 'blue',
  });
  const [html, setHtml] = useState('');
  const [preview, setPreview] = useState(false);

  const set = <K extends keyof LandingPageData>(key: K, value: LandingPageData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateBenefit = (idx: number, value: string) =>
    set('benefits', form.benefits.map((b, i) => (i === idx ? value : b)));

  const generate = () => setHtml(renderLandingPageHtml(form));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Landing Page <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Generator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          A self-contained HTML page for any local business — host it anywhere or send it as a link.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 space-y-4">
          <h2 className="font-bold text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" /> Page Details
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel required>Business</FieldLabel>
              <input className={inputClass} value={form.business} onChange={(e) => set('business', e.target.value)} placeholder="e.g. Carter Electric" />
            </div>
            <div>
              <FieldLabel>Niche</FieldLabel>
              <input className={inputClass} value={form.niche} onChange={(e) => set('niche', e.target.value)} placeholder="e.g. Electrician" />
            </div>
            <div>
              <FieldLabel>City</FieldLabel>
              <input className={inputClass} value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="e.g. Denver" />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <input className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(303) 555-0177" />
            </div>
          </div>
          <div>
            <FieldLabel>Headline</FieldLabel>
            <input className={inputClass} value={form.headline} onChange={(e) => set('headline', e.target.value)} placeholder="e.g. Denver's 5-star electricians, available 24/7" />
          </div>
          <div>
            <FieldLabel>Offer</FieldLabel>
            <textarea className={`${inputClass} min-h-[60px]`} value={form.offer} onChange={(e) => set('offer', e.target.value)} placeholder="e.g. Free estimate. Same-day service. Licensed & insured." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Button Text (CTA)</FieldLabel>
              <input className={inputClass} value={form.cta} onChange={(e) => set('cta', e.target.value)} />
            </div>
            <div>
              <FieldLabel>Accent Color</FieldLabel>
              <select className={inputClass} value={form.accent} onChange={(e) => set('accent', e.target.value as LandingPageData['accent'])}>
                {ACCENTS.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <FieldLabel>Benefits</FieldLabel>
            <div className="space-y-2">
              {form.benefits.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputClass} value={b} onChange={(e) => updateBenefit(i, e.target.value)} />
                  <button
                    type="button"
                    onClick={() => set('benefits', form.benefits.filter((_, x) => x !== i))}
                    className="w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => set('benefits', [...form.benefits, ''])}
                className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add benefit
              </button>
            </div>
          </div>
          <button
            onClick={generate}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 text-sm font-bold shadow-lg shadow-emerald-600/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Generate Landing Page
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {html ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setPreview(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
                >
                  <Eye className="w-4 h-4" /> Live Preview
                </button>
                <button
                  onClick={() =>
                    downloadText(
                      `landing-${(form.business || 'business').toLowerCase().replace(/\s+/g, '-')}.html`,
                      html,
                      'text/html'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download HTML
                </button>
                <button
                  onClick={() => navigator.clipboard?.writeText(html).catch(() => undefined)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
                >
                  <Code2 className="w-4 h-4" /> Copy Code
                </button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-hidden">
                <iframe title="Landing page preview" srcDoc={html} className="w-full h-[70vh] bg-white" sandbox="" />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center py-24 px-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-zinc-500" />
              </div>
              <h3 className="font-semibold text-lg">No page generated yet</h3>
              <p className="text-sm text-zinc-500 mt-1 max-w-sm">
                Fill in the business details and hit Generate — you&apos;ll get a mobile-ready page with a click-to-call button and lead form.
              </p>
            </div>
          )}
        </div>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Live Preview</h3>
              <button
                onClick={() => setPreview(false)}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <iframe title="Landing page preview" srcDoc={html} className="w-full h-[80vh] rounded-2xl overflow-hidden bg-white" sandbox="" />
          </div>
        </div>
      )}
    </div>
  );
}
