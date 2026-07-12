'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, MessageSquare, Calendar, Layers, Shield, Lock,
  Clock, Users, CheckCircle2, FileText, Sparkles, Mail, User,
  Globe, Building, Inbox, BarChart3, Settings2, BrainCircuit, Workflow,
  TrendingUp, Zap, Eye, Key, BadgeCheck, Star, Heart,
  LayoutGrid, SlidersHorizontal, Headphones, LineChart, UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { leadService, LeadData } from '../../lib/lead-service';

/* ═══════════════════════════════════════════════════════════════════════════════
   ANIMATION PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const;

function FadeIn({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 24 : 0,
        x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
      <span className="text-[11px] font-semibold text-violet-300 tracking-[0.15em] uppercase">{children}</span>
    </div>
  );
}

function Heading({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <h2 id={id} className={`text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[1.06] tracking-tight text-white ${className}`}>
      {children}
    </h2>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════════ */

const REALITY_CARDS = [
  { icon: Inbox,      title: 'Messages never stop',                body: 'Hundreds of DMs, emails and notifications flood in daily across every platform — burying the messages that actually matter.' },
  { icon: TrendingUp, title: 'Your business keeps growing',        body: 'More followers means more partnerships, more deliverables, more coordination. Growth should feel exciting — not exhausting.' },
  { icon: Layers,     title: 'Operations become chaotic',           body: 'Without structured systems, everything runs on memory and impulse. Things slip through cracks that didn\'t exist six months ago.' },
  { icon: Clock,      title: 'Admin steals creative time',         body: 'Scheduling, invoicing, contract review and inbox management quietly consume the hours that belong to your content.' },
  { icon: Heart,      title: 'Every hour counts',                   body: 'Every hour organizing spreadsheets is an hour not spent creating, collaborating or connecting with your audience.' },
];

const SERVICES = [
  { icon: Workflow,          title: 'Creator Operations',          body: 'End-to-end management of the systems and processes that keep your creator business running day-to-day.' },
  { icon: MessageSquare,     title: 'Communication Workflows',     body: 'Structured fan interaction handling — DMs, comments and community messages processed in your voice, on brand.' },
  { icon: Inbox,             title: 'Inbox Organization',          body: 'Zero-inbox methodology across every platform. Triage, categorize, prioritize and act on what matters.' },
  { icon: FileText,          title: 'Business Organization',       body: 'Sponsorships, invoices, contracts and brand deliverables — tracked, structured and never missed.' },
  { icon: Calendar,          title: 'Scheduling Support',          body: 'Calendar management, brand call coordination and deadline tracking across platforms and time zones.' },
  { icon: SlidersHorizontal, title: 'Workflow Optimization',       body: 'We audit your current processes, eliminate bottlenecks and rebuild them to save you real hours every week.' },
  { icon: TrendingUp,        title: 'Growth Infrastructure',       body: 'Operational frameworks designed to scale as your audience and partnerships grow — without growing your workload.' },
  { icon: LayoutGrid,        title: 'Operational Systems',         body: 'Custom SOPs and documentation so your business runs on systems — not on your memory.' },
  { icon: Users,             title: 'Confidential Team Support',   body: 'Discreet, NDA-protected team members who understand creator businesses and handle sensitive operations.' },
  { icon: UserCheck,         title: 'Creator CRM',                 body: 'Organized tracking of brand relationships, partnership history and collaboration pipelines.' },
  { icon: LineChart,         title: 'Performance Reporting',       body: 'Clear operational summaries so you always know what\'s happening behind the scenes without having to ask.' },
  { icon: BrainCircuit,      title: 'Future AI Assistance',        body: 'Early integration of intelligent automation tools to make your operational workflows faster over time.' },
];

