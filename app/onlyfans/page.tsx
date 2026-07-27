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
  HelpCircle,
  Lock,
  DollarSign,
  Rocket
} from 'lucide-react';
import Link from 'next/link';
import { leadService, LeadData } from '../../lib/lead-service';

const FAQS = [
  {
    question: "How does the revenue share work exactly?",
    answer: "You refer your overflow chatting traffic to us. We handle all the DMs — engagement, upselling, PPV drops, renewals. The revenue those subs generate gets split: 50% to you, 50% to us (or 60/40 depending on volume). You keep 100% of your existing income — this is purely new money from subs you couldn't service before."
  },
  {
    question: "Do I need to send you my login credentials?",
    answer: "No. We use secure credential managers (1Password) where you grant delegated access through encrypted vaults. Your password is never shared or visible to our team. You retain full ownership and control of your account at all times."
  },
  {
    question: "How do you protect my privacy and content?",
    answer: "All team members sign legally binding NDAs. We restrict account access to specific verified IPs, never download or store your content outside your official platform, and maintain absolute confidentiality about our client roster. Your brand identity is completely protected."
  },
  {
    question: "What kind of creators do you work with?",
    answer: "We work with creators who have high incoming message volume that they physically cannot keep up with. If you have hundreds of unread DMs, subs complaining about slow replies, or you're spending 6+ hours a day just on chatting — you're a fit. Typically $10k+/mo creators with established traffic."
  },
  {
    question: "How much more could I actually make?",
    answer: "Most creators we partner with see a 40-80% increase in monthly revenue within 60 days. Not from us being better than you — from us being awake and responding when you're sleeping, shooting, or living your life. Every unanswered DM is money left on the table."
  },
  {
    question: "How fast can we start?",
    answer: "We can onboard you in 48-72 hours. Quick discovery call to understand your tone and limits, build your chatting playbook, set up secure access, and start handling overflow. You'll see results in the first week."
  }
];

const SERVICES = [
  {
    title: "Overflow DM Management",
    description: "We handle the subs you can't get to. Your overflow traffic gets professional, on-brand responses that drive engagement and sales.",
    icon: MessageSquare,
    glow: "rgba(99, 102, 241, 0.15)"
  },
  {
    title: "Revenue Share Model",
    description: "No upfront cost. We earn when you earn. 50/50 split on revenue from subs we manage. You keep 100% of your existing income untouched.",
    icon: DollarSign,
    glow: "rgba(16, 185, 129, 0.15)"
  },
  {
    title: "24/7 Chat Coverage",
    description: "Your subs get responses while you sleep. Structured shifts ensure fast reply times across all time zones — no more 'she hasn't replied in 8 hours' complaints.",
    icon: Clock,
    glow: "rgba(6, 182, 212, 0.15)"
  },
  {
    title: "PPV Sales & Upsells",
    description: "We don't just reply — we sell. Trained in your pricing, your vault, and your upselling style to maximize per-subscriber revenue.",
    icon: TrendingUp,
    glow: "rgba(234, 179, 8, 0.15)"
  },
  {
    title: "Personality Matching",
    description: "We study your voice and build a custom playbook. Your subs won't know the difference because the tone, style, and energy match yours exactly.",
    icon: FileText,
    glow: "rgba(168, 85, 247, 0.15)"
  },
  {
    title: "Full Transparency",
    description: "Daily reports on who was chatted with, what was sold, and how much revenue was generated. You're always in the loop with zero surprises.",
    icon: CheckCircle2,
    glow: "rgba(249, 115, 22, 0.15)"
  }
];

const FEATURES = [
  {
    title: "Zero Upfront Cost",
    description: "We only make money when you make money. No monthly retainers, no setup fees — pure performance-based partnership.",
    icon: DollarSign
  },
  {
    title: "Strict Confidentiality",
    description: "Mandatory NDAs for all team members. IP-restricted access. Encrypted credential handover. Your identity and content stay completely secure.",
    icon: Shield
  },
  {
    title: "Scale on Demand",
    description: "Got a viral post and 500 new subs overnight? We scale up instantly. No hiring, no training, no burnout. Your traffic becomes your asset.",
    icon: Rocket
  },
  {
    title: "Proven System",
    description: "We've built and refined our chatting operations across multiple creator accounts. This isn't our first rodeo — the playbook works.",
    icon: CheckCircle2
  },
  {
    title: "You Stay in Control",
    description: "You set the boundaries, the pricing, the limits. We operate within your exact guidelines. Final say is always yours.",
    icon: Lock
  },
  {
    title: "Transparent Reporting",
    description: "Real-time earnings dashboard. Every dollar generated is tracked and reported. No hidden fees, no fuzzy math.",
    icon: Globe
  }
];

