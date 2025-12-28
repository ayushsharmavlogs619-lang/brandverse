'use client';

import { Globe, Zap, ShieldCheck, MessageSquare, Clock, BarChart3, Lock, Users } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <main className="space-y-32">
                {/* Cinematic Hero */}
                <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center space-y-10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full opacity-60" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in text-glow-blue">
                        <Zap className="w-3 h-3 fill-current" /> Enterprise Infrastructure
                    </div>
                    <h1 className="text-6xl md:text-[8.5rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                        Atomic <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600">Capabilities</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-bold leading-relaxed">
                        Brandverse isn't a tool. It's an <span className="text-blue-400">autonomous revenue engine</span> engineered to eliminate operational friction and human error.
                    </p>
                </section>

                {/* Feature Bento Grid */}
                <section className="px-6 pb-24 max-w-7xl mx-auto">
                    <h2 className="sr-only">Core Capabilities</h2>
                    <div className="grid md:grid-cols-12 gap-6">
                        <article className="md:col-span-8 p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                                <Globe className="w-64 h-64 text-blue-500" />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                                    <Globe className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Native Multilingual</h3>
                                <p className="text-slate-400 text-xl font-bold max-w-xl leading-relaxed">
                                    AI that detects and switches between English, Spanish, and French in <span className="text-blue-400">sub-50ms</span>. Expand your market capture by 40%.
                                </p>
                            </div>
                        </article>

                        <article className="md:col-span-4 p-12 rounded-[3.5rem] bg-brand-gradient text-white space-y-6 shadow-2xl shadow-blue-500/20 hover:scale-[1.02] transition-all">
                            <Zap className="w-12 h-12 text-white fill-current" />
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Instant <br /> CRM Sync</h3>
                            <p className="text-blue-50 font-bold leading-relaxed">
                                Zero manual entry. Data is injected directly into ServiceTitan or HighLevel in real-time.
                            </p>
                        </article>

                        <article className="md:col-span-4 p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-indigo-500/30 transition-all group">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center mb-8">
                                <ShieldCheck className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Emergency Triage</h3>
                            <p className="text-slate-400 font-bold leading-relaxed">
                                Distinguishes between "scheduled maintenance" and "catastrophic failure" instantly.
                            </p>
                        </article>

                        <article className="md:col-span-8 p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row gap-12 items-center">
                            <div className="space-y-6 flex-1">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 flex items-center justify-center">
                                    <BarChart3 className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Sentiment Intel</h3>
                                <p className="text-slate-400 font-bold leading-relaxed italic">
                                    "We don't just record calls. We understand the emotional trajectory of every customer."
                                </p>
                            </div>
                            <div className="flex-1 bg-white/5 rounded-[2.5rem] p-8 border border-white/5 w-full">
                                <div className="space-y-4">
                                    <div className="h-2 bg-emerald-500/20 rounded-full w-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[85%]" />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-500">
                                        <span>Positive Sentiment</span>
                                        <span>85% Growth</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                {/* The Operational Shift */}
                <section className="py-32 bg-[#050505] relative overflow-hidden border-y border-white/5">
                    <div className="absolute inset-0 bg-blue-600/5 blur-[150px] rounded-full -translate-x-1/2" />
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <h2 className="text-5xl md:text-8xl font-black text-white text-center mb-24 uppercase italic tracking-tighter">The Shift</h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            <article className="p-16 rounded-[4rem] bg-black/40 border border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                                <h3 className="text-slate-500 font-black tracking-[0.3em] uppercase mb-12 flex items-center gap-3 italic">
                                    Old Protocol
                                </h3>
                                <ul className="space-y-8">
                                    <li className="flex gap-4 text-slate-500 font-bold text-lg">
                                        <span className="text-red-500/50">✖</span>
                                        <span>Missed leads after 5 PM</span>
                                    </li>
                                    <li className="flex gap-4 text-slate-500 font-bold text-lg">
                                        <span className="text-red-500/50">✖</span>
                                        <span>High overhead salaries</span>
                                    </li>
                                    <li className="flex gap-4 text-slate-500 font-bold text-lg">
                                        <span className="text-red-500/50">✖</span>
                                        <span>Inconsistent customer moods</span>
                                    </li>
                                </ul>
                            </article>

                            <article className="p-16 rounded-[4rem] bg-[#020617] border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)] scale-105 relative">
                                <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-xl">Elite Grade</div>
                                <h3 className="text-blue-500 font-black tracking-[0.3em] uppercase mb-12 flex items-center gap-3 italic text-glow-blue">
                                    Brandverse Way
                                </h3>
                                <ul className="space-y-8">
                                    <li className="flex gap-4 text-white font-bold text-lg italic">
                                        <span className="text-blue-500">✔</span>
                                        <span>Capture 100% of missed revenue</span>
                                    </li>
                                    <li className="flex gap-4 text-white font-bold text-lg italic">
                                        <span className="text-blue-500">✔</span>
                                        <span>Flat-rate, zero-overhead scaling</span>
                                    </li>
                                    <li className="flex gap-4 text-white font-bold text-lg italic">
                                        <span className="text-blue-500">✔</span>
                                        <span>Perfect, high-energy 24/7 support</span>
                                    </li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </section>

                {/* Tactical CTA */}
                <section className="py-40 text-center px-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
                    <h2 className="text-5xl md:text-[8rem] font-black text-white mb-12 uppercase italic tracking-tighter leading-none">Defy The <span className="text-blue-500">Standard.</span></h2>
                    <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-7 bg-brand-gradient text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all group">
                        Upgrade Your Business Today
                        <Zap className="w-5 h-5 fill-current group-hover:rotate-12 transition-transform" />
                    </Link>
                </section>
            </main>
        </div>
    );
}
