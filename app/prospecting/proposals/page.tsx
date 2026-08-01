'use client';

import ProposalGenerator from '../../sales/components/ProposalGenerator';

export default function ProspectingProposalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Proposal <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Generator</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Same branded proposal engine as the Sales System — preview, print, or save as PDF.
        </p>
      </div>
      <ProposalGenerator />
    </div>
  );
}
