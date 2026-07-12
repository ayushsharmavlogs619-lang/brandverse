'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, MessageSquare, Calendar, Layers, Shield, Lock,
  Clock, Users, CheckCircle2, FileText, Cpu, Sparkles, Mail, User,
  Globe, Building, Inbox, BarChart3, Settings2, BrainCircuit, Workflow,
  TrendingUp, Zap, Star, ArrowUpRight, Phone, Eye, Key, BadgeCheck,
  Headphones, LineChart, LayoutGrid, SlidersHorizontal, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { leadService, LeadData } from '../../lib/lead-service';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

// ─── Animation Primitives ────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

function FadeIn({ children, className = '', delay = 0, direction = 'up' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 24 : 0,
      x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
    },
    show: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.7, delay, ease },
    },
  };
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.07] mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
      <span className="text-[11px] font-semibold text-violet-300 tracking-widest uppercase">{children}</span>
    </div>
  );
}

function SectionHeading({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={`text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[1.06] tracking-tight text-white ${className}`}>
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.05rem] text-white/45 leading-relaxed max-w-xl">{children}</p>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHALLENGES = [
  { icon: Inbox,        color: 'red',    title: 'Message overload',          body: 'Hundreds of fan DMs, emails and platform notifications arrive daily. Without systems, critical ones vanish.' },
  { icon: Clock,        color: 'amber',  title: 'Administrative black hole',  body: 'Scheduling, tracking deliverables and coordinating brands consumes hours that should belong to your content.' },
  { icon: FileText,     color: 'red',    title: 'Business complexity',        body: 'Sponsorships, contracts and brand communication create a full second job on top of your creative work.' },
  { icon: Layers,       color: 'amber',  title: 'Operational disorganization', body: 'Without structure, things fall through the cracks. Fixing them costs more time than it would take to systemize.' },
  { icon: TrendingUp,   color: 'red',    title: 'Growth creates more friction', body: 'Every new follower, platform and partnership adds complexity. Scale without systems becomes a trap.' },
  { icon: BarChart3,    color: 'amber',  title: 'Missed opportunities',       body: 'Partnerships, collaborations and fan relationships go unattended when there aren\'t enough hours in the day.' },
];

const SERVICES = [
  { icon: Workflow,     title: 'Creator Operations',          body: 'End-to-end management of the systems, workflows and processes that keep your creator business running day-to-day.' },
  { icon: MessageSquare,title: 'Communication Support',       body: 'Professional handling of fan DMs, community messages and inbox management at volume — in your voice, on brand.' },
  { icon: Inbox,        title: 'Inbox Organization',          body: 'Triage, categorize, prioritize and respond. Zero-inbox methodology applied to every platform you operate on.' },
  { icon: FileText,     title: 'Business Organization',       body: 'Contracts, sponsorships, invoices and records — structured, tracked and never lost in a cluttered thread.' },
  { icon: Calendar,     title: 'Scheduling & Coordination',   body: 'Calendar management, brand call coordination and deadline tracking across time zones and platforms.' },
  { icon: LayoutGrid,   title: 'Operational Systems',         body: 'Custom SOPs and documentation so your business runs consistently — not dependent on memory or improvisation.' },
  { icon: SlidersHorizontal, title: 'Workflow Optimization',  body: 'We audit, redesign and document your current workflows to eliminate bottlenecks and reduce wasted hours.' },
  { icon: TrendingUp,   title: 'Scaling Support',             body: 'Frameworks built to grow with you. As volume increases, your operations expand without burning out or breaking.' },
  { icon: BrainCircuit, title: 'Future AI Assistance',        body: 'Roadmapping and early integration of AI-assisted tools to make your operations faster and more intelligent over time.' },
];

const HOW_IT_WORKS = [
  { num: '01', title: 'Discovery Call',         body: 'A focused 30-minute conversation to understand your business, platforms and where operational weight is slowing you down.' },
  { num: '02', title: 'Workflow Assessment',    body: 'We map your existing processes, identify inefficiencies and document every tool and platform your business depends on.' },
  { num: '03', title: 'Operations Plan',        body: 'A custom plan — not a template — specific to your business, your voice and exactly the support you need.' },
  { num: '04', title: 'Onboarding',             body: 'Secure access setup, handbook creation and a structured handover. Nothing gets disrupted. Everything gets documented.' },
  { num: '05', title: 'Continuous Improvement', body: 'Regular reviews, performance tracking and ongoing refinement to keep your operations running at their highest level.' },
];

