'use client';

import RoiCalculator from '../components/RoiCalculator';

export default function SalesRoiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">ROI <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Calculator</span></h1>
        <p className="text-sm text-zinc-500 mt-1">
          Enter the client&apos;s numbers and show them exactly how much missed-call revenue an AI agent recovers.
        </p>
      </div>
      <RoiCalculator />
    </div>
  );
}
