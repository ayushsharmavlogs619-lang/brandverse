import Link from 'next/link';

export const metadata = {
  title: 'Multilingual Outreach Strategies — Brandverse',
  description: 'How to use multilingual AI agents to expand market reach and improve lead capture.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">Multilingual Outreach Strategies</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — Tactics for deploying Spanish and other language agents to capture more local leads.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>Language detection, fallback routing, and localized scripts help increase conversions in multilingual markets.</p>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
