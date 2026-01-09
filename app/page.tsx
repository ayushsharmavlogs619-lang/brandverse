'use client';

import { ArrowRight, MessageSquare, Zap, BarChart3, Shield, Cpu, Activity, Clock, CheckCircle, XCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ROICalculator from './components/ROICalculator';

// Top 3 Latest Articles for Intelligence Feed
const latestIntel = [
  {
    title: "The 7-Day Sprint: From Zero to AI Deployed",
    category: "Execution",
    date: "Jan 10, 2026",
    slug: "implementation-blueprint"
  },
  {
    title: "Shocking Efficiency: Why Top Electricians Automate",
    category: "Trades",
    date: "Jan 09, 2026",
    slug: "electrician-ai-dispatch"
  },
  {
    title: "The AI Inside Sales Agent: Reclaiming Real Estate Time",
    category: "Real Estate",
    date: "Jan 08, 2026",
    slug: "real-estate-ai-voice"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -z-10 opacity-50 mix-blend-screen animate-pulse-slow" />
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            System Status: Online
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] uppercase italic animate-fade-in-up delay-100">
            The Infinite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 text-glow-blue">Workforce.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Deploy enterprise-grade AI Voice Agents that answer every call, qualify every lead, and never sleep.
            <span className="block text-blue-400 mt-2">Scale your revenue, not your headcount.</span>
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up delay-300">
            <Link href="/contact" className="px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Deploy System <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#roi" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
              Calculate ROI
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ROI CALCULATOR */}
      <div id="roi">
        <ROICalculator />
      </div>

      {/* 3. TACTICAL APPLICATIONS (Battlecards) */}
      <section className="py-32 px-6 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Tactical Applications</h2>
            <p className="text-slate-400 text-lg font-bold">Domain-specific models calibrated for your industry.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* HVAC */}
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-4">HVAC & Trades</h3>
              <p className="text-slate-400 text-sm font-bold leading-relaxed mb-6">
                Auto-dispatch emergency calls. Filter tire-kickers. Quote diagnostic fees instantly.
              </p>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-black text-xs uppercase tracking-widest">Result</span>
                <p className="text-white font-bold text-lg">+$12k/mo Added Rev</p>
              </div>
            </div>

            {/* Real Estate */}
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-4">Real Estate</h3>
              <p className="text-slate-400 text-sm font-bold leading-relaxed mb-6">
                Instant speed-to-lead for Zillow. Long-term database reactivation.
              </p>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">Result</span>
                <p className="text-white font-bold text-lg">24/7 Lead Qual</p>
              </div>
            </div>

            {/* Legal/Pro */}
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-4">Legal & Pro</h3>
              <p className="text-slate-400 text-sm font-bold leading-relaxed mb-6">
                Intake forms completed over phone. Confidentiality protocols. Calendar booking.
              </p>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <span className="text-purple-400 font-black text-xs uppercase tracking-widest">Result</span>
                <p className="text-white font-bold text-lg">Zero Admin Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECH STACK (Engine Room) */}
      <section className="py-32 px-6 border-b border-white/5 bg-[#03091e] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
              The Engine Room
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
              We don't hide <br /> our stack.
            </h2>
            <p className="text-xl text-slate-400 font-bold leading-relaxed">
              We use the world's most powerful LLMs and voice synthesis engines. No proprietary black boxes. Just raw, unadulterated speed and intelligence.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-6 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest">Cerebras</span>
              <span className="px-6 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-xs uppercase tracking-widest">OpenAI</span>
              <span className="px-6 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold text-xs uppercase tracking-widest">DeepSeek</span>
              <span className="px-6 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-xs uppercase tracking-widest">Firebase</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full" />
            <div className="relative z-10 grid grid-cols-2 gap-6">
              <div className="p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 space-y-4">
                <Cpu className="w-10 h-10 text-blue-500" />
                <div className="text-4xl font-black text-white italic">80ms</div>
                <p className="text-slate-500 text-xs font-black uppercase">Latency</p>
              </div>
              <div className="p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 space-y-4 mt-12">
                <Zap className="w-10 h-10 text-yellow-500" />
                <div className="text-4xl font-black text-white italic">10k+</div>
                <p className="text-slate-500 text-xs font-black uppercase">Calls/Min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEPLOYMENT TIMELINE */}
      <section className="py-32 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">The 7-Day Sprint</h2>
            <p className="text-slate-400 text-lg font-bold">From signature to live deployment in 168 hours.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { day: "01", title: "Discovery", desc: "We ingest your knowledge base & FAQs." },
              { day: "03", title: "Architecture", desc: "We design the voice flow & logic." },
              { day: "05", title: "Integration", desc: "We connect to your CRM & Calendar." },
              { day: "07", title: "Go Live", desc: "We flip the switch. You start scaling." }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-[100px] font-black text-white/5 absolute -top-10 -left-6 z-0 leading-none group-hover:text-blue-500/10 transition-colors">
                  {step.day}
                </div>
                <div className="relative z-10 space-y-4 pt-12">
                  <div className="w-full h-1 bg-white/10 mb-8 overflow-hidden rounded-full">
                    <div className="h-full bg-blue-500 w-1/4 group-hover:w-full transition-all duration-700" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase italic">{step.title}</h3>
                  <p className="text-slate-400 text-sm font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UNIT ECONOMICS (Table) */}
      <section className="py-32 px-6 border-b border-white/5 bg-[#020617]">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">The Math Is Undefeated</h2>
            <p className="text-slate-400 text-lg font-bold">Why AI wins every single time.</p>
          </div>

          <div className="bg-white/5 rounded-[3rem] p-8 md:p-12 border border-white/10 overflow-hidden relative">
            <div className="grid grid-cols-3 gap-8 text-center border-b border-white/10 pb-8 mb-8">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">Feature</div>
              <div className="text-xs font-black uppercase tracking-widest text-red-400">Human Hire</div>
              <div className="text-xs font-black uppercase tracking-widest text-blue-400">Brandverse AI</div>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-8 text-center items-center">
                <div className="text-sm font-bold text-white">Cost (Yearly)</div>
                <div className="text-lg font-black text-red-400">$45,000+</div>
                <div className="text-lg font-black text-blue-400">$6,000</div>
              </div>
              <div className="grid grid-cols-3 gap-8 text-center items-center">
                <div className="text-sm font-bold text-white">Hours</div>
                <div className="text-lg font-black text-slate-400">40/week</div>
                <div className="text-lg font-black text-white">168/week</div>
              </div>
              <div className="grid grid-cols-3 gap-8 text-center items-center">
                <div className="text-sm font-bold text-white">Capacity</div>
                <div className="text-lg font-black text-slate-400">1 Call</div>
                <div className="text-lg font-black text-white">Infinite</div>
              </div>
              <div className="grid grid-cols-3 gap-8 text-center items-center">
                <div className="text-sm font-bold text-white">Sick Days</div>
                <div className="flex justify-center"><CheckCircle className="w-6 h-6 text-red-500" /></div>
                <div className="flex justify-center"><XCircle className="w-6 h-6 text-blue-500" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST INTELLIGENCE (Blog Feed) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Latest Intelligence</h2>
              <p className="text-slate-400 text-lg font-bold">Tactics straight from the front lines.</p>
            </div>
            <Link href="/blog" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-2">
              View All Briefings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestIntel.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full p-8 rounded-[2.5rem] bg-[#020617] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {post.category}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors leading-tight mb-4">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-500">
                    Read Briefing <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">
            Ready to build <br /><span className="text-blue-500 text-glow-blue">The Machine?</span>
          </h2>
          <p className="text-xl text-slate-400 font-bold max-w-2xl mx-auto">
            Your competition is sleeping. You aren't. Let's deploy your AI workforce today.
          </p>
          <div className="pt-8">
            <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-brand-gradient text-white rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl">
              <Zap className="w-5 h-5" /> Initiate Launch Sequence
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
