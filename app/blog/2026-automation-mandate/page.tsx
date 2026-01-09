import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'The 2026 Automation Mandate: Adapt or Die | Brandverse',
    description: 'Why 2026 is the extinction event for manual service businesses, and how AI voice agents are the only lifeboat left.',
    keywords: ['Business Automation 2026', 'AI Voice Agents', 'Service Business Survival', 'Manual Admin Costs'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                {/* Header */}
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Strategic Briefing • Jan 01, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        The 2026 <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Automation Mandate.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        The era of "hiring more people to solve problems" is over. Welcome to the age of the Infinite Workforce.
                    </p>
                </header>

                {/* Body */}
                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">01</div>
                            The Extinction Event
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            If you are still paying a human to answer phones, schedule appointments, or chase invoices in 2026, you are already bleeding out. Your competitors are deploying AI Voice Agents that cost $0.20/minute and work 24/7/365.
                            The math is simple: they can out-spend, out-scale, and out-service you.
                        </p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8 my-12">
                        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 space-y-4">
                            <h3 className="text-red-400 font-black uppercase tracking-widest text-xs">The Manual Way</h3>
                            <ul className="space-y-3 text-slate-400 text-sm font-bold">
                                <li className="flex items-center gap-2"><span className="text-red-500">×</span> Missed calls during lunch</li>
                                <li className="flex items-center gap-2"><span className="text-red-500">×</span> Sick days & overtime</li>
                                <li className="flex items-center gap-2"><span className="text-red-500">×</span> Inconsistent scripts</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 space-y-4">
                            <h3 className="text-blue-400 font-black uppercase tracking-widest text-xs">The Brandverse Way</h3>
                            <ul className="space-y-3 text-slate-300 text-sm font-bold">
                                <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 0ms Response Time</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Infinite Concurrency</li>
                                <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Perfect Recall</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            The New Unit Economics
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            A traditional receptionist costs $45,000/year (plus benefits) for 40 hours of coverage. That's $22/hour for limited capacity.
                            Brandverse AI Infrastructure costs a fraction of that, covers 168 hours a week, and never asks for a raise.
                            This isn't just savings; it's capital you can re-deploy into ad spend to dominate your local market.
                        </p>
                    </section>

                    <div className="p-10 rounded-[3rem] bg-indigo-600 border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
                        <div className="relative z-10 text-center space-y-6">
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Don't Get Left Behind.</h3>
                            <p className="text-indigo-100 font-bold max-w-lg mx-auto">
                                We can deploy your Voice Agent in 7 days or less. The future doesn't wait.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Deploy Your System</h2>
                        <p className="text-slate-400 font-bold">Book your audit with our tactical team below.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
