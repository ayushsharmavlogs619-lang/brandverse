import Link from 'next/link';
import { ArrowLeft, UserCheck, HeartHandshake, ShieldCheck, MessageSquare, BrainCircuit } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'Will My Customers Hate It? The Truth About AI Voice Acceptance — Brandverse',
    description: 'The #1 fear of business owners debunked. Data shows customers prefer instant AI answers over handling annoying hold music or voicemail.',
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-black uppercase tracking-widest">
                        Ethics & Trust
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Will My Customers Hate It? The Truth About <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-400">AI Voice Acceptance</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        It's the question every owner asks. "I don't want to sound robotic." Good news: Neither do we.
                    </p>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The "Robo-Call" Trauma</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            We all have PTSD from the 2010s. <em>"Please... press... one... for... sales."</em> The rigid menus. The frustration. The screaming "AGENT!" into the receiver.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            <strong>That is not what we build.</strong>
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            Modern Conversational AI (powered by LLMs like GPT-4 and ultra-low latency voice engines) is indistinguishable from a text message conversation, but spoken. It pauses. It says "um" appropriately. it handles interruptions. It laughs when you make a joke (if programmed to).
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">What Customers Actually Hate</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Surveys show that the "human touch" is overrated when the "human experience" is bad. Customers hate:
                        </p>
                        <div className="grid gap-4">
                            <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold shrink-0">1</div>
                                <div className="text-slate-300">Wait times longer than 60 seconds.</div>
                            </div>
                            <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold shrink-0">2</div>
                                <div className="text-slate-300">Being transferred and repeating their info.</div>
                            </div>
                            <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold shrink-0">3</div>
                                <div className="text-slate-300">"Please leave a message after the beep."</div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="p-8 rounded-3xl bg-sky-900/10 border border-sky-500/20">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <HeartHandshake className="w-6 h-6 text-sky-400" />
                                The Transparency Strategy
                            </h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                We advocate for <strong>Radical Transparency</strong>. We don't try to trick your customers.
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                The best agents start with: <em>"Hi! I'm Alex, the AI assistant for Brandverse. I can book your appointment right now or find someone human if it's super urgent."</em>
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Result? Customers are delighted. They think it's cool. They appreciate the speed. They respect the honesty.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The "Escalation Ladder"</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            AI doesn't replace humans; it filters for them.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <BrainCircuit className="w-6 h-6 text-sky-400 mt-1 shrink-0" />
                                <div>
                                    <strong className="text-white block">Level 1: Routine (AI)</strong>
                                    <span className="text-slate-400 text-sm">Scheduling, FAQs, pricing inquiries, status checks. (80% volume)</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <UserCheck className="w-6 h-6 text-green-400 mt-1 shrink-0" />
                                <div>
                                    <strong className="text-white block">Level 2: Complex (Human)</strong>
                                    <span className="text-slate-400 text-sm">Angry customers, complex negotiations, custom project scoping. (20% volume)</span>
                                </div>
                            </li>
                        </ul>
                        <p className="text-slate-400 leading-8 text-lg mt-4">
                            Your staff stops being "phone drones" and starts being "problem solvers." Their job satisfaction goes up.
                        </p>
                    </section>

                    <div className="bg-gradient-to-br from-sky-500/10 to-teal-500/10 p-10 rounded-3xl border border-sky-500/20 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Hear the Difference.</h3>
                        <p className="text-slate-300 font-medium max-w-lg mx-auto">
                            Don't take our word for it. Call our demo agent right now and try to interrupt it. Try to confuse it. See for yourself.
                        </p>
                        <Link
                            href="/demos/voice"
                            className="inline-flex items-center gap-2 bg-sky-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/25"
                        >
                            Test the Agent <MessageSquare className="w-4 h-4" />
                        </Link>
                    </div>

                </article>

                <RelatedArticles currentSlug="voice-ai-ethics-trust" />
            </main>
        </div>
    );
}
