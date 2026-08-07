'use client';

import { useState } from 'react';
import { Plus, Trash2, Wand2 } from 'lucide-react';
import type { PricingLine } from '@/lib/sales/types';
import { PRICING_PRESETS } from '@/lib/sales/types';
import { uid } from '@/lib/sales/storage';
import { calculatePricing } from '@/lib/sales/pricing';
import { FieldLabel, inputClass } from '@/app/crm/components/ui';

export default function PricingPage() {
  const [lines, setLines] = useState<PricingLine[]>([
    { id: uid(), name: 'AI Voice Agent — Pro', type: 'monthly', amount: 799, qty: 1 },
    { id: uid(), name: 'Setup & Onboarding', type: 'one-time', amount: 499, qty: 1 },
  ]);
  const [discount, setDiscount] = useState(10);

  const result = calculatePricing(lines, discount);

  const setLine = (id: string, patch: Partial<PricingLine>) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const addLine = () =>
    setLines((ls) => [...ls, { id: uid(), name: '', type: 'monthly', amount: 0, qty: 1 }]);

  const removeLine = (id: string) => setLines((ls) => ls.filter((l) => l.id !== id));

  const applyPreset = (name: string, type: PricingLine['type'], amount: number) => {
    setLines((ls) => [
      ...ls.filter((l) => l.name !== name),
      { id: uid(), name, type, amount, qty: 1 },
    ]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Pricing <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Calculator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Build a line-item quote and model monthly, yearly, and discount scenarios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line items */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm">Line Items</h2>
            <button
              onClick={addLine}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add line
            </button>
          </div>

          <div className="space-y-2.5">
            {lines.map((line) => (
              <div key={line.id} className="grid grid-cols-[1fr_110px_100px_70px_36px] gap-2 items-center">
                <input
                  className={inputClass}
                  value={line.name}
                  onChange={(e) => setLine(line.id, { name: e.target.value })}
                  placeholder="Item name"
                />
                <select
                  className={inputClass}
                  value={line.type}
                  onChange={(e) => setLine(line.id, { type: e.target.value as PricingLine['type'] })}
                >
                  <option value="monthly">Monthly</option>
                  <option value="one-time">One-time</option>
                </select>
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={line.amount || ''}
                  onChange={(e) => setLine(line.id, { amount: Number(e.target.value) })}
                  placeholder="$"
                />
                <input
                  type="number"
                  min={1}
                  className={inputClass}
                  value={line.qty}
                  onChange={(e) => setLine(line.id, { qty: Math.max(1, Number(e.target.value)) })}
                  title="Quantity"
                />
                <button
                  onClick={() => removeLine(line.id)}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Presets — click to add</p>
            <div className="flex flex-wrap gap-2">
              {PRICING_PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.name, p.type, p.amount)}
                  title={p.description}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    lines.some((l) => l.name === p.name)
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-zinc-900/70 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {p.name} — ${p.amount}
                  {p.type === 'monthly' ? '/mo' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-600/15 to-amber-600/5 p-6 space-y-4">
            <h2 className="font-bold">Quote Summary</h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Monthly services</span>
              <span className="font-bold">${result.monthlyTotal.toLocaleString()}/mo</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">One-time fees</span>
              <span className="font-bold">${result.oneTimeTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Avg first-year monthly cost</span>
              <span className="font-bold">${result.avgMonthlyCost.toLocaleString()}/mo</span>
            </div>
            <div className="pt-3 border-t border-amber-500/20">
              <FieldLabel>Annual discount (%)</FieldLabel>
              <input
                type="number"
                min={0}
                max={50}
                className={inputClass}
                value={discount}
                onChange={(e) => setDiscount(Math.min(50, Math.max(0, Number(e.target.value))))}
              />
            </div>
            <div className="pt-3 border-t border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Yearly (paid monthly)</span>
                <span className="font-bold">${result.annualPaidMonthly.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Yearly (paid upfront)</span>
                <span className="font-bold text-emerald-400">${result.annualPaidUpfront.toLocaleString()}</span>
              </div>
              {result.annualSavings > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Wand2 className="w-3.5 h-3.5" /> You save
                  </span>
                  <span className="font-bold text-emerald-400">${result.annualSavings.toLocaleString()}/yr</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 text-xs text-zinc-500 leading-relaxed">
            Tip: quote a yearly plan with a discount — it&apos;s a proven closing lever and reduces churn for 12 months.
          </div>
        </div>
      </div>
    </div>
  );
}
