import Link from 'next/link';

export const metadata = {
  title: 'CRM & Calendar Integration Guide — Brandverse',
  description: 'How to connect Brandverse to ServiceTitan, Housecall Pro, Calendly, and CRMs for seamless booking.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">CRM & Calendar Integration Guide</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — Step-by-step integration examples and common troubleshooting tips.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>We cover direct integrations, webhook setups, and fallback patterns to ensure bookings land in the right place every time.</p>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
