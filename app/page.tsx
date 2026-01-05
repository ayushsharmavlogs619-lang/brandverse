'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Zap,
  ArrowRight,
  Mic,
  Bot,
  ChevronRight,
  X,
  ShieldCheck,
  Globe,
  BarChart3,
  Users,
  Check,
  ChevronDown,
  Phone,
  Calendar,
  DollarSign,
  MessageSquare,
  Shield
} from 'lucide-react';
import ChatWidget from './components/ChatWidget';

export default function Home() {
  const [calculatorValue, setCalculatorValue] = useState(10);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const avgJobValue = 300;
  const conversionRate = 0.4;
  const monthlyRevenue = Math.round(calculatorValue * avgJobValue * conversionRate * 4);
  const yearlyRevenue = monthlyRevenue * 12;

  const faqs = [
    {
      q: "Does it sound like a robot?",
      a: "No. We use advanced neural voice technology with ultra-low latency. It handles interruptions, sarcasm, and regional accents with 99% human parity."
    },
    {
      q: "Can it actually book appointments?",
      a: "Yes. It integrates directly with your Google Calendar, Calendly, or ServiceTitan to book jobs in real-time without double-booking."
    },
    {
      q: "How long is the setup?",
      a: "We can have your custom AI agent live and answering calls in as little as 48-72 hours after the initial discovery call."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 overflow-x-hidden pb-20 font-sans">

      <main>
        {/* 🔥 HERO: THE MACHINE */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full opacity-40 animate-pulse" />
            <Image
              src="/images/hero_revenue_engine.png"
              alt=""
              width={1200}
              height={800}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl opacity-20 mix-blend-screen pointer-events-none"
              priority={false}
              unoptimized
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
                  <Image src="/images/ai_voice_aura.png" alt="" width={800} height={600} className="w-full h-full object-cover" unoptimized />
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
                  <Image src="/images/automation_matrix.png" alt="" width={400} height={400} className="w-full h-full object-cover" unoptimized />
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

        {/* 🚀 TACTICAL ADVANTAGE */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  t: "Native Multilingual",
                  d: "Instant English/Spanish/French detection and switching.",
                  i: Globe,
                  c: "from-blue-500/10 to-transparent"
                },
                {
                  t: "Deep CRM Sync",
                  d: "Direct data injection into ServiceTitan, Salesforce, and HubSpot.",
                  i: Zap,
                  c: "from-purple-500/10 to-transparent"
                },
                {
                  t: "Sentiment Analysis",
                  d: "Post-call mood rating to flag at-risk clients automatically.",
                  i: BarChart3,
                  c: "from-red-500/10 to-transparent"
                },
                {
                  t: "Infinite Scale",
                  d: "Handle 1,000 concurrent calls without a single busy signal.",
                  i: Users,
                  c: "from-green-500/10 to-transparent"
                }
              ].map((f, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] bg-gradient-to-b ${f.c} border border-white/5 hover:border-white/10 transition-all group`}>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <f.i className="w-6 h-6 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">{f.t}</h3>
                  <p className="text-slate-500 text-sm font-bold leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📋 Comparison Table */}
        <section className="py-24 px-6 bg-[#03081a] border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase italic">Human vs <span className="text-blue-500">Brandverse AI</span></h2>
            <div className="overflow-x-auto rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-6 text-sm font-black uppercase tracking-widest text-slate-400">Feature</th>
                    <th className="p-6 text-sm font-black uppercase tracking-widest text-slate-400 text-center text-red-500">Typical Hire</th>
                    <th className="p-6 text-sm font-black uppercase tracking-widest text-slate-400 text-center text-blue-400">Our AI Scout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {[
                    { f: "Availability", h: "40 hrs/week", a: "168 hrs/week (24/7)", win: true },
                    { f: "Response Time", h: "3-5 Minutes", a: "< 2 Rings", win: true },
                    { f: "Monthly Cost", h: "$3,000 - $5,000+", a: "Fixed Subscriptions", win: true },
                    { f: "Scalability", h: "1 Call at a time", a: "Infinite Concurrent", win: true },
                    { f: "Sick Days", h: "10+ per year", a: "Zero. Ever.", win: true },
                    { f: "Attitude", h: "Unpredictable", a: "Always Professional", win: true }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 font-medium">{row.f}</td>
                      <td className="p-6 text-center text-slate-500">{row.h}</td>
                      <td className="p-6 text-center font-bold text-white bg-blue-500/5">
                        {row.win ? <span className="text-green-400">{row.a}</span> : row.a}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 🛠 THE INFRASTRUCTURE (PROCESS) */}
        <section className="px-6 py-24 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">DEPLOYMENT</span>
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">From Zero to Operational in 7 Days</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { s: "01", t: "Discovery", d: "We map your busy times, common objections, and pricing logic.", i: Phone },
                { s: "02", t: "Script Design", d: "We build your custom personality and technical training data.", i: Calendar },
                { s: "03", t: "Live Pilot", d: "System goes live with real-time human-in-the-loop tuning.", i: DollarSign }
              ].map((step, i) => (
                <div key={i} className="relative space-y-4">
                  <div className="text-6xl font-black text-white/5 absolute -top-10 -left-4 select-none">{step.s}</div>
                  <h4 className="text-2xl font-black text-white uppercase italic tracking-tight relative z-10">{step.t}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed">{step.d}</p>
                </div>
              ))}
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

        {/* 💰 Pricing */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-20 uppercase tracking-tighter italic">Simple, Transparent <span className="text-blue-500">Pricing</span></h2>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Starter */}
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 text-center hover:border-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-4 uppercase italic">Starter</h3>
                <div className="text-5xl font-black mb-6">$497<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <ul className="text-slate-400 space-y-4 mb-10 text-left">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 24/7 Call Answering</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Appointment Booking</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> SMS Follow-ups</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 500 Minutes Included</li>
                </ul>
                <Link href="/contact" className="block w-full py-4 text-center rounded-2xl border border-white/10 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">Get Started</Link>
              </div>

              {/* Growth */}
              <div className="p-12 rounded-[3.5rem] bg-blue-600 border border-blue-400 relative shadow-2xl shadow-blue-500/40 -translate-y-4 group">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-blue-600 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-xl">Most Popular</div>
                <h3 className="text-2xl font-bold mb-4 uppercase italic text-white">Growth</h3>
                <div className="text-7xl font-black mb-6 text-white">$997<span className="text-lg text-blue-200 font-normal">/mo</span></div>
                <ul className="text-blue-50 space-y-4 mb-10 text-left">
                  <li className="flex items-center gap-3 font-bold"><Check className="w-5 h-5" /> Everything in Starter</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5" /> CRM Integration</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Custom Voice Cloning</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Unlimited Minutes</li>
                </ul>
                <Link href="/contact" className="block w-full py-5 text-center rounded-3xl bg-white text-blue-600 font-black text-xl hover:scale-105 transition-all shadow-2xl">Get Started Now</Link>
              </div>

              {/* Enterprise */}
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 text-center hover:border-white/20 transition-all">
                <h3 className="text-2xl font-bold mb-4 uppercase italic">Enterprise</h3>
                <div className="text-5xl font-black mb-6 text-white">Custom</div>
                <ul className="text-slate-400 space-y-4 mb-10 text-left">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Multi-location Routing</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Account Manager</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> API Access</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> White Label Options</li>
                </ul>
                <Link href="/contact" className="block w-full py-4 text-center rounded-2xl border border-white/10 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">Contact Sales</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ❓ FAQ Section */}
        <section id="faq" className="py-24 px-6 bg-[#03081a]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase italic">Frequently Asked <span className="text-blue-500">Questions</span></h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-8 text-left flex justify-between items-center group"
                  >
                    <span className="text-lg font-bold group-hover:text-blue-400 transition-colors uppercase italic tracking-tight">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-blue-500' : 'text-slate-500'}`} />
                  </button>
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="p-8 pt-0 text-slate-400 leading-relaxed border-t border-white/5 font-medium">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🚀 Final CTA */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-[0.8]">Ready to <span className="text-blue-500">Never Miss</span> Another Customer?</h2>
            <p className="text-2xl text-slate-400 font-bold">Book a 15-minute demo and see your AI Voice Agent live in action.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
              <Link href="/contact" className="inline-block px-12 py-7 bg-brand-gradient text-white rounded-[2rem] text-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-4xl shadow-blue-600/20">
                📅 Schedule Demo Now
              </Link>
            </div>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">&quot;No credit card required • 15-minute call • See real AI calls in action&quot;</p>
          </div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
}
