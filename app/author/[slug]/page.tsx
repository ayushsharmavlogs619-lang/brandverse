import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Users, Linkedin, Twitter, Clock, ArrowRight } from 'lucide-react';
import { authors, type Author } from '@/lib/authors';
import { articles } from '@/app/lib/articles';

export const dynamicParams = false;

export function generateStaticParams() {
    return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = authors.find((a) => a.slug === slug);
    if (!author) return { title: 'Author not found — Brandverse' };
    return {
        title: `${author.name} — Brandverse Authors`,
        description: author.shortBio,
        openGraph: {
            title: `${author.name} — Brandverse`,
            description: author.shortBio,
            type: 'profile',
        },
    };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = authors.find((a) => a.slug === slug);
    if (!author) notFound();

    const authorArticles = articles.filter((a) => a.category !== 'Case Study');

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <Link href="/authors" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> All Authors
                </Link>

                <div className="flex flex-col md:flex-row gap-8 mb-16 p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white shrink-0">
                        <Users className="w-10 h-10" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-4xl font-black text-white mb-2">{author.name}</h1>
                        <p className="text-blue-400 font-semibold mb-4">{author.title}</p>
                        <p className="text-slate-400 leading-relaxed mb-6">{author.bio}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {author.expertise.map((area) => (
                                <span key={area} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                                    {area}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            {author.social.twitter && (
                                <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-blue-400 hover:bg-white/10 transition-all text-sm">
                                    <Twitter className="w-4 h-4" /> Twitter
                                </a>
                            )}
                            {author.social.linkedin && (
                                <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-blue-400 hover:bg-white/10 transition-all text-sm">
                                    <Linkedin className="w-4 h-4" /> LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-wide">Recent Articles</h2>

                <div className="space-y-4">
                    {authorArticles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-2 text-xs font-bold uppercase tracking-widest">
                                <span className="text-blue-400">{article.category}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {article.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{article.title}</h3>
                            <p className="text-slate-400 text-sm">{article.excerpt}</p>
                            <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
                                Read Article <ArrowRight className="w-3 h-3" />
                            </span>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
