import Link from 'next/link';
import { ArrowLeft, Building2, UserCheck, BarChart, Globe, Zap } from 'lucide-react';

export const metadata = {
    title: 'Case Study: Apex Property Group — Brandverse',
    description: 'How we used personal branding and automation to scale a real estate portfolio.',
};

export default function CaseStudy() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans">
            <div className="fixed top-0 left-0 w-full h-[600px] bg-purple-900/10 blur-[120px] -z-10 pointer-events-none" />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="mb-12">
                    <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest mb-6">
                        Real Estate
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        Scaling Trust: The <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Personal Brand Engine</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        Apex Property Group needed more than just leads; they needed authority. Here is how we leveraged Ayush's real-life experience to automate their social presence and lead qualification.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
                            <UserCheck className="w-5 h-5" /> Lead Quality
                        </div>
                        <div className="text-3xl font-black text-white">95%</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Pre-qualified by AI</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-pink-400 font-bold mb-2">
                            <Globe className="w-5 h-5" /> Social Reach
                        </div>
                        <div className="text-3xl font-black text-white">40k+</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Monthly Impressions</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                            <Building2 className="w-5 h-5" /> Showings
                        </div>
                        <div className="text-3xl font-black text-white">3x</div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Increase in Velocity</div>
                    </div>
                </div>

                <article className="prose prose-invert prose-lg max-w-none">
                    <h3>The "Availability" Paradox</h3>
                    <p>
                        Real estate is a high-touch game. Clients want to feel like they are your *only* client. But as Apex Property Group grew, their top agents were drowning in "tire kicker" calls—people asking about properties they couldn't afford or that were already sold.
                    </p>
                    <p>
                        They were spending 80% of their time on 20% of the revenue. They needed a filter, but it had to feel personal. It couldn't feel like a robot blocking the gate.
                    </p>

                    <h3>Injecting Real-World DNA</h3>
                    <p>
                        This project was personal for me. Using my own experience in operations and branding, we built a digital twin of their best agent. We analyzed thousands of successful closing conversations to script the AI's "personality."
                    </p>
                    <ul>
                        <li><strong>Tone:</strong> Consultative, not salesy.</li>
                        <li><strong>Knowledge:</strong> Deep understanding of local zoning laws and school districts.</li>
                        <li><strong>Empathy:</strong> Recognizing the stress of buying a first home.</li>
                    </ul>

                    <h3>The Social Automaton</h3>
                    <p>
                        We didn't just stop at inbound calls. We took over their digital output. We built a content engine that automatically generated market updates, "Just Sold" posts, and neighborhood guides based on MLS data.
                    </p>
                    <p>
                        While the agents were out showing houses, their digital presence was active 24/7, answering DMs, scheduling viewings, and nurturing long-term leads with personalized market reports.
                    </p>

                    <h3>Results that Scale</h3>
                    <p>
                        The "Apex Engine" now handles the first 3 touches for every lead. By the time a human agent steps in, the client is pre-vetted, pre-approved, and ready to sign.
                    </p>
                    <p>
                        What started as a test has become their competitive advantage. While other agencies hire more assistants, Apex scales their software.
                    </p>
                </article>
            </main>
        </div>
    );
}