const WHY_BV = [
  { icon: BadgeCheck,  word: 'Professional',  body: 'Documented processes, structured communication and clear accountability on every engagement.' },
  { icon: Zap,         word: 'Reliable',      body: 'Defined response times, zero dropped tasks and consistent delivery. No surprises.' },
  { icon: LayoutGrid,  word: 'Organized',     body: 'Systems built for clarity. Everything tracked, structured and accessible.' },
  { icon: Lock,        word: 'Confidential',  body: 'NDA-protected by default. Your identity, metrics and business stay fully private.' },
  { icon: Eye,         word: 'Transparent',   body: 'Weekly summaries, activity logs and open communication. You\'re always in the loop.' },
  { icon: Settings2,   word: 'Flexible',      body: 'Your engagement evolves alongside your business. We adapt as your needs change.' },
  { icon: TrendingUp,  word: 'Scalable',      body: 'Every process built to grow. Volume doubles — operations scale without disruption.' },
  { icon: Heart,       word: 'Creator-first', body: 'We understand creator businesses because that\'s all we do. Your creative output comes first.' },
];

const HOW_STEPS = [
  { num: '01', title: 'Discovery Call',       body: 'A focused conversation to understand your business, your platforms and where the operational weight is heaviest.' },
  { num: '02', title: 'Workflow Review',      body: 'We map every existing process, identify gaps and document the tools and platforms your business depends on.' },
  { num: '03', title: 'Operations Strategy',  body: 'A custom plan built for your specific business — not a template, not a one-size-fits-all package.' },
  { num: '04', title: 'Onboarding',           body: 'Secure access setup, brand voice documentation and structured handover. Nothing disrupted. Everything documented.' },
  { num: '05', title: 'Ongoing Support',      body: 'Continuous execution, regular reviews and ongoing optimization to keep operations at their best.' },
];

