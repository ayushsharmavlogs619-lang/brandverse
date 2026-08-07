'use client';

import RoiCalculator from '../../sales/components/RoiCalculator';

export default function ProspectingRoiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          ROI <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Calculator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Punch in the prospect&apos;s numbers and show them the revenue they&apos;re leaving on the table.
        </p>
      </div>
      <RoiCalculator />
    </div>
  );
}