const WHY_BV = [
  { icon: BadgeCheck,  title: 'Professional standards',      body: 'Every engagement runs on documented processes, structured communication and clear accountability.' },
  { icon: Lock,        title: 'Strict confidentiality',      body: 'NDAs before any work begins. Your platforms, metrics and identity are never disclosed to anyone.' },
  { icon: Eye,         title: 'Transparent workflows',       body: 'Weekly summaries, activity logs and clear escalation protocols. You\'re always in the loop.' },
  { icon: Zap,         title: 'Reliable execution',          body: 'Defined response times, zero dropped tasks and consistent delivery — no surprises, no guesswork.' },
  { icon: TrendingUp,  title: 'Scalable systems',            body: 'Every process is built to grow. Volume doubles — operations scale without disruption.' },
  { icon: Settings2,   title: 'Flexible support',            body: 'Your engagement adjusts as your business evolves. We adapt alongside you, not against you.' },
  { icon: Users,       title: 'Creator-first mindset',       body: 'We understand creator businesses because that\'s all we do. Your audience and output always come first.' },
  { icon: Shield,      title: 'Security by default',         body: 'Restricted access, secure credential management and isolated environments protect every account.' },
];

const SECURITY = [
  { icon: Key,    title: 'NDA-protected by default',    body: 'Every engagement begins with a legally binding Non-Disclosure Agreement. Signing happens before any work, access or communication about your business.' },
  { icon: Shield, title: 'Need-to-know access',          body: 'Credentials and account access are managed on a strict need-to-know basis using secure, dedicated password management infrastructure.' },
  { icon: Eye,    title: 'Zero public disclosure',       body: 'We never discuss, reference or acknowledge our creator partnerships publicly. Your identity, your metrics, your business — fully private.' },
  { icon: Lock,   title: 'Isolated environments',        body: 'Every creator engagement operates in a segregated, independent environment. No data commingles between clients.' },
];

