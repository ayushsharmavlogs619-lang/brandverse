import Link from 'next/link';

export const metadata = {
  title: 'AI Voice ROI Explained — Brandverse',
  description: 'Understand the math behind AI voice agents and how they can deliver rapid ROI for service businesses.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">AI Voice ROI Explained</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — A practical breakdown of metrics you should track when evaluating AI voice agents.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>The simplest ROI model compares recovered leads and reduced staffing costs. Examples and templates are provided to calculate your breakeven point.</p>
          <p>We walk through conservative, base, and aggressive scenarios so you can decide which outcome fits your business.</p>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
