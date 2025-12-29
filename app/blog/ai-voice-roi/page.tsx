'use client';

import Link from 'next/link';
import { ArrowLeft, Calculator, CheckCircle2, DollarSign, Users, X } from 'lucide-react';
import { useState } from 'react';

export default function Post() {
  const [missedCalls, setMissedCalls] = useState(15);
  const [avgJobValue, setAvgJobValue] = useState(450);

  // ROI Math
  const conversionRate = 0.35; // 35% conversion on picked up calls
  const monthlyRevenueLost = Math.round(missedCalls * avgJobValue * conversionRate * 4);
  const aiCost = 499; // Standard plan example
  const roi = Math.round(((monthlyRevenueLost - aiCost) / aiCost) * 100);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* Article Header */}
      <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-blue-400">
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </Link>
            <span className="text-slate-600">•</span>
            <span>Financial Strategy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            The Math of "Always On": <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Calculating AI Voice ROI</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
            Stop guessing if automation is worth it. We break down the exact formula for missed call revenue recovery and how to calculate your break-even point in 48 hours.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white">AS</div>
            <div className="text-sm">
              <div className="font-bold text-white">Ayush Sharma</div>
              <div className="text-slate-500">Head of Operations, Brandverse</div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-20">
        <article className="max-w-3xl mx-auto space-y-16">

          {/* Section 1: The Problem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The "Leaky Bucket" Phenomenon</h2>
            <p className="text-slate-400 leading-8 text-lg">
              For most local service businesses—plumbers, HVAC techs, specialized clinics—the constraining factor isn't
              <span className="text-white font-bold"> demand</span>, it's
              <span className="text-white font-bold"> capacity</span>.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              Specifically, <span className="italic">reception capacity</span>. If you miss a call at 5:05 PM, that lead doesn't leave a voicemail. They call the next competitor on Google.
            </p>
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4 items-start">
              <X className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-400 mb-2">The Hidden Cost of "I'll Call Back Later"</h3>
                <p className="text-sm text-red-200/60 leading-relaxed">
                  Data shows that 85% of customers whose call goes to voicemail will not pick up when you call them back. They have already moved on.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Interactive Calculator */}
          <section className="scroll-mt-24" id="calculator">
            <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Calculator className="w-64 h-64" />
              </div>

              <div className="relative z-10 space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white">Input Your Numbers</h2>
                  <p className="text-slate-400 text-sm">Drag the sliders to see what you're currently losing.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Missed Calls / Week</label>
                        <span className="text-blue-400 font-black text-xl">{missedCalls}</span>
                      </div>
                      <input
                        type="range" min="1" max="50" value={missedCalls}
                        onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-full appearance-none accent-blue-500 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Avg Job Profit</label>
                        <span className="text-green-400 font-black text-xl">${avgJobValue}</span>
                      </div>
                      <input
                        type="range" min="100" max="2000" step="50" value={avgJobValue}
                        onChange={(e) => setAvgJobValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-full appearance-none accent-green-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center space-y-6 bg-black/40 p-6 rounded-2xl border border-white/5">
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Monthly Loss</div>
                      <div className="text-3xl font-black text-red-500">${monthlyRevenueLost.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Potential AI ROI</div>
                      <div className="text-3xl font-black text-green-400">+{roi}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: The Human vs AI Cost Table */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Spreadsheet Logic</h2>
            <p className="text-slate-400 leading-8 text-lg">
              Even if we ignore the revenue recovery (which is massive), the operational savings alone justify the switch for most SMBs.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900/50">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-white/5 text-xs uppercase font-black text-white tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Expense Category</th>
                    <th className="px-6 py-4">Human Receptionist</th>
                    <th className="px-6 py-4 text-blue-400">Brandverse AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Monthly Cost</td>
                    <td className="px-6 py-4">$3,200 - $4,500</td>
                    <td className="px-6 py-4 text-green-400 font-bold">$499 - $999</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Availability</td>
                    <td className="px-6 py-4">40 hours/week</td>
                    <td className="px-6 py-4 text-blue-400 font-bold">168 hours/week (24/7)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Concurrent Calls</td>
                    <td className="px-6 py-4">1 at a time</td>
                    <td className="px-6 py-4 text-blue-400 font-bold">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Training Time</td>
                    <td className="px-6 py-4">2-4 Weeks</td>
                    <td className="px-6 py-4 text-blue-400 font-bold">Instant (Knowledge Base)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Implementation Steps */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Where to start?</h2>
            <p className="text-slate-400 leading-8 text-lg">
              The best way to calculate your specific ROI is to run a <strong>"Silent Test"</strong>.
              We deploy a ghost number on your Google Business Profile for 7 days. It forwards to your main line but tracks every missed call.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              Most owners are shocked to find they are missing 20-30% more calls than they estimated.
            </p>
          </section>

          {/* CTA Box */}
          <div className="bg-brand-gradient p-10 rounded-3xl text-center space-y-6 shadow-2xl shadow-blue-500/20">
            <h3 className="text-3xl font-black text-white italic">Ready to stop losing revenue?</h3>
            <p className="text-blue-100 font-medium max-w-lg mx-auto">
              Book a 15-minute audit. We'll verify your call volume and build a custom ROI report for your territory.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              Start Your Audit <DollarSign className="w-4 h-4" />
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
}
