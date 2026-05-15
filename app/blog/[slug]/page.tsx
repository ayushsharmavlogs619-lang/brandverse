import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog-content';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article not found — Brandverse' };
  return {
    title: `${post.title} — Brandverse`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            BRANDVERSE
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/about/" className="hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="/services/" className="hover:text-blue-400 transition-colors">
              Services
            </Link>
            <Link href="/blog/" className="hover:text-blue-400 transition-colors">
              Blog
            </Link>
          </div>
          <Link
            href="/contact/"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
          >
            Book Demo
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <Link
          href="/blog/"
          className="text-slate-500 hover:text-blue-400 mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors"
        >
          ← Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6 text-sm font-bold uppercase tracking-widest">
            <span className="text-blue-400">{post.category}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{post.title}</h1>
          <p className="text-lg text-slate-400 leading-relaxed">{post.excerpt}</p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none text-slate-400">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="mt-16 pt-12 border-t border-white/10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to automate your business?</h3>
          <Link
            href="/contact/"
            className="inline-block px-8 py-4 bg-blue-600 rounded-xl font-black text-white hover:bg-blue-700 transition-all"
          >
            Schedule Your Demo
          </Link>
        </div>
      </main>
    </div>
  );
}