export default function OnlyFansLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    revenue: 'Under $10k/mo',
    website: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const leadData: LeadData = {
      full_name: formData.name,
      email: formData.email,
      business_type: 'Creator Platform: OnlyFans',
      service_interest: `Monthly Revenue: ${formData.revenue}`,
      website: formData.website,
      message: formData.message,
      source_page: 'onlyfans.brandverse.tech',
      source_form: 'onlyfans_revshare_contact'
    };

    try {
      const result = await leadService.submitLeadWithRetry(leadData, 2);
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          revenue: 'Under $10k/mo',
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

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">
      
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-transparent blur-[120px]" />
      </div>

      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>BRANDVERSE</span>
              <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">REV SHARE</span>
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
              Apply Now
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-8"
        >
          <DollarSign className="w-3.5 h-3.5" /> Revenue Share Partnership
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.08] mb-8"
        >
          Too many DMs?<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">We handle your chat. Split the revenue.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mb-12"
        >
          You have subs flooding your inbox and you can't keep up. Every unanswered DM is lost income.<br />
          We take over your overflow chatting on a revenue share basis. <span className="text-white font-semibold">You earn. We earn. No upfront cost.</span>
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
            <span>Apply for Rev Share</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            See How It Works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 w-full relative max-w-5xl aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/40 backdrop-blur shadow-2xl flex items-center justify-center p-8 group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-emerald-500/5 to-transparent opacity-60 pointer-events-none" />
          <div className="relative text-center z-10 space-y-4 max-w-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-transform duration-300">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">You Create. We Chat. Both Get Paid.</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              No retainers. No monthly fees. We handle your overflow subscriber DMs and split the new revenue.<br />
              <span className="text-emerald-400 font-semibold">50/50 split. Zero risk. Pure upside.</span>
            </p>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-slate-600 font-mono tracking-wider">
            <span>REVENUE SHARE PARTNERSHIP v1.0</span>
            <span>NO UPFRONT COST</span>
          </div>
        </motion.div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-3 block">The Problem</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            You are leaving money in your DMs.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            You have hundreds of subs paying for access. Some are active in your DMs right now. But you can only reply to so many before you run out of hours in the day. Every message you don't respond to is a missed PPV sale, a missed renewal, a missed tip.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "DM Overflow",
              description: "Hundreds of messages pile up daily. You prioritize what you can and the rest go cold — along with the revenue they would have generated.",
              icon: MessageSquare
            },
            {
              title: "Missed Revenue",
              description: "Every unanswered 'hey' is a missed upsell opportunity. Creators we partner with typically recover $2k-$10k+/mo in uncaptured revenue.",
              icon: DollarSign
            },
            {
              title: "Subscriber Churn",
              description: "Slow reply times = un happy subs. Unhappy subs don't renew. You're losing monthly income simply because you can't be online 24/7.",
              icon: Users
            },
            {
              title: "No Time to Create",
              description: "Hours spent on chatting are hours not spent shooting, editing, or resting. Your content quality drops and your growth slows down.",
              icon: Clock
            },
            {
              title: "Burnout Cycle",
              description: "You sleep with your phone. You cancel plans to keep reply times up. This isn't sustainable and it's costing you more than money.",
              icon: Zap
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

      {/* THE OFFER */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block">The Offer</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              We chat. You collect. 50/50.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Here is how it works: you send your overflow traffic to us. We manage those subs in DMs — engaging, selling PPVs, driving renewals. The revenue those subs generate gets split down the middle.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Your existing income stays untouched. This is purely new money from subscribers you didn't have time to service before. We only make money when you make money.
            </p>

            <ul className="space-y-4 pt-4">
              {[
                "Zero upfront cost — no monthly fees, no retainers",
                "50/50 revenue split on subs we manage",
                "You keep 100% of your existing subscriber income",
                "Full transparency with daily earnings reports"
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-slate-950/60 p-8 md:p-12 overflow-hidden flex flex-col justify-between aspect-square lg:aspect-auto lg:h-[500px]">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> The Math
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">What does this mean for you?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Say you have 50 subs who DM regularly and you can only get to half of them. That's 25 subs generating zero additional revenue beyond their sub fee.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                We handle those 25. At $200/sub/month in DMs/PPVs, that's <span className="text-white font-bold">$5,000/mo in new revenue</span>. Your cut at 50%? <span className="text-emerald-400 font-bold">$2,500/mo</span> for doing nothing.
              </p>
            </div>

            <div className="pt-8 border-t border-white/5 relative z-10 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-black text-white">50%</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Your Split</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">0</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Upfront Cost</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            Full-service DM monetization.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            We don't just reply. We engage, upsell, and maximize every subscriber interaction so your overflow traffic becomes your biggest revenue stream.
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

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            From overflow to income in 3 days.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Getting started is simple. No complex contracts, no long onboarding. Just a quick alignment and we start generating revenue from your overflow traffic.
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-5 gap-6 relative">
          <div className="absolute top-[28px] left-[8%] right-[8%] h-[1px] bg-white/10 -z-10" />

          {[
            { step: "01", title: "Quick Sync", desc: "30-min discovery call. We learn your vibe, your pricing, your boundaries. Simple." },
            { step: "02", title: "Playbook Build", desc: "We create your custom chatting guide — tone, PPV strategy, limits. You approve everything." },
            { step: "03", title: "Secure Handover", desc: "Encrypted credential setup via 1Password. Your password is never exposed." },
            { step: "04", title: "Overflow Redirect", desc: "You route overflow traffic to us. We start handling DMs immediately." },
            { step: "05", title: "Revenue Split", desc: "New revenue rolls in. We track every dollar. You get paid your share weekly." }
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

        <div className="lg:hidden space-y-6">
          {[
            { step: "01", title: "Quick Sync", desc: "30-min discovery call. We learn your vibe, your pricing, your boundaries." },
            { step: "02", title: "Playbook Build", desc: "We create your custom chatting guide — tone, PPV strategy, limits." },
            { step: "03", title: "Secure Handover", desc: "Encrypted credential setup via 1Password. Your password is never exposed." },
            { step: "04", title: "Overflow Redirect", desc: "Route overflow traffic to us. We start handling DMs immediately." },
            { step: "05", title: "Revenue Split", desc: "New revenue rolls in. Tracked transparently. Paid weekly." }
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

      {/* WHY BRANDVERSE */}
      <section id="why-us" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">Why Brandverse</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            A partner, not a contractor.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            We are not a VA agency. We are a revenue partnership. Our incentives are aligned — we only succeed when you do. That changes everything about how we operate.
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

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">Results</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Real numbers from real partnerships
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Here is what happens when creators stop leaving money in their DMs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "I was averaging $8k/mo but knew I was leaving money on the table because I physically couldn't keep up with DMs. After routing my overflow to Brandverse on a 50/50 split, my total monthly revenue went to $14k in 6 weeks. That's $3k in my pocket from subs I was ignoring before.",
              author: "Creator, Top 1%",
              category: "Revenue: $8k → $14k/mo"
            },
            {
              quote: "Security was my biggest worry. I didn't want to share my account with anyone. The 1Password setup was clean — I never shared my actual password. And the rev-share model meant I had zero risk. If they didn't perform, I paid nothing. They performed.",
              author: "Established Creator",
              category: "Top 0.5% Account"
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

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 max-w-4xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about the Brandverse revenue share partnership.
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
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3 block">Apply Now</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Ready to turn overflow into income?
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Fill out the form below. We'll review your account and reach out within 24 hours to set up your discovery call.
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
                  <Building className="w-3.5 h-3.5 text-slate-500" /> Platform
                </label>
                <input
                  type="text"
                  readOnly
                  value="OnlyFans"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm outline-none cursor-default"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-500" /> Monthly Revenue
                </label>
                <select
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 text-sm transition-colors cursor-pointer"
                >
                  <option value="Under $5k/mo">Under $5k/mo</option>
                  <option value="$5k - $20k/mo">$5k - $20k/mo</option>
                  <option value="$20k - $50k/mo">$20k - $50k/mo</option>
                  <option value="$50k+/mo">$50k+/mo</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" /> Profile URL
              </label>
              <input
                type="text"
                placeholder="e.g. onlyfans.com/creatorname"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 text-sm transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Current Overflow Situation</label>
              <textarea
                rows={4}
                placeholder="How many DMs are you missing daily? What's your biggest bottleneck? The more detail the better..."
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
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Apply for Revenue Share</span>
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
                ✓ Application submitted! We'll review and reach out within 24 hours.
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

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t border-white/5 bg-black z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
              <span>BRANDVERSE</span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-medium">REV SHARE</span>
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
