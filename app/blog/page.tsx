import Link from 'next/link';
import CalendlyCTA from '@/app/components/CalendlyCTA';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata = {
  title: 'Blog — Brandverse',
  description: 'Insights and articles about AI automation, voice agents, chatbots, and paid advertising for local businesses.',
};

export default function BlogIndex() {
  const posts = BLOG_POSTS;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-semibold text-white mb-6">Insights & Articles</h1>
        <p className="text-slate-400 mb-12 text-lg">Practical guides and case studies for business owners who want more customers.</p>

        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all group">
              <div className="flex items-center gap-3 mb-4 text-xs font-medium uppercase tracking-wider">
                <span className="text-blue-400">{p.category}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">{p.date}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 text-blue-400 font-medium hover:gap-3 transition-all">
                Read Article <span>→</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-20">
          <CalendlyCTA />
        </div>
      </main>
    </div>
  );
}
