import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Shocking Efficiency: Why Top Electricians Are Automating Operations | Brandverse',
    description: 'Emergency electrical work is a high-margin game, but only if you answer the phone. See how AI helps electricians scale to $1M+.',
    keywords: ['Electrician Answering Service', 'Emergency Dispatch', 'Trades Automation'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Trades & Field Service • Jan 09, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        Shocking <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">Efficiency.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        You are the expert on the tools. Don't be the receptionist on the phone.
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center text-yellow-400 text-sm">01</div>
                            The "Wire Nut" Problem
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            You are on a ladder. You are twisting a wire nut. Your phone vibrates. It's an unsaved number.
                            Do you drop the tools and risk safety to answer a spam call? Or do you ignore it and risk losing a $5,000 panel upgrade job?
                            This is the dilemma that keeps one-man shops small.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-yellow-500/5 mix-blend-overlay"></div>
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">The AI Dispatcher</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-yellow-500 shrink-0" />
                                        <span className="text-slate-300 font-bold text-sm">Recognizes "Emergency" keywords ("sparks", "smoke", "power out")</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-yellow-500 shrink-0" />
                                        <span className="text-slate-300 font-bold text-sm">Quotes dispatch fees automatically ($250 to roll a truck)</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-yellow-500 shrink-0" />
                                        <span className="text-slate-300 font-bold text-sm">Books job into ServiceTitan/Housecall Pro</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 font-mono text-xs text-green-400">
                                &gt; Customer: "My breaker keeps tripping!"<br /><br />
                                &gt; AI: "I can have a master electrician there by 2 PM. Our diagnostic fee is $189. Shall I book that?"<br /><br />
                                &gt; Customer: "Yes please."<br /><br />
                                &gt; AI: [$$$ PAYMENT CAPTURED]
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            Scale to 5 Vans
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            To grow from 1 van to 5 vans, you need systems. You can't be the dispatcher for 5 guys.
                            Brandverse AI scales infinitely. It can handle calls for 50 vans just as easily as 1.
                            Stop working IN the business. Start working ON it.
                        </p>
                    </section>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Wire Up Your System</h2>
                        <p className="text-slate-400 font-bold">Get a custom demo for electrical contracting.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
