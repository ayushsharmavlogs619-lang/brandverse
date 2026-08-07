import Link from 'next/link';
import { ArrowRight, Calendar, Phone, Headphones, MessageSquare, Zap } from 'lucide-react';
import { config } from '@/lib/config';
import { articles } from '@/app/lib/articles';

export const metadata = {
    title: 'AI Voice Agents — Guides & Resources | Brandverse',
    description: 'Complete resource hub for AI voice agents: how they work, customer service automation, ROI, implementation, and industry applications.',
    openGraph: {
        title: 'AI Voice Agents Resource Hub — Brandverse',
        description: 'Complete guides about AI voice agents for customer service and lead capture.',
        type: 'website',
    },
};

export default function AIVoiceAgentsHub() {
    const hubArticles = articles.filter(a =>
        ['ai-voice-agents-transforming-customer-service', 'ai-receptionist-guide-2026', 'voice-ai-vs-human-receptionists', 'ai-voice-roi', 'voice-ai-ethics-trust', 'voice-cloning-ethics', 'crm-automation-blueprint', 'onboarding-checklist'].includes(a.slug)
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-purple-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        AI Voice Agents
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Resource Hub</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Explore how AI voice agents transform customer service, lead capture, and business operations with natural, human-like conversations.
                    </p>
                </div>
            </header>
            <main className="px-6 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-8">Featured Guides</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {hubArticles.map((article) => (
                                <Link key={article.slug} href={`/blog/${article.slug}`} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-purple-500/30 transition-all group">
                                    <div className="text-xs font-black uppercase tracking-widest text-purple-400 mb-2">{article.category}</div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{article.title}</h3>
                                    <p className="text-sm text-slate-400 mb-4">{article.excerpt}</p>
                                    <span className="inline-flex items-center gap-1 text-purple-400 text-sm font-semibold group-hover:gap-2 transition-all">Read Guide <ArrowRight className="w-3 h-3" /></span>
                                </Link>
                            ))}
                        </div>
                    </section>
                    <div className="p-8 rounded-3xl bg-purple-900/40 border border-purple-500/30">
                        <h2 className="text-2xl font-bold text-white mb-4">What Is an AI Voice Agent?</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">An AI voice agent is a conversational AI that uses speech recognition, natural language understanding, and text-to-speech to have natural phone conversations with customers. It can answer questions, book appointments, qualify leads, and escalate to humans when needed.</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-10 rounded-3xl border border-purple-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Deploy Your AI Voice Agent</h3>
                        <p className="text-slate-300 max-w-lg mx-auto">Book a free strategy call to see how AI voice agents can transform your business.</p>
                        <Link href={config.calendlyUrl} className="inline-flex items-center gap-2 bg-purple-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-purple-400 transition-colors shadow-lg shadow-purple-500/25">
                            Book a Free Strategy Call <Calendar className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
