'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Calendar,
  Layers,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  FileText,
  Cpu,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Mail,
  User,
  Globe,
  Plus,
  Play,
  Check,
  Building,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { leadService, LeadData } from '../../lib/lead-service';

// FAQs data
const FAQS = [
  {
    question: "How do we get started?",
    answer: "Getting started is simple. First, book a discovery call using our scheduler. We will jump on a brief call to align on your workflow. From there, we create a custom operations proposal. Once you approve, we begin onboarding your support channel and inbox delegation."
  },
  {
    question: "How does onboarding work?",
    answer: "Onboarding takes about 3 to 5 business days. We set up isolated, secure access protocols for your inbox and creator platforms (using secure tooling like 1Password or delegated logins). We then map your communication guidelines and build a handbook of operational rules so our support flows match your brand voice exactly."
  },
  {
    question: "How do you protect my privacy?",
    answer: "Privacy and confidentiality are our highest priorities. All team members sign comprehensive, legally-binding NDAs. We restrict data access on a strictly need-to-know basis and use secure passwords management tools. We never share, publicize, or discuss creator client relationships without explicit written consent."
  },
  {
    question: "Can support be customized?",
    answer: "Absolutely. Every creator business is unique. We customize everything from your response timelines, platform delegations (e.g. filtering emails vs. direct messages), scheduling preferences, and CRM systems. Your operational plan is fully tailored to your specific channels and preferences."
  },
  {
    question: "What types of creators do you work with?",
    answer: "We work with professional YouTube creators, podcasters, Twitch streamers, content entrepreneurs, educators, and high-growth social media businesses. Typically, our clients have an active, highly-engaged audience and feel overwhelmed by administrative tasks and subscriber communications."
  },
  {
    question: "What platforms do you support?",
    answer: "We support all major business and creator platforms, including Gmail/Google Workspace, Outlook, Discord, Skool, YouTube, Instagram, Patreon, OnlyFans, Substack, LinkedIn, and custom CRM tools. If you use a specialized platform, our processes are flexible enough to integrate with it."
  }
];

// Services data
const SERVICES = [
  {
    title: "Creator Operations",
    description: "End-to-end management of your daily workflows, administrative checkpoints, and operational checklists to keep your business running smoothly behind the scenes.",
    icon: Layers,
    glow: "rgba(99, 102, 241, 0.15)"
  },
  {
    title: "Fan Communication Support",
    description: "Professional management of community engagement, direct messages, and fan feedback loops, ensuring fans feel heard while protecting your personal time.",
    icon: MessageSquare,
    glow: "rgba(6, 182, 212, 0.15)"
  },
  {
    title: "Inbox Organization",
    description: "Zero-Inbox strategy. We triage emails daily, filter spam, prioritize key business proposals, and draft prompt, professional replies to routine queries.",
    icon: Mail,
    glow: "rgba(236, 72, 153, 0.15)"
  },
  {
    title: "Workflow Assistance",
    description: "Drafting production schedules, managing sponsor assets, coordinating with editors, and streamlining video or content delivery pipelines.",
    icon: Clock,
    glow: "rgba(168, 85, 247, 0.15)"
  },
  {
    title: "Business Organization",
    description: "Structuring contracts, tracking sponsorship milestones, keeping invoices organized, and managing client-facing brand materials.",
    icon: FileText,
    glow: "rgba(59, 130, 246, 0.15)"
  },
  {
    title: "Scheduling Support",
    description: "Calendar management, booking sponsor alignment calls, sorting podcast guests, and managing time zones so your creative hours remain uninterrupted.",
    icon: Calendar,
    glow: "rgba(234, 179, 8, 0.15)"
  },
  {
    title: "Growth Systems",
    description: "Setting up lightweight CRMs, structuring brand outreach pipelines, and organizing lead generation for your courses, products, or communities.",
    icon: TrendingUp,
    glow: "rgba(34, 197, 94, 0.15)"
  },
  {
    title: "Operational Processes",
    description: "Standardizing your business with clear SOPs, documentation, and playbooks, ensuring your creator business is ready to scale or hire.",
    icon: CheckCircle2,
    glow: "rgba(249, 115, 22, 0.15)"
  },
  {
    title: "Future AI Automation",
    description: "Co-designing automated workflows and AI-driven assistant tools to automatically structure incoming raw data, messages, and schedules.",
    icon: Cpu,
    glow: "rgba(16, 185, 129, 0.15)"
  }
];

