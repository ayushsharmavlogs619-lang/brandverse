import Link from 'next/link';

export const metadata = {
  title: 'Telecom & Privacy Compliance — Brandverse',
  description: 'Practical checklist for TCPA and GDPR when deploying AI voice agents.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">Telecom & Privacy Compliance (TCPA/GDPR)</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — Checklists and consent examples to keep your business compliant.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>We recommend record-keeping, explicit consent scripts, and opt-out flows that meet regulatory expectations.</p>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
