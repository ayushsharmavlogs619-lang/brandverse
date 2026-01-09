import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import { PhoneOff, TrendingDown, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Stop Bleeding Revenue: The True Cost of Missed Calls | Brandverse',
    description: '62% of calls to small businesses go unanswered. Learn how to calculate exactly how much revenue you are losing every single month.',
    keywords: ['Missed Call Calculator', 'Lost Revenue', 'SMB Lead Gen', 'AI Phone Answering'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Financial Alert • Jan 02, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        Stop Bleeding <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-600">Revenue.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        Every time your phone rings and nobody answers, you aren't just losing a call. You are lighting money on fire.
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center text-red-400 text-sm">01</div>
                            The terrifying 62% Stat
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            Industry data confirms that <strong>62% of calls</strong> to small businesses go unanswered. Why? Because you are busy working. You are on a job site, in a meeting, or sleeping.
                            But the customer doesn't care. In 2026, they don't leave voicemails. They hang up and call the next guy on Google.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/10 space-y-8">
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter text-center">The Calculations</h3>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="p-6 bg-white/5 rounded-2xl">
                                <div className="text-sm text-slate-500 font-black uppercase tracking-widest mb-2">Avg Job Value</div>
                                <div className="text-3xl font-black text-white">$500</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl">
                                <div className="text-sm text-slate-500 font-black uppercase tracking-widest mb-2">Missed/Week</div>
                                <div className="text-3xl font-black text-red-400">5</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl">
                                <div className="text-sm text-slate-500 font-black uppercase tracking-widest mb-2">Yearly Loss</div>
                                <div className="text-3xl font-black text-red-500">$130,000</div>
                            </div>
                        </div>
                        <p className="text-center text-slate-400 text-sm font-bold">
                            That's a Ferrari you just didn't buy because you didn't pick up the phone.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            The Fix: 100% Capture Rate
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            With Brandverse, your capture rate goes from 38% to <strong>100%</strong> instantly.
                            Our AI Agent picks up on the first ring, qualifies the lead, checks your calendar, and books the appointment.
                            It handles 10 concurrent calls at once. It never takes a lunch break.
                        </p>
                    </section>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Plug The Leak</h2>
                        <p className="text-slate-400 font-bold">Calculate your custom ROI and deploy the fix.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
