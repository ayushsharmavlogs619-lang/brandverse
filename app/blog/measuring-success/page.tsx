import Link from 'next/link';

export const metadata = {
  title: 'Measuring AI Agent Performance — Brandverse',
  description: 'KPIs and dashboards you should track to measure the success of your AI voice agent.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">Measuring AI Agent Performance & KPIs</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — Bookings, conversion rate, time-to-pickup, and revenue per call are core metrics we monitor.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>We recommend dashboards that combine call quality, booked appointments, and revenue impact so you can optimize continuously.</p>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
