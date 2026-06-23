'use client';

import Link from 'next/link';
import { ArrowLeft, Heart, Repeat, Shield } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* Article Header */}
      <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-600/10 blur-[100px] rounded-full -z-10" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-pink-400">
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </Link>
            <span className="text-slate-600">•</span>
            <span>Customer Retention</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Keep Them Coming Back: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">AI Customer Retention</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
              Acquiring new customers costs 5x more than retaining existing ones. AI voice agents keep your customers happy and loyal with proactive engagement.
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

          {/* Section 1: The Retention Problem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Customer Churn Crisis</h2>
            <p className="text-slate-400 leading-8 text-lg">
              You worked hard to acquire customers. But most businesses lose 20-30% of their customer base every year to poor service and lack of engagement.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              The worst part? Most of them leave silently. You don't know they're unhappy until they're already gone.
            </p>
            <div className="p-6 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex gap-4 items-start">
              <Heart className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-pink-400 mb-2">The 5x Cost Reality</h3>
                <p className="text-sm text-pink-200/60 leading-relaxed">
                  Acquiring a new customer costs 5 times more than retaining an existing one. Yet most businesses focus 80% of their effort on acquisition.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: AI Retention Strategies */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">How AI Keeps Customers Loyal</h2>
            <p className="text-slate-400 leading-8 text-lg">
              AI voice agents don't just wait for customers to call—they proactively engage, check in, and solve problems before customers even know they exist.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Repeat className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Proactive Check-ins</h3>
                  <p className="text-sm text-slate-400">AI calls customers after service to ensure satisfaction and address concerns immediately.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Shield className="w-6 h-6 text-green-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Issue Resolution</h3>
                  <p className="text-sm text-slate-400">AI handles complaints, schedules fixes, and escalates serious issues instantly.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Heart className="w-6 h-6 text-pink-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Personal Engagement</h3>
                  <p className="text-sm text-slate-400">AI remembers customer preferences, history, and makes every interaction feel personal.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 🎯 MID-ARTICLE CTA */}
          <CTASection 
            title="Stop Losing Customers You Worked Hard to Get."
            subtitle="Customer retention isn't about being perfect—it's about being present. AI ensures you're always there for your customers."
            primaryText="Deploy Retention AI"
            secondaryText="See Retention Case Studies"
            variant="blog"
          />

          {/* Section 3: Retention Metrics */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Retention Impact</h2>
            <p className="text-slate-400 leading-8 text-lg">
              Businesses that implement AI-driven retention strategies see dramatic improvements in customer lifetime value and loyalty.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl text-center">
                <div className="text-4xl font-black text-green-400 mb-2">25%</div>
                <div className="text-sm text-slate-400">Reduction in Churn</div>
              </div>
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">40%</div>
                <div className="text-sm text-slate-400">Higher CSAT Scores</div>
              </div>
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl text-center">
                <div className="text-4xl font-black text-pink-400 mb-2">3x</div>
                <div className="text-sm text-slate-400">Customer Lifetime Value</div>
              </div>
            </div>
          </section>

          {/* Section 4: Implementation */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Deploy Your Retention AI</h2>
            <p className="text-slate-400 leading-8 text-lg">
              We train your AI on your customer history, service schedules, and retention protocols. It knows when to check in, what to ask, and how to solve problems.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              Most businesses see retention improvements within the first 30 days of deployment.
            </p>
          </section>

          {/* 🎯 END-ARTICLE CTA */}
          <CTASection 
            title="Your Customers Are Your Most Valuable Asset."
            subtitle="Protect that investment with AI that keeps them happy, engaged, and loyal for the long term."
            primaryText="Deploy Retention AI"
            secondaryText="View Retention Case Studies"
            variant="form"
          />

        </article>
      </main>
    </div>
  );
}