const FAQS = [
  { q: 'Who do you work with?',
    a: 'Professional online creators — subscription creators, livestreamers, YouTube channels and independent creator businesses with meaningful audience size and operational complexity.' },
  { q: 'How does onboarding work?',
    a: 'Onboarding takes 3–5 business days. We set up secure access, document your brand voice and communication guidelines and build your operations handbook — before any live work begins.' },
  { q: 'Can support be customized?',
    a: 'Entirely. Every creator business is unique. We customize response timelines, platform delegation, scheduling preferences and operational scope to match your exact setup.' },
  { q: 'How do you protect my privacy?',
    a: 'Every engagement is covered by a legally binding NDA signed before work begins. Access is restricted on a strict need-to-know basis with secure credential management. We never disclose client relationships publicly.' },
  { q: 'How quickly can we get started?',
    a: 'Discovery calls are typically available within a few days. After the call and proposal approval, onboarding begins immediately. Most creators are fully operational within one week.' },
  { q: 'What platforms do you support?',
    a: 'We work across Gmail, YouTube, Instagram, Patreon, Substack, Discord, Twitch, LinkedIn and most major CRM and creator tools. If you use a specialist platform, we can integrate with it.' },
  { q: 'What happens during the discovery call?',
    a: 'We spend 30 minutes learning about your business: what platforms you operate on, where the operational pain is heaviest, your communication preferences and what kind of support would be most valuable.' },
  { q: 'Do I stay in control of my business?',
    a: 'Completely. You retain full ownership and authority over every decision. We operate as a delegated support layer — nothing is actioned without guidelines you\'ve reviewed and approved.' },
  { q: 'Do you write messages in my voice?',
    a: 'Yes. We build a detailed brand voice handbook from your existing content and communication. Every response is written to sound like you — not a generic template.' },
  { q: 'Is there a minimum commitment?',
    a: 'We structure engagements based on what makes sense for your business. Flexibility is discussed openly during the discovery call — no rigid lock-in unless it benefits you.' },
  { q: 'What does "Creator Operations" actually mean?',
    a: 'Inbox triage, fan communication workflows, scheduling, content coordination, sponsorship management, SOP documentation and business organization — the operational side of a creator business, handled professionally.' },
  { q: 'What does it cost?',
    a: 'Pricing is custom-scoped based on your specific requirements. We discuss this transparently during the discovery call. No hidden fees, no surprise charges, no vague packages.' },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

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
        className={`mx-auto max-w-6xl flex items-center justify-between h-13 px-5 rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-[#0a0a0a]/90 backdrop-blur-2xl shadow-2xl shadow-black/40'
            : 'border-white/[0.05] bg-white/[0.02] backdrop-blur-xl'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm text-white tracking-tight">
            Brandverse
            <span className="text-white/30 font-normal ml-1.5">Creators</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {[
            ['challenges', 'Challenges'],
            ['services', 'Services'],
            ['how-it-works', 'How It Works'],
            ['faq', 'FAQ'],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}
              className="text-[13px] font-medium text-white/45 hover:text-white transition-colors duration-200">
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contact" onClick={go('contact')}
          className="group flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-[13px] font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150 shadow-lg shadow-white/10">
          Book Discovery Call
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </motion.nav>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-label="Hero">
      {/* Background glows */}
      <motion.div style={{ y, opacity }} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/[0.07] blur-[160px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-indigo-600/[0.06] blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-violet-400/[0.04] blur-[80px] rounded-full" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.07] mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-violet-300 tracking-widest uppercase">
            Accepting new creator partnerships
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-[1.02] tracking-tight text-white mb-7"
        >
          We become the trusted{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              operations partner
            </span>
            <motion.span
              aria-hidden
              className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
            />
          </span>{' '}
          behind your creator business.
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
          className="text-[1.2rem] text-white/45 max-w-2xl mx-auto leading-relaxed mb-11"
        >
          Brandverse helps creators streamline communication workflows, organize day-to-day operations and build reliable systems so they can focus on producing exceptional content.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <a href="#contact" onClick={go('contact')}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-[0.95rem] hover:bg-white/92 active:scale-95 transition-all duration-150 shadow-2xl shadow-white/[0.08]">
            Book Discovery Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#how-it-works" onClick={go('how-it-works')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-white/60 font-semibold text-[0.95rem] hover:border-white/20 hover:text-white transition-all duration-200">
            Learn How It Works
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.05]"
        >
          {[
            { v: '100%', l: 'Creator Controlled' },
            { v: 'NDA',  l: 'Every Engagement' },
            { v: '< 5',  l: 'Days to Onboard' },
            { v: '15+',  l: 'Platforms Supported' },
          ].map(({ v, l }) => (
            <div key={l} className="bg-white/[0.015] py-7 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1.5">{v}</div>
              <div className="text-[11px] text-white/30 uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Trusted By ───────────────────────────────────────────────────────────────

function TrustedBy() {
  return (
    <section className="py-14 px-5 border-y border-white/[0.04]" aria-label="Platforms">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[10px] tracking-[0.2em] text-white/20 uppercase font-medium mb-8">
          Operational support across all major creator platforms
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14">
          {['YouTube', 'Patreon', 'Twitch', 'Substack', 'Instagram', 'Discord', 'OnlyFans'].map(p => (
            <span key={p} className="text-sm font-semibold text-white/15 hover:text-white/35 transition-colors duration-300 cursor-default">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Creator Challenges ───────────────────────────────────────────────────────

function CreatorChallenges() {
  const colorMap: Record<string, string> = {
    red:   'border-red-500/15 bg-red-500/[0.05] text-red-400',
    amber: 'border-amber-500/15 bg-amber-500/[0.05] text-amber-400',
  };

  return (
    <section id="challenges" className="py-28 px-5 sm:px-8" aria-labelledby="challenges-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-16">
          <SectionLabel>Creator Challenges</SectionLabel>
          <SectionHeading className="mb-5 max-w-2xl" id="challenges-heading">
            Growth creates operational weight no one warns you about.
          </SectionHeading>
          <SectionSub>
            Every new subscriber, partnership and platform adds complexity. Without the right systems, your creative time evaporates into administration.
          </SectionSub>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHALLENGES.map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="group h-full rounded-xl border border-white/[0.06] bg-white/[0.018] p-7 hover:border-white/10 hover:bg-white/[0.035] transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 ${colorMap[item.color]}`}>
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-white text-[0.93rem] mb-2 tracking-tight">{item.title}</h3>
                <p className="text-white/38 text-sm leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Brandverse ───────────────────────────────────────────────────────────

function WhyBrandverse() {
  return (
    <section className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

        {/* Left */}
        <FadeIn direction="left">
          <SectionLabel>Why Brandverse</SectionLabel>
          <SectionHeading className="mb-6" id="why-heading">
            Spend more time creating.{' '}
            <span className="text-white/35">We&apos;ll keep everything else moving.</span>
          </SectionHeading>
          <SectionSub>
            We integrate into your creator business as a trusted operations partner — designing, building and operating the systems behind the scenes.
          </SectionSub>

          <ul className="mt-10 space-y-4">
            {[
              'Custom operational systems built around your exact workflow',
              'Professional communication that sounds exactly like you',
              'Consistent execution you can rely on every single day',
              'Full transparency — weekly summaries, nothing hidden',
              'Scalable support that grows alongside your business',
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="flex items-start gap-3 text-white/60 text-[0.92rem]"
              >
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                {item}
              </motion.li>
            ))}
          </ul>
        </FadeIn>

        {/* Right: feature grid */}
        <FadeIn delay={0.12} direction="right">
          <div className="grid sm:grid-cols-2 gap-3">
            {WHY_BV.map((f, i) => (
              <div key={i} className="group rounded-xl border border-white/[0.06] bg-white/[0.018] p-5 hover:border-violet-500/20 hover:bg-violet-500/[0.025] transition-all duration-300">
                <div className="w-8 h-8 rounded-lg border border-violet-500/15 bg-violet-500/[0.06] flex items-center justify-center text-violet-400 mb-3.5 group-hover:scale-105 transition-transform">
                  <f.icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-[0.85rem] mb-1.5 tracking-tight leading-snug">{f.title}</h3>
                <p className="text-white/35 text-[0.8rem] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel>Services</SectionLabel>
            <SectionHeading id="services-heading">
              Comprehensive operational support.
            </SectionHeading>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Everything your creator business needs to run smoothly — designed, operated and optimized by Brandverse.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.055}>
              <div className="group h-full rounded-xl border border-white/[0.06] bg-white/[0.015] p-7 hover:border-violet-500/25 hover:bg-violet-500/[0.03] transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-xl border border-violet-500/15 bg-violet-500/[0.06] flex items-center justify-center text-violet-400 mb-5 group-hover:scale-[1.08] group-hover:border-violet-500/30 group-hover:bg-violet-500/10 transition-all duration-300">
                  <s.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-white text-[0.92rem] mb-2.5 tracking-tight leading-snug">{s.title}</h3>
                <p className="text-white/38 text-[0.82rem] leading-relaxed">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="hiw-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel>How It Works</SectionLabel>
          <SectionHeading className="mb-5" id="hiw-heading">
            From first call to full operations.
          </SectionHeading>
          <SectionSub>A structured, transparent process — no ambiguity, no surprises.</SectionSub>
        </FadeIn>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          {/* Connector line */}
          <div aria-hidden className="absolute top-8 left-[calc(10%)] right-[calc(10%)] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <div className="grid grid-cols-5 gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={e => e.key === 'Enter' && setActive(i)}
                  className={`relative rounded-xl border p-6 cursor-pointer transition-all duration-300 outline-none ${
                    active === i
                      ? 'border-violet-500/30 bg-violet-500/[0.04] shadow-lg shadow-violet-500/5'
                      : 'border-white/[0.05] bg-white/[0.012] hover:border-white/10'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black font-mono mb-5 transition-all duration-300 ${
                    active === i ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' : 'bg-white/[0.04] text-white/30'
                  }`}>
                    {step.num}
                  </div>
                  <h3 className="font-bold text-white text-[0.86rem] mb-2 leading-snug">{step.title}</h3>
                  <p className="text-white/35 text-[0.78rem] leading-relaxed">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mobile stack */}
        <div className="lg:hidden space-y-3">
          {HOW_IT_WORKS.map((step, i) => (
            <FadeIn key={i} delay={i * 0.09}>
              <div className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-6">
                <div className="w-9 h-9 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xs font-black font-mono text-violet-400 shrink-0 mt-0.5">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-white text-[0.9rem] mb-1.5">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Security & Confidentiality ───────────────────────────────────────────────

function SecuritySection() {
  return (
    <section id="security" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="security-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="max-w-2xl mb-14">
          <SectionLabel>Security & Confidentiality</SectionLabel>
          <SectionHeading className="mb-5" id="security-heading">
            Built on discretion and professional standards.
          </SectionHeading>
          <SectionSub>
            We operate with the integrity that elite creator businesses demand. Protecting your identity, your data and your trust is not optional — it is the foundation of every engagement.
          </SectionSub>
        </FadeIn>

        {/* 4 pillars */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {SECURITY.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group h-full rounded-xl border border-white/[0.06] bg-white/[0.015] p-7 hover:border-violet-500/20 hover:bg-violet-500/[0.025] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl border border-violet-500/15 bg-violet-500/[0.06] flex items-center justify-center text-violet-400 mb-5 group-hover:scale-105 transition-transform">
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-white text-[0.93rem] mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* NDA callout */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.06] to-indigo-500/[0.03] p-8 sm:p-10 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
              <Lock className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="text-xs tracking-widest text-violet-400 uppercase font-semibold mb-2">Standard on every engagement</div>
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">NDA-protected before any work begins.</h3>
              <p className="text-white/45 text-[0.9rem] leading-relaxed max-w-2xl">
                Every Brandverse engagement is covered by a legally binding Non-Disclosure Agreement, signed before any call, access or discussion about your business. Your account details, audience metrics, partnerships and identity are never disclosed — to anyone, ever.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Testimonials Placeholder ─────────────────────────────────────────────────

function TestimonialsPlaceholder() {
  const testimonials = [
    { initials: 'C.M.', platform: 'YouTube Creator', text: 'Having Brandverse handle the operational side of my business completely changed how I work. I create more, stress less.' },
    { initials: 'A.R.', platform: 'Subscription Creator', text: 'The inbox management alone was worth it. I went from drowning in messages to having complete visibility every day.' },
    { initials: 'J.L.', platform: 'Livestream Creator', text: 'Professional, discreet and reliable. They understood my brand voice from week one. Nothing goes missing.' },
  ];

  return (
    <section className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="text-center mb-14">
          <SectionLabel>What Creators Say</SectionLabel>
          <SectionHeading id="testimonials-heading">
            Built for creators who value their time.
          </SectionHeading>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="h-full rounded-xl border border-white/[0.06] bg-white/[0.015] p-7 hover:border-white/10 transition-all duration-300">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
                  ))}
                </div>
                <p className="text-white/60 text-[0.88rem] leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {t.initials.split('.')[0]}
                  </div>
                  <div>
                    <div className="text-[0.82rem] font-semibold text-white">{t.initials}</div>
                    <div className="text-[0.75rem] text-white/30">{t.platform}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <FadeIn className="text-center mb-14">
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading id="faq-heading">Frequently asked questions.</SectionHeading>
          <p className="text-white/40 text-lg mt-4">Everything you need to know before booking a call.</p>
        </FadeIn>

        <div className="space-y-2" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={i} delay={i * 0.025}>
                <div
                  role="listitem"
                  className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                    isOpen ? 'border-violet-500/20 bg-violet-500/[0.03]' : 'border-white/[0.05] bg-white/[0.012] hover:border-white/[0.09]'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-xl"
                  >
                    <span className="font-semibold text-[0.92rem] text-white/82 leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-violet-400' : 'text-white/25'}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 pt-3 text-white/45 text-[0.875rem] leading-relaxed border-t border-white/[0.05]">
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

// ─── Booking / Calendar Placeholder ──────────────────────────────────────────

function BookingPlaceholder() {
  return (
    <section className="py-20 px-5 sm:px-8 border-t border-white/[0.04]" aria-label="Booking">
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn>
          <SectionLabel>Schedule</SectionLabel>
          <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Book your discovery call</h2>
          <p className="text-white/35 text-sm mb-8">
            Direct calendar booking is coming soon. Use the contact form below in the meantime.
          </p>
          <div
            aria-label="Calendly / Google Calendar integration placeholder"
            className="rounded-2xl border border-dashed border-white/[0.07] bg-white/[0.01] p-16 flex flex-col items-center gap-3"
          >
            <Calendar className="w-8 h-8 text-white/15" />
            <p className="text-white/20 text-sm font-medium">Calendly / Google Calendar integration</p>
            <p className="text-white/10 text-xs">Placeholder — will be activated with a URL embed</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', platform: '', audienceSize: '', website: '', message: '',
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
      service_interest: form.audienceSize ? `Audience Size: ${form.audienceSize}` : undefined,
      website: form.website || undefined,
      message: form.message || undefined,
      source_page: 'creators.brandverse.tech',
      source_form: 'creators_discovery_call',
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
      setErrorMsg('An unexpected error occurred. Please try again.');
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200";
  const selectCls = "w-full px-4 py-3 rounded-xl bg-[#111] border border-white/[0.07] text-white/70 text-sm focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200 cursor-pointer";
  const labelCls = "block text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-2";

  return (
    <section id="contact" className="py-28 px-5 sm:px-8 border-t border-white/[0.04]" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-2xl">
        <FadeIn className="text-center mb-12">
          <SectionLabel>Get Started</SectionLabel>
          <SectionHeading className="mb-4" id="contact-heading">
            Book your discovery call.
          </SectionHeading>
          <p className="text-white/40 text-[1.05rem]">
            Tell us about your creator business. We&apos;ll review your submission and be in touch within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur p-8 sm:p-10">
            <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Discovery call request form">
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="c-name" className={labelCls}>Full Name *</label>
                  <input id="c-name" required type="text" placeholder="Your name"
                    value={form.name} onChange={set('name')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="c-email" className={labelCls}>Email Address *</label>
                  <input id="c-email" required type="email" placeholder="you@example.com"
                    value={form.email} onChange={set('email')} className={inputCls} />
                </div>
              </div>

              {/* Platform + Audience */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="c-platform" className={labelCls}>Creator Platform</label>
                  <select id="c-platform" value={form.platform} onChange={set('platform')} className={selectCls}>
                    <option value="">Select platform</option>
                    {['YouTube', 'OnlyFans', 'Patreon', 'Twitch', 'Substack', 'Instagram / TikTok', 'Discord', 'Other'].map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-audience" className={labelCls}>Approximate Audience Size</label>
                  <select id="c-audience" value={form.audienceSize} onChange={set('audienceSize')} className={selectCls}>
                    <option value="">Select range</option>
                    {['Under 10k', '10k – 50k', '50k – 250k', '250k – 1M', '1M+'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Profile URL */}
              <div>
                <label htmlFor="c-website" className={labelCls}>Profile or Website URL</label>
                <input id="c-website" type="url" placeholder="https://..."
                  value={form.website} onChange={set('website')} className={inputCls} />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="c-message" className={labelCls}>Tell us about your business</label>
                <textarea id="c-message" rows={4}
                  placeholder="Describe your current operational challenges and what you're hoping to solve..."
                  value={form.message} onChange={set('message')}
                  className={`${inputCls} resize-none`} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-label="Submit discovery call request"
                className="w-full py-4 rounded-xl bg-white text-black font-semibold text-[0.93rem] hover:bg-white/92 active:scale-[0.99] transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                    Submitting...
                  </>
                ) : "Let's Talk"}
              </button>

              {/* Feedback */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    role="status" aria-live="polite"
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center font-medium">
                    ✓ Submitted. We&apos;ll be in touch within 24 hours.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    role="alert" aria-live="assertive"
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
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-5 sm:px-8" role="contentinfo">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="font-bold text-sm text-white tracking-tight">
            Brandverse <span className="text-white/25 font-normal">Creators</span>
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-[0.78rem] text-white/28" aria-label="Footer navigation">
          <Link href="/privacy" className="hover:text-white/55 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white/55 transition-colors">Terms of Service</Link>
          <a href="mailto:ayush@brandverse.tech" className="hover:text-white/55 transition-colors">
            ayush@brandverse.tech
          </a>
        </nav>

        <div className="text-[0.75rem] text-white/18">
          © {new Date().getFullYear()} Brandverse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────

export default function CreatorsPage() {
  return (
    <div className="bg-[#060606] text-white min-h-screen overflow-x-hidden selection:bg-violet-500/25">
      {/* Global ambient glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-violet-700/[0.06] blur-[180px]" />
        <div className="absolute top-[50vh] -left-60 w-[700px] h-[700px] rounded-full bg-indigo-600/[0.05] blur-[140px]" />
        <div className="absolute top-[130vh] right-0 w-[600px] h-[600px] rounded-full bg-violet-500/[0.04] blur-[120px]" />
      </div>

      <Navbar />

      <main id="main-content">
        <Hero />
        <TrustedBy />
        <CreatorChallenges />
        <WhyBrandverse />
        <Services />
        <HowItWorks />
        <SecuritySection />
        <TestimonialsPlaceholder />
        <FAQ />
        <BookingPlaceholder />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
