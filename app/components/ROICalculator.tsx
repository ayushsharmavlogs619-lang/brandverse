'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, X, Clock, Calculator, ArrowRight, DollarSign, TrendingUp, Heart } from 'lucide-react';
import Link from 'next/link';

export default function ROICalculator() {
    // State for inputs
    const [manualHours, setManualHours] = useState(15);
    const [hourlyRate, setHourlyRate] = useState(50);
    const [missedLeads, setMissedLeads] = useState(5);
    const [leadValue, setLeadValue] = useState(500);

    // Derived values
    const yearlyAdminCost = manualHours * hourlyRate * 52;
    const yearlyLostRevenue = missedLeads * leadValue * 12;
    const totalYearlyLoss = yearlyAdminCost + yearlyLostRevenue;
    const weeksRecovered = Math.round((manualHours * 52) / 40); // 40h work week equivalent

    return (
        <section id="roi" className="py-24 px-6 md:px-0 relative overflow-hidden bg-gradient-to-b from-[#020617] to-[#050A25]">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] -z-10 rounded-full" />

            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Calculator className="w-3 h-3" /> Cost of Inaction
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
                        The Real Cost of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">"Doing It Yourself"</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                        It's not just about money. It's about the missed dinners, the stress of an overflowing inbox, and the constant feeling of being "behind." <br className="hidden md:block" /> Let's look at what your current manual operations fit is actually costing you.
                    </p>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Input Grid */}
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24 relative z-10">
                        {/* LEFT: The Pain Inputs */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <h3 className="text-xl text-white font-bold flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                    Time & Labor Drain
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-semibold text-slate-300">
                                        <label>Hours spent weekly on manual admin/calls</label>
                                        <span className="text-blue-400">{manualHours} hrs/wk</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="60" value={manualHours}
                                        onChange={(e) => setManualHours(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                    <p className="text-xs text-slate-500 italic">Scheduling, emailing, data entry, chasing payments.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-semibold text-slate-300">
                                        <label>Hourly value of your (or your staff's) time</label>
                                        <span className="text-blue-400">${hourlyRate}/hr</span>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <input
                                            type="number" value={hourlyRate}
                                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white font-mono focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/5" />

                            <div className="space-y-6">
                                <h3 className="text-xl text-white font-bold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-red-400" />
                                    Opportunity Cost
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-semibold text-slate-300">
                                        <label>Missed leads/calls per month</label>
                                        <span className="text-red-400">{missedLeads} leads</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100" value={missedLeads}
                                        onChange={(e) => setMissedLeads(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                                    />
                                    <p className="text-xs text-slate-500 italic">Calls missed after hours, while busy, or on weekends.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-semibold text-slate-300">
                                        <label>Average Lifetime Value (LTV) per client</label>
                                        <span className="text-white font-mono">${leadValue}</span>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <input
                                            type="number" value={leadValue}
                                            onChange={(e) => setLeadValue(Number(e.target.value))}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white font-mono focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: The Result */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl -z-10 rounded-full" />

                            <div className="h-full flex flex-col justify-between space-y-6">
                                {/* Top Card: Money Lost */}
                                <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 space-y-4 backdrop-blur-md">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-2">Total Value Leaking</p>
                                            <h4 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                                                ${totalYearlyLoss.toLocaleString()}
                                                <span className="text-lg text-slate-500 font-normal">/yr</span>
                                            </h4>
                                        </div>
                                        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                                            <DollarSign className="w-6 h-6 text-red-500" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                                        That's <span className="text-white font-bold">${Math.round(totalYearlyLoss / 12).toLocaleString()} each month</span> vanishing from your business due to inefficiency and missed opportunities.
                                    </p>
                                </div>

                                {/* Bottom Card: Life Gained */}
                                <div className="p-8 rounded-[2.5rem] bg-brand-gradient border border-blue-400/30 shadow-2xl space-y-4 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] group-hover:bg-white/20 transition-colors" />

                                    <div className="flex items-start justify-between relative z-10">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80 mb-2">Life Reclaimed</p>
                                            <h4 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                                                {weeksRecovered}
                                                <span className="text-lg text-white/60 font-normal ml-2">Work Weeks</span>
                                            </h4>
                                        </div>
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <Heart className="w-6 h-6 text-white fill-current" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-blue-100 font-medium leading-relaxed border-t border-white/20 pt-4 mt-2 relative z-10">
                                        Imagine what you could do with <span className="font-bold text-white">{manualHours * 52} extra hours</span> a year. Focus on strategy, spend time with family, or simply rest.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <Link href="/contact" className="w-full py-5 bg-white text-blue-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                                        Stop The Bleeding <ArrowRight className="w-5 h-5 ml-1" />
                                    </Link>
                                    <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest">
                                        Automating your business pays for itself in <span className="text-white">months</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
