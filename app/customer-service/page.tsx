import Link from 'next/link';
import { ArrowRight, Calendar, Headphones, MessageCircle } from 'lucide-react';
import { config } from '@/lib/config';
import { articles } from '@/app/lib/articles';

export const metadata = {
    title: 'Customer Service Automation — Guides & Resources | Brandverse',
    description: 'Resource hub for AI-powered customer service automation: voice agents, chatbots, 24/7 support, and cost reduction strategies.',
    openGraph: { title: 'Customer Service Automation Hub — Brandverse', description: 'Guides on automating customer service with AI.', type: 'website' },
};

export default function CustomerServiceHub() {
    const hubArticles = articles.filter(a =>
        ['ai-voice-agents-transforming-customer-service', 'ai-customer-retention', 'stop-burning-cash-customer-support', 'ecommerce-customer-service-ai', 'multilingual-ai-support', 'emergency-response-automation'].includes(a.slug)
    );
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-rose-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">Customer Service<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Resource Hub</span></h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Transform your customer service with AI voice agents that provide instant, 24/7 support at a fraction of the cost.</p>
                </div>
            </header>
            <main className="px-6 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    <section><h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-8">Featured Guides</h2>
                        <div className="grid md:grid-cols-2 gap-4">{hubArticles.map((article) => (<Link key={article.slug} href={`/blog/${article.slug}`} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-rose-500/30 transition-all group"><div className="text-xs font-black uppercase tracking-widest text-rose-400 mb-2">{article.category}</div><h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">{article.title}</h3><p className="text-sm text-slate-400 mb-4">{article.excerpt}</p><span className="inline-flex items-center gap-1 text-rose-400 text-sm font-semibold group-hover:gap-2 transition-all">Read Guide <ArrowRight className="w-3 h-3" /></span></Link>))}</div>
                    </section>
                    <div className="bg-gradient-to-r from-rose-900/40 to-pink-900/40 p-10 rounded-3xl border border-rose-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Transform Your Customer Service</h3>
                        <p className="text-slate-300 max-w-lg mx-auto">See how AI voice agents can handle your customer calls 24/7.</p>
                        <Link href={config.calendlyUrl} className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-rose-400 transition-colors shadow-lg shadow-rose-500/25">Book a Free Strategy Call <Calendar className="w-4 h-4" /></Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
