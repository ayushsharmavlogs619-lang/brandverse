import Link from 'next/link';
import { ArrowLeft, Trash2, StopCircle, DollarSign, Filter, Search } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'Stop Paying for Ads Until You Fix This One Phone Problem | Brandverse',
    description: 'You are pouring water into a leaky bucket. Learn why 35% of your paid traffic is wasted on unanswered calls and how AI fixes it.',
    keywords: ['leaky marketing funnel', 'missed call cost', 'ad spend ROI', 'marketing conversion optimization', 'AI lead capture'],
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest">
                        Marketing ROI
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Stop Paying for Ads Until You Fix <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">This One Phone Problem</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        Marketing agencies hate this advice: Pause your campaigns. Right now. You're lighting money on fire.
                    </p>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    {/* AEO: Quick Answer Block */}
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-orange-500">
                        <h2 className="text-lg font-bold text-white mb-2">Why are my ads generating calls but no sales?</h2>
                        <p className="text-slate-300 leading-relaxed">
                            The most common reason is the "Leaky Bucket" syndrome: approximately <strong>30-35%</strong> of inbound calls from ads go to voicemail or are missed entirely. For a business spending $5,000/month on ads, this means <strong>$1,750</strong> is wasted solely on unanswered calls. Fixing call handling often doubles ROI without increasing ad spend.
                        </p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The "Leaky Bucket" Syndrome</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Here is a typical scenario we see every week:
                        </p>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-slate-400">Ad Spend (Google/FB)</span>
                                <span className="text-white font-mono">$5,000/mo</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-slate-400">Leads Generated (Calls)</span>
                                <span className="text-white font-mono">100 calls</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-slate-400">Calls Answered (Team Busy/After Hours)</span>
                                <span className="text-red-400 font-mono font-bold">65 calls</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-slate-400">Effective Cost Per Lead</span>
                                <span className="text-orange-400 font-mono font-bold">$77 (vs $50 targeted)</span>
                            </div>
                        </div>
                        <p className="text-slate-400 leading-8 text-lg">
                            You aren't losing because your ads are bad. You're losing because <strong>35% of your paid traffic is hitting a voicemail dead-end.</strong>
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The 5-Minute Rule</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            An MIT study showed that the odds of qualifying a lead drop by <strong>400%</strong> if you wait just 5 minutes to respond.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            When a customer searches "emergency plumber" or "realtor near me," they call the first number. If you don't answer, they call the second. They don't leave voicemails. They don't wait for a callback 3 hours later. They move on.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <div className="p-8 rounded-3xl bg-orange-900/10 border border-orange-500/20">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <Filter className="w-6 h-6 text-orange-400" />
                                The Solution: Capture 100% of Reach
                            </h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Before you scale your ad budget, install an AI voice agent infrastructure. It acts as the "net" that catches every single drop of rain.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-black/30 p-4 rounded-xl">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Scenario A (Human Only)</div>
                                    <div className="text-sm text-slate-300">
                                        Max capacity: 1 call at a time.<br />
                                        Missed calls: 30%<br />
                                        <strong>ROI: 2x</strong>
                                    </div>
                                </div>
                                <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/30">
                                    <div className="text-xs text-orange-300 uppercase tracking-wider mb-1">Scenario B (Human + AI)</div>
                                    <div className="text-sm text-white">
                                        Max capacity: Unlimited.<br />
                                        Missed calls: 0%<br />
                                        <strong>ROI: 4.5x</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Audit Your "Leaky Bucket"</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Check your call logs from last month. Look for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400">
                            <li>Calls marked "Missed" or "Voicemail"</li>
                            <li>Calls under 15 seconds (hang-ups)</li>
                            <li>Calls outside of 9AM-5PM</li>
                        </ul>
                        <p className="text-slate-400 leading-8 text-lg">
                            Multiply that number by your average customer lifetime value. That is the check you are writing to the trash can every month.
                        </p>
                    </section>

                    <div className="bg-white/10 p-10 rounded-3xl border border-white/10 text-center space-y-6 backdrop-blur-sm">
                        <h3 className="text-3xl font-black text-white italic">Plug the Hole. Then Pour the Water.</h3>
                        <p className="text-slate-300 font-medium max-w-lg mx-auto">
                            We'll install the AI infrastructure. Then you can double your ad spend and actually keep the leads.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                        >
                            Fix My Funnel <StopCircle className="w-4 h-4" />
                        </Link>
                    </div>

                </article>

                <RelatedArticles currentSlug="stop-wasting-marketing-budget" />
            </main>
        </div>
    );
}
