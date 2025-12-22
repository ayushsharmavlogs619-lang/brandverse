import Link from 'next/link';

export const metadata = {
  title: 'Voice Cloning: Ethics & Best Practices — Brandverse',
  description: 'Guidance on using voice cloning responsibly and building consent-forward experiences for customers.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white">Voice Cloning: Ethics & Best Practices</h1>
        <p className="text-slate-400 mt-4">By Ayush Sharma — How we protect consent, transparency, and customer trust when cloning voices.</p>

        <section className="mt-8 space-y-4 text-slate-400">
          <p>We outline consent flows, secure storage, and audit logs that make voice cloning safe for brands and customers alike.</p>
        </section>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-400 font-bold">← Back to articles</Link>
        </div>
      </main>
    </div>
  );
}
