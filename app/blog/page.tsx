import Link from 'next/link';

export const metadata = {
  title: 'Blog — Brandverse',
  description: 'Insights and articles about AI voice automation, onboarding, scripts, and case studies for local businesses.',
};

export default function BlogIndex() {
  const posts = [
    { slug: 'how-ai-boosts-leads', title: 'How AI Voice Agents Boost Leads by 200%', excerpt: 'Real tactics we use to increase lead capture without adding staff.' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">BRANDVERSE</Link>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
          </div>
          <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">Book Demo</Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-6">Insights & Articles</h1>
        <p className="text-slate-400 mb-10">Practical guides and case studies about AI voice automation for local businesses.</p>

        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">{p.title}</h2>
              <p className="text-slate-400 mb-4">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="text-blue-400 font-bold">Read more →</Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="text-2xl font-black text-white">BRANDVERSE</div>
            <p className="text-slate-500 leading-relaxed">AI-powered solutions specifically designed for Small to Medium Sized Businesses.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <div className="space-y-2 text-slate-400">
              <p>ayush@brandverse.tech</p>
              <p>Live Chat Available 24/7</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <div className="space-y-2 text-slate-400">
              <Link href="/about" className="block hover:text-blue-500">About</Link>
              <Link href="/services" className="block hover:text-blue-500">Services</Link>
              <Link href="/portfolio" className="block hover:text-blue-500">Portfolio</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <div className="space-y-2 text-slate-400 text-sm">
              <Link href="/privacy" className="block hover:text-blue-500">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-blue-500">Terms & Conditions</Link>
              <p className="pt-4">© 2025 Brandverse AI.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
