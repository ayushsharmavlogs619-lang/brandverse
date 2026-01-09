import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import { Zap, Clock, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Speed to Lead: Why 5 Minutes is Too Slow in 2026 | Brandverse',
    description: 'The old "5-minute rule" is dead. In the age of AI, if you don\'t respond in 10 seconds, you lose the deal. Here is the data.',
    keywords: ['Lead Response Time', 'Speed to Lead', 'Sales Automation', 'AI Calling'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Sales Tactics • Jan 04, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        Speed To Lead <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Is Dead.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        The "Golden 5 Minute Rule" is ancient history. We are now in the era of Instant Gratification.
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-400 text-sm">01</div>
                            The 10-Second Barrier
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            Look at your own behavior. You fill out a form for a quote. You don't put your phone down and wait 5 minutes. You keep scrolling. You look at the next competitor.
                            If your phone rings <strong>instantly</strong> (within 10 seconds) while you are still thinking about the problem, the close rate skyrockets by <strong>391%</strong>.
                            Wait 5 minutes? That drop-off is vertically down.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 p-8 rounded-[3rem] border border-white/10 space-y-8">
                        <div className="flex items-center justify-center gap-12">
                            <div className="text-center space-y-2">
                                <div className="text-5xl font-black text-slate-600 italic">5 Min</div>
                                <div className="text-xs font-bold text-slate-500 uppercase">Old Standard</div>
                            </div>
                            <Zap className="w-12 h-12 text-amber-500 fill-current animate-pulse" />
                            <div className="text-center space-y-2">
                                <div className="text-5xl font-black text-white italic">10 Sec</div>
                                <div className="text-xs font-bold text-blue-400 uppercase">Brandverse AI</div>
                            </div>
                        </div>
                        <p className="text-center text-slate-300 font-bold max-w-md mx-auto">
                            Humans physically cannot hit the 10-second mark consistently at scale. AI does it every single time, whether it's 2 PM or 2 AM.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            The Technical Advantage
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            Brandverse utilizes webhook-triggered telephony. The moment a lead form hits your server (Facebook, Website, Angi), our API triggers a call.
                            There is no human delay. No "I'll call them back after coffee."
                            It is ruthless efficiency designed to kill your competition before they even wake up.
                        </p>
                    </section>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Be First. Be Fast.</h2>
                        <p className="text-slate-400 font-bold">Install the 10-second infrastructure today.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
