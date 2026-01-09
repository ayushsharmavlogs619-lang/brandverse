import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import { Moon, Sun, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
    title: 'The Midnight Economy: Capturing Revenue While You Sleep | Brandverse',
    description: '40% of service bookings happen after 5 PM. If your phone goes to voicemail at 5:01 PM, you are donating customers to your competition.',
    keywords: ['After Hours Answering', '24/7 Availability', 'Passive Income', 'Automation'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Operations • Jan 06, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        The Midnight <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">Economy.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        Your customers don't work 9-to-5 anymore. Why do you?
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 text-sm">01</div>
                            The 5:01 PM Drop-off
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            It's 5:01 PM. Your receptionist clocks out. Your phone lines switch to "Please leave a message."
                            Meanwhile, your potential customer just got home from work. They sit down on the couch at 7 PM and search "Emergency Plumber" or "Roof Repair".
                            They call you. Voicemail. They call your competitor. <strong>Brandverse answers.</strong>
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 rounded-[3rem] overflow-hidden">
                        <div className="p-10 bg-[#020617] space-y-6">
                            <div className="flex items-center gap-4">
                                <Sun className="w-8 h-8 text-amber-500" />
                                <h3 className="text-xl font-black text-white uppercase italic">Daytime (9-5)</h3>
                            </div>
                            <div className="text-4xl font-black text-slate-600 italic">60%</div>
                            <p className="text-slate-500 text-sm font-bold">Of Bookings</p>
                            <p className="text-slate-400 text-sm leading-relaxed">Highly competitive. Everyone is open. Margins are squeezed.</p>
                        </div>
                        <div className="p-10 bg-indigo-600 space-y-6">
                            <div className="flex items-center gap-4">
                                <Moon className="w-8 h-8 text-white" />
                                <h3 className="text-xl font-black text-white uppercase italic">After Hours (5-9)</h3>
                            </div>
                            <div className="text-4xl font-black text-white italic">40%</div>
                            <p className="text-indigo-200 text-sm font-bold">Of Bookings</p>
                            <p className="text-indigo-100 text-sm leading-relaxed">Zero competition. Emergency rates. High-value clients.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            Wake Up Richer
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            There is no better feeling than waking up on a Tuesday morning, checking your CRM, and seeing 4 new jobs booked, deposits paid, and scheduled for next week—all while you were asleep.
                            That is the power of the Brandverse Operating System. It is the engine that prints money while you dream.
                        </p>
                    </section>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Turn On The Night Shift</h2>
                        <p className="text-slate-400 font-bold">Deploy 24/7 AI coverage in minutes.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
