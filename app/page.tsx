'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  ArrowRight,
  ChevronRight,
  Mic,
  Bot,
  X,
  ShieldCheck
} from 'lucide-react';
import ChatWidget from './components/ChatWidget';

export default function Home() {
  const [calculatorValue, setCalculatorValue] = useState(10);
  const avgJobValue = 300;
  const conversionRate = 0.4;
  const monthlyRevenue = Math.round(calculatorValue * avgJobValue * conversionRate * 4);
  const yearlyRevenue = monthlyRevenue * 12;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 overflow-x-hidden pb-20 font-sans">

      <main>
        {/* 🔥 HERO: THE MACHINE */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full opacity-40 animate-pulse" />
            <img
              src="/images/hero_revenue_engine.png"
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl opacity-20 mix-blend-screen pointer-events-none"
            />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in text-glow-blue">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              </span>
              System Active: Next-Gen AI
            </div>
            <h1 className="text-5xl md:text-[9.5rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic mb-6">
              Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600">Output</span><br />
              <span className="text-blue-500 text-glow-blue">Not Your Headcount</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-bold leading-relaxed">
              We build custom <span className="text-blue-400">AI Voice Agents</span> and Tactical Automation Engines that do the work of a 50-person team, 24/7/365.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
              <Link href="/contact" className="w-full sm:w-auto px-10 py-6 bg-brand-gradient text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group">
                Initiate Setup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/portfolio" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-400 transition-colors border-b border-white/5 pb-1">
                View Mission Log (Case Studies)
              </Link>
            </div>
          </div>
        </section>

        {/* 📊 FEATURE BENTO GRID: TACTICAL POWER */}
        <section id="services" className="px-6 py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] -translate-x-1/2" />
          <div className="max-w-7xl mx-auto space-y-20 relative z-10">
            <h2 className="sr-only">Core Services</h2>
            <div className="grid md:grid-cols-12 gap-6">
              {/* Voice Agents */}
              <article className="md:col-span-8 group p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src="/images/ai_voice_aura.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="w-20 h-20 rounded-2xl bg-blue-600/20 flex items-center justify-center shadow-lg shadow-blue-500/10 backdrop-blur-md">
                    <Mic className="w-10 h-10 text-blue-400" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">AI Voice <span className="text-blue-500">Agents.</span></h2>
                    <p className="text-slate-400 text-xl max-w-xl font-bold leading-relaxed">
                      Ultra-realistic AI scouts that handle complex <span className="text-blue-400">outbound sales</span>, inbound support, and priority triage with human-level nuance.
                    </p>
                  </div>
                  <Link href="/features" className="inline-flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.2em] text-xs group/btn border-b border-blue-500/20 pb-1">
                    Analyze Infrastructure <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-all" />
                  </Link>
                </div>
              </article>

              {/* Automation Bots */}
              <article className="md:col-span-4 p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src="/images/automation_matrix.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-8 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-purple-600/20 flex items-center justify-center shadow-lg shadow-purple-500/10 backdrop-blur-md">
                    <Bot className="w-10 h-10 text-purple-400" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Invoicing <br /> <span className="text-purple-500">Bots.</span></h2>
                    <p className="text-slate-400 font-bold leading-relaxed">
                      Automate your entire cash-flow pipeline from quote to collection with zero operational friction.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 🧮 ROI CALCULATOR SECTION */}
        <section id="roi" className="py-32 px-6 md:px-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] -z-10" />
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                CALCULATE YOUR <span className="text-blue-500 text-glow-blue">ALPHA.</span>
              </h2>
              <p className="text-slate-500 font-black uppercase tracking-widest text-xs">See what happens when you stop trading time for money</p>
            </div>

            <div className="bg-slate-900/20 backdrop-blur-3xl rounded-[4.5rem] border border-white/5 p-8 md:p-20 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px]" />
              <div className="space-y-16">
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <h3 className="text-2xl text-blue-500 font-black uppercase tracking-tighter italic">Weekly Missed Calls</h3>
                    <div className="text-8xl font-black text-white text-glow-blue italic drop-shadow-2xl">{calculatorValue}</div>
                  </div>
                  <input
                    type="range"
                    title="Adjust Weekly Missed Calls"
                    aria-label="Adjust Weekly Missed Calls"
                    min="5"
                    max="50"
                    step="1"
                    value={calculatorValue}
                    onChange={(e) => setCalculatorValue(parseInt(e.target.value))}
                    className="w-full h-4 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500 hover:bg-white/10 transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="p-10 rounded-[3rem] bg-black/60 border border-white/5 hover:border-red-500/20 transition-all group">
                    <h4 className="text-blue-500/50 text-[10px] font-black uppercase tracking-[.3em] mb-6">Monthly Lost Revenue</h4>
                    <div className="text-6xl font-black text-white italic tracking-tighter">${monthlyRevenue.toLocaleString()}</div>
                    <div className="text-slate-500 text-[10px] mt-8 font-black uppercase tracking-widest flex items-center gap-3">
                      <X className="w-4 h-4 text-red-600" /> Currently Leaking to Competitors
                    </div>
                  </div>

                  <div className="p-10 rounded-[3rem] bg-brand-gradient border border-blue-400/30 shadow-4xl shadow-blue-500/20">
                    <h4 className="text-white/60 text-[10px] font-black uppercase tracking-[.3em] mb-6 text-white">Yearly Recoverable</h4>
                    <div className="text-6xl font-black text-white italic tracking-tighter">${yearlyRevenue.toLocaleString()}</div>
                    <div className="text-white text-[10px] mt-8 font-black uppercase tracking-widest flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-white" /> Recovered with Brandverse
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 px-6 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] -z-10 rounded-full" />
          <div className="max-w-4xl mx-auto p-16 md:p-24 rounded-[5rem] bg-slate-900/20 backdrop-blur-3xl border border-white/5 space-y-12 shadow-3xl">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">Ready to build <br /> <span className="text-blue-500">The Machine?</span></h2>
            <p className="text-slate-400 text-xl font-bold max-w-lg mx-auto leading-relaxed">
              We only take on 3 new infrastructure projects per month to ensure absolute dominance for our partners.
            </p>
            <Link href="/contact" className="inline-block px-14 py-8 bg-brand-gradient text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-4xl hover:scale-105 transition-all">
              Apply to Partner
            </Link>
          </div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
}