// Why Brandverse features
const FEATURES = [
  {
    title: "Professional Grade",
    description: "We work like an elite startup. Expect clear, documentation-first communication, thorough execution, and structured workflows.",
    icon: CheckCircle2
  },
  {
    title: "Absolute Reliability",
    description: "We operate on guaranteed responsiveness agreements. Your inboxes are checked regularly with zero dropped balls.",
    icon: Zap
  },
  {
    title: "Strict Confidentiality",
    description: "All client data and platform tokens are secured. Team NDAs protect your business, stats, and identity at all times.",
    icon: Shield
  },
  {
    title: "Meticulously Organized",
    description: "We turn chaotic comments and overflowing inboxes into clean, categorized tickets and transparent, actionable summaries.",
    icon: Layers
  },
  {
    title: "Fully Transparent",
    description: "Weekly status updates and shared activity logs mean you always know exactly what operations were performed.",
    icon: Globe
  },
  {
    title: "Creator-First Mindset",
    description: "We understand creators. We know your audience is your lifeblood, and we safeguard that relationship in every conversation.",
    icon: Users
  }
];

export default function CreatorsLandingPage() {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Timeline hover/active step
  const [activeStep, setActiveStep] = useState<number>(0);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: 'YouTube',
    audienceSize: '50k - 250k',
    website: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Format LeadData
    const leadData: LeadData = {
      full_name: formData.name,
      email: formData.email,
      business_type: `Creator Platform: ${formData.platform}`,
      service_interest: `Audience Size: ${formData.audienceSize}`,
      website: formData.website,
      message: formData.message,
      source_page: 'creators.brandverse.tech',
      source_form: 'creator_operations_contact'
    };

    try {
      const result = await leadService.submitLeadWithRetry(leadData, 2);
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          platform: 'YouTube',
          audienceSize: '50k - 250k',
          website: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth scroll helper
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">
      
      {/* Premium Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-transparent blur-[120px]" />
      </div>

      {/* CUSTOM CREATOR NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>BRANDVERSE</span>
              <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">CREATORS</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Brandverse</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-slate-200 text-sm font-semibold transition-all duration-300 shadow-md shadow-white/5 active:scale-95"
            >
              Book Discovery Call
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" /> Operations Partner for Growing Creator Businesses
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.08] mb-8"
        >
          We become a trusted operations partner that helps creators reclaim time, stay organized, and feel supported.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mb-12"
        >
          Brandverse provides professional creator operations support including fan communication workflows, inbox organization, operational assistance, and scalable business systems so creators can focus on creating exceptional content.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md"
        >
          <a
            href="#contact"
            onClick={scrollToContact}
            className="group px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-white/5"
          >
            <span>Book Discovery Call</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            Schedule Strategy Session
          </a>
        </motion.div>

        {/* Premium visual divider graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 w-full relative max-w-5xl aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/40 backdrop-blur shadow-2xl flex items-center justify-center p-8 group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent opacity-60 pointer-events-none" />
          <div className="relative text-center z-10 space-y-4 max-w-xl">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-300">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Structured Creator Support Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We design, organize, and operate your background processes in the shadows, letting your front-of-house talent shine with complete peace of mind.
            </p>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-slate-600 font-mono tracking-wider">
            <span>SECURE Delegation Protocol v1.0</span>
            <span>SYSTEM READY</span>
          </div>
        </motion.div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-3 block">The Friction</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            The creative trap: drowning in your own growth.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            As your audience grows, your business scales in complexity. Suddenly, you aren't just a creator—you're a support agent, inbox manager, billing specialist, and administrator. Here are the bottlenecks dragging down your momentum.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Too Many Messages",
              description: "DMs, sponsor pitches, and fan comments scatter across five platforms. Vital inquiries get lost in the noise.",
              icon: MessageSquare
            },
            {
              title: "Administrative Overload",
              description: "Scheduling alignment calls, sorting contracts, and coordinating deliverables takes hours from your high-value creative zones.",
              icon: Clock
            },
            {
              title: "Creative-Time Drain",
              description: "Every minute spent drafting routine replies or fixing calendar conflicts is a minute you aren't writing, filming, or planning.",
              icon: Layers
            },
            {
              title: "Organization Breakdown",
              description: "Without a structured workflow, tracking sponsor assets and following up on invoices feels chaotic and stressful.",
              icon: FileText
            },
            {
              title: "Scaling Workload",
              description: "The bigger you get, the more messages arrive. Doing it alone means capping your growth or risking deep burnout.",
              icon: TrendingUp
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold block">The Solution</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Reclaim your creative freedom. Maintain full control.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Brandverse steps in as your dedicated operations department. We construct, optimize, and execute communication workflows tailored entirely to your workflow.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We handle the administrative drag, DM triage, and organizational details under your guidelines. You keep final say, approval authority, and 100% ownership of your audience and brand.
            </p>

            <ul className="space-y-4 pt-4">
              {[
                "Secure delegation protocols ensuring data privacy",
                "Custom communication templates tailored to your voice",
                "Scalable business organization tools built to handle sponsor fatigue",
                "Clear Standard Operating Procedures designed for creator businesses"
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-slate-950/60 p-8 md:p-12 overflow-hidden flex flex-col justify-between aspect-square lg:aspect-auto lg:h-[500px]">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                <Shield className="w-3.5 h-3.5 text-indigo-400" /> Operational Control Protocol
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Structured Accountability</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We establish a clear feedback loop. Daily updates, priority alerts for time-sensitive emails, and easy authorization mechanisms keep you fully informed without clogging your headspace.
              </p>
            </div>

            <div className="pt-8 border-t border-white/5 relative z-10 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-black text-white">100%</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Creative Control</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">Zero</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Admin Overhead</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">Operational Services</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            Comprehensive backing for your brand.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            We provide structured operations management across your digital real estate. Choose what you delegate; we build the system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-slate-950/40 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Colored ambient glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-[40px] -z-10"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${service.glow}, transparent 60%)`
                }}
              />

              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 mb-6 group-hover:scale-105 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-300">
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">The Onboarding Plan</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            A seamless transition. Zero interruption.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Integrating an operations partner shouldn't disrupt your workflow. We've designed a structured, phased onboarding process to go from initial sync to fully streamlined operations.
          </p>
        </div>

        {/* Interactive horizontal timeline for desktop / stack for mobile */}
        <div className="hidden lg:grid grid-cols-5 gap-6 relative">
          {/* Connecting line */}
          <div className="absolute top-[28px] left-[8%] right-[8%] h-[1px] bg-white/10 -z-10" />

          {[
            { step: "01", title: "Discovery", desc: "Book a call to review your current channels, workload bottlenecks, and delegation preferences." },
            { step: "02", title: "Audit & Analysis", desc: "We analyze your communication volume and co-design response rules and platform boundaries." },
            { step: "03", title: "Operations Blueprint", desc: "We draft your custom operations handbook, response guidelines, and setup protocols." },
            { step: "04", title: "Secure Onboarding", desc: "Securely link selected platform endpoints using encrypted authentication managers." },
            { step: "05", title: "Ongoing Sync", desc: "Operations launch. We track feedback, refine templates, and optimize daily processes." }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                activeStep === idx
                  ? "bg-slate-950/60 border-indigo-500/30 shadow-lg shadow-indigo-500/5"
                  : "bg-white/[0.01] border-white/5 hover:border-white/10"
              }`}
              onMouseEnter={() => setActiveStep(idx)}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                  activeStep === idx
                    ? "bg-indigo-500 text-white"
                    : "bg-white/5 text-slate-400"
                }`}>
                  {item.step}
                </span>
                {activeStep === idx && (
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                )}
              </div>
              <h3 className="font-bold text-white tracking-tight mb-3">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile timeline view (vertical stack) */}
        <div className="lg:hidden space-y-6">
          {[
            { step: "01", title: "Discovery", desc: "Book a call to review your current channels, workload bottlenecks, and delegation preferences." },
            { step: "02", title: "Audit & Analysis", desc: "We analyze your communication volume and co-design response rules and platform boundaries." },
            { step: "03", title: "Operations Blueprint", desc: "We draft your custom operations handbook, response guidelines, and setup protocols." },
            { step: "04", title: "Secure Onboarding", desc: "Securely link selected platform endpoints using encrypted authentication managers." },
            { step: "05", title: "Ongoing Sync", desc: "Operations launch. We track feedback, refine templates, and optimize daily processes." }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4"
            >
              <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-indigo-400 shrink-0">
                {item.step}
              </span>
              <div>
                <h3 className="font-bold text-white tracking-tight mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BRANDVERSE (Feature Grid / Bento style) */}
      <section id="why-us" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">Why Brandverse</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            An operations department in your corner.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            We are not matching you with generic freelancers. We are an operational partner providing structured oversight, secure password protocols, and standardized processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between aspect-[4/3] group hover:border-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <feat.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS PLACEHOLDER */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Trusted by creators who values time
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Here is how partnering with Brandverse operations transforms independent creator businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "The biggest bottleneck in my business wasn't recording videos, it was sorting through 200 sponsor requests and managing audience interactions on Discord. Brandverse stepped in, set up custom SOPs, and organized my inbox. I reclaimed nearly 15 hours a week and finally have time to breathe.",
              author: "YouTube Creator, 1.8M Subscribers",
              category: "Education & Tech Channel"
            },
            {
              quote: "I was extremely concerned about security and my brand voice when handing over my customer channels. Brandverse set up strict password delegation protocols and spent days matching my tone of voice. Now, my community gets fast, professional responses, and my business operations run like clockwork.",
              author: "Founder & Podcaster",
              category: "120k+ Newsletter Audience"
            }
          ].map((test, idx) => (
            <div
              key={idx}
              className="p-8 md:p-12 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-12 h-12 bg-indigo-500/5 rounded-br-3xl pointer-events-none" />
              <p className="text-slate-300 text-lg italic leading-relaxed mb-8 relative z-10">
                "{test.quote}"
              </p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white tracking-tight">{test.author}</h4>
                  <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">{test.category}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold text-indigo-400">
                  {test.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 md:py-32 px-6 max-w-4xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about partnering with Brandverse Creator Operations.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-white tracking-tight hover:bg-white/[0.02] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 bg-slate-950/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-32 px-6 max-w-4xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">Discovery</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Let's structure your business
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Book a discovery call or send us an operational inquiry below. Let's align on your workflow.
          </p>
        </div>

        <div className="p-8 md:p-12 rounded-3xl bg-slate-950/50 border border-white/10 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 text-sm transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@creatorname.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 text-sm transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" /> Primary Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 text-sm transition-colors cursor-pointer"
                >
                  <option value="YouTube">YouTube</option>
                  <option value="OnlyFans">OnlyFans</option>
                  <option value="Instagram">Instagram / TikTok</option>
                  <option value="Twitch">Twitch</option>
                  <option value="Newsletter / Substack">Newsletter / Substack</option>
                  <option value="Other">Other / Multiple Platforms</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" /> Monthly Audience Size
                </label>
                <select
                  value={formData.audienceSize}
                  onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 text-sm transition-colors cursor-pointer"
                >
                  <option value="Under 50k">Under 50k monthly active</option>
                  <option value="50k - 250k">50k - 250k monthly active</option>
                  <option value="250k - 1M">250k - 1M monthly active</option>
                  <option value="1M+">1M+ monthly active</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" /> Profile Link or Website
              </label>
              <input
                type="text"
                placeholder="e.g. youtube.com/c/creatorname"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 text-sm transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Message / Bottlenecks</label>
              <textarea
                rows={4}
                placeholder="Describe your current setup and what tasks you would love to delegate..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 text-sm transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-white text-black hover:bg-slate-200 font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-slate-600 border-t-black animate-spin" />
                    <span>Analyzing Request...</span>
                  </>
                ) : (
                  <>
                    <span>Let's Talk</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center font-semibold"
              >
                ✓ Discovery request submitted! We will analyze your channels and email you within 24 hours.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-semibold"
              >
                ✗ {errorMessage}
              </motion.div>
            )}
          </form>
        </div>
      </section>

      {/* MINIMAL PREMIUM FOOTER */}
      <footer className="py-16 px-6 border-t border-white/5 bg-black z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
              <span>BRANDVERSE</span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-medium">CREATORS</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-8 justify-center text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <a href="mailto:ayush@brandverse.tech" className="hover:text-slate-300 transition-colors">ayush@brandverse.tech</a>
          </div>

          <div className="text-xs text-slate-600 text-center md:text-right font-mono">
            <span>© 2026 Brandverse AI. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
