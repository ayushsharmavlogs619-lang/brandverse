'use client';

import Link from 'next/link';
import { getRelatedArticles } from '../lib/articles';

interface RelatedArticlesProps {
    currentSlug: string;
}

const categoryColors: Record<string, { text: string; border: string }> = {
    'Value Proposition': { text: 'text-green-400', border: 'border-green-500/30' },
    'Warning': { text: 'text-red-400', border: 'border-red-500/30' },
    'Assessment': { text: 'text-purple-400', border: 'border-purple-500/30' },
    'Case Study': { text: 'text-blue-400', border: 'border-blue-500/30' },
    'Financial Strategy': { text: 'text-cyan-400', border: 'border-cyan-500/30' },
    'Growth': { text: 'text-orange-400', border: 'border-orange-500/30' },
};

export default function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
    const related = getRelatedArticles(currentSlug, 2);

    if (related.length === 0) return null;

    return (
        <section className="max-w-3xl mx-auto mt-20 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-black text-white mb-8 uppercase italic tracking-wide">
                Keep Reading
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                {related.map((article) => {
                    const colors = categoryColors[article.category] || { text: 'text-slate-400', border: 'border-white/10' };
                    return (
                        <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:${colors.border} transition-all group`}
                        >
                            <div className={`text-xs font-black uppercase tracking-widest ${colors.text} mb-2`}>
                                {article.category}
                            </div>
                            <h4 className={`text-lg font-bold text-white mb-2 group-hover:${colors.text} transition-colors`}>
                                {article.title}
                            </h4>
                            <p className="text-sm text-slate-400">{article.excerpt}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
