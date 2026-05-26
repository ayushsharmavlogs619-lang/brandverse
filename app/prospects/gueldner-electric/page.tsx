'use client';

import { ArrowLeft, AlertTriangle, Clock, Phone, CheckCircle2, XCircle, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function GueldnerElectricProspectPage() {
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
                        Gueldner Electric: <br />
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
                                        <h3 className="text-lg font-bold text-white mb-2">Outdated Design</h3>
                                        <p className="text-slate-400 text-sm">Website looks like it's from 2010 - doesn't inspire confidence in modern electrical work</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Poor Navigation</h3>
                                        <p className="text-slate-400 text-sm">Customers can't quickly find services - friction leads to abandonment</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">No Online Booking</h3>
                                        <p className="text-slate-400 text-sm">Customers have to call during business hours - losing after-hours emergency work</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                                <div className="flex items-start gap-4">
                                    <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Missing Service Specializations</h3>
                                        <p className="text-slate-400 text-sm">Doesn't highlight EV charging, commercial maintenance, or other high-ticket services</p>
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
                                        <h3 className="text-lg font-bold text-white mb-2">Modern, Mobile-First Design</h3>
                                        <p className="text-slate-400 text-sm">Professional appearance that builds trust and converts on any device</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">24/7 AI Scheduling</h3>
                                        <p className="text-slate-400 text-sm">Customers can book appointments anytime - AI handles emergencies intelligently</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Service Specialization Pages</h3>
                                        <p className="text-slate-400 text-sm">Dedicated pages for EV charging, commercial maintenance, and high-margin services</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <TrendingUp className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Lead Capture Automation</h3>
                                        <p className="text-slate-400 text-sm">Instant follow-up sequences and automated nurturing for every inquiry</p>
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
                            <div className="text-4xl font-black text-white mb-2">$3,200+</div>
                            <div className="text-sm text-slate-400">Monthly Lost Revenue</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">45%</div>
                            <div className="text-sm text-slate-400">Increase in Online Bookings</div>
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
                                <div className="text-slate-400 text-sm">No answer - full voicemail with no callback timeline</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                            <div>
                                <div className="font-bold text-white">Emergency Service Availability</div>
                                <div className="text-slate-400 text-sm">Website doesn't clearly state 24/7 emergency response capability</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <Clock className="w-6 h-6 text-red-400" />
                            <div>
                                <div className="font-bold text-white">Online Presence Gap</div>
                                <div className="text-slate-400 text-sm">No Google Business optimization - missing local search traffic</div>
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
                        Get a personalized revenue analysis for Gueldner Electric
                    </p>
                </div>
            </div>
        </div>
    );
}