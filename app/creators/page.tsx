'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Calendar, Layers, Shield, Zap, TrendingUp,
  Clock, Users, CheckCircle2, FileText, Cpu, ChevronDown,
  ArrowRight, Mail, User, Globe, Building, Lock,
  Sparkles, Star, ArrowUpRight, Phone, Inbox,
  BarChart3, Settings2, BrainCircuit, Workflow
} from 'lucide-react';
import Link from 'next/link';
import { leadService, LeadData } from '../../lib/lead-service';

// ─── Animation Helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65 } },
};
const stagger = (delay = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROBLEMS = [
  { icon: Inbox,       title: 'Inbox overload',           desc: 'Hundreds of messages arrive every day across platforms. Critical opportunities get buried beneath the noise.' },
  { icon: Clock,       title: 'Time-consuming admin',     desc: 'Scheduling, invoicing, coordinating deliverables, and organizing files quietly consume hours that belong to your content.' },
  { icon: FileText,    title: 'Business complexity',      desc: 'Sponsorship contracts, deliverable tracking, and brand communication create a second full-time job.' },
  { icon: Layers,      title: 'Operational disorganization', desc: 'Without structured systems, things fall through the cracks—and fixing them takes more time than it should.' },
  { icon: TrendingUp,  title: 'Growth creates more work',  desc: 'Every new subscriber, partnership, or platform adds pressure. Growth without systems becomes a trap.' },
  { icon: Clock,       title: 'Missed opportunities',      desc: 'When there aren\'t enough hours, valuable partnerships and fan relationships go unattended.' },
];

const SERVICES = [
  { icon: Workflow,    title: 'Creator Operations',       desc: 'End-to-end management of the workflows, checklists, and processes that keep your business running.' },
  { icon: MessageSquare, title: 'Fan Communication',     desc: 'Professional handling of community messages, fan DMs, and inbox management at volume.' },
  { icon: Inbox,       title: 'Inbox Organization',       desc: 'Zero-inbox methodology: triage, categorize, prioritize, and act on every message that matters.' },
  { icon: Settings2,   title: 'Workflow Management',      desc: 'Design and operate production schedules, content pipelines, and operational playbooks.' },
  { icon: FileText,    title: 'Business Organization',    desc: 'Contracts, sponsorships, invoicing, and records — structured, tracked, and never missed.' },
  { icon: Calendar,    title: 'Scheduling',               desc: 'Calendar management, brand call coordination, and deadline tracking across time zones.' },
  { icon: BarChart3,   title: 'Creator Systems',          desc: 'Custom SOPs and documentation that let your business operate consistently as it scales.' },
  { icon: TrendingUp,  title: 'Scaling Support',          desc: 'Structured frameworks designed to grow with you — without burning out or dropping the ball.' },
  { icon: BrainCircuit, title: 'Future AI Automations',   desc: 'Roadmapping and early integration of AI tools to make your operations faster and more intelligent.' },
  { icon: Users,       title: 'Operational Consulting',   desc: 'Strategic review of your current workflows — identifying gaps, building better systems.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Book a discovery call',        desc: 'A focused 30-minute conversation to understand your business, platforms, and where operational weight is holding you back.' },
  { step: '02', title: 'Understand your workflow',     desc: 'We map your existing processes, identify gaps, and document the tools and platforms you rely on.' },
  { step: '03', title: 'Tailored operations plan',     desc: 'We design a custom plan — not a template — specific to your business and the support you actually need.' },
  { step: '04', title: 'Begin onboarding',             desc: 'Secure access protocols, handbook creation, and a structured handover so nothing gets disrupted.' },
  { step: '05', title: 'Continuous optimization',      desc: 'Regular reviews, performance tracking, and ongoing refinement to keep operations running at their best.' },
];

const TRUST_FEATURES = [
  { icon: Lock,         title: 'Strict confidentiality',     desc: 'Every engagement is protected by an NDA. Your account details, metrics, and identity are never disclosed.' },
  { icon: CheckCircle2, title: 'Professional standards',     desc: 'We operate with documentation-first processes, structured communication, and clear accountability.' },
  { icon: MessageSquare, title: 'Transparent communication', desc: 'Weekly summaries, activity logs, and clear escalation protocols keep you fully informed.' },
  { icon: Zap,          title: 'Reliable operations',        desc: 'Consistent execution with defined response times — no dropped balls, no surprises.' },
  { icon: TrendingUp,   title: 'Scalable systems',           desc: 'Every process we build is designed to grow with you — not fall apart the moment volume increases.' },
  { icon: Settings2,    title: 'Flexible support',           desc: 'Your engagement adjusts as your needs change. We grow and adapt alongside your business.' },
  { icon: Users,        title: 'Creator-first mindset',      desc: 'We understand creator businesses. Your audience, brand, and creative output always come first.' },
  { icon: Shield,       title: 'Security by default',        desc: 'Restricted access, secure credential management, and isolated environments protect your accounts.' },
];

const FAQS = [
  { q: 'How do we get started?',               a: 'Book a discovery call. We\'ll spend 30 minutes understanding your business, platforms, and operational challenges. From there, we design a tailored proposal. Once approved, onboarding begins.' },
  { q: 'What types of creators do you work with?', a: 'We work with professional online creators, subscription-based creators, livestream businesses, and independent creator brands generating meaningful audience engagement and operational volume.' },
  { q: 'How does onboarding work?',            a: 'Onboarding takes 3–5 business days. We set up secure access protocols, document your brand voice and communication guidelines, and build your operations handbook before any work begins.' },
  { q: 'How do you protect my privacy?',       a: 'Every engagement is covered by a legally binding NDA. Access is restricted on a need-to-know basis using secure credential management tools. We never discuss client relationships publicly.' },
  { q: 'How is communication handled?',        a: 'We operate under your pre-approved guidelines and tone-of-voice documents. Weekly summaries and activity logs keep you informed without requiring your constant attention.' },
  { q: 'Can support scale as my business grows?', a: 'Yes. Our systems are built to scale. As your volume increases or platforms expand, we adjust the scope of support without disruption to existing operations.' },
  { q: 'What platforms do you support?',       a: 'We work across major platforms including Gmail, YouTube, Instagram, Discord, Patreon, Substack, LinkedIn, and custom CRMs. If you use a specialist platform, we can integrate with it.' },
  { q: 'Do you write messages in my voice?',   a: 'Yes. We build a detailed brand voice handbook from your existing communications. Every response is written to match your tone — not a generic template.' },
  { q: 'What\'s included in creator operations?', a: 'Inbox triage, fan communication workflows, scheduling, content coordination, sponsor management, SOP documentation, and business organization — tailored to your specific setup.' },
  { q: 'Is there a minimum engagement period?', a: 'We structure engagements on a case-by-case basis. Discovery calls are always free. We discuss timelines and flexibility during the onboarding conversation.' },
  { q: 'How do I maintain control of my business?', a: 'You retain full ownership and approval authority over everything. We operate as a delegated support layer — nothing gets actioned without clear guidelines you\'ve approved.' },
  { q: 'What does it cost?',                   a: 'Pricing is customized based on the scope of support required. We discuss this transparently during the discovery call — no hidden fees, no surprises.' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CreatorsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', platform: '', audienceSize: '', website: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const lead: LeadData = {
      full_name: form.name, email: form.email,
      business_type: `Creator Platform: ${form.platform}`,
      service_interest: `Audience: ${form.audienceSize}`,
      website: form.website, message: form.message,
      source_page: 'creators.brandverse.tech',
      source_form: 'creators_strategy_call',
    };
    try {
      const res = await leadService.submitLeadWithRetry(lead, 2);
      if (res.success) {
        setStatus('success');
        setForm({ name: '', email: '', platform: '', audienceSize: '', website: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(res.error || 'Submission failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('An unexpected error occurred.');
    }
  };

  return (
    <div className="bg-[#080808] text-white min-h-screen overflow-x-hidden selection:bg-violet-500/30">

      {/* ── Ambient Glows ─────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute top-[60vh] -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/6 blur-[120px]" />
        <div className="absolute top-[140vh] right-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      {/* ── NAV ──────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl px-5 h-14 shadow-xl shadow-black/20">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight">
                Brandverse <span className="text-white/30 font-normal">Creators</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-white/50">
              {['problem', 'services', 'how-it-works', 'faq', 'contact'].map(id => (
                <a key={id} href={`#${id}`} onClick={scrollTo(id)}
                  className="hover:text-white transition-colors capitalize">
                  {id.replace('-', ' ')}
                </a>
              ))}
            </nav>

            <a href="#contact" onClick={scrollTo('contact')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-all duration-200 active:scale-95">
              Book Strategy Call
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative pt-40 pb-28 px-5 sm:px-8 text-center">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/8 text-violet-300 text-xs font-medium tracking-wide mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Currently accepting new creator partnerships
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[1.04] tracking-tight text-white mb-6"
            >
              We become the trusted{' '}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-300 bg-clip-text text-transparent">
                operations partner
              </span>{' '}
              behind your creator business.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="text-[1.15rem] text-white/50 max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Brandverse provides operational support for growing creator businesses — streamlining communication workflows, organizing day-to-day operations, and building scalable systems so you can focus on exceptional content.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a href="#contact" onClick={scrollTo('contact')}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-[0.95rem] hover:bg-white/92 transition-all duration-200 active:scale-95 shadow-xl shadow-white/10">
                Book Strategy Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#how-it-works" onClick={scrollTo('how-it-works')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-white/70 font-semibold text-[0.95rem] hover:border-white/20 hover:text-white transition-all duration-200">
                See How It Works
              </a>
            </motion.div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 mx-auto max-w-4xl rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur p-10 shadow-2xl shadow-black/40"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Platforms supported', value: '15+' },
                  { label: 'Operations managed', value: 'Daily' },
                  { label: 'Creator-first', value: '100%' },
                  { label: 'NDA-protected', value: 'Always' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-white mb-1">{item.value}</div>
                    <div className="text-xs text-white/35 tracking-wide">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── TRUSTED BY PLACEHOLDER ────────────────────────── */}
        <section className="py-16 px-5 sm:px-8 border-y border-white/[0.05]">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs tracking-widest text-white/25 uppercase font-medium mb-8">
              Trusted by professional creators across platforms
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
              {['YouTube', 'Patreon', 'Twitch', 'Substack', 'OnlyFans', 'Instagram'].map((platform) => (
                <div key={platform} className="text-white/20 text-sm font-semibold tracking-wide hover:text-white/40 transition-colors">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM ──────────────────────────────────────── */}
        <section id="problem" className="py-28 px-5 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="max-w-2xl mb-16">
              <div className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-4">The Problem</div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight tracking-tight text-white mb-5">
                Growth creates operational weight no one warns you about.
              </h2>
              <p className="text-white/45 text-lg leading-relaxed">
                Every new subscriber, partnership, and platform adds complexity. Without the right systems, your creative time evaporates into administration.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROBLEMS.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="group h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg border border-red-500/20 bg-red-500/8 flex items-center justify-center text-red-400 mb-5 group-hover:scale-105 transition-transform">
                      <item.icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-bold text-white text-[0.95rem] mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTION ─────────────────────────────────────── */}
        <section className="py-28 px-5 sm:px-8 border-t border-white/[0.05]">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-4">The Solution</div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight tracking-tight text-white mb-6">
                Spend more time creating. We'll keep everything else moving.
              </h2>
              <p className="text-white/45 text-lg leading-relaxed mb-8">
                Brandverse integrates into your creator business as a trusted operations partner. We design, build, and operate the systems behind the scenes — so your day is spent creating, not managing.
              </p>
              <ul className="space-y-4">
                {[
                  'Custom operational systems built around your workflow',
                  'Professional communication that matches your voice',
                  'Consistent execution you can rely on every day',
                  'Scalable support that grows with your business',
                  'Full transparency — you always know what\'s happening',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/65 text-[0.95rem]">
                    <CheckCircle2 className="w-4.5 h-4.5 text-violet-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 sm:p-10">
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-white/40 font-medium tracking-wide">Operational Overview</span>
                </div>
                <div className="space-y-5">
                  {[
                    { label: 'Inbox managed',         value: 'Daily', color: 'bg-violet-500' },
                    { label: 'Response time',         value: '< 4 hrs', color: 'bg-indigo-500' },
                    { label: 'Systems documented',    value: 'SOPs', color: 'bg-violet-400' },
                    { label: 'Brand voice accuracy',  value: 'Verified', color: 'bg-indigo-400' },
                    { label: 'Privacy protection',    value: 'NDA',  color: 'bg-violet-500' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <div className={`w-1.5 h-1.5 rounded-full ${row.color}`} />
                        {row.label}
                      </div>
                      <div className="text-sm font-semibold text-white">{row.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-center">
                  {[['100%', 'Creator Control'], ['0', 'Dropped Tasks'], ['24/7', 'Operations']].map(([v, l]) => (
                    <div key={l}>
                      <div className="text-xl font-black text-white">{v}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section id="services" className="py-28 px-5 sm:px-8 border-t border-white/[0.05]">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="max-w-2xl mb-16">
              <div className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-4">Services</div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight tracking-tight text-white mb-5">
                Comprehensive operational support.
              </h2>
              <p className="text-white/45 text-lg leading-relaxed">
                Everything your creator business needs to run smoothly — built, operated, and optimized by Brandverse.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {SERVICES.map((s, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="group h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-violet-500/25 hover:bg-violet-500/[0.03] transition-all duration-300 cursor-default">
                    <div className="w-10 h-10 rounded-lg border border-violet-500/20 bg-violet-500/8 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-105 group-hover:border-violet-500/30 transition-all">
                      <s.icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-bold text-white text-[0.9rem] mb-2 tracking-tight leading-snug">{s.title}</h3>
                    <p className="text-white/38 text-[0.82rem] leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="py-28 px-5 sm:px-8 border-t border-white/[0.05]">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="max-w-2xl mb-16">
              <div className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-4">How It Works</div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight tracking-tight text-white mb-5">
                From discovery call to full operations.
              </h2>
              <p className="text-white/45 text-lg leading-relaxed">
                A structured, transparent process — no ambiguity, no surprises.
              </p>
            </FadeIn>

            {/* Desktop timeline */}
            <div className="hidden lg:grid grid-cols-5 gap-5 relative">
              <div className="absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {HOW_IT_WORKS.map((step, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div
                    className={`rounded-xl border p-6 cursor-pointer transition-all duration-400 ${
                      activeStep === i
                        ? 'border-violet-500/30 bg-violet-500/[0.04] shadow-lg shadow-violet-500/5'
                        : 'border-white/[0.06] bg-white/[0.015] hover:border-white/10'
                    }`}
                    onMouseEnter={() => setActiveStep(i)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black font-mono mb-5 transition-all ${
                      activeStep === i ? 'bg-violet-500 text-white' : 'bg-white/5 text-white/40'
                    }`}>
                      {step.step}
                    </div>
                    <h3 className="font-bold text-white text-[0.88rem] mb-2 leading-snug">{step.title}</h3>
                    <p className="text-white/38 text-[0.8rem] leading-relaxed">{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Mobile stack */}
            <div className="lg:hidden space-y-4">
              {HOW_IT_WORKS.map((step, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                    <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xs font-black text-violet-400 shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-[0.9rem] mb-1.5">{step.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST / PRIVACY ──────────────────────────────── */}
        <section id="privacy" className="py-28 px-5 sm:px-8 border-t border-white/[0.05]">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="max-w-2xl mb-16">
              <div className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-4">Trust & Privacy</div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight tracking-tight text-white mb-5">
                Built on confidentiality and professional standards.
              </h2>
              <p className="text-white/45 text-lg leading-relaxed">
                We operate with the integrity and discretion that elite creator businesses demand. Your trust is the foundation of everything we do.
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRUST_FEATURES.map((feat, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="group h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-violet-500/20 hover:bg-violet-500/[0.025] transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg border border-violet-500/15 bg-violet-500/6 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-105 transition-transform">
                      <feat.icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-[0.88rem] mb-2">{feat.title}</h3>
                    <p className="text-white/38 text-[0.82rem] leading-relaxed">{feat.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* NDA callout */}
            <FadeIn delay={0.2}>
              <div className="mt-8 rounded-xl border border-violet-500/15 bg-violet-500/[0.04] p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center text-violet-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">NDA-protected by default</h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    Every Brandverse engagement is covered by a legally binding Non-Disclosure Agreement before any work begins. Your account details, metrics, partnerships, and identity are never disclosed to anyone — full stop.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CALENDAR PLACEHOLDER ─────────────────────────── */}
        <section className="py-20 px-5 sm:px-8 border-t border-white/[0.05]">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <div className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-4">Schedule</div>
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight">Book your strategy call</h2>
              <p className="text-white/40 text-sm mb-8">Direct calendar booking coming soon. In the meantime, use the contact form below.</p>
              <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.015] p-16 flex flex-col items-center gap-3">
                <Calendar className="w-8 h-8 text-white/20" />
                <p className="text-white/25 text-sm font-medium">Calendar integration — coming soon</p>
                <p className="text-white/15 text-xs">Google Calendar / Calendly integration placeholder</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section id="faq" className="py-28 px-5 sm:px-8 border-t border-white/[0.05]">
          <div className="mx-auto max-w-3xl">
            <FadeIn className="text-center mb-16">
              <div className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-4">FAQ</div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-black leading-tight tracking-tight text-white mb-5">
                Frequently asked questions
              </h2>
              <p className="text-white/40 text-lg">Everything you need to know before booking a call.</p>
            </FadeIn>

            <div className="space-y-2">
              {FAQS.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <FadeIn key={i} delay={i * 0.03}>
                    <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      open ? 'border-violet-500/20 bg-violet-500/[0.03]' : 'border-white/[0.05] bg-white/[0.015] hover:border-white/10'
                    }`}>
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={open}
                      >
                        <span className="font-semibold text-[0.93rem] text-white/85 leading-snug">{faq.q}</span>
                        <ChevronDown className={`w-4.5 h-4.5 text-white/30 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-violet-400' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-5 text-white/45 text-[0.88rem] leading-relaxed border-t border-white/[0.05] pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <section id="contact" className="py-28 px-5 sm:px-8 border-t border-white/[0.05]">
          <div className="mx-auto max-w-2xl">
            <FadeIn className="text-center mb-12">
              <div className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-4">Get Started</div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-black leading-tight tracking-tight text-white mb-4">
                Book your strategy call
              </h2>
              <p className="text-white/40 text-lg">
                Tell us about your creator business. We'll review your submission and reach out within 24 hours.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3 h-3" /> Full Name *
                      </label>
                      <input required type="text" placeholder="Your name"
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all" />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Email *
                      </label>
                      <input required type="email" placeholder="you@example.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Platform */}
                    <div className="space-y-2">
                      <label className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <Building className="w-3 h-3" /> Primary Platform
                      </label>
                      <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/[0.08] text-white/75 text-sm focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all cursor-pointer">
                        <option value="">Select platform</option>
                        {['YouTube', 'OnlyFans', 'Patreon', 'Twitch', 'Substack', 'Instagram / TikTok', 'Other'].map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                    {/* Audience */}
                    <div className="space-y-2">
                      <label className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-3 h-3" /> Audience Size
                      </label>
                      <select value={form.audienceSize} onChange={e => setForm({ ...form, audienceSize: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/[0.08] text-white/75 text-sm focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all cursor-pointer">
                        <option value="">Select range</option>
                        {['Under 10k', '10k – 100k', '100k – 500k', '500k – 1M', '1M+'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3 h-3" /> Website or Profile URL
                    </label>
                    <input type="url" placeholder="https://..."
                      value={form.website} onChange={e => setForm({ ...form, website: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all" />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-semibold text-white/40 uppercase tracking-wider">Message</label>
                    <textarea rows={4} placeholder="Describe your current operations challenges and what you're hoping to solve..."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all resize-none" />
                  </div>

                  <button type="submit" disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-[0.93rem] hover:bg-white/92 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
                    {status === 'submitting' ? (
                      <><span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" /> Processing...</>
                    ) : 'Book My Strategy Call'}
                  </button>

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center font-medium">
                        ✓ Submitted successfully. We'll be in touch within 24 hours.
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
                        ✗ {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-12 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">
              Brandverse <span className="text-white/30 font-normal">Creators</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[0.8rem] text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <a href="mailto:ayush@brandverse.tech" className="hover:text-white/60 transition-colors">ayush@brandverse.tech</a>
          </div>

          <div className="text-[0.78rem] text-white/20">
            © 2026 Brandverse. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