const FAQS = [
  { q: 'Who do you work with?',
    a: 'Professional online creators — subscription creators, livestreamers, cosplayers, fitness creators, models, influencers, gaming creators and independent digital entrepreneurs with meaningful audience engagement.' },
  { q: 'How do we get started?',
    a: 'Book a discovery call. We\'ll spend 30 minutes understanding your business, your platforms and your operational challenges. From there we design a custom proposal. Once approved, onboarding begins.' },
  { q: 'Can support be customized?',
    a: 'Entirely. Every creator business is unique. We customize response timelines, platform delegation, scheduling preferences, communication style and operational scope to match your exact setup.' },
  { q: 'How do you protect my privacy?',
    a: 'Every engagement begins with a legally binding NDA. Access is restricted on a strict need-to-know basis using secure credential management. We never disclose client relationships publicly — ever.' },
  { q: 'Can my workflow change over time?',
    a: 'Absolutely. Creator businesses evolve. We conduct regular reviews and adjust your operational plan as your platforms, audience and workload change. Flexibility is built into every engagement.' },
  { q: 'What creator platforms do you support?',
    a: 'YouTube, Patreon, Twitch, OnlyFans, Fansly, Instagram, TikTok, Discord, Substack, Twitter/X, Kick, LinkedIn and most major CRM and creator tools. If you use a specialist platform, we can integrate with it.' },
  { q: 'What happens during the discovery call?',
    a: 'We learn about your business: what platforms you operate on, where the operational pain is heaviest, your communication preferences and what kind of support would be most valuable. No sales pitch — just understanding.' },
  { q: 'Do I stay in control of my business?',
    a: 'Completely. You retain full ownership and authority over every decision. We operate as a delegated support layer — nothing is actioned without guidelines you\'ve reviewed and approved.' },
  { q: 'Do you write messages in my voice?',
    a: 'Yes. We build a detailed brand voice handbook from your existing content and communications. Every message sounds like you — not a generic template.' },
  { q: 'How quickly can we get started?',
    a: 'Discovery calls are typically available within a few days. After proposal approval, onboarding begins immediately. Most creators are fully operational within one week.' },
  { q: 'Is there a minimum commitment?',
    a: 'We structure engagements based on what makes sense for your business. Flexibility is discussed during the discovery call — no rigid lock-in contracts unless it benefits you.' },
  { q: 'What does it cost?',
    a: 'Pricing is custom-scoped to your specific requirements. We discuss this transparently during the discovery call. No hidden fees, no surprise charges, no vague packages.' },
  { q: 'What does "Creator Operations" actually mean?',
    a: 'The operational side of running a creator business: inbox triage, fan communication workflows, scheduling, content coordination, sponsorship management, SOP documentation and business organization — handled professionally.' },
  { q: 'What if I only need help with one area?',
    a: 'That\'s completely fine. Many creators start with inbox management or scheduling support and expand as they see the impact. We\'ll design your engagement around exactly what you need right now.' },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        aria-label="Main navigation"
        className={`mx-auto max-w-6xl flex items-center justify-between h-14 px-5 rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-[#0a0a0a]/90 backdrop-blur-2xl shadow-2xl shadow-black/40'
            : 'border-white/[0.05] bg-white/[0.02] backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm text-white tracking-tight">
            Brandverse<span className="text-white/30 font-normal ml-1.5">for Creators</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {[['services', 'Services'], ['how-it-works', 'Process'], ['confidentiality', 'Trust'], ['faq', 'FAQ']].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}
              className="text-[13px] font-medium text-white/40 hover:text-white transition-colors">{label}</a>
          ))}
        </nav>

        <a href="#contact" onClick={go('contact')}
          className="group flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-[13px] font-semibold hover:bg-white/90 active:scale-95 transition-all shadow-lg shadow-white/10">
          Book Discovery Call
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </motion.nav>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════════ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Animated background */}
      <motion.div style={{ y: bgY, opacity: fade }} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-violet-600/[0.06] blur-[180px] rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-[500px] h-[400px] bg-indigo-600/[0.05] blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-fuchsia-500/[0.03] blur-[90px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-violet-300 tracking-[0.15em] uppercase">Accepting new creator partnerships</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          className="text-[clamp(2.8rem,7.5vw,6rem)] font-black leading-[1.02] tracking-tight text-white mb-7"
        >
          Operations behind{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              exceptional creators.
            </span>
            <motion.span aria-hidden
              className="absolute -bottom-1.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.8, ease }} />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="text-[clamp(1rem,2vw,1.2rem)] text-white/42 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Brandverse partners with growing creator businesses to streamline communication workflows, organize day-to-day operations, and build reliable systems that allow creators to focus on creating exceptional content.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <a href="#contact" onClick={go('contact')}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold text-[0.95rem] hover:bg-white/92 active:scale-[0.97] transition-all shadow-2xl shadow-white/[0.07]">
            Book Discovery Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#how-it-works" onClick={go('how-it-works')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/55 font-semibold text-[0.95rem] hover:border-white/20 hover:text-white transition-all">
            See How We Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.65, ease }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.05] bg-white/[0.03]"
        >
          {[
            { v: '100%', l: 'Creator Controlled' },
            { v: 'NDA',  l: 'Every Engagement' },
            { v: '< 5 days', l: 'To Fully Onboard' },
            { v: '15+',  l: 'Platforms Supported' },
          ].map(({ v, l }) => (
            <div key={l} className="bg-[#0a0a0a]/60 py-8 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1.5">{v}</div>
              <div className="text-[10px] text-white/25 uppercase tracking-[0.18em]">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PLATFORM STRIP
   ═══════════════════════════════════════════════════════════════════════════════ */

function PlatformStrip() {
  return (
    <section className="py-14 px-5 border-y border-white/[0.04]" aria-label="Supported platforms">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[10px] tracking-[0.2em] text-white/18 uppercase font-medium mb-8">
          Operational support across major creator platforms
        </p>
        <div className="flex flex-wrap justify-center items-center gap-7 sm:gap-14">
          {['YouTube', 'Patreon', 'OnlyFans', 'Twitch', 'Kick', 'Instagram', 'TikTok', 'Discord', 'Substack'].map(p => (
            <span key={p} className="text-sm font-semibold text-white/12 hover:text-white/30 transition-colors duration-300 cursor-default">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   THE REALITY OF RUNNING A CREATOR BUSINESS
   ═══════════════════════════════════════════════════════════════════════════════ */

function RealitySection() {
  return (
    <section id="challenges" className="py-28 px-5 sm:px-8" aria-labelledby="reality-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="max-w-2xl mb-16">
          <Label>The Reality</Label>
          <Heading id="reality-heading" className="mb-5">
            The side of creator businesses{' '}
            <span className="text-white/30">nobody talks about.</span>
          </Heading>
          <p className="text-[1.05rem] text-white/42 leading-relaxed max-w-xl">
            Your audience sees the content. Behind the scenes, there&apos;s an entire business to run — and it only gets heavier as you grow.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REALITY_CARDS.map((c, i) => (
            <FadeIn key={i} delay={i * 0.07} className={i === 4 ? 'lg:col-span-1 md:col-span-2 lg:col-span-1' : ''}>
              <div className="group h-full rounded-2xl border border-white/[0.05] bg-white/[0.015] p-8 hover:border-white/[0.09] hover:bg-white/[0.03] transition-all duration-300">
                <div className="w-11 h-11 rounded-xl border border-red-500/15 bg-red-500/[0.05] flex items-center justify-center text-red-400/80 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <c.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-[1rem] mb-2.5 tracking-tight">{c.title}</h3>
                <p className="text-white/35 text-[0.85rem] leading-relaxed">{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   WHAT BRANDVERSE DOES — SERVICES
   ═══════════════════════════════════════════════════════════════════════════════ */

function ServicesSection() {
  return (
    <section id="services" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <Label>What Brandverse Does</Label>
            <Heading id="services-heading">
              Everything your creator business needs to run{' '}
              <span className="text-white/30">without running you down.</span>
            </Heading>
          </div>
          <p className="text-white/35 text-sm leading-relaxed max-w-xs lg:text-right">
            Built, operated and optimized by a team that only works with creators.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="group h-full rounded-xl border border-white/[0.05] bg-white/[0.012] p-6 hover:border-violet-500/20 hover:bg-violet-500/[0.025] transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-xl border border-violet-500/15 bg-violet-500/[0.05] flex items-center justify-center text-violet-400 mb-5 group-hover:scale-[1.08] group-hover:bg-violet-500/10 transition-all duration-300">
                  <s.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-white text-[0.88rem] mb-2 tracking-tight leading-snug">{s.title}</h3>
                <p className="text-white/33 text-[0.8rem] leading-relaxed">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   WHY CREATORS WORK WITH BRANDVERSE
   ═══════════════════════════════════════════════════════════════════════════════ */

function WhySection() {
  return (
    <section className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <Label>Why Creators Choose Us</Label>
          <Heading id="why-heading" className="mb-5">
            Why creators work with Brandverse.
          </Heading>
          <p className="text-white/40 text-[1.05rem] leading-relaxed">
            Because creator businesses deserve operational standards that match the quality of their content.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_BV.map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="group h-full rounded-xl border border-white/[0.05] bg-white/[0.012] p-6 text-center hover:border-violet-500/20 hover:bg-violet-500/[0.025] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl border border-violet-500/12 bg-violet-500/[0.05] flex items-center justify-center text-violet-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <div className="text-sm font-bold text-white mb-2 tracking-tight">{item.word}</div>
                <p className="text-white/32 text-[0.8rem] leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   YOUR CREATOR BUSINESS DESERVES BETTER OPERATIONS
   ═══════════════════════════════════════════════════════════════════════════════ */

function DeservesBetter() {
  const items = [
    { title: 'More structure',            body: 'Documented processes, clear playbooks and repeatable systems — so your business runs consistently without constant oversight.' },
    { title: 'Better organization',       body: 'Every message, contract, deliverable and deadline tracked and organized. Nothing falls through the cracks.' },
    { title: 'Less operational stress',   body: 'Delegate the work that drains your energy. Show up for the creative work that matters.' },
    { title: 'Reliable support',          body: 'A dedicated operations partner who understands your business, your voice and your audience — not a revolving door of freelancers.' },
    { title: 'Professional systems',      body: 'SOPs, brand voice guides, communication handbooks — the same operational infrastructure used by the most organized creators in the world.' },
    { title: 'Focus on what you create',  body: 'Every hour we free up is an hour you get to spend creating, collaborating and growing your audience.' },
  ];

  return (
    <section className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="deserves-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <Label>Better Operations</Label>
          <Heading id="deserves-heading" className="mb-6">
            Your creator business deserves{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">better operations.</span>
          </Heading>
          <p className="text-white/40 text-[1.1rem] leading-relaxed">
            You built something real. It deserves infrastructure that matches the quality of your work.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="group h-full rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-500/[0.03] to-transparent p-8 hover:border-violet-500/15 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-violet-400 mb-5" />
                <h3 className="font-bold text-white text-[1rem] mb-3 tracking-tight">{item.title}</h3>
                <p className="text-white/38 text-[0.85rem] leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   HOW WE WORK
   ═══════════════════════════════════════════════════════════════════════════════ */

function HowWeWork() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="max-w-2xl mb-16">
          <Label>How We Work</Label>
          <Heading id="how-heading" className="mb-5">
            From first call to full operations.
          </Heading>
          <p className="text-white/40 text-[1.05rem] leading-relaxed max-w-xl">
            A structured, transparent process. No ambiguity. No surprises.
          </p>
        </FadeIn>

        {/* Desktop */}
        <div className="hidden lg:block relative">
          <div aria-hidden className="absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="grid grid-cols-5 gap-4">
            {HOW_STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  role="button" tabIndex={0} aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                  className={`relative rounded-xl border p-6 cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                    active === i
                      ? 'border-violet-500/25 bg-violet-500/[0.04] shadow-lg shadow-violet-500/5'
                      : 'border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black font-mono mb-5 transition-all duration-300 ${
                    active === i ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'bg-white/[0.04] text-white/25'
                  }`}>
                    {step.num}
                  </div>
                  <h3 className="font-bold text-white text-[0.85rem] mb-2 leading-snug">{step.title}</h3>
                  <p className="text-white/32 text-[0.78rem] leading-relaxed">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden space-y-3">
          {HOW_STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex gap-4 rounded-xl border border-white/[0.05] bg-white/[0.012] p-6">
                <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xs font-black font-mono text-violet-400 shrink-0 mt-0.5">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-white text-[0.9rem] mb-1.5">{step.title}</h3>
                  <p className="text-white/38 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONFIDENTIALITY
   ═══════════════════════════════════════════════════════════════════════════════ */

function Confidentiality() {
  return (
    <section id="confidentiality" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="conf-heading">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <Label>Confidentiality</Label>
          <Heading id="conf-heading" className="mb-5">
            Your privacy is not negotiable.
          </Heading>
          <p className="text-white/40 text-[1.05rem] leading-relaxed">
            Creator businesses require absolute discretion. We treat your privacy with the same care you put into building your brand.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Lock,   title: 'NDA on every engagement',      body: 'Legally binding agreements signed before any work begins. Your business details never leave our engagement.' },
            { icon: Key,    title: 'Restricted access',             body: 'Credentials managed on a strict need-to-know basis with dedicated, secure password management infrastructure.' },
            { icon: Eye,    title: 'Zero public disclosure',        body: 'We never reference, acknowledge or discuss our creator partnerships publicly. Your identity stays private.' },
            { icon: Shield, title: 'Isolated environments',         body: 'Every creator engagement runs in a fully segregated environment. No data commingles between clients.' },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group rounded-2xl border border-white/[0.05] bg-white/[0.012] p-8 hover:border-violet-500/15 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl border border-violet-500/12 bg-violet-500/[0.05] flex items-center justify-center text-violet-400 mb-5 group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-[0.95rem] mb-2.5">{item.title}</h3>
                <p className="text-white/38 text-[0.85rem] leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Trust banner */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-violet-500/12 bg-gradient-to-br from-violet-500/[0.05] to-indigo-500/[0.02] p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-xl bg-violet-500/12 border border-violet-500/18 flex items-center justify-center text-violet-400 shrink-0">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white mb-2 tracking-tight">Creator trust is the foundation of everything we do.</h3>
              <p className="text-white/42 text-[0.9rem] leading-relaxed max-w-2xl">
                We don&apos;t just protect your data — we protect your reputation, your relationships and your peace of mind. Every process, every team member and every interaction is built around the understanding that your trust must be earned and never compromised.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════════════════ */

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <FadeIn className="text-center mb-14">
          <Label>FAQ</Label>
          <Heading id="faq-heading">Questions creators ask.</Heading>
          <p className="text-white/38 text-lg mt-4">Everything you need to know before booking a discovery call.</p>
        </FadeIn>

        <div className="space-y-2" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={i} delay={i * 0.02}>
                <div
                  role="listitem"
                  className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                    isOpen ? 'border-violet-500/18 bg-violet-500/[0.03]' : 'border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08]'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-xl"
                  >
                    <span className="font-semibold text-[0.9rem] text-white/78 leading-snug">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-violet-400' : 'text-white/22'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 pt-3 text-white/42 text-[0.86rem] leading-relaxed border-t border-white/[0.04]">
                          {faq.a}
                        </p>
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
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   BOOKING PLACEHOLDER
   ═══════════════════════════════════════════════════════════════════════════════ */

function BookingPlaceholder() {
  return (
    <section className="py-20 px-5 sm:px-8 border-t border-white/[0.04]" aria-label="Booking">
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn>
          <Label>Schedule</Label>
          <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Book your discovery call</h2>
          <p className="text-white/32 text-sm mb-8">Direct calendar booking coming soon. Use the form below in the meantime.</p>
          <div className="rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.008] p-16 flex flex-col items-center gap-3">
            <Calendar className="w-8 h-8 text-white/12" />
            <p className="text-white/18 text-sm font-medium">Calendly integration — coming soon</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════════════════════════════ */

function ContactSection() {
  const [form, setForm] = useState({
    name: '', email: '', platform: '', audienceSize: '', website: '', challenge: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('submitting');
    const lead: LeadData = {
      full_name: form.name,
      email: form.email,
      business_type: form.platform ? `Creator Platform: ${form.platform}` : undefined,
      service_interest: [
        form.audienceSize ? `Audience: ${form.audienceSize}` : '',
        form.challenge ? `Challenge: ${form.challenge}` : '',
      ].filter(Boolean).join(' | ') || undefined,
      website: form.website || undefined,
      message: form.message || undefined,
      source_page: 'creators.brandverse.tech',
      source_form: 'creators_discovery_call',
    };
    try {
      const res = await leadService.submitLeadWithRetry(lead, 2);
      if (res.success) {
        setStatus('success');
        setForm({ name: '', email: '', platform: '', audienceSize: '', website: '', challenge: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(res.error || 'Submission failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('An unexpected error occurred.');
    }
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-white/[0.035] border border-white/[0.06] text-white text-sm placeholder-white/18 focus:outline-none focus:border-violet-500/35 focus:ring-1 focus:ring-violet-500/15 transition-all";
  const selectCls = "w-full px-4 py-3.5 rounded-xl bg-[#0e0e0e] border border-white/[0.06] text-white/65 text-sm focus:outline-none focus:border-violet-500/35 focus:ring-1 focus:ring-violet-500/15 transition-all cursor-pointer";
  const labelCls = "block text-[10px] font-semibold text-white/30 uppercase tracking-[0.18em] mb-2";

  return (
    <section id="contact" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-2xl">
        <FadeIn className="text-center mb-12">
          <Label>Get Started</Label>
          <Heading id="contact-heading" className="mb-4">
            Book your strategy call.
          </Heading>
          <p className="text-white/38 text-[1.05rem]">
            Tell us about your creator business. We&apos;ll review your submission and reach out within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.018] backdrop-blur p-8 sm:p-10">
            <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Strategy call request">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="f-name" className={labelCls}>Full Name *</label>
                  <input id="f-name" required type="text" placeholder="Your name"
                    value={form.name} onChange={set('name')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="f-email" className={labelCls}>Email *</label>
                  <input id="f-email" required type="email" placeholder="you@example.com"
                    value={form.email} onChange={set('email')} className={inputCls} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="f-platform" className={labelCls}>Creator Platform</label>
                  <select id="f-platform" value={form.platform} onChange={set('platform')} className={selectCls}>
                    <option value="">Select platform</option>
                    {['YouTube', 'OnlyFans', 'Fansly', 'Patreon', 'Twitch', 'Kick', 'Substack', 'Instagram / TikTok', 'Discord', 'Other'].map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="f-audience" className={labelCls}>Audience Size</label>
                  <select id="f-audience" value={form.audienceSize} onChange={set('audienceSize')} className={selectCls}>
                    <option value="">Select range</option>
                    {['Under 10k', '10k – 50k', '50k – 250k', '250k – 1M', '1M+'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="f-website" className={labelCls}>Website or Profile URL</label>
                <input id="f-website" type="url" placeholder="https://..."
                  value={form.website} onChange={set('website')} className={inputCls} />
              </div>

              <div>
                <label htmlFor="f-challenge" className={labelCls}>Current Biggest Challenge</label>
                <input id="f-challenge" type="text" placeholder="e.g. inbox management, scheduling, workflow organization..."
                  value={form.challenge} onChange={set('challenge')} className={inputCls} />
              </div>

              <div>
                <label htmlFor="f-message" className={labelCls}>Message</label>
                <textarea id="f-message" rows={4}
                  placeholder="Tell us anything else about your business and what you're looking for..."
                  value={form.message} onChange={set('message')} className={`${inputCls} resize-none`} />
              </div>

              <button type="submit" disabled={status === 'submitting'}
                className="w-full py-4 rounded-xl bg-white text-black font-semibold text-[0.93rem] hover:bg-white/92 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {status === 'submitting' ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" /> Submitting...</>
                ) : 'Book My Strategy Call'}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    role="status" className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/18 text-emerald-400 text-sm text-center font-medium">
                    ✓ Submitted. We&apos;ll be in touch within 24 hours.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    role="alert" className="p-4 rounded-xl bg-red-500/10 border border-red-500/18 text-red-400 text-sm text-center font-medium">
                    ✗ {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════════ */

function CreatorsFooter() {
  return (
    <footer className="border-t border-white/[0.04] py-14 px-5 sm:px-8" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">
              Brandverse<span className="text-white/22 font-normal ml-1.5">for Creators</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-[0.78rem] text-white/25" aria-label="Footer">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            <a href="mailto:creators@brandverse.tech" className="hover:text-white/50 transition-colors">creators@brandverse.tech</a>
          </nav>

          <p className="text-[0.72rem] text-white/15">© {new Date().getFullYear()} Brandverse. All rights reserved.</p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.03] text-center">
          <p className="text-[0.72rem] text-white/12 max-w-xl mx-auto leading-relaxed">
            Brandverse is a creator operations company. We provide operational support services for professional content creators and digital entrepreneurs.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function CreatorsPage() {
  return (
    <div className="bg-[#060606] text-white min-h-screen overflow-x-hidden selection:bg-violet-500/25">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-violet-700/[0.05] blur-[180px]" />
        <div className="absolute top-[50vh] -left-60 w-[700px] h-[700px] rounded-full bg-indigo-600/[0.04] blur-[140px]" />
        <div className="absolute top-[140vh] right-0 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
      </div>

      <Navbar />

      <main id="main-content">
        <Hero />
        <PlatformStrip />
        <RealitySection />
        <ServicesSection />
        <WhySection />
        <DeservesBetter />
        <HowWeWork />
        <Confidentiality />
        <FaqSection />
        <BookingPlaceholder />
        <ContactSection />
      </main>

      <CreatorsFooter />
    </div>
  );
}
