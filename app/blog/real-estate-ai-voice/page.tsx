import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import { Home, Phone, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
    title: 'The AI Inside Sales Agent (ISA): Reclaiming Real Estate Time | Brandverse',
    description: 'Realtors spend 3 hours a day cold calling and chasing leads. An AI ISA does it 24/7 for a fraction of the commission split.',
    keywords: ['Real Estate AI', 'AI ISA', 'Realtor Automation', 'Lead Qualification'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Real Estate • Jan 08, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        The Death of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">The Cold Call.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        You became a realtor to sell homes, not to dial numbers. Let the AI handle the prospecting.
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 text-sm">01</div>
                            The "Speed to Lead" Nightmare
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            Zillow leads are expensive ($100+ per lead). If you don't call them in 2 minutes, another agent does.
                            But you are at a showing. You are at a closing. You can't pick up.
                            <strong>The Brandverse AI ISA</strong> picks up instantly. It says: "Hi, I saw you were looking at 123 Main St. Are you looking to buy in the next 3 months?"
                            It qualifies the lead *before* passing it to you.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/10 relative">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Home className="w-32 h-32 text-white" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6">The Math of ROI</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-slate-400 font-bold">Your Commission (Avg)</span>
                                <span className="text-white font-black">$9,000</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-slate-400 font-bold">Leads Lost to "Voicemail"</span>
                                <span className="text-red-400 font-black">2 per month</span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <span className="text-slate-300 font-bold uppercase tracking-widest">Total Lost Commission</span>
                                <span className="text-red-500 font-black text-2xl">$216,000 / Year</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            Always On. Always Closing.
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            It doesn't just answer; it follows up. It sends texts. It chases cold leads from 6 months ago until they say "Yes" or "Stop".
                            It is the perfect Inside Sales Agent, and it costs less than your monthly coffee budget.
                        </p>
                    </section>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Automate Your GCI</h2>
                        <p className="text-slate-400 font-bold">See how top 1% agents are scaling without burnout.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
