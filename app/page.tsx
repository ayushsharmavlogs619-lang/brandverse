'use client';

import { useState } from 'react';
import Link from 'next/link';
import { leadService } from '../lib/lead-service';
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
import CTASection from './components/CTASection';
import { articles } from './lib/articles';

export default function Page() {
  const [calculatorValue, setCalculatorValue] = useState(10);
  const [avgJobValue, setAvgJobValue] = useState(450);
  const [conversionRate, setConversionRate] = useState(40);
  const monthlyRevenue = Math.round(calculatorValue * avgJobValue * (conversionRate / 100) * 4);
  const yearlyRevenue = monthlyRevenue * 12;
  const aiCost = 997;
  const monthlyROI = Math.round(((monthlyRevenue - aiCost) / aiCost) * 100);
  const yearlyROI = Math.round(((yearlyRevenue - (aiCost * 12)) / (aiCost * 12)) * 100);

  const [email, setEmail] = useState('');
  const [auditName, setAuditName] = useState('');
  const [auditStatus, setAuditStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !auditName) return;
    setAuditStatus('loading');
    try {
      await leadService.submitLeadWithRetry({
        full_name: auditName,
        email,
        service_interest: 'Free AI Readiness Audit',
        source_page: '/',
        source_form: 'homepage_audit_cta'
      }, 1);
      setAuditStatus('success');
      setEmail('');
      setAuditName('');
    } catch {
      setAuditStatus('idle');
    }
  };

  // Services data
  const services = [
    {
      icon: Mic,
      title: 'AI Voice Agents',
      description: '24/7 natural-sounding agents that triage emergencies, quote panel jobs, and book service windows automatically.',
      features: ['Live call handling', 'Emergency vs. routine triage', 'SMS confirmations', 'Multi-crew dispatch support']
    },
    {
      icon: Bot,
      title: 'AI Receptionist',
      description: 'Intelligent front-desk automation that handles inquiries, schedules estimates, and nurtures leads.',
      features: ['Instant response', 'Calendar/dispatch integration', 'Job-type qualification', 'Follow-up automation']
    },
    {
      icon: Workflow,
      title: 'Business Automations',
      description: 'End-to-end workflow automation connecting your phone, CRM, dispatch board, and crew calendars.',
      features: ['CRM integration', 'Calendar sync', 'Custom workflows', 'API access']
    },
    {
      icon: Database,
      title: 'CRM Integration',
      description: 'Seamless two-way sync with ServiceTitan, Housecall Pro, Jobber, and QuickBooks.',
      features: ['Real-time sync', 'Custom field mapping', 'Webhook triggers', 'Data enrichment']
    }
  ];

  const industries = [
    {
      icon: Home,
      name: "Residential Electricians",
      description: "Deploy AI dispatch that captures panel upgrade and rewiring inquiries 24/7, auto-quotes based on job type, and confirms appointments via SMS.",
      results: "+42% Revenue",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Building2,
      name: "Commercial Electrical Contractors",
      description: "Launch intake automation that screens project scope, checks against licensing/bonding requirements, and routes to the right estimator.",
      results: "3x Pipeline Velocity",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      name: "Emergency / 24-Hour Electricians",
      description: "Instant triage that separates true emergencies (sparking outlet, total power loss, exposed wiring) from routine calls, and dispatches your on-call tech immediately with GPS-based assignment.",
      results: "+65% Emergency Capture Rate",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Car,
      name: "EV Charger Installers",
      description: "A lead-qualification engine that screens for panel capacity, permit requirements, and rebate eligibility before booking a site visit.",
      results: "28% Faster Close",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Sparkles,
      name: "Solar & Panel Upgrade Specialists",
      description: "Voice AI that qualifies leads by home age, panel size, and utility provider, then books a site assessment straight to your calendar.",
      results: "91% Booked Rate",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Wrench,
      name: "Low Voltage & Smart Home Electricians",
      description: "Scheduling that checks technician certifications (security, AV, home automation) before confirming a job type.",
      results: "+52% Review Growth",
      color: "from-teal-500 to-green-400"
    },
    {
      icon: ShieldCheck,
      name: "Master Electricians / Inspections",
      description: "Automated inspection scheduling, permit status updates, and no-show reduction with SMS reminders for code compliance visits.",
      results: "35% More New Clients",
      color: "from-rose-400 to-pink-600"
    },
    {
      icon: Briefcase,
      name: "Industrial Electrical Contractors",
      description: "Manage high-volume maintenance contract inquiries with AI that pre-screens for facility type, urgency, and union/licensing requirements.",
      results: "$12k/mo Added Revenue",
      color: "from-slate-500 to-gray-600"
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
      description: "We don't resell Vapi templates. We train custom LLM fine-tunes on YOUR scripts, YOUR brand voice, and YOUR service menu — panel upgrades, EV charger installs, emergency repairs, code inspections.",
      icon: Terminal
    },
    {
      title: "Headless API Architecture",
      description: "Every automation we build exposes a REST API. Integrate with ServiceTitan, Housecall Pro, Jobber, QuickBooks — doesn't matter.",
      icon: Layers
    },
    {
      title: "White-Label Deployment",
      description: "Launch under your domain. Your customers never see 'Powered by Brandverse' unless you want them to.",
      icon: Globe
    }
  ];

  const testimonials = [
    {
      quote: "We were losing 20+ emergency calls a week overnight. Brandverse's Voice Agent picked them all up and our after-hours booking rate doubled. The triage is scary accurate.",
      author: "Dave Reyes",
      role: "Owner, Reyes Electrical Services",
      metric: "$38k/mo Added Revenue",
    },
    {
      quote: "I was skeptical about AI answering emergency electrical calls. But it flags true emergencies vs. routine work correctly every time. It never calls in sick.",
      author: "Marcus Lee",
      role: "Owner, Lee & Sons Electric",
      metric: "ZERO Missed Emergency Calls",
    },
    {
      quote: "The automated follow-up system resurrects old panel-upgrade quotes from months back and puts them straight on my calendar.",
      author: "Priya Nair",
      role: "Owner, Nair Electrical Contracting",
      metric: "3x More Booked Estimates",
    }
  ];

  const faq = [
    {
      q: "Will my customers know it's AI?",
      a: "They might suspect it because it's polite, efficient, and never puts them on hold. But the voice quality is indistinguishable from a human on a slightly grainy cell connection. Most callers just think they're talking to a very sharp dispatcher."
    },
    {
      q: "How long does setup take?",
      a: "We move fast. Kickoff to Go-Live is typically 48–72 hours. We build your infrastructure, test it, and hand you the keys."
    },
    {
      q: "Do I need to change my phone number?",
      a: "No. We simply forward your missed calls to the AI agent, or port your main line if you want it taking 100% of traffic — including after-hours emergency routing. Zero disruption to your business cards or truck wraps."
    },
    {
      q: "What if the AI messes up?",
      a: "Our agents are programmed with 'Safe Handoff' protocols. If a caller asks something complex or gets frustrated, the AI instantly forwards the call to your personal cell or an emergency backup line."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden pb-20 font-sans relative">
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
        {/* 🔥 HERO: THE QUANTUM MACHINE */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-pink-600/20 blur-[150px] rounded-full opacity-60 animate-pulse" />
            <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/15 to-blue-500/10 blur-[120px] rounded-full opacity-40 floating-animation" />
            <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[80px] rounded-full opacity-30 floating-animation" style={{animationDelay: '2s'}} />
          </div>

          <div className="max-w-6xl mx-auto text-center space-y-12 relative z-20">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl glass-morphism border border-white/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in neon-glow">
              <div className="w-4 h-4 bg-cyan-400 rounded-full mr-2 pulse-glow" />
              Quantum AI Infrastructure
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic holographic-text">
              We Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">Digital Immortality</span><br />
              For <span className="text-cyan-400 text-glow drop-shadow-glow">Electrical Contractors</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-2xl max-w-4xl mx-auto font-bold leading-relaxed pt-6 glass-morphism p-8 rounded-3xl border border-white/10">
              <span className="text-cyan-400">⚡ Forget answering services. Forget missed emergency calls.</span> We build <span className="text-purple-400 font-bold">proprietary AI voice infrastructure</span> that answers <span className="text-cyan-400">every service call, panel upgrade inquiry, and after-hours breaker emergency</span>—deployed in <span className="text-glow font-black bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent px-2 py-1 rounded-lg">48 hours</span>.
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

        {/* 🎯 FIRST CTA - After Hero */}
        <CTASection 
          title="Stop Losing Calls. Start Capturing Revenue."
          subtitle="Every missed call is a service call handed to the electrician down the street. Our AI agents capture 100% of your calls, 24/7 — including the 2am emergencies that turn into your best-paying jobs."
          primaryText="Deploy Your AI Agent"
          variant="minimal"
        />

        {/* 🔧 QUANTUM TECH STACK */}
        <section className="py-24 px-6 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-transparent opacity-30" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-morphism border border-white/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 pulse-glow" />
                Quantum Infrastructure
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              {[
                { icon: Code2, name: "Next.js 16", desc: "Quantum-Optimized Runtime" },
                { icon: Database, name: "Supabase", desc: "Real-time Database" },
                { icon: Mic, name: "Vapi AI", desc: "Neural Voice Interface" },
                { icon: Globe, name: "Firebase", desc: "Cloud Infrastructure" },
                { icon: Rocket, name: "Vercel Edge", desc: "Global CDN" }
              ].map((tech, i) => (
                <div key={i} className="group premium-card p-6 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <tech.icon className="w-10 h-10 mx-auto mb-4 text-cyan-400 group-hover:text-white transition-all duration-300 drop-shadow-glow" />
                  <div className="font-black text-white font-bold text-lg">{tech.name}</div>
                  <div className="text-slate-400 text-xs">{tech.desc}</div>
                </div>
              ))}
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
              67% of callers hang up if they get voicemail. They don't leave a message — they call the next electrician in the search results. Every missed call — a tripped panel, a burnt outlet, a dead sub-panel at midnight — is a donation to your competitor.
            </p>
          </div>
        </section>

        {/* 📧 EMAIL CAPTURE - Mid-Funnel Lead Magnet */}
        <section className="py-24 px-6 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-900/20 border-y border-white/5">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Free AI Readiness Audit
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              Find Out What You're <span className="text-emerald-400">Leaking</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Get a personalized 2-minute audit: how many service calls you're losing, what it's costing you in panel upgrades and emergency jobs, and exactly which AI system plugs the leak.
            </p>

            {auditStatus === 'success' ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 font-bold text-lg">✓ Check your inbox — your audit is on the way.</p>
                <p className="text-slate-400 text-sm mt-2">We'll send the AI Readiness Assessment to {email} within 60 seconds.</p>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={auditName}
                    onChange={(e) => setAuditName(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={auditStatus === 'loading'}
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50 shrink-0"
                >
                  {auditStatus === 'loading' ? 'Sending...' : 'Get My Audit'}
                </button>
              </form>
            )}
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

        {/* 🎯 SECOND CTA - After Platform Capabilities */}
        <CTASection 
          title="This Isn't SaaS. It's Your Infrastructure."
          subtitle="We build custom AI systems that become your competitive advantage. No monthly subscriptions, no vendor lock-in."
          primaryText="Build My Stack"
          secondaryText="View Case Studies"
          variant="minimal"
        />

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
                    Build ultra-realistic AI phone agents that triage true emergencies from routine calls, quote panel upgrades, and book service windows — with real-time dispatch calendar sync.
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
                    Automate estimates, deposit collection, and permit paperwork reminders with serverless functions that run on Firebase Cloud.
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
                <div className="text-center text-slate-400">10+/Year</div>
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

        {/* � THIRD CTA - After Comparison */}
        <CTASection 
          title="The Math Doesn't Lie."
          subtitle="For less than one employee's monthly salary, get unlimited 24/7 emergency and service call coverage. The ROI is undeniable."
          primaryText="Start Saving Money"
          secondaryText="Calculate My ROI"
          variant="minimal"
        />

        {/* � INDUSTRY-SPECIFIC SECTIONS */}
        <section id="industries" className="py-32 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                Built For How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Electrical Contractors</span><br />
                Actually Run Calls
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto font-bold">
                We don't ship generic templates. Every deployment is engineered for emergency triage, code compliance, and permit timing.
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
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">From Kickoff to Answering Electrical Calls in 48 Hours</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -z-10 hidden md:block" />

              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-[#020617] border border-blue-500/30 flex items-center justify-center text-3xl font-black text-blue-500 mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-blue-500/20">1</div>
                <h3 className="text-xl font-bold text-white text-center mb-4">Discovery & Scripting</h3>
                <p className="text-center text-slate-400 text-sm leading-relaxed">We audit your current call flow, ingest your service menu and pricing, and craft a script that matches how you talk to homeowners and GCs.</p>
              </div>

              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-[#020617] border border-purple-500/30 flex items-center justify-center text-3xl font-black text-purple-500 mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-purple-500/20">2</div>
                <h3 className="text-xl font-bold text-white text-center mb-4">Training & Integration</h3>
                <p className="text-center text-slate-400 text-sm leading-relaxed">We fine-tune the LLM on your electrical service catalog and connect the voice API to ServiceTitan, Housecall Pro, or Jobber for real-time dispatch sync.</p>
              </div>

              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-[#020617] border border-green-500/30 flex items-center justify-center text-3xl font-black text-green-500 mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-green-500/20">3</div>
                <h3 className="text-xl font-bold text-white text-center mb-4">Go Live & Optimize</h3>
                <p className="text-center text-slate-400 text-sm leading-relaxed">We flip the switch. Your AI agent starts answering calls immediately. We monitor the first 100 calls to refine emergency-triage accuracy to 99%.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 💼 SERVICES SECTION */}
        <section id="services" className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-slate-900/0 to-slate-900/50">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-morphism border border-white/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 pulse-glow" />
                Our Services
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Automate</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto font-bold">
                From voice agents to dispatch integration, we build complete automation systems that replace entire front-desk operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="group p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                    <service.icon className="w-48 h-48 text-blue-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{service.title}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-slate-400">
                          <Check className="w-5 h-5 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 💰 PRICING SECTION */}
        <section id="pricing" className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-slate-900/50 to-slate-900/0">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-morphism border border-white/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-2 pulse-glow" />
                Simple Pricing
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                Invest In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Growth</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto font-bold">
                A full-time receptionist/dispatcher costs ~$45,000/year. Brandverse costs less than a coffee a day.
                <span className="text-blue-400 font-bold"> No contracts. Cancel anytime.</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start relative">
              {/* Starter */}
              <div className="p-10 rounded-3xl bg-[#0b1121] border border-white/10 text-center hover:border-blue-500/30 transition-all">
                <h3 className="text-2xl font-bold mb-2 text-white">Starter</h3>
                <div className="text-sm text-slate-500 font-medium mb-6">Perfect for Solo Electricians</div>
                <div className="text-5xl font-black mb-2 text-white">$497<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <div className="text-xs text-slate-500 mb-8 uppercase tracking-widest font-semibold">Risk Free Guarantee</div>
                <ul className="text-slate-400 space-y-4 mb-10 text-left text-sm">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 24/7 Call Answering</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Basic Appointment Booking</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> SMS Summaries</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 500 AI Minutes / mo</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> English Support</li>
                </ul>
                <Link href="/contact" className="block w-full py-4 text-center rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-white">Start With Basic</Link>
              </div>

              {/* Growth */}
              <div className="p-12 rounded-[2.5rem] bg-indigo-600 border border-indigo-400 relative shadow-2xl shadow-indigo-500/30 -translate-y-6 z-10">
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white text-indigo-700 px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-indigo-200">Best ROI</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Growth</h3>
                <div className="text-sm text-indigo-200 font-medium mb-6">For Established Electrical Contractors</div>
                <div className="text-6xl font-black mb-2 text-white">$997<span className="text-lg text-indigo-200 font-normal">/mo</span></div>
                <div className="text-xs text-indigo-200 mb-8 uppercase tracking-widest font-semibold">No Setup Fees This Week</div>
                <ul className="text-white space-y-5 mb-12 text-left">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> <strong>Everything in Starter</strong></li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> <strong>Full CRM/Dispatch Integration</strong> (2-way)</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> Custom Voice Cloning</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> Unlimited Minutes</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> Multilingual (ES/FR)</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> Priority Support Line</li>
                </ul>
                <Link href="/contact" className="block w-full py-5 text-center rounded-2xl bg-white text-indigo-700 font-black text-lg hover:bg-slate-100 transition-all shadow-xl">Get Growth Plan</Link>
              </div>

              {/* Enterprise */}
              <div className="p-10 rounded-3xl bg-[#0b1121] border border-white/10 text-center hover:border-blue-500/30 transition-all">
                <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
                <div className="text-sm text-slate-500 font-medium mb-6">Multi-Crew & Multi-Location Electrical Companies</div>
                <div className="text-5xl font-black mb-2 text-white">Custom</div>
                <div className="text-xs text-slate-500 mb-8 uppercase tracking-widest font-semibold">White Glove Service</div>
                <ul className="text-slate-400 space-y-4 mb-10 text-left text-sm">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Multi-location Routing Logic</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Dedicated Account Manager</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Custom API Development</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> White Label Portal</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> SLA Guarantees</li>
                </ul>
                <Link href="/contact" className="block w-full py-4 text-center rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-white">Contact Sales</Link>
              </div>
            </div>

            {/* Guarantee Block */}
            <div className="max-w-4xl mx-auto p-8 border border-emerald-500/30 bg-emerald-500/5 rounded-3xl flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 bg-emerald-500/10 rounded-full shrink-0">
                <ShieldCheck className="w-12 h-12 text-emerald-500" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Our 30-Day Happiness Guarantee</h3>
                <p className="text-slate-400">We are so confident that Brandverse will increase your booking rate that if you don't generate at least 3x your monthly ROI in the first 30 days, we'll refund your subscription in full. No questions asked.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🎯 SIXTH CTA - After Pricing */}
        <CTASection 
          title="Ready to Automate Your Electrical Business?"
          subtitle="We build custom AI infrastructure that becomes your competitive advantage."
          primaryText="Get Started"
          secondaryText="View Pricing"
          variant="minimal"
        />

        {/* 🧮 ROI CALCULATOR SECTION */}
        <section id="roi" className="py-32 px-6 md:px-0">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                CALCULATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ALPHA</span>
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Quantify the cost of missed electrical service calls</p>
            </div>

            <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-[3.5rem] border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px]" />
              <div className="space-y-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4 premium-card p-6">
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-sm text-slate-300 font-black uppercase tracking-tighter">Weekly Missed Calls</label>
                      <div className="text-3xl font-black text-blue-500 text-glow floating-animation">{calculatorValue}</div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        title="Adjust Weekly Missed Calls"
                        aria-label="Adjust Weekly Missed Calls"
                        min="5"
                        max="50"
                        step="1"
                        value={calculatorValue}
                        onChange={(e) => setCalculatorValue(parseInt(e.target.value))}
                        className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500 neon-glow"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>5</span>
                        <span>25</span>
                        <span>50</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm text-slate-300 font-black uppercase tracking-tighter">Avg Job Value ($)</label>
                      <div className="text-2xl font-black text-purple-500">${avgJobValue}</div>
                    </div>
                    <input
                      type="range"
                      title="Adjust Average Job Value"
                      aria-label="Adjust Average Job Value"
                      min="100"
                      max="2000"
                      step="50"
                      value={avgJobValue}
                      onChange={(e) => setAvgJobValue(parseInt(e.target.value))}
                      className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm text-slate-300 font-black uppercase tracking-tighter">Conversion Rate (%)</label>
                      <div className="text-2xl font-black text-green-500">{conversionRate}%</div>
                    </div>
                    <input
                      type="range"
                      title="Adjust Conversion Rate"
                      aria-label="Adjust Conversion Rate"
                      min="10"
                      max="80"
                      step="5"
                      value={conversionRate}
                      onChange={(e) => setConversionRate(parseInt(e.target.value))}
                      className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-green-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-[.2em] mb-4">Monthly Lost Revenue</div>
                    <div className="text-4xl font-black text-white italic tracking-tighter">${monthlyRevenue.toLocaleString()}</div>
                    <div className="text-red-500 text-[10px] mt-6 font-black uppercase tracking-widest flex items-center gap-2">
                      <X className="w-3 h-3" /> Donated to Competitors
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-brand-gradient border border-blue-400/30 shadow-2xl shadow-blue-500/20">
                    <div className="text-white/60 text-[10px] font-black uppercase tracking-[.2em] mb-4 text-white">Yearly Recoverable</div>
                    <div className="text-4xl font-black text-white italic tracking-tighter">${yearlyRevenue.toLocaleString()}</div>
                    <div className="text-white text-[10px] mt-6 font-black uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" /> Captured by AI
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30">
                    <div className="text-green-400/80 text-[10px] font-black uppercase tracking-[.2em] mb-4">Monthly ROI</div>
                    <div className="text-4xl font-black text-green-400 italic tracking-tighter">{monthlyROI}%</div>
                    <div className="text-green-400 text-[10px] mt-6 font-black uppercase tracking-widest flex items-center gap-2">
                      <TrendingUp className="w-3 h-3" /> After AI Cost
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🎯 FOURTH CTA - After ROI Calculator */}
        <CTASection 
          title="Your Numbers Don't Lie."
          subtitle="You just calculated how much money you're losing. Let us help you capture it instead."
          primaryText="Stop The Bleeding"
          secondaryText="See Case Studies"
          variant="minimal"
        />

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
                We take on <strong className="text-white">3 new infrastructure builds per month</strong>. Current availability for approved partners deploying in <strong className="text-blue-400">Q3 2026</strong>.
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
