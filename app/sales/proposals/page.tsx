'use client';

import ProposalGenerator from '../components/ProposalGenerator';

export default function SalesProposalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Proposal <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Generator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Build a branded proposal, preview it, and print or save as PDF — no design work needed.
        </p>
      </div>
      <ProposalGenerator />
    </div>
  );
}
