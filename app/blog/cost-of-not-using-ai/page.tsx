import Link from 'next/link';
import { ArrowLeft, AlertTriangle, XCircle, TrendingDown, Clock, Users } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'The True Cost of NOT Using AI Voice Agents in 2025 — Brandverse',
    description: 'What you lose every single day you delay. A sobering breakdown of the hidden costs killing your profit margins right now.',
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest">
                        Warning
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        The True Cost of <span className="text-red-500">NOT</span> Using <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">AI Voice Agents in 2025</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        Every day you wait is a day you're writing checks to your competitors. Here's the math you can't ignore.
                    </p>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    <section className="p-8 rounded-3xl bg-red-500/10 border border-red-500/20 space-y-4">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-8 h-8 text-red-400" />
                            <h2 className="text-2xl font-black text-red-400">The "Hemorrhage Report"</h2>
                        </div>
                        <p className="text-slate-300 leading-8">
                            Let's be blunt. If you're a service business doing $500k+/year and you're NOT using voice automation, you are actively <strong className="text-red-400">bleeding money</strong> every single week.
                        </p>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">What You're Losing (Right Now)</h2>

                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-red-500/20">
                                <div className="flex items-start gap-4">
                                    <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Lost Revenue: $10k - $30k/month</h3>
                                        <p className="text-slate-400 leading-relaxed mb-4">
                                            Conservative estimate based on industry data: The average SMB misses 25-35% of inbound calls during business hours. After hours? 100%. With an average job value of $400-$800, you do the math.
                                        </p>
                                        <div className="text-sm text-red-400 font-mono">
                                            30 missed calls/week × $500 avg × 4 weeks = <strong>$60,000/yr vanished</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-orange-500/20">
                                <div className="flex items-start gap-4">
                                    <TrendingDown className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Eroding Market Position</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            Your competitors ARE using this. While you're stuck in "analysis paralysis," they're answering calls in 4 seconds at 2 AM. Guess who's getting the Google reviews? Guess who's moving up the rankings?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-yellow-500/20">
                                <div className="flex items-start gap-4">
                                    <Users className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Staff Burnout & Turnover</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            Your receptionist is drowning. She's answering the same "what's your hourly rate?" call for the 40th time this week. She's tired. She's updating her resume. When she quits, you'll spend $8k recruiting and training a replacement. Repeat every 18 months.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Opportunity Cost</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Let's say you wait "just 6 more months" to implement AI voice agents. Here's what that delay costs:
                        </p>
                        <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-slate-400">6 months of missed calls</span>
                                    <span className="text-2xl font-black text-red-400">-$30,000</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-slate-400">Staff turnover costs</span>
                                    <span className="text-2xl font-black text-red-400">-$8,000</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                    <span className="text-slate-400">Lost competitive edge</span>
                                    <span className="text-2xl font-black text-red-400">Priceless</span>
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-white font-bold uppercase tracking-wider">Total Damage</span>
                                    <span className="text-4xl font-black text-red-500">$38,000+</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Wake-Up Call</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Here's the truth bomb: <strong>Inaction is a decision.</strong> And it's the most expensive one.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            By the time you "feel ready," your market will have moved on. The early adopters (your competitors) will have locked in the customers, the reviews, and the momentum.
                        </p>
                    </section>

                    <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 p-10 rounded-3xl border border-red-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Stop the Bleeding. Today.</h3>
                        <p className="text-slate-300 font-medium max-w-lg mx-auto">
                            The cost of waiting is compounding. Every hour you delay is revenue you'll never recover.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                        >
                            Schedule Emergency Audit <Clock className="w-4 h-4" />
                        </Link>
                    </div>

                </article>

                <RelatedArticles currentSlug="cost-of-not-using-ai" />
            </main>
        </div>
    );
}
