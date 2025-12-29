import Link from 'next/link';
import { ArrowLeft, Clock, Moon, TrendingUp, Phone, Calendar } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'Your 24/7 Sales Team: Why "Business Hours" Are Killing Your Growth — Brandverse',
    description: 'The modern consumer doesn\'t wait for 9 AM. Learn how an always-on AI sales team captures the 40% of leads you\'re currently ignoring.',
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
                        Growth Strategy
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Your 24/7 Sales Team: Why "Business Hours" Are <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Killing Your Growth</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        The 9-to-5 era is dead. If your phone goes to voicemail at 5:01 PM, you're handing cash to your competitors.
                    </p>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The "Amazon Effect" on Local Services</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            We live in an on-demand world. Customers order dinner at 11 PM and groceries at 6 AM. When they have a plumbing leak or need a quote for landscaping, they expect the same instant gratification.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            Here is the brutal reality: <strong>The first business to answer gets the job 78% of the time.</strong>
                        </p>
                    </section>

                    <section className="space-y-8">
                        <div className="p-8 rounded-3xl bg-indigo-900/10 border border-indigo-500/20">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <Moon className="w-6 h-6 text-indigo-400" />
                                The After-Hours Goldmine
                            </h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Our data across 200+ clients shows a consistent pattern:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <span>42% of high-value leads call between 5 PM and 9 AM.</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <span>Weekend calls convert 30% higher than weekday calls (less tire-kicking).</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <span>Voicemails are returned less than 15% of the time.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Human Logic vs. AI Logic</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> Human Receptionist</h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="opacity-70">• Works 40 hours/week</li>
                                    <li className="opacity-70">• Costs $45,000/year</li>
                                    <li className="opacity-70">• Sick days, holidays, lunch breaks</li>
                                    <li className="opacity-70">• Misses parallel calls (busy signal)</li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-2xl bg-indigo-600/10 border border-indigo-500/30">
                                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2"><Zap className="w-4 h-4" /> AI Voice Agent</h4>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="font-medium">• Works 168 hours/week</li>
                                    <li className="font-medium">• Costs fraction of a salary</li>
                                    <li className="font-medium">• Zero downtime, ever</li>
                                    <li className="font-medium">• Scales infinitely (100 simultaneous calls)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The "Instant Book" Workflow</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Imagine this: A prospect calls at 8:30 PM on a Tuesday.
                        </p>
                        <ol className="space-y-4 ml-6 relative border-l border-white/10 pl-6 pb-2">
                            <li className="relative">
                                <span className="absolute -left-[30px] w-3 h-3 rounded-full bg-indigo-500 mt-2"></span>
                                <p className="text-white font-bold">Call Answered Immediately</p>
                                <p className="text-sm text-slate-400">"Thanks for calling Acme HVAC. This is Sarah. How can I help you today?"</p>
                            </li>
                            <li className="relative">
                                <span className="absolute -left-[30px] w-3 h-3 rounded-full bg-indigo-500 mt-2"></span>
                                <p className="text-white font-bold">Qualification</p>
                                <p className="text-sm text-slate-400">Agent verifies service area and urgency. Collects details.</p>
                            </li>
                            <li className="relative">
                                <span className="absolute -left-[30px] w-3 h-3 rounded-full bg-indigo-500 mt-2"></span>
                                <p className="text-white font-bold">Scheduling</p>
                                <p className="text-sm text-slate-400">"We have a technician available tomorrow at 10 AM or 2 PM. Which works for you?" ( synced live with your calendar)</p>
                            </li>
                            <li className="relative">
                                <span className="absolute -left-[30px] w-3 h-3 rounded-full bg-indigo-500 mt-2"></span>
                                <p className="text-white font-bold">Confirmation</p>
                                <p className="text-sm text-slate-400">Booking confirmed. SMS summary sent to client. CRM updated.</p>
                            </li>
                        </ol>
                        <p className="text-slate-400 leading-8 text-lg">
                            You wake up Wednesday morning to a calendar full of qualified appointments, not a voicemail box full of tasks.
                        </p>
                    </section>

                    <div className="bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 p-10 rounded-3xl border border-indigo-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Wake Up to Revenue.</h3>
                        <p className="text-slate-300 font-medium max-w-lg mx-auto">
                            Stop letting the clock dictate your income. Turn your phone system into a 24/7 revenue engine.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/25"
                        >
                            Build My Sales Team <Phone className="w-4 h-4" />
                        </Link>
                    </div>

                </article>

                <RelatedArticles currentSlug="24-7-sales-revolution" />
            </main>
        </div>
    );
}
