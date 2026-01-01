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
  Footprints,
  Check,
  HelpCircle,
  Play
} from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import { articles } from './lib/articles';

export default function Page() {
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

  const testimonials = [
    {
      quote: "We were losing 30+ calls a week. Brandverse installed their Voice Agent and our booking rate doubled overnight. The tech is actually scary good.",
      author: "Mike Thompson",
      role: "Owner, Thompson HVAC",
      metric: "$42k/mo Added Revenue",
    },
    {
      quote: "I was skeptical about AI answering phones. But the Brandverse agent sounds more professional than my front desk ever did. It never calls in sick.",
      author: "Sarah Jenkins",
      role: "Partner, Lawton & Associates",
      metric: "ZERO Missed Calls",
    },
    {
      quote: "The automated follow-up system they built is a beast. It resurrects dead leads from 6 months ago and puts them on my calendar.",
      author: "David Chen",
      role: "Broker, Apex Realty Group",
      metric: "3x More Listings",
    }
  ];

  const faq = [
    {
      q: "Will my customers know it's AI?",
      a: "They might suspect it because it's polite, efficient, and never puts them on hold. But the voice quality is indistinguishable from a human on a slightly grainy cell connection. Most clients just think they're talking to a very sharp receptionist."
    },
    {
      q: "How long does setup take?",
      a: "We move fast. Kickoff to Go-Live is typically 48-72 hours. We don't drag projects out. We build your infrastructure, test it, and hand you the keys."
    },
    {
      q: "Do I need to change my phone number?",
      a: "No. We simply efficiently forward your missed calls to the AI agent, or port your main line if you want it taking 100% of traffic. Zero disruption to your business cards or truck wraps."
    },
    {
      q: "What if the AI messes up?",
      a: "Our agents are programmed with 'Safe Handoff' protocols. If a caller asks something complex or gets frustrated, the AI instantly forwards the call to your personal cell or an emergency backup line."
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
            <Link href="#hiring" className="hover:text-blue-400 transition-colors">Comparison</Link>
            <Link href="#industries" className="hover:text-blue-400 transition-colors">Industries</Link>
            <Link href="#roi" className="hover:text-blue-400 transition-colors">ROI Engine</Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">Intelligence</Link>
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

          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
              <Zap className="w-3 h-3 fill-current" /> Enterprise AI Infrastructure Platform
            </div>
            <h1 className="text-5xl md:text-[5.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">AI Operating Systems</span><br />
              For High-Growth <span className="text-blue-400 text-glow">Businesses</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-2xl max-w-3xl mx-auto font-bold leading-relaxed pt-4">
              Forget agencies. We're a <strong className="text-white">technology vendor</strong>. Custom Next.js applications, proprietary voice AI models, and headless automation APIs that replace entire departments—deployed in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-12">
              <Link href="/contact" className="w-full sm:w-auto px-10 py-6 bg-brand-gradient text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-3">
                Deploy Your Stack <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/portfolio" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <Code2 className="w-4 h-4" /> View Source Code
              </Link>
            </div>
          </div>
        </section>

        {/* 🔧 TECH STACK SHOWCASE */}
        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-slate-500 text-xs font-black uppercase tracking-widest mb-10">Trusted Infrastructure Powered By</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Logos could go here, using icons for now */}
              <div className="flex items-center gap-2"><Code2 className="w-6 h-6" /> <span className="font-bold">Next.js</span></div>
              <div className="flex items-center gap-2"><Database className="w-6 h-6" /> <span className="font-bold">Supabase</span></div>
              <div className="flex items-center gap-2"><Mic className="w-6 h-6" /> <span className="font-bold">Vapi</span></div>
              <div className="flex items-center gap-2"><Globe className="w-6 h-6" /> <span className="font-bold">Firebase</span></div>
              <div className="flex items-center gap-2"><Rocket className="w-6 h-6" /> <span className="font-bold">Vercel</span></div>
            </div>
          </div>
        </section>

        {/* 🛑 THE PROBLEM (PAIN) */}
        <section className="py-32 px-6 bg-black/40">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <X className="w-3 h-3" /> The Silent Killer
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Your Phone is <br /><span className="text-red-500">Bleeding Money</span></h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              67% of callers hang up if they get voicemail. They don't leave a message—they call your competitor. Every missed call is a donation to the guy down the street who answered.
            </p>
          </div>
        </section>

        {/* 🎯 PLATFORM CAPABILITIES */}
        <section id="platform" className="px-6 py-32 border-y border-white/5 bg-gradient-to-b from-slate-900/0 to-slate-900/50">
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
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Workflow Engine</h3>
                  <p className="text-slate-300 font-medium leading-relaxed">
                    Automate contracts, payments, and collections with serverless functions that run on Firebase Cloud.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⚖️ VS COMPARISON TABLE */}
        <section id="hiring" className="py-32 px-6 bg-black/40 border-y border-white/5">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">The Unfair <span className="text-green-500">Advantage</span></h2>
            </div>
            <div className="bg-slate-900/50 rounded-3xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-slate-900/80 font-black uppercase tracking-widest text-xs text-slate-400">
                <div>Feature</div>
                <div className="text-center">Human Receptionist</div>
                <div className="text-center text-blue-400">Brandverse AI</div>
              </div>
              {/* Row 1 */}
              <div className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className="font-bold text-white">Cost Per Month</div>
                <div className="text-center text-red-400">$3,500+</div>
                <div className="text-center text-green-400 font-bold">$497 - $997</div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className="font-bold text-white">Availability</div>
                <div className="text-center text-slate-400">40 Hours/Week</div>
                <div className="text-center text-blue-400 font-bold">168 Hours/Week (24/7)</div>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className="font-bold text-white">Capacity</div>
                <div className="text-center text-slate-400">1 Call at a time</div>
                <div className="text-center text-blue-400 font-bold">Unlimited Concurrent</div>
              </div>
              {/* Row 4 */}
              <div className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className="font-bold text-white">Sick Days</div>
                <div className="text-center text-slate-400">10+ Year</div>
                <div className="text-center text-blue-400 font-bold">Zero</div>
              </div>
              {/* Row 5 */}
              <div className="grid grid-cols-3 p-6 hover:bg-white/5 transition-colors">
                <div className="font-bold text-white">Training Time</div>
                <div className="text-center text-slate-400">3-4 Weeks</div>
                <div className="text-center text-blue-400 font-bold">Instant Download</div>
              </div>
            </div>
          </div>
        </section>

        {/* 🏭 INDUSTRY-SPECIFIC SECTIONS */}
        <section id="industries" className="py-32 px-6">
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

        {/* ⚙️ HOW IT WORKS (PROCESS) */}
        <section className="py-32 px-6 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-right space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                Deployment <span className="text-blue-500">Protocol</span>
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">From kickoff to autopilot in 48 hours</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -z-10 hidden md:block" />

              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-[#020617] border border-blue-500/30 flex items-center justify-center text-3xl font-black text-blue-500 mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-blue-500/20">1</div>
                <h3 className="text-xl font-bold text-white text-center mb-4">Discovery & Scripting</h3>
                <p className="text-center text-slate-400 text-sm leading-relaxed">We audit your current phone flow, ingest your FAQs, and craft a bespoke conversation script that matches your brand voice perfectly.</p>
              </div>

              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-[#020617] border border-purple-500/30 flex items-center justify-center text-3xl font-black text-purple-500 mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-purple-500/20">2</div>
                <h3 className="text-xl font-bold text-white text-center mb-4">Training & Integration</h3>
                <p className="text-center text-slate-400 text-sm leading-relaxed">We fine-tune the LLM on your specific knowledge base and connect the voice API to your CRM (Salesforce, HubSpot, Zapier) for real-time data sync.</p>
              </div>

              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-[#020617] border border-green-500/30 flex items-center justify-center text-3xl font-black text-green-500 mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-green-500/20">3</div>
                <h3 className="text-xl font-bold text-white text-center mb-4">Go Live & Optimize</h3>
                <p className="text-center text-slate-400 text-sm leading-relaxed">We flip the switch. Your AI agent starts answering calls immediately. We monitor the first 100 calls to refine tone and accuracy to 99%.</p>
              </div>
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

        {/* ⭐ REVIEWS / TESTIMONIALS */}
        <section className="py-32 px-6 bg-black/40 border-t border-white/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Verified <span className="text-purple-500">Performance</span></h2>
                <p className="text-slate-400 text-lg">Don't take our word for it.</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white/5 rounded-full border border-white/10">
                <div className="flex text-yellow-500">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-widest">5.0 Star Average</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 space-y-6">
                  <div className="text-slate-300 italic leading-relaxed">"{t.quote}"</div>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <div className="font-bold text-white">{t.author}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{t.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-xs font-black uppercase tracking-widest">{t.metric}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🧠 LATEST INTELLIGENCE */}
        <section className="py-24 px-6 border-t border-white/5 bg-[#020617]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-end justify-between border-b border-white/5 pb-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                  Latest <span className="text-blue-500">Intelligence</span>
                </h2>
                <p className="text-slate-400 max-w-xl">Tactical guides on automating your service business.</p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[...articles].reverse().slice(0, 4).map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group block space-y-4">
                  <div className="aspect-[4/3] rounded-3xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-all relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-blue-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{article.date}</div>
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ❓ FAQ */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Transmission <span className="text-slate-600">Logs</span></h2>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-4">Frequently Asked Questions</p>
            </div>
            <div className="space-y-8">
              {faq.map((item, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-all">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                    {item.q}
                  </h3>
                  <p className="text-slate-400 leading-relaxed pl-8">{item.a}</p>
                </div>
              ))}
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
