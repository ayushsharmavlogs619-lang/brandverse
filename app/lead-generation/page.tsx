import Link from 'next/link';
import { ArrowRight, Calendar, TrendingUp, Users } from 'lucide-react';
import { config } from '@/lib/config';
import { articles } from '@/app/lib/articles';

export const metadata = {
    title: 'Lead Generation Automation — Guides & Resources | Brandverse',
    description: 'Resource hub for AI-powered lead generation: capture every inbound call, qualify leads instantly, and book appointments 24/7.',
    openGraph: { title: 'Lead Generation Hub — Brandverse', description: 'Guides on automating lead generation with AI.', type: 'website' },
};

export default function LeadGenerationHub() {
    const hubArticles = articles.filter(a =>
        ['stop-losing-leads-after-hours', 'how-ai-boosts-leads', 'ai-lead-qualification', 'real-estate-lead-speed', 'stop-wasting-marketing-budget', '24-7-sales-revolution', 'cost-of-not-using-ai'].includes(a.slug)
    );
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">Lead Generation<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Resource Hub</span></h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Stop losing leads. Capture every inbound call, qualify prospects automatically, and convert more with instant AI-powered response.</p>
                </div>
            </header>
            <main className="px-6 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    <section><h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-8">Featured Guides</h2>
                        <div className="grid md:grid-cols-2 gap-4">{hubArticles.map((article) => (<Link key={article.slug} href={`/blog/${article.slug}`} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-amber-500/30 transition-all group"><div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2">{article.category}</div><h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{article.title}</h3><p className="text-sm text-slate-400 mb-4">{article.excerpt}</p><span className="inline-flex items-center gap-1 text-amber-400 text-sm font-semibold group-hover:gap-2 transition-all">Read Guide <ArrowRight className="w-3 h-3" /></span></Link>))}</div>
                    </section>
                    <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 p-10 rounded-3xl border border-amber-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Capture Every Lead</h3>
                        <p className="text-slate-300 max-w-lg mx-auto">See how Brandverse can help you capture and convert more leads.</p>
                        <Link href={config.calendlyUrl} className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25">Book a Free Strategy Call <Calendar className="w-4 h-4" /></Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
