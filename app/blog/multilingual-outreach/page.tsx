import Link from 'next/link';
import { ArrowLeft, Globe, MessageSquare, Users, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import ArticleSchema from '../../components/Article/ArticleSchema';
import KeyTakeaways from '../../components/Article/KeyTakeaways';
import CTABlock from '../../components/Article/CTABlock';
import { config } from '@/lib/config';

export const metadata = {
    title: 'Multilingual Outreach Strategies — Brandverse',
    description: 'How to use multilingual AI agents to expand market reach, capture more leads, and improve conversion rates with Spanish and other language support.',
    openGraph: { title: 'Multilingual Outreach Strategies — Brandverse', description: 'How to use multilingual AI agents to expand market reach.' },
    twitter: { card: 'summary_large_image', title: 'Multilingual Outreach Strategies — Brandverse', description: 'How to use multilingual AI agents to expand market reach.' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/multilingual-outreach' }
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <ArticleSchema title="Multilingual Outreach Strategies" description="How to use multilingual AI agents to expand market reach." slug="multilingual-outreach" date="Jan 3, 2025" category="Growth Strategy" />
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Intelligence</Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">Growth Strategy</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Multilingual <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Outreach Strategies</span></h1>
                    <p className="text-lg text-slate-400 font-medium">Expand your reach by deploying AI voice agents in multiple languages.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500"><span>Jan 3, 2025</span><span>·</span><span>6 min read</span><span>·</span><span className="text-blue-400">Growth Strategy</span></div>
                </div>
            </header>
            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-12">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-blue-500">
                        <h2 className="text-lg font-bold text-white mb-3">How do multilingual AI agents help businesses grow?</h2>
                        <p className="text-slate-300 leading-relaxed">Multilingual AI voice agents answer calls and book appointments in the caller's preferred language. This expands your market reach to non-English-speaking customers who are often underserved. Businesses using bilingual AI agents typically see 15-30% more leads from multilingual markets.</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Multilingual Opportunity</h2>
                        <p className="text-slate-400 leading-8 text-lg">In many US markets, 20-40% of the population speaks a language other than English at home. When these potential customers call a business and hear a greeting in their language, it builds immediate trust and differentiation. Businesses that offer multilingual support capture a share of the market that competitors are actively ignoring.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Which Languages to Support</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Spanish</h3><p className="text-xs text-slate-400 mt-1">Largest opportunity in US markets</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Mandarin / Cantonese</h3><p className="text-xs text-slate-400 mt-1">Major urban centers</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Vietnamese</h3><p className="text-xs text-slate-400 mt-1">Growing in service industries</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Tagalog</h3><p className="text-xs text-slate-400 mt-1">Strong in healthcare and home services</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Korean</h3><p className="text-xs text-slate-400 mt-1">Retail and professional services</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Arabic</h3><p className="text-xs text-slate-400 mt-1">Growing demographic</p></div>
                        </div>
                    </section>

                    <KeyTakeaways items={['Multilingual AI agents expand your addressable market by 20-40%.', 'Language detection ensures callers are routed to the right agent automatically.', 'Localized scripts improve conversion rates in non-English markets.', 'Setup takes days, not weeks, with modern AI voice platforms.']} color="blue" />

                    <CTABlock headline="Reach More Customers" subheadline="Deploy multilingual AI agents to capture leads in any language." color="blue" />
                </article>
                <RelatedArticles currentSlug="multilingual-outreach" />
            </main>
        </div>
    );
}
