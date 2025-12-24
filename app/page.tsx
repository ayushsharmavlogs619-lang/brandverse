'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Shield,
  Target,
  Cpu,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Mic,
  Bot,
  Star,
  Users,
  Menu,
  ChevronRight,
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
      {/* 🚀 GLOWING HEADER */}
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 h-20">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cpu className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter text-white">Brandverse</span>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <Link href="#services" className="hover:text-blue-400 transition-colors">Digital Agents</Link>
            <Link href="#roi" className="hover:text-blue-400 transition-colors">ROI Engine</Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">Manifesto</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors">Client Login</Link>
            <Link href="/contact" className="px-6 py-3 bg-brand-gradient text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
              Book Audit
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* 🔥 HERO: THE MACHINE */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-50" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
              <Zap className="w-3 h-3 fill-current" /> Next-Gen AI Automation
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic">
              Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Output</span><br />
              Not Your <span className="text-red-500 text-glow">Headcount</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-bold leading-relaxed">
              We build custom AI Voice Agents and Tactical Automation Engines that do the work of a 50-person team, 24/7/365.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
              <button className="w-full sm:w-auto px-10 py-6 bg-brand-gradient text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl animate-pulse-brand hover:scale-105 transition-all flex items-center justify-center gap-3">
                Start Building <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/portfolio" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                View Case Studies
              </Link>
            </div>
          </div>
        </section>

        {/* 📊 FEATURE BENTO GRID */}
        <section id="services" className="px-6 py-24 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="grid md:grid-cols-12 gap-6">
              {/* Voice Agents */}
              <div className="md:col-span-8 group p-10 rounded-[3rem] bg-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Mic className="w-64 h-64 text-blue-500" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                    <Mic className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">AI Voice Agents</h3>
                  <p className="text-slate-400 text-lg max-w-md font-bold leading-relaxed">
                    Ultra-realistic AI agents that handle outbound sales, inbound support, and appointment setting with human-level nuance.
                  </p>
                  <button className="flex items-center gap-2 text-blue-400 font-black uppercase tracking-widest text-xs group/btn">
                    Listen to Demos <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>

              {/* Automation Bots */}
              <div className="md:col-span-4 p-10 rounded-[3rem] bg-slate-900/50 border border-white/5 hover:border-purple-500/30 transition-all">
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center">
                    <Bot className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Invoicing Bots</h3>
                  <p className="text-slate-400 font-medium">
                    Automate your entire cash-flow pipeline from quote to collection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🧮 ROI CALCULATOR SECTION */}
        <section id="roi" className="py-24 px-6 md:px-0">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                CALCULATE YOUR <span className="text-blue-400">ALPHA</span>
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">See what happens when you stop trading time for money</p>
            </div>

            <div className="bg-slate-900/40 rounded-[3.5rem] border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px]" />
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-xl text-slate-300 font-black uppercase tracking-tighter italic">Weekly Missed Calls</label>
                    <div className="text-6xl font-black text-blue-500 text-glow italic">{calculatorValue}</div>
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
                    className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-[.2em] mb-4">Monthly Lost Revenue</div>
                    <div className="text-5xl font-black text-white italic tracking-tighter">${monthlyRevenue.toLocaleString()}</div>
                    <div className="text-red-500 text-[10px] mt-6 font-black uppercase tracking-widest flex items-center gap-2">
                      <X className="w-3 h-3" /> Donated to Competitors
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-brand-gradient border border-blue-400/30 shadow-2xl shadow-blue-500/10">
                    <div className="text-white/60 text-[10px] font-black uppercase tracking-[.2em] mb-4 text-white">Yearly Recoverable</div>
                    <div className="text-5xl font-black text-white italic tracking-tighter">${yearlyRevenue.toLocaleString()}</div>
                    <div className="text-white text-[10px] mt-6 font-black uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" /> Yours to keep
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-4xl mx-auto p-12 rounded-[4rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 space-y-10">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Ready to build the machine?</h2>
            <p className="text-slate-400 text-lg font-bold">
              We only take on 3 new infrastructure projects per month to ensure absolute dominance for our partners.
            </p>
            <Link href="/contact" className="inline-block px-12 py-6 bg-brand-gradient text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all">
              Apply to Partner
            </Link>
          </div>
        </section>
      </main>

      {/* 🛡️ FOOTER */}
      <footer className="pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-black uppercase tracking-tighter text-white">Brandverse</span>
            </div>
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
              We aren't a marketing agency. We are an operational engine. We build the systems that build the businesses.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tactical</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="#services" className="text-slate-300 hover:text-blue-400">AI Agents</Link></li>
              <li><Link href="#roi" className="text-slate-300 hover:text-blue-400">ROI Engine</Link></li>
              <li><Link href="/portfolio" className="text-slate-300 hover:text-blue-400">Case Studies</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Legal</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/privacy" className="text-slate-300 hover:text-blue-400">Privacy</Link></li>
              <li><Link href="/terms" className="text-slate-300 hover:text-blue-400">Terms</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            © 2025 Brandverse.Tech Technologies. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Security Audited <Shield className="w-3 h-3 inline" /></span>
            <span>Systems Live <Zap className="w-3 h-3 inline text-green-500" /></span>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
