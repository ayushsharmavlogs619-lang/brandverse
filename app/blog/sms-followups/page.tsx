import Link from 'next/link';

export const metadata = {
  title: 'Automated SMS Follow-ups — Brandverse',
  description: 'Best practices for SMS confirmations and follow-ups that increase show-rates and conversions.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">Automated SMS Follow-ups that Convert</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — Templates and timing strategies for confirmation and reminder messages.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>Simple confirmation + 24hr reminder sequences dramatically increase appointment show rates and reduce no-shows.</p>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
