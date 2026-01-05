import Link from 'next/link';

export const metadata = {
  title: 'Blog — Brandverse',
  description: 'Insights and articles about AI voice automation, onboarding, scripts, and case studies for local businesses.',
};

export default function BlogIndex() {
  const posts = [
    {
      slug: 'how-ai-boosts-leads',
      title: 'How AI Voice Agents Boost Leads by 200%',
      excerpt: 'Stop losing money to voicemail. Discover the math behind 24/7 instant lead response and how it doubles conversion rates for contractors.',
      date: 'Dec 12, 2024',
      category: 'Growth'
    },
    {
      slug: 'human-vs-ai-receptionist',
      title: 'Human vs. AI Receptionist: The Real Cost Breakdown',
      excerpt: 'We crunched the numbers on salary, benefits, sick days, and training vs. a flat-rate AI employee. The savings are shocking.',
      date: 'Dec 08, 2024',
      category: 'Comparison'
    },
    {
      slug: 'future-of-service-business',
      title: 'The Future of Service Businesses is "Always On"',
      excerpt: 'Why modern customers expect instant gratification and how service businesses must adapt their communication stack to survive.',
      date: 'Nov 28, 2024',
      category: 'Industry Trends'
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-6">Insights & Articles</h1>
        <p className="text-slate-400 mb-10">Practical guides and case studies about AI voice automation for local businesses.</p>

        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group">
              <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-widest">
                <span className="text-blue-400">{p.category}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">{p.date}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h2>
              <p className="text-slate-400 mb-6 text-lg leading-relaxed">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all">
                Read Article <span className="text-blue-500">→</span>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
