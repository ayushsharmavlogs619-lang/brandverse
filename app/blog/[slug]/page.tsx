import Link from 'next/link';
import { notFound } from 'next/navigation';
import CalendlyCTA from '@/app/components/CalendlyCTA';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata = {
  title: 'Blog — Brandverse',
  description: 'Insights about AI voice agents and business automation.',
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find(p => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <Link href="/blog" className="text-slate-500 hover:text-blue-400 mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors">
          ← Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6 text-sm font-bold uppercase tracking-widest">
            <span className="text-blue-400">{post.category}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{post.title}</h1>
        </header>

        <article className="prose prose-invert prose-lg max-w-none text-slate-400">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="py-20 text-center border border-white/5 bg-white/5 rounded-2xl">
              <p className="text-slate-500 italic">This article content is being migrated to the new system. Please check back shortly!</p>
            </div>
          )}
        </article>

        <CalendlyCTA />
      </main>
    </div>
  );
}
