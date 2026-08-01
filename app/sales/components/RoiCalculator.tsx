'use client';

import { useState } from 'react';
import { PhoneMissed, TrendingUp, Users, Wallet, Zap } from 'lucide-react';
import { calculateRoi, formatMoney, type RoiInput } from '@/lib/sales/roi';
import { FieldLabel, inputClass } from '@/app/crm/components/ui';

const DEFAULTS: RoiInput = {
  revenue: 25000,
  missedCalls: 30,
  leadValue: 250,
  closeRatePct: 30,
  captureRatePct: 85,
};

export default function RoiCalculator() {
  const [input, setInput] = useState<RoiInput>(DEFAULTS);
  const result = calculateRoi(input);

  const set = (key: keyof RoiInput, value: number) =>
    setInput((i) => ({ ...i, [key]: value }));

  const stats = [
    {
      label: 'Missed calls / year',
      value: result.missedCallsPerYear.toLocaleString(),
      icon: PhoneMissed,
      sub: 'currently going to voicemail',
    },
    {
      label: 'Leads captured',
      value: result.leadsCapturedPerYear.toLocaleString(),
      icon: Users,
      sub: 'by the AI agent',
    },
    {
      label: 'Deals closed / year',
      value: result.dealsClosedPerYear.toLocaleString(),
      icon: Zap,
      sub: 'at your close rate',
    },
    {
      label: 'Recovered / year',
      value: formatMoney(result.recoveredRevenuePerYear),
      icon: Wallet,
      sub: `${formatMoney(result.recoveredRevenuePerMonth)} per month`,
    },
    {
      label: 'Share of revenue',
      value: `${result.revenueShare}%`,
      icon: TrendingUp,
      sub: 'of current yearly revenue',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 space-y-5">
          <h2 className="font-bold">Your Numbers</h2>
          <div>
            <FieldLabel>Monthly Revenue</FieldLabel>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={input.revenue || ''}
              onChange={(e) => set('revenue', Number(e.target.value))}
              placeholder="e.g. 25000"
            />
          </div>
          <div>
            <FieldLabel>Missed Calls per Month</FieldLabel>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={input.missedCalls || ''}
              onChange={(e) => set('missedCalls', Number(e.target.value))}
              placeholder="e.g. 30"
            />
          </div>
          <div>
            <FieldLabel>Average Lead Value ($ per closed lead)</FieldLabel>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={input.leadValue || ''}
              onChange={(e) => set('leadValue', Number(e.target.value))}
              placeholder="e.g. 250"
            />
          </div>
          <div>
            <FieldLabel>Lead Close Rate (%)</FieldLabel>
            <input
              type="number"
              min={1}
              max={100}
              className={inputClass}
              value={input.closeRatePct || ''}
              onChange={(e) => set('closeRatePct', Number(e.target.value))}
            />
          </div>
          <div>
            <FieldLabel>Agent Capture Rate (%)</FieldLabel>
            <input
              type="number"
              min={1}
              max={100}
              className={inputClass}
              value={input.captureRatePct || ''}
              onChange={(e) => set('captureRatePct', Number(e.target.value))}
            />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600/15 to-emerald-600/5 p-6">
            <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-1">
              Estimated Yearly Revenue Recovered
            </p>
            <p className="text-4xl md:text-5xl font-bold text-white">
              {formatMoney(result.recoveredRevenuePerYear)}
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              That&apos;s roughly <b className="text-white">{formatMoney(result.recoveredRevenuePerMonth)}/mo</b> recovered
              — the equivalent of <b className="text-white">{result.additionalCallsNeeded} extra leads</b> every month.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {s.label}
                  </span>
                </div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 text-sm text-zinc-400">
            <p className="font-bold text-white mb-2">How it&apos;s calculated</p>
            <p>
              Missed calls × 12 months = calls lost per year. The AI agent captures{' '}
              {input.captureRatePct}% of them, and {input.closeRatePct}% of captured leads close at your
              average lead value of {formatMoney(input.leadValue)}. That recovered revenue is on top of
              your existing {formatMoney(input.revenue * 12)}/year — no extra marketing spend needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
