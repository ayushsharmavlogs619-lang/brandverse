'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Clock, ArrowRight, TrendingUp, ArrowUpRight, Mail, ChevronRight } from 'lucide-react';
import { articles, type Article } from '../lib/articles';

const categoryColors: Record<string, string> = {
    'Industry Focus': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    'Case Study': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'Guides': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    'Comparison': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    'Customer Experience': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    'Operations': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'Lead Generation': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Warning': 'text-red-400 bg-red-500/10 border-red-500/20',
    'Technical Guide': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    'Growth Strategy': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    'Ethics & Trust': 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    'Business Strategy': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
};

function getCategoryColor(category: string): string {
    return categoryColors[category] || 'text-slate-400 bg-white/5 border-white/10';
}

function estimateReadingTime(title: string, excerpt: string): number {
    const wordCount = title.split(' ').length + excerpt.split(' ').length;
    return Math.max(5, Math.round(wordCount / 200) + 3);
}

const categoryIcons: Record<string, string> = {
    'Industry Focus': '🏭',
    'Case Study': '📋',
    'Guides': '📘',
    'Comparison': '⚖️',
    'Customer Experience': '💬',
    'Operations': '⚙️',
    'Lead Generation': '📈',
    'Growth Strategy': '🚀',
};

function getCategoryIcon(cat: string): string {
    return categoryIcons[cat] || '📄';
}

export default function BlogIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = useMemo(() => {
        const catSet = new Set(articles.map((a) => a.category));
        return Array.from(catSet).sort();
    }, []);

    const filteredArticles = useMemo(() => {
        let result = articles;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (a) =>
                    a.title.toLowerCase().includes(q) ||
                    a.excerpt.toLowerCase().includes(q) ||
                    a.category.toLowerCase().includes(q)
            );
        }
        if (selectedCategory) {
            result = result.filter((a) => a.category === selectedCategory);
        }
        return result;
    }, [searchQuery, selectedCategory]);

    const featured = articles[0];
    const trending = articles.slice(1, 4);
    const latest = (selectedCategory || searchQuery) ? filteredArticles : articles.slice(0, 12);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            {/* Hero */}
            <header className="relative pt-32 pb-16 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                                Intelligence
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    {!selectedCategory && !searchQuery && (
                        <>
                            {/* Featured Article */}
                            <section className="mb-16">
                                <div className="flex items-center gap-2 mb-6">
                                    <TrendingUp className="w-5 h-5 text-blue-400" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-blue-400">Featured</h2>
                                </div>
                                <Link
                                    href={`/blog/${featured.slug}`}
                                    className="block relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 via-blue-800/20 to-slate-900 border border-blue-500/20 hover:border-blue-500/40 transition-all group"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />
                                    <div className="relative p-8 md:p-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
                                            {featured.category}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                                            {featured.title}
                                        </h3>
                                        <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-2xl">
                                            {featured.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {estimateReadingTime(featured.title, featured.excerpt)} min read
                                            </span>
                                            <span>{featured.date}</span>
                                        </div>
                                        <span className="inline-flex items-center gap-2 text-blue-400 font-bold mt-6 group-hover:gap-3 transition-all">
                                            Read Featured Article <ArrowUpRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            </section>

                            {/* Trending */}
                            <section className="mb-16">
                                <div className="flex items-center gap-2 mb-6">
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-emerald-400">Trending</h2>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {trending.map((article, i) => (
                                        <Link
                                            key={article.slug}
                                            href={`/blog/${article.slug}`}
                                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                                        >
                                            <span className="text-3xl font-black text-slate-700 mb-3 block">0{i + 1}</span>
                                            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/5 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                                                {article.category}
                                            </div>
                                            <h3 className="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-snug">{article.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-3">
                                                <Clock className="w-3 h-3" />
                                                {estimateReadingTime(article.title, article.excerpt)} min read
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            {/* Categories Grid */}
                            <section className="mb-16">
                                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Popular Topics</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {categories.slice(0, 8).map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-blue-500/30 transition-all text-left group"
                                        >
                                            <span className="text-lg mb-1 block">{getCategoryIcon(cat)}</span>
                                            <span className="text-sm font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">{cat}</span>
                                            <span className="text-xs text-slate-500 block mt-0.5">{articles.filter((a) => a.category === cat).length} articles</span>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    {/* Latest / Filtered Articles */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
                                {searchQuery || selectedCategory ? 'Search Results' : 'Latest Articles'}
                            </h2>
                            <span className="text-xs text-slate-500">{filteredArticles.length} articles</span>
                        </div>

                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-slate-500 text-lg mb-2">No articles found</p>
                                <p className="text-sm text-slate-600">Try a different search term or category</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {latest.map((article) => {
                                    const catColor = getCategoryColor(article.category);
                                    return (
                                        <Link
                                            key={article.slug}
                                            href={`/blog/${article.slug}`}
                                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest border ${catColor}`}>
                                                    {article.category}
                                                </span>
                                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {estimateReadingTime(article.title, article.excerpt)} min
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{article.excerpt}</p>
                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-xs text-slate-500">{article.date}</span>
                                                <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Newsletter CTA */}
                    <section className="mt-16 p-10 rounded-3xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 text-center">
                        <div className="max-w-md mx-auto space-y-4">
                            <Mail className="w-10 h-10 text-blue-400 mx-auto" />
                            <h3 className="text-2xl font-black text-white">Stay Ahead of the Curve</h3>
                            <p className="text-slate-400 text-sm">
                                Get the latest AI automation insights, industry guides, and case studies delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                                />
                                <button className="px-6 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-slate-600">No spam. Unsubscribe anytime.</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
