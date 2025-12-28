'use client';

import { Zap, Target } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="space-y-32">
        {/* Cinematic Header */}
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center space-y-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full opacity-60" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in text-glow-blue">
            Mission Log 2024
          </div>
          <h1 className="text-6xl md:text-[9.5rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
            Proven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600">Dominance.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-bold leading-relaxed">
            We don't sell software. We deploy <span className="text-blue-400 underline decoration-blue-500/30">revenue infrastructure</span>. Explore the technical outcomes of our recent operations.
          </p>
        </section>

        {/* Portfolio Bento Grid */}
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <h2 className="sr-only">Success Stories</h2>
          <div className="grid md:grid-cols-12 gap-8">

            {/* HVAC Case Study */}
            <article className="md:col-span-12 p-12 md:p-16 rounded-[4rem] bg-[#020617] border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <img src="/images/hvac_case.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 flex-1 space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest">Sector: High-Volume HVAC</div>
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter">Liquid <span className="text-blue-500">Cooling.</span></h2>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-4xl font-black text-white italic">+245%</div>
                    <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Revenue Capture</h3>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white italic">&lt; 1sec</div>
                    <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Response Latency</h3>
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex-1 bg-white/5 p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl space-y-8">
                <p className="text-slate-200 text-lg font-bold leading-relaxed italic">
                  "Brandverse didn't just automate our calls; they re-engineered our entire dispatch pipeline. We are handling triple the volume with zero additional staff."
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-black text-blue-400 italic">TA</div>
                  <div>
                    <div className="text-white font-black text-sm uppercase tracking-tight">CEO, Titan Air</div>
                    <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Operational Lead</h4>
                  </div>
                </div>
              </div>
            </article>

            {/* Real Estate Case Study */}
            <article className="md:col-span-7 p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <img src="/images/realestate_case.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 flex items-center justify-center shadow-2xl">
                  <Target className="w-10 h-10 text-indigo-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Skyline <span className="text-blue-500 text-glow-blue">Alpha.</span></h2>
                <p className="text-slate-300 text-lg font-bold leading-relaxed">
                  Automated 1,200+ monthly luxury lead qualifications. Zero drop-off rate. 24/7 autonomous engagement protocols.
                </p>
                <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <div className="text-5xl font-black text-white italic">82%</div>
                    <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Lead Qualification Rate</h3>
                  </div>
                  <div className="text-blue-400 font-black uppercase tracking-tighter italic text-xs">Aura Systems</div>
                </div>
              </div>
            </article>

            {/* Dental Case Study */}
            <article className="md:col-span-5 p-12 rounded-[3.5rem] bg-brand-gradient text-white space-y-8 shadow-3xl shadow-blue-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src="/images/dental_case.png" alt="" className="w-full h-full object-cover mix-blend-overlay" />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Zap className="w-10 h-10 text-white fill-current" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">Clinical <br /> Precision.</h2>
                <p className="text-blue-50 text-lg font-bold leading-relaxed">
                  Replaced a 4-person front desk with a single sub-50ms AI Architect. 100% HIPAA compliant.
                </p>
                <div className="pt-8 border-t border-white/20">
                  <div className="text-5xl font-black text-white italic">$14k</div>
                  <h3 className="text-[10px] text-blue-100 font-black uppercase tracking-widest">Monthly Overhead Reduction</h3>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-40 text-center px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full" />
          <h2 className="text-5xl md:text-[7rem] font-black text-white mb-12 uppercase italic tracking-tighter leading-none">Your Turn To <span className="text-blue-500 text-glow-blue">Dominate.</span></h2>
          <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-8 bg-brand-gradient text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all group">
            Apply For System Deployment
            <Zap className="w-6 h-6 fill-current group-hover:rotate-12 transition-transform" />
          </Link>
        </section>
      </main>
    </div>
  );
}
