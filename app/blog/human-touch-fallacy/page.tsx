import { Metadata } from 'next';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';
import { Heart, UserX, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: "The 'Human Touch' Fallacy: Why Customers Actually Prefer AI | Brandverse",
    description: 'Business owners obsession with "sounding human" is costing them deals. Customers don\'t want a friend; they want a solution.',
    keywords: ['Customer Experience', 'AI Empathy', 'Voice Bot Quality', 'Business Psychology'],
};

export default function Post() {
    return (
        <article className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <header className="space-y-8 text-center border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        Psychology • Jan 05, 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                        The Human <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">Touch Fallacy.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                        "I want my customers to talk to a real person." <br />
                        No, you don't. You want them to get an answer.
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 text-sm">01</div>
                   Competence > Humanity
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            We surveyed 500 service calls. The lowest satisfaction scores weren't "Robots". They were "Humans who put me on hold" and "Humans who sounded tired."
                            Empathy isn't just a tone of voice. Empathy is <strong>respecting the customer's time</strong>.
                            An AI that picks up instantly, knows your name, and books your appointment in 45 seconds is infinitely more "empathic" than a human who makes you wait 10 minutes.
                        </p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8 my-12">
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <UserX className="w-24 h-24 text-red-500" />
                            </div>
                            <h3 className="text-xl font-black text-white italic mb-4">The "Bad" Human</h3>
                            <p className="text-slate-400 text-sm font-bold leading-relaxed">
                                - "Can you hold please?" <br />
                                - "Let me check the schedule... ugh system is slow." <br />
                                - *Background noise of dog barking* <br />
                                <span className="text-red-400 block mt-4">Result: Frustrated Customer.</span>
                            </p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Heart className="w-24 h-24 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-black text-white italic mb-4">The Brandverse AI</h3>
                            <p className="text-slate-300 text-sm font-bold leading-relaxed">
                                - "Hi John, thanks for calling back." <br />
                                - "I see an opening at 2 PM. Locked." <br />
                                - *Crystal clear audio* <br />
                                <span className="text-emerald-400 block mt-4">Result: Delighted Customer.</span>
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</div>
                            The Uncanny Valley is Closed
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mt-6">
                            In 2024, AI sounded robotic. In 2026, our models breathe, pause, and use filler words ("um," "uh-huh") naturally.
                            Most customers <strong>don't even know they are talking to an AI</strong> until the end of the call.
                            And when they find out? They are usually impressed, not annoyed.
                        </p>
                    </section>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Experience The Difference</h2>
                        <p className="text-slate-400 font-bold">Listen to a demo or book a live test.</p>
                    </div>
                    <CalendlyEmbed />
                </div>
            </div>
        </article>
    );
}
