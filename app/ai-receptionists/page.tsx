import Link from 'next/link';
import { ArrowRight, Calendar, Phone, Bot, Users, Shield, ChevronRight } from 'lucide-react';
import { config } from '@/lib/config';
import { articles } from '@/app/lib/articles';

export const metadata = {
    title: 'AI Receptionists for Business — Guides & Resources | Brandverse',
    description: 'Everything about AI receptionists: how they work, costs, industries, ROI, and implementation guides. Complete resource hub for business owners.',
    openGraph: {
        title: 'AI Receptionists Resource Hub — Brandverse',
        description: 'Complete guides and resources about AI receptionists for small businesses.',
        type: 'website',
    },
};

export default function AIReceptionistsHub() {
    const hubArticles = articles.filter(a =>
        ['ai-receptionist-guide-2026', 'ai-voice-agents-transforming-customer-service', 'voice-ai-vs-human-receptionists', 'stop-losing-leads-after-hours', 'how-ai-boosts-leads', 'ai-voice-roi', 'cost-of-not-using-ai', '5-signs-youre-ready'].includes(a.slug)
    );

    const industryArticles = articles.filter(a =>
        a.category === 'Industry Focus'
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        AI Receptionists
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Resource Hub</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Everything you need to know about AI receptionists: how they work, what they cost, which industries benefit most, and how to implement one in your business.
                    </p>
                </div>
            </header>

            <main className="px-6 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-8">Featured Guides</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {hubArticles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">{article.category}</div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                                    <p className="text-sm text-slate-400 mb-4">{article.excerpt}</p>
                                    <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-semibold group-hover:gap-2 transition-all">
                                        Read Guide <ArrowRight className="w-3 h-3" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-8">By Industry</h2>
                        <div className="grid md:grid-cols-3 gap-3">
                            {industryArticles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all text-sm group"
                                >
                                    <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{article.title}</span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <div className="p-8 rounded-3xl bg-blue-900/40 border border-blue-500/30">
                        <h2 className="text-2xl font-bold text-white mb-4">What Is an AI Receptionist?</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            An AI receptionist is a conversational AI that answers phone calls, books appointments, qualifies leads, and handles inquiries 24/7. It uses natural language processing to understand callers and integrates with your calendar and CRM.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex items-start gap-2">• Answers 100% of calls, never puts anyone on hold</li>
                            <li className="flex items-start gap-2">• Books appointments directly into your calendar</li>
                            <li className="flex items-start gap-2">• Costs 80-90% less than a human receptionist per hour</li>
                            <li className="flex items-start gap-2">• Works 24/7/365 without breaks or overtime</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">How much does an AI receptionist cost?</h3>
                            <p className="text-slate-400 leading-relaxed">AI receptionist services vary by provider — typically $300 to $1,500 per month depending on call volume. Brandverse offers flat-rate plans from $497 to $1,497 per month with no per-minute charges. Compared to a human receptionist at $2,500-$4,500/month plus benefits, the savings are substantial.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">How long does it take to set up?</h3>
                            <p className="text-slate-400 leading-relaxed">Basic setup takes 1-3 days. Full customization with custom scripts and integrations takes 1-2 weeks.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">What industries benefit most from AI receptionists?</h3>
                            <p className="text-slate-400 leading-relaxed">HVAC, plumbing, medical, dental, legal, real estate, restaurants, salons, auto repair, and property management all see strong results.</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-10 rounded-3xl border border-blue-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Ready to Get Started?</h3>
                        <p className="text-slate-300 max-w-lg mx-auto">Book a free strategy call to see how an AI receptionist can work for your business.</p>
                        <Link href={config.calendlyUrl} className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/25">
                            Book a Free Strategy Call <Calendar className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
