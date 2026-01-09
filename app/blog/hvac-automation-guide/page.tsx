import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import { Thermometer, Wrench, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Case Study: How HVAC Companies Add $10k/mo with AI | Brandverse',
    description: 'A breakdown of how a local HVAC business automated dispatch and booking, resulting in a 40% increase in revenue during peak season.',
    keywords: ['HVAC Answering Service', 'Contractor Automation', 'ServiceTitan Integration', 'Dispatcher AI'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Sector Analysis • Jan 07, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        The HVAC <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Scaling Protocol.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        Stop playing "Dispatcher Roulette". Here is the blueprint for a self-driving service business.
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 flex items-center justify-center text-cyan-400 text-sm">01</div>
                            The Problem: "Summer Chaos"
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            July 15th. 98 Degrees. Your phone is ringing off the hook. Your dispatcher is overwhelmed, putting high-value install leads on hold to talk to a warranty complaint.
                            The result? You lose the $12,000 install to the guy who picked up first.
                            This "Chaos Tax" costs the average HVAC company $100k-$200k every summer.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/10 space-y-6">
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">The Brandverse Solution</h3>
                        <div className="space-y-6">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                    <Wrench className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">Intelligent Triage</h4>
                                    <p className="text-slate-400 text-sm mt-2">AI answers. It asks: "Is this a new install or a repair?" IF "Install", it patches directly to Sales. IF "Repair", it books a slot on the calendar. No manual triage needed.</p>
                                </div>
                            </div>
                            <div className="w-full h-px bg-white/5" />
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">CRM Injection</h4>
                                    <p className="text-slate-400 text-sm mt-2">The AI inputs the customer data (Address, Unit Type, Issue) directly into ServiceTitan or Housecall Pro. Your techs just get the notification.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            The result: $10k/mo Added
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            By ensuring zero missed calls during peak hours, and prioritizing high-ticket installs, our pilot HVAC client added $12,400 in booked revenue in Month 1.
                            The cost of the system? Less than a set of gauge hoses.
                        </p>
                    </section>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Automate Your Dispatch</h2>
                        <p className="text-slate-400 font-bold">See exactly how we integrate with your CRM.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
