'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ROICalculator() {
    const [visitors, setVisitors] = useState(10000);
    const [missedCalls, setMissedCalls] = useState(150);
    const [dealValue, setDealValue] = useState(500);

    // Conversion assumptions
    const chatConversionRate = 0.02; // 2% of visitors start a chat
    const leadCaptureImprovement = 0.30; // 30% improvement in lead capture
    const missedCallRecoveryRate = 0.70; // 70% of missed calls recovered

    const monthlyLostRevenue = missedCalls * dealValue * 0.25; // Assuming 25% of missed calls would have been deals
    const recoverableRevenue = (missedCalls * missedCallRecoveryRate * dealValue * 0.25) + (visitors * chatConversionRate * leadCaptureImprovement * dealValue);
    const annualImpact = recoverableRevenue * 12;

    return (
        <section id="roi" className="px-6 py-24">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        Calculate Your ROI
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        See how much revenue you're leaving on the table with missed conversations.
                    </p>
                </div>

                <div className="bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-sm text-slate-400 block">Monthly Website Visitors: <span className="text-white font-bold">{visitors.toLocaleString()}</span></label>
                                <input
                                    type="range"
                                    min="1000"
                                    max="100000"
                                    step="1000"
                                    value={visitors}
                                    onChange={(e) => setVisitors(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm text-slate-400 block">Monthly Missed Calls: <span className="text-white font-bold">{missedCalls}</span></label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={missedCalls}
                                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm text-slate-400 block">Average Deal Value: <span className="text-white font-bold">${dealValue}</span></label>
                                <input
                                    type="range"
                                    min="50"
                                    max="5000"
                                    step="50"
                                    value={dealValue}
                                    onChange={(e) => setDealValue(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-600/10 rounded-xl p-8 border border-blue-500/20">
                            <h3 className="text-lg font-medium text-blue-400 mb-6">Your Potential Recovery</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Monthly Revenue Lost</div>
                                    <div className="text-3xl font-bold text-red-400">
                                        ${Math.round(monthlyLostRevenue).toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Recoverable with Brandverse</div>
                                    <div className="text-3xl font-bold text-green-400">
                                        ${Math.round(recoverableRevenue).toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Annual Impact</div>
                                    <div className="text-4xl font-bold text-white">
                                        ${Math.round(annualImpact).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="mt-8 block w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-center rounded-xl font-medium transition-all">
                                Get Your Custom Analysis
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
