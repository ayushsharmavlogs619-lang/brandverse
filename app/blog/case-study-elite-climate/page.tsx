import Link from 'next/link';
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Calendar, Phone } from 'lucide-react';

export const metadata = {
    title: 'Case Study: Elite Climate Control & Plumbing — Brandverse',
    description: 'How a skeptical HVAC owner automated 40% of his booking workflow and recovered $15k in missed calls in month one.',
};

export default function CaseStudy() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans">
            <div className="fixed top-0 left-0 w-full h-[600px] bg-blue-900/10 blur-[120px] -z-10 pointer-events-none" />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="mb-12">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                        HVAC & Plumbing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        From "I Don't Trust Robots" to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">"Never Turn It Off"</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        Elite Climate Control was bleeding revenue through missed calls during peak season. Here's how Brandverse deployed a 24/7 Voice Agent that reduced overhead and scaled booking capacity.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                            <Phone className="w-5 h-5" /> Missed Calls
                        </div>
                        <div className="text-3xl font-black text-white">0%</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Down from 32%</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                            <TrendingUp className="w-5 h-5" /> Revenue Saved
                        </div>
                        <div className="text-3xl font-black text-white">$15,400</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">In First 30 Days</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
                            <Calendar className="w-5 h-5" /> Bookings
                        </div>
                        <div className="text-3xl font-black text-white">24/7</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Auto-Scheduled</div>
                    </div>
                </div>

                <article className="prose prose-invert prose-lg max-w-none">
                    <h3>The Skepticism was Real</h3>
                    <p>
                        When we first approached Mike, the owner of Elite Climate Control, he laughed us out of the room. "My customers want to talk to a person, not a machine," he said. And frankly, he had a point. Most "chatbots" in 2023 were terrible—clunky phone trees that frustrated grandma and annoyed contractors.
                    </p>
                    <p>
                        But Mike had a problem. His dispatch team clocked out at 5 PM. AC units break at 7 PM. By the time his team returned calls at 9 AM the next day, 60% of those leads had already booked with a competitor who answered the phone.
                    </p>

                    <h3>The "Silent" Audit</h3>
                    <p>
                        We proposed a challenge: Let us run a "Shadow Number" for one week. We wouldn't take calls, just track missed opportunities. The results were sobering. In one week, Elite missed 14 verified leads. With an average ticket size of $850, that was nearly <strong>$12,000 in potential revenue vanishing every week</strong>.
                    </p>
                    <p>
                        Mike saw the data. He gave us the green light for a 30-day pilot.
                    </p>

                    <h3>Deploying "EliteBot"</h3>
                    <p>
                        We didn't just plug in a generic AI. We ingested 6 months of Mike's call logs. We trained the agent on:
                    </p>
                    <ul>
                        <li>Tier 1 Troubleshooting (Is the thermostat on? Is the breaker tripped?)</li>
                        <li>Emergency Classification (Active leak vs. "It's making a noise")</li>
                        <li>ServiceTitan Integration for real-time calendar availability</li>
                    </ul>

                    <h3>The "Aha!" Moment</h3>
                    <p>
                        On Day 3, a call came in at 2:15 AM. A frantic homeowner with a burst pipe. The AI answered instantly, calmed the customer down using empathetic voice modulation, collected the address, and dispatched the on-call plumber via SMS.
                    </p>
                    <p>
                        The job was worth $3,200. The AI cost for that call? $0.45.
                    </p>

                    <h3>The Outcome</h3>
                    <p>
                        Today, Elite Climate Control refuses to operate without Brandverse. We act as their frontend filter and backend scheduler. Their human dispatchers are happier because they aren't fielding "what's your hourly rate?" calls all day—they focus on complex logistics and high-value customer service.
                    </p>
                    <blockquote>
                        "I was the biggest skeptic. Now I tell everyone: If you aren't using this, you're donating money to your competition." — Mike, Owner
                    </blockquote>
                </article>
            </main>
        </div>
    );
}
