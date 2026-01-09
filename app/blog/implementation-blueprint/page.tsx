import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import { Rocket, Cog, CheckSquare } from 'lucide-react';

export const metadata: Metadata = {
    title: 'The 7-Day Sprint: From Zero to AI Deployed | Brandverse',
    description: 'Think AI is complicated? We deploy enterprise-grade voice agents in 7 days or less. Here is the exact roadmap we use.',
    keywords: ['AI Implementation', 'Voice Agent Setup', 'Fast Deployment', 'Business Transformation'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Execution • Jan 10, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        The 7-Day <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Sprint.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        Speed is a feature. We don't do 6-month consulting gigs. We do 1-week deployments.
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">01</div>
                            The Roadmap
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            Most agencies delay. They want retainers. We want results.
                            Here is exactly what happens when you sign with Brandverse:
                        </p>
                    </section>

                    <section className="relative border-l-2 border-white/10 pl-8 ml-4 space-y-12">
                        <div className="relative">
                            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#020617]" />
                            <h3 className="text-xl font-black text-white uppercase italic">Day 1: Discovery & Knowledge Base</h3>
                            <p className="text-slate-400 text-sm mt-2">We ingest your website, your PDFs, your pricing, and your FAQs. We build the "Brain" of the AI.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-indigo-500 border-4 border-[#020617]" />
                            <h3 className="text-xl font-black text-white uppercase italic">Day 3: Script Calibration</h3>
                            <p className="text-slate-400 text-sm mt-2">We design the conversation flow. We test for empathy, objections, and edge cases. You listen to the first voice samples.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-purple-500 border-4 border-[#020617]" />
                            <h3 className="text-xl font-black text-white uppercase italic">Day 5: Integration Check</h3>
                            <p className="text-slate-400 text-sm mt-2">We wire the AI into your CRM (Salesforce, HubSpot, ServiceTitan) so data flows silently in the background.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#020617]" />
                            <h3 className="text-xl font-black text-white uppercase italic">Day 7: Go Live</h3>
                            <p className="text-slate-400 text-sm mt-2">We port the number. The switch is flipped. The first call comes in. The AI handles it perfectly. You open champagne.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            No Downtime. No Risk.
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            We run the system in "Shadow Mode" before going live. It listens to your calls without speaking, learning from your best humans.
                            When it goes live, it is already a veteran.
                        </p>
                    </section>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Start Your Sprint</h2>
                        <p className="text-slate-400 font-bold">If you book today, you are live by next Friday.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
