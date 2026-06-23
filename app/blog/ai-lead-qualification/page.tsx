'use client';

import Link from 'next/link';
import { ArrowLeft, Filter, Target, Zap } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* Article Header */}
      <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -z-10" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-purple-400">
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </Link>
            <span className="text-slate-600">•</span>
            <span>Lead Qualification</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Stop Chasing Bad Leads: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI Lead Qualification</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
            Your sales team wastes 60% of their time on unqualified leads. AI voice agents filter, score, and route only the prospects ready to buy.
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

          {/* Section 1: The Lead Quality Problem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Lead Quality Crisis</h2>
            <p className="text-slate-400 leading-8 text-lg">
              More leads isn't better if they're not qualified. Your team is drowning in tire-kickers, price shoppers, and people who aren't ready to buy.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              Every minute spent on a bad lead is a minute not spent closing a good one.
            </p>
            <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex gap-4 items-start">
              <Filter className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-purple-400 mb-2">The 60/40 Problem</h3>
                <p className="text-sm text-purple-200/60 leading-relaxed">
                  Sales teams spend 60% of their time on leads that never convert. Only 40% of their effort goes toward actual revenue-generating activities.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: AI Qualification Process */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">How AI Qualifies Leads</h2>
            <p className="text-slate-400 leading-8 text-lg">
              AI voice agents don't just take messages—they conduct intelligent conversations that separate serious buyers from casual browsers.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Target className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Budget Qualification</h3>
                  <p className="text-sm text-slate-400">AI asks about budget and pricing expectations naturally in conversation.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Zap className="w-6 h-6 text-yellow-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Timeline Assessment</h3>
                  <p className="text-sm text-slate-400">AI determines urgency and purchase timeline to prioritize hot leads.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Filter className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Decision Maker Identification</h3>
                  <p className="text-sm text-slate-400">AI confirms the caller has authority to make purchasing decisions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 🎯 MID-ARTICLE CTA */}
          <CTASection 
            title="Your Sales Team Should Close, Not Qualify."
            subtitle="Let AI handle the filtering. Your team should spend their time on prospects ready to buy, not tire-kickers."
            primaryText="Deploy Lead Qualification AI"
            secondaryText="See Qualification Case Studies"
            variant="blog"
          />

          {/* Section 3: Lead Scoring System */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Intelligent Lead Scoring</h2>
            <p className="text-slate-400 leading-8 text-lg">
              Every lead gets a score based on qualification criteria. Your team sees only the leads that meet your threshold.
            </p>
            
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900/50">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-white/5 text-xs uppercase font-black text-white tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Criteria</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-6 py-4 text-green-400 font-bold">90-100</td>
                    <td className="px-6 py-4">Budget ready, urgent timeline, decision maker</td>
                    <td className="px-6 py-4">Immediate callback</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-yellow-400 font-bold">70-89</td>
                    <td className="px-6 py-4">Qualified but researching</td>
                    <td className="px-6 py-4">Same-day follow-up</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-red-400 font-bold">Below 70</td>
                    <td className="px-6 py-4">Not ready or wrong fit</td>
                    <td className="px-6 py-4">Nurture campaign</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Results */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Impact on Your Business</h2>
            <p className="text-slate-400 leading-8 text-lg">
              When your sales team focuses only on qualified leads, close rates skyrocket and sales cycles shrink.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl text-center">
                <div className="text-4xl font-black text-green-400 mb-2">3x</div>
                <div className="text-sm text-slate-400">Higher Close Rate</div>
              </div>
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">50%</div>
                <div className="text-sm text-slate-400">Shorter Sales Cycle</div>
              </div>
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">40%</div>
                <div className="text-sm text-slate-400">More Revenue Per Rep</div>
              </div>
            </div>
          </section>

          {/* 🎯 END-ARTICLE CTA */}
          <CTASection 
            title="Stop Wasting Time on Bad Leads."
            subtitle="Your sales team is too expensive to be doing qualification work. Let AI filter so they can close."
            primaryText="Deploy Qualification AI"
            secondaryText="View Qualification Case Studies"
            variant="form"
          />

        </article>
      </main>
    </div>
  );
}
