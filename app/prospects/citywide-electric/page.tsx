'use client';

import { ArrowLeft, AlertTriangle, Clock, Phone, CheckCircle2, XCircle, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function CitywideElectricProspectPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            {/* Header */}
            <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Brandverse
                </Link>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest mb-6">
                        Lead Loss Audit
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
                        Citywide Electric: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Revenue Leak Analysis</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Digital triage report: How outdated web presence is costing thousands in missed opportunities
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* BEFORE - Current State */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">BEFORE</h2>
                                <p className="text-red-400 text-sm font-bold">Current Website Performance</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                                <div className="flex items-start gap-4">
                                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Mobile Experience Fails</h3>
                                        <p className="text-slate-400 text-sm">Site not optimized for emergency calls - contractors need instant access when out on jobs</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Slow Load Times</h3>
                                        <p className="text-slate-400 text-sm">Prospects abandon before seeing services - every second lost is a lost customer</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">No Click-to-Call</h3>
                                        <p className="text-slate-400 text-sm">Friction in the conversion process - emergency electrical work needs instant connection</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                                <div className="flex items-start gap-4">
                                    <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Weak Trust Signals</h3>
                                        <p className="text-slate-400 text-sm">Missing testimonials, certifications, and project galleries that build customer confidence</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AFTER - Proposed Solution */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">AFTER</h2>
                                <p className="text-green-400 text-sm font-bold">Brandverse AI-First Solution</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <Zap className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">AI Voice Agent Integration</h3>
                                        <p className="text-slate-400 text-sm">24/7 intelligent call handling that books appointments and answers questions instantly</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">One-Tap Emergency Calls</h3>
                                        <p className="text-slate-400 text-sm">Mobile-optimized click-to-call with instant connection for urgent electrical needs</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Trust & Social Proof</h3>
                                        <p className="text-slate-400 text-sm">Dynamic testimonials, certification badges, and project galleries that convert</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <TrendingUp className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Real-Time Availability</h3>
                                        <p className="text-slate-400 text-sm">Live scheduling integration - customers see when you're available and book instantly</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue Impact Calculator */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-16">
                    <h3 className="text-2xl font-black text-white mb-6 text-center">Estimated Revenue Impact</h3>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-black text-white mb-2">$2,500+</div>
                            <div className="text-sm text-slate-400">Monthly Lost Revenue</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">35%</div>
                            <div className="text-sm text-slate-400">Increase in Call Capture</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">48hrs</div>
                            <div className="text-sm text-slate-400">Implementation Time</div>
                        </div>
                    </div>
                </div>

                {/* Secret Shopper Results */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 mb-16">
                    <h3 className="text-2xl font-black text-white mb-6">Secret Shopper Test Results</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <XCircle className="w-6 h-6 text-red-400" />
                            <div>
                                <div className="font-bold text-white">8:00 PM Call Test</div>
                                <div className="text-slate-400 text-sm">Went to generic voicemail - no emergency handling</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                            <div>
                                <div className="font-bold text-white">Weekend Availability</div>
                                <div className="text-slate-400 text-sm">No 24/7 coverage for emergency electrical services</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <Clock className="w-6 h-6 text-red-400" />
                            <div>
                                <div className="font-bold text-white">Response Time Analysis</div>
                                <div className="text-slate-400 text-sm">Estimated 2+ hour callback delay - customers call competitors</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
                    >
                        Schedule Your Free Audit <Zap className="w-5 h-5" />
                    </Link>
                    <p className="text-slate-400 text-sm mt-4">
                        Get a personalized revenue analysis for Citywide Electric
                    </p>
                </div>
            </div>
        </div>
    );
}