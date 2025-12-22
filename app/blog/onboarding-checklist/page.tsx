import Link from 'next/link';

export const metadata = {
  title: 'Onboarding Checklist for AI Agents — Brandverse',
  description: 'A step-by-step onboarding checklist to get your AI agent live and converting quickly.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">Onboarding Checklist for AI Agents</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — Everything we run during discovery, script design, pilot, and scale.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <ol className="list-decimal pl-6 space-y-2">
            <li>Discovery call & KPI definition</li>
            <li>Script drafting and objection handling</li>
            <li>Pilot deployment and tuning</li>
            <li>Full rollout and weekly optimization</li>
          </ol>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
