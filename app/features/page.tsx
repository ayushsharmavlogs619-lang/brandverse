
import { Globe, Zap, ShieldCheck, MessageSquare, Clock, BarChart3, Lock, Users } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            {/* Hero */}
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8">
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Enterprise Grade Technology for SMBs</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight">
                    More Than Just An
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Answering Machine
                    </span>
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    Brandverse is a fully autonomous <strong>Revenue Operations Engine</strong>. It doesn't just take messages; it qualifies leads, updates your CRM, and manages your schedule while you sleep.
                </p>
            </div>

            {/* Core Grid */}
            <div className="px-6 pb-32 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            t: "Native-Level Multilingual",
                            d: "Don't leave money on the table. Our AI instantly detects language (English/Spanish/French) and switches fluently. Expand your market reach by 40% overnight without hiring bilingual staff.",
                            i: Globe
                        },
                        {
                            t: "Deep CRM Integration",
                            d: "We don't just email you a recording. We inject data directly into ServiceTitan, Salesforce, HubSpot, or HighLevel. Tags, notes, and appointment slots are updated in real-time.",
                            i: Zap
                        },
                        {
                            t: "Emergency Triage Logic",
                            d: "Sleep soundly. The AI distinguishes between a 'dripping faucet' and a 'burst pipe'. Routine calls get booked for Monday; emergencies trigger an SMS blast to your on-call tech immediately.",
                            i: ShieldCheck
                        },
                        {
                            t: "Sentiment Analysis",
                            d: "Know exactly how your customers feel. After every call, the AI rates the caller's mood and flagging 'at-risk' clients so you can follow up personally. Its customer retention on autopilot.",
                            i: BarChart3
                        },
                        {
                            t: "Infinite Scalability",
                            d: "Marketing campaign went viral? No problem. Brandverse can handle 10, 100, or 1,000 concurrent calls instantly. Never hear a busy signal again.",
                            i: Users
                        },
                        {
                            t: "HIPAA & SOC2 Compliant",
                            d: "Security isn't an afterthought. Your data is encrypted at rest and in transit. We adhere to the strictest privacy standards, suitable for medical and legal practices.",
                            i: Lock
                        }
                    ].map((f, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <f.i className="w-7 h-7 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{f.t}</h3>
                            <p className="text-slate-400 leading-relaxed">{f.d}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* The "Old Way vs New Way" Block */}
            <div className="bg-[#0b1121] py-32 px-6 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16">The Operational Shift</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Old Way */}
                        <div className="p-10 rounded-3xl bg-red-500/5 border border-red-500/20 opacity-75 grayscale hover:grayscale-0 transition-all">
                            <h3 className="text-red-400 font-black tracking-widest uppercase mb-8 flex items-center gap-3">
                                <Clock className="w-6 h-6" /> The Old Way
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4 text-slate-400">
                                    <span className="text-red-500 font-bold">✖</span>
                                    <span>Missed calls during lunch breaks and after 5 PM</span>
                                </li>
                                <li className="flex gap-4 text-slate-400">
                                    <span className="text-red-500 font-bold">✖</span>
                                    <span>Paying $45,000/yr salary + benefits</span>
                                </li>
                                <li className="flex gap-4 text-slate-400">
                                    <span className="text-red-500 font-bold">✖</span>
                                    <span>Inconsistent moods affecting customer service</span>
                                </li>
                                <li className="flex gap-4 text-slate-400">
                                    <span className="text-red-500 font-bold">✖</span>
                                    <span>Slow response times leading to lost leads</span>
                                </li>
                            </ul>
                        </div>

                        {/* New Way */}
                        <div className="p-10 rounded-3xl bg-blue-500/10 border border-blue-500/30 shadow-2xl shadow-blue-500/10">
                            <h3 className="text-blue-400 font-black tracking-widest uppercase mb-8 flex items-center gap-3">
                                <Zap className="w-6 h-6" /> The Brandverse Way
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4 text-white">
                                    <span className="text-blue-500 font-bold">✔</span>
                                    <span>Instant pickup 24/7/365. Zero missed calls.</span>
                                </li>
                                <li className="flex gap-4 text-white">
                                    <span className="text-blue-500 font-bold">✔</span>
                                    <span>Flat monthly rate. No benefits. No drama.</span>
                                </li>
                                <li className="flex gap-4 text-white">
                                    <span className="text-blue-500 font-bold">✔</span>
                                    <span>Perfectly scripted, energetic responses every time.</span>
                                </li>
                                <li className="flex gap-4 text-white">
                                    <span className="text-blue-500 font-bold">✔</span>
                                    <span>Instant lead capture and calendar qualification.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-32 text-center px-6">
                <h2 className="text-4xl font-bold text-white mb-8">Stop settling for "Good Enough"</h2>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-slate-200 transition-all">
                    Upgrade Your Business Today <Zap className="w-5 h-5 fill-current" />
                </Link>
            </div>
        </div>
    );
}
