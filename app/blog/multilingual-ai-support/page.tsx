'use client';

import Link from 'next/link';
import { ArrowLeft, Globe, Languages, MessageCircle } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function Post() {
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
            <span>Multilingual Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Speak Every Language: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Multilingual AI Voice Agents</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
            Your business serves diverse communities. AI voice agents speak 50+ languages fluently, opening markets you couldn't afford to staff.
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

          {/* Section 1: The Language Barrier */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Language Barrier Cost</h2>
            <p className="text-slate-400 leading-8 text-lg">
              You're losing customers every day because they can't communicate with your business. Language barriers cost US businesses billions annually in lost revenue.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              Hiring multilingual staff is expensive. Training them takes time. And you still can't cover every language your community speaks.
            </p>
            <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-4 items-start">
              <Globe className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-400 mb-2">The Multilingual Opportunity</h3>
                <p className="text-sm text-blue-200/60 leading-relaxed">
                  Businesses that offer multilingual support see 45% higher customer satisfaction and 30% more revenue from diverse communities.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: AI Language Capabilities */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">AI Speaks Every Language</h2>
            <p className="text-slate-400 leading-8 text-lg">
              AI voice agents don't just translate—they understand cultural context, idioms, and regional dialects. Every conversation feels natural and native.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Languages className="w-6 h-6 text-green-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">50+ Languages</h3>
                  <p className="text-sm text-slate-400">Spanish, Mandarin, French, Arabic, Hindi, Vietnamese, and dozens more.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <MessageCircle className="w-6 h-6 text-purple-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Natural Conversations</h3>
                  <p className="text-sm text-slate-400">AI understands context, humor, and cultural nuances in every language.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Globe className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Instant Language Detection</h3>
                  <p className="text-sm text-slate-400">AI automatically detects the caller's language and switches seamlessly.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 🎯 MID-ARTICLE CTA */}
          <CTASection 
            title="Language Should Never Be a Barrier to Doing Business."
            subtitle="Your community speaks many languages. Your business should too. AI makes it affordable and instant."
            primaryText="Deploy Multilingual AI"
            secondaryText="See Multilingual Case Studies"
            variant="blog"
          />

          {/* Section 3: Industry Applications */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Multilingual by Industry</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Healthcare</h3>
                <p className="text-slate-400 mb-4">AI handles appointment scheduling, prescription questions, and insurance inquiries in patients' native languages.</p>
                <div className="text-green-400 font-bold text-sm">Result: 50% increase in patient satisfaction scores.</div>
              </div>
              
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Legal Services</h3>
                <p className="text-slate-400 mb-4">AI conducts initial consultations, explains services, and schedules appointments in multiple languages.</p>
                <div className="text-green-400 font-bold text-sm">Result: 40% more consultations from diverse communities.</div>
              </div>
              
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Service Businesses</h3>
                <p className="text-slate-400 mb-4">AI takes service requests, provides quotes, and schedules work in customers' preferred language.</p>
                <div className="text-green-400 font-bold text-sm">Result: 35% expansion into new demographic markets.</div>
              </div>
            </div>
          </section>

          {/* Section 4: Cost Comparison */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Cost Advantage</h2>
            <p className="text-slate-400 leading-8 text-lg">
              Hiring multilingual staff costs $50K-$80K per year per language. AI handles all languages for a fraction of that cost.
            </p>
            
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900/50">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-white/5 text-xs uppercase font-black text-white tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Solution</th>
                    <th className="px-6 py-4">Languages</th>
                    <th className="px-6 py-4">Monthly Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Human Staff (3 languages)</td>
                    <td className="px-6 py-4">3</td>
                    <td className="px-6 py-4 text-red-400">$12,000 - $18,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Translation Service</td>
                    <td className="px-6 py-4">10+</td>
                    <td className="px-6 py-4 text-yellow-400">$2,000 - $5,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-white text-blue-400">Brandverse AI</td>
                    <td className="px-6 py-4 text-blue-400 font-bold">50+</td>
                    <td className="px-6 py-4 text-green-400 font-bold">$499 - $999</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 🎯 END-ARTICLE CTA */}
          <CTASection 
            title="Speak Your Customers' Language."
            subtitle="Every language you don't speak is revenue you're leaving on the table. AI fixes that instantly."
            primaryText="Deploy Multilingual AI"
            secondaryText="View Multilingual Case Studies"
            variant="form"
          />

        </article>
      </main>
    </div>
  );
}
