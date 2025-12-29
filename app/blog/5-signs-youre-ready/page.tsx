import Link from 'next/link';
import { ArrowLeft, CheckCircle2, TrendingUp, DollarSign, Users, Zap } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: '5 Signs You\'re Ready for AI Voice Agents (And Why Waiting Costs You) — Brandverse',
    description: 'Are you leaving money on the table? These 5 signs prove you\'re already past the "should I" phase and deep into the "when do I start" zone.',
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest">
                        Readiness Assessment
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        5 Signs You're <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Ready</span> for AI Voice Agents <br />
                        <span className="text-slate-500">(And Why Waiting Costs You)</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        Stop asking "if." Start asking "when." If you recognize 3 or more of these signs, you're already losing money every day you delay.
                    </p>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Readiness Litmus Test</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            We've onboarded over 200 businesses. The ones who see ROI in Week 1 all share the same traits. If this sounds like you, you're not "thinking about it"—you're <strong>overdue</strong>.
                        </p>
                    </section>

                    <div className="space-y-12">

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-black text-purple-400">1</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-3">Your Phone Rings More Than You Can Answer</h3>
                                    <p className="text-slate-400 leading-relaxed mb-4">
                                        If you or your team are missing 5+ calls a week because "everyone's on another line," that's $2k-$5k vanishing into thin air weekly.
                                    </p>
                                    <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20">
                                        <div className="text-sm text-purple-300 font-bold mb-2">The ROI Math:</div>
                                        <div className="text-slate-400 text-sm">10 missed calls/week × $400 avg job × 52 weeks = <span className="text-purple-400 font-black">$208,000/year lost</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-black text-blue-400">2</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-3">You're Open "9-5" But Leads Call 24/7</h3>
                                    <p className="text-slate-400 leading-relaxed mb-4">
                                        AC units break at 8 PM. Pipes burst at 3 AM. If you're telling customers to "call back tomorrow," you've already lost them.
                                    </p>
                                    <div className="flex items-center gap-3 text-blue-400 text-sm font-bold">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span>AI agents don't sleep. Neither should your revenue stream.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-500/20">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-black text-green-400">3</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-3">Your Team Spends Hours on "Tire Kicker" Calls</h3>
                                    <p className="text-slate-400 leading-relaxed mb-4">
                                        "What's your hourly rate?" "Do you service my area?" "Are you open Sundays?" These questions waste 40% of your team's time. AI can answer them in 10 seconds, freeing humans for high-value work.
                                    </p>
                                    <div className="flex items-center gap-3 text-green-400 text-sm font-bold">
                                        <Zap className="w-5 h-5" />
                                        <span>Reclaim 15 hours/week per employee. Do the math.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/20">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-black text-orange-400">4</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-3">Hiring More Staff Isn't Scaling—It's Breaking You</h3>
                                    <p className="text-slate-400 leading-relaxed mb-4">
                                        Every new receptionist costs $40k/year + training + benefits + turnover risk. If you're at the "I need to hire someone but can't afford the headache," AI is your answer.
                                    </p>
                                    <div className="p-4 rounded-xl bg-black/40 border border-orange-500/20">
                                        <div className="text-sm text-orange-300 font-bold mb-2">The Break-Even:</div>
                                        <div className="text-slate-400 text-sm">AI Cost: $6k/year. Human Cost: $45k/year. You save: <span className="text-orange-400 font-black">$39,000</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-600/10 to-purple-600/10 border border-pink-500/20">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-black text-pink-400">5</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-3">You're Thinking "I Should Automate This"</h3>
                                    <p className="text-slate-400 leading-relaxed mb-4">
                                        If the thought has crossed your mind even once, you're ready. That nagging feeling? It's your subconscious doing the ROI math for you.
                                    </p>
                                    <div className="flex items-center gap-3 text-pink-400 text-sm font-bold">
                                        <TrendingUp className="w-5 h-5" />
                                        <span>Trust your gut. It knows what your spreadsheet is screaming.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The "Perfect Time" Fallacy</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            There is no perfect time. There's only <strong>now</strong> and <strong>too late</strong>.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            The businesses waiting for "Q2" or "after the busy season" are the same ones losing market share right now. The window is closing.
                        </p>
                    </section>

                    <div className="bg-brand-gradient p-10 rounded-3xl text-center space-y-6 shadow-2xl shadow-blue-500/20">
                        <h3 className="text-3xl font-black text-white italic">Recognized Yourself?</h3>
                        <p className="text-blue-100 font-medium max-w-lg mx-auto">
                            If you checked 3+ boxes, you're not "exploring." You're leaving money on the table every single day.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                        >
                            Start Pilot Program <DollarSign className="w-4 h-4" />
                        </Link>
                    </div>

                </article>

                <RelatedArticles currentSlug="5-signs-youre-ready" />
            </main>
        </div>
    );
}
