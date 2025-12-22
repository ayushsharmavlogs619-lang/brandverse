import Link from 'next/link';

export const metadata = {
  title: 'Scaling Across Multiple Locations — Brandverse',
  description: 'Best practices for deploying AI agents across franchises, multi-location businesses, and regional teams.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">Scaling Across Multiple Locations</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — Patterns for routing, local script variations, and reporting across regions.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>We discuss routing rules, local pricing, and consistency controls to ensure brand voice without losing local context.</p>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
