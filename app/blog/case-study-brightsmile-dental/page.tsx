import Link from 'next/link';
import { ArrowLeft, Stethoscope, Clock, HeartPulse, ShieldCheck } from 'lucide-react';

export const metadata = {
    title: 'Case Study: Brightsmile Dental — Brandverse',
    description: 'Transforming a local dental clinic into a digital fortress. How Brandverse became the backend technical partner.',
};

export default function CaseStudy() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans">
            <div className="fixed top-0 left-0 w-full h-[600px] bg-cyan-900/10 blur-[120px] -z-10 pointer-events-none" />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="mb-12">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
                        Medical & Dental
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        The Backend <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Backbone</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        Brightsmile Dental didn't just want a website; they wanted a complete operational overhaul. How we went from a "vendor" to their permanent Technical In-Charge.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                            <Clock className="w-5 h-5" /> Admin Time
                        </div>
                        <div className="text-3xl font-black text-white">-18h</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Per Week Saved</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                            <HeartPulse className="w-5 h-5" /> Patient Retention
                        </div>
                        <div className="text-3xl font-black text-white">98%</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Recall Rate</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                            <ShieldCheck className="w-5 h-5" /> HIPAA
                        </div>
                        <div className="text-3xl font-black text-white">100%</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Compliance</div>
                    </div>
                </div>

                <article className="prose prose-invert prose-lg max-w-none">
                    <h3>The "Front Desk" Bottleneck</h3>
                    <p>
                        Dr. Sharma at Brightsmile is an artist with dentistry, but his clinic was chaotic. The phone was ringing off the hook, patients were no-showing, and his receptionist was stressed out trying to be a scheduler, biller, and greeter all at once.
                    </p>
                    <p>
                        They tried hiring more staff, but turnover was high. They needed stability. They needed a system that wouldn't quit.
                    </p>

                    <h3>Becoming the Architect</h3>
                    <p>
                        Brandverse stepped in not just to "install a bot," but to re-architect their patient flow. We mapped the entire journey from "Toothache Google Search" to "Six Month Checkup."
                    </p>
                    <ul>
                        <li><strong>Automated Recalls:</strong> The system now texts patients 6 months after their cleaning automatically. No spreadsheet needed.</li>
                        <li><strong>Smart Rescheduling:</strong> If a patient texts "I can't make it," the AI immediately offers 3 alternative slots and updates the doctor's calendar.</li>
                        <li><strong>Insurance Pre-Check:</strong> We built a form that validates insurance eligibility 24 hours *before* the patient walks in.</li>
                    </ul>

                    <h3>The "Golden Handcuffs" of Quality</h3>
                    <p>
                        Six months into the partnership, Dr. Sharma made a decision. He didn't want to manage the tech anymore. He fired his previous IT provider and named Brandverse the official "Backend Digital In-Charge."
                    </p>
                    <p>
                        We now manage everything: their server security, their patient database integrations, and their reputation management. We are no longer a vendor; we are their digital infrastructure.
                    </p>

                    <h3>Why They Won't Leave</h3>
                    <p>
                        "It's simple," Dr. Sharma says. "Before Brandverse, I worried about my schedule every night. Now, I wake up, the calendar is full, the confirmations are sent, and I just do dentistry. Why would I ever go back?"
                    </p>
                </article>
            </main>
        </div>
    );
}
