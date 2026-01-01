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
  ShieldCheck,
  Wrench,
  Home,
  Briefcase,
  Building2,
  Stethoscope,
  Car,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  Rocket,
  Globe,
  Code2,
  Database,
  Workflow,
  Terminal,
  Layers,
  Footprints
} from 'lucide-react';
import ChatWidget from './components/ChatWidget';

export default function Home() {
  const [calculatorValue, setCalculatorValue] = useState(10);
  const avgJobValue = 300;
  const conversionRate = 0.4;
  const monthlyRevenue = Math.round(calculatorValue * avgJobValue * conversionRate * 4);
  const yearlyRevenue = monthlyRevenue * 12;

  const industries = [
    {
      icon: Wrench,
      name: "HVAC & Plumbing",
      description: "Deploy AI-powered dispatch systems that capture emergency calls 24/7, auto-assign technicians based on real-time GPS data, and send automated job confirmations via SMS.",
      results: "+42% Revenue",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Home,
      name: "Real Estate",
      description: "Launch intelligent lead qualification engines that screen property inquiries, sync with your MLS, auto-schedule showings, and nurture cold leads with personalized voice campaigns.",
      results: "3x Pipeline Velocity",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Briefcase,
      name: "Law Firms",
      description: "Implement secure intake automation that screens case viability, books consultations directly to attorney calendars, and triggers document collection workflows—all GDPR compliant.",
      results: "+65% Intake Rate",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Building2,
      name: "Construction",
      description: "Build custom bidding platforms that capture project requests after-hours, pull job specs from uploaded blueprints, and auto-generate quote PDFs with dynamic pricing logic.",
      results: "28% Faster Close",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Stethoscope,
      name: "Healthcare",
      description: "Deploy HIPAA-grade voice AI that verifies insurance eligibility in real-time, books appointments with bi-directional calendar sync, and sends automated pre-visit intake forms.",
      results: "91% Fill Rate",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Car,
      name: "Auto Services",
      description: "Install service scheduling APIs that check parts inventory via live database queries, confirm technician availability, and trigger post-service review campaigns on autopilot.",
      results: "+52% Review Growth",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Footprints,
      name: "Podiatry Clinics",
      description: "Automate orthotic production updates, schedule diabetic foot exams via voice AI, and reduce no-shows with smart SMS reminders for recurring treatments.",
      results: "35% More New Patients",
      color: "from-teal-500 to-green-400"
    },
    {
      icon: Sparkles,
      name: "Dermatology & Aesthetics",
      description: "Manage high-volume cosmetic inquiries with AI that pre-screens for procedure eligibility, handles deposit collection, and fills cancellation slots instantly.",
      results: "$12k/mo Added Revenue",
      color: "from-rose-400 to-pink-600"
    }
  ];

  const techStack = [
    { name: "Next.js 15 (Turbopack)", description: "Server Components + Edge Runtime", icon: Code2 },
    { name: "Supabase (Postgres)", description: "Real-time Relational Database", icon: Database },
    { name: "Firebase Cloud Functions", description: "Serverless Backend Infrastructure", icon: Globe },
    { name: "Vapi AI SDK", description: "Programmable Voice Intelligence", icon: Mic },
    { name: "n8n / Zapier", description: "Workflow Orchestration Layer", icon: Workflow },
    { name: "Vercel Edge Network", description: "Global CDN + Instant Rollbacks", icon: Rocket }
  ];

  const capabilities = [
    {
      title: "Proprietary Voice Models",
      description: "We don't resell Vapi templates. We train custom LLM fine-tunes on YOUR scripts, YOUR brand voice, and YOUR FAQ database.",
      icon: Terminal
    },
    {
      title: "Headless API Architecture",
      description: "Every automation we build exposes a REST API. Integrate with ANY system: Salesforce, HubSpot, SQL Server, legacy ERPs—doesn't matter.",
      icon: Layers
    },
    {
      title: "White-Label Deployment",
      description: "Launch under your domain (yourbrand.com/ai). Your clients never see 'Powered by Brandverse' unless you want them to.",
      icon: Globe
    }
  ];

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
            <Link href="#platform" className="hover:text-blue-400 transition-colors">Platform</Link>
            <Link href="#industries" className="hover:text-blue-400 transition-colors">Industries</Link>
            <Link href="#roi" className="hover:text-blue-400 transition-colors">ROI Engine</Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">Intelligence</Link>
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-50 animate-pulse" />
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full opacity-30" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
              <Zap className="w-3 h-3 fill-current" /> Enterprise AI Infrastructure Platform
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">AI Operating Systems</span><br />
              For High-Growth <span className="text-blue-400 text-glow">Businesses</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-bold leading-relaxed">
              Forget agencies. We're a <strong className="text-white">technology vendor</strong>. Custom Next.js applications, proprietary voice AI models, and headless automation APIs that replace entire departments—deployed in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
              <Link href="/contact" className="w-full sm:w-auto px-10 py-6 bg-brand-gradient text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-3">
                Deploy Your Stack <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/portfolio" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <Code2 className="w-4 h-4" /> View Source Code
              </Link>
            </div>
          </div>
        </section>

        {/* 🎯 PLATFORM CAPABILITIES */}
        <section id="platform" className="px-6 py-32 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                Not SaaS. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Custom Infrastructure.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto font-bold">
                We don't sell subscriptions to bloated platforms. We write production-grade code that compiles into <strong className="text-white">your proprietary software</strong>.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="group p-8 rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-white/5 hover:border-blue-500/30 transition-all space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors flex items-center justify-center">
                    <cap.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">{cap.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📊 FEATURE BENTO GRID */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="grid md:grid-cols-12 gap-6">
              {/* Voice Agents */}
              <div className="md:col-span-8 group p-10 rounded-[3rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Mic className="w-64 h-64 text-blue-500" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                    <Mic className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Programmable Voice SDK</h3>
                  <p className="text-slate-300 text-lg max-w-md font-bold leading-relaxed">
                    Build ultra-realistic AI phone agents with custom LLM fine-tuning, real-time calendar integrations, and CRM webhooks. Think Twilio, but for the AI era.
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 font-black uppercase tracking-widest text-xs hover:bg-blue-500/20 transition-all">
                      <Mic className="w-4 h-4" /> Listen to Demo
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-white transition-all">
                      API Docs <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Automation Bots */}
              <div className="md:col-span-4 p-10 rounded-[3rem] bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-white/5 hover:border-purple-500/30 transition-all">
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center">
                    <Bot className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Workflow Automation Engine</h3>
                  <p className="text-slate-300 font-medium leading-relaxed">
                    Automate invoicing, contract generation, payment reminders, and collections with serverless functions that run on Firebase Cloud.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🏭 INDUSTRY-SPECIFIC SECTIONS */}
        <section id="industries" className="py-32 px-6 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                Industry-Specific <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Tech Stacks</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto font-bold">
                We don't ship generic templates. Every deployment is a custom-engineered software solution built for your vertical's compliance requirements, CRM integrations, and customer expectations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, idx) => (
                <div key={idx} className="group p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all space-y-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.color} opacity-20 group-hover:opacity-30 transition-opacity flex items-center justify-center`}>
                    <industry.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">{industry.name}</h3>
                    <p className="text-slate-400 leading-relaxed mb-4 text-sm">{industry.description}</p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${industry.color} bg-opacity-10 border border-white/10`}>
                      <TrendingUp className="w-4 h-4 text-white" />
                      <span className="text-white font-black text-xs uppercase tracking-widest">{industry.results}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🧮 ROI CALCULATOR SECTION */}
        <section id="roi" className="py-32 px-6 md:px-0">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                CALCULATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ALPHA</span>
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Quantify the cost of manual operations</p>
            </div>

            <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-[3.5rem] border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px]" />
              <div className="space-y-12 relative z-10">
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

                  <div className="p-8 rounded-3xl bg-brand-gradient border border-blue-400/30 shadow-2xl shadow-blue-500/20">
                    <div className="text-white/60 text-[10px] font-black uppercase tracking-[.2em] mb-4 text-white">Yearly Recoverable</div>
                    <div className="text-5xl font-black text-white italic tracking-tighter">${yearlyRevenue.toLocaleString()}</div>
                    <div className="text-white text-[10px] mt-6 font-black uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" /> Captured by AI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🔧 TECH STACK SHOWCASE */}
        <section className="py-32 px-6 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Technology Stack</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Your infrastructure runs on production-grade cloud architecture, not WordPress and Zapier duct tape.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, idx) => (
                <div key={idx} className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors flex items-center justify-center shrink-0">
                      <tech.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white mb-1">{tech.name}</h4>
                      <p className="text-sm text-slate-400">{tech.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📈 SOCIAL PROOF */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                Production Metrics
              </h2>
              <p className="text-slate-400 text-sm uppercase tracking-widest">Real-time dashboards from live deployments</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                <div className="text-6xl font-black text-blue-400 italic">$2.4M+</div>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Revenue Generated</div>
              </div>
              <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                <div className="text-6xl font-black text-purple-400 italic">42%</div>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Avg ROI Increase</div>
              </div>
              <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                <div className="text-6xl font-black text-green-400 italic">87K+</div>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">API Calls/Month</div>
              </div>
              <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
                <div className="text-6xl font-black text-cyan-400 italic">99.9%</div>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Uptime SLA</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-4xl mx-auto p-12 rounded-[4rem] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/5 shadow-2xl shadow-blue-500/10 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Ready to Deploy?</h2>
              <p className="text-slate-300 text-lg font-bold max-w-2xl mx-auto">
                We take on <strong className="text-white">3 new infrastructure builds per month</strong>. Current availability for approved partners deploying in <strong className="text-blue-400">Q1 2026</strong>.
              </p>
              <Link href="/contact" className="inline-block px-12 py-6 bg-brand-gradient text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all">
                Apply for Partnership
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
}
