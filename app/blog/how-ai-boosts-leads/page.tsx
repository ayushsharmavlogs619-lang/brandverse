import Link from 'next/link';

export default function SamplePost() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <article className="prose prose-invert">
          <h1 className="text-4xl font-black text-white">How AI Voice Agents Boost Leads by 200%</h1>
          <p className="text-slate-400">An in-depth look at tactics, scripts, and implementation that drive measurable revenue.</p>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">The Problem</h2>
            <p className="text-slate-400">Most local businesses lose customers to slow pickup times, unreachable phones, and poor qualification. AI solves all three at scale.</p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Tactics We Use</h2>
            <ul className="text-slate-400 list-disc pl-6">
              <li>Immediate pickup with natural conversation</li>
              <li>Ask conversion-focused qualification questions</li>
              <li>Instant booking with calendar checks</li>
            </ul>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Results</h2>
            <p className="text-slate-400">Clients typically see dramatic increases in booked appointments and reduced cost-per-lead after tuning the agent to their business.</p>
          </section>

          <div className="mt-12">
            <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
          </div>
        </article>
      </main>
    </div>
  );
}
