import Link from 'next/link';

export const metadata = {
  title: 'High-Converting Call Scripts — Brandverse',
  description: 'Real script examples that convert callers into booked appointments.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">High-Converting Call Scripts (Examples)</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — Exact phrasing we use to increase booking rates during live calls.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>Scripts prioritize qualification, urgency, and immediate booking. Below are short templates for common industries.</p>
          <pre className="bg-black/40 p-4 rounded text-sm">"Hi, this is [Business]. We have an opening at 3 PM today — does that work for you?"</pre>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
