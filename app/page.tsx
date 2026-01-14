'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MessageCircle,
  Mic,
  Zap,
  Users,
  TrendingUp,
  Briefcase,
  Newspaper,
  ShoppingBag,
  Building2,
  Shield,
  Gauge,
  Code2,
  Unlock,
  ChevronDown,
  Send,
  Phone,
  Calendar,
  Clock,
  Globe,
  BarChart3,
  Target
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProduct, setActiveProduct] = useState<'chatbot' | 'voice'>('chatbot');

  const faqs = [
    {
      q: "How does Brandverse learn from my website?",
      a: "Simply provide your website URL. Our AI crawls your content, documentation, and FAQs to build a comprehensive knowledge base. No manual training required."
    },
    {
      q: "Does the Voice Agent sound robotic?",
      a: "No. We use advanced neural voice technology with ultra-low latency. It handles interruptions, accents, and natural conversation with 99% human parity."
    },
    {
      q: "Can I use both products together?",
      a: "Absolutely. Many businesses use the Chatbot for website visitors and Voice Agent for phone calls—creating a unified AI-powered customer experience."
    },
    {
      q: "How long does setup take?",
      a: "Chatbot: under 10 minutes. Voice Agent: 48-72 hours including custom script training. Both integrate with your existing tools."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-blue-500/30 overflow-x-hidden font-sans">

      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1: HERO - Dual Product
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative pt-28 pb-20 px-6">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/8 blur-[150px] rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-8 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                AI-Powered Customer Engagement
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight tracking-tight">
                AI that talks to your customers.<br />
                <span className="text-slate-400">So you don't have to.</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                AI chatbots. AI voice agents. Paid ads that print money.
                Three weapons. One mission: make you more than you spend on us.
              </p>
            </div>

            {/* ─── PRODUCT TOGGLE ─── */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 rounded-xl bg-white/5 border border-white/10">
                <button
                  onClick={() => setActiveProduct('chatbot')}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${activeProduct === 'chatbot'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  AI Chatbot
                </button>
                <button
                  onClick={() => setActiveProduct('voice')}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${activeProduct === 'voice'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <Mic className="w-4 h-4" />
                  AI Voice Agent
                </button>
              </div>
            </div>

            {/* ─── CHATBOT MOCKUP ─── */}
            <div className={`max-w-2xl mx-auto transition-all duration-500 ${activeProduct === 'chatbot' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
              <div className="bg-[#12121a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    BR
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Brandverse AI Chatbot</div>
                    <div className="text-xs text-green-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Trained on your website
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4 min-h-[200px]">
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-[80%] text-sm">
                      How do I reset my password?
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                      BR
                    </div>
                    <div className="bg-white/5 border border-white/10 text-slate-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%] text-sm leading-relaxed">
                      Go to Settings → Account → Security, then click "Reset Password." You'll receive an email with a reset link within 2 minutes.
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <input
                      type="text"
                      placeholder="Ask your website anything…"
                      className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
                      disabled
                    />
                    <button className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── VOICE AGENT MOCKUP ─── */}
            <div className={`max-w-2xl mx-auto transition-all duration-500 ${activeProduct === 'voice' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
              <div className="bg-[#12121a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">Brandverse Voice Agent</div>
                      <div className="text-xs text-green-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        Call in progress — 02:34
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">LIVE</span>
                  </div>
                </div>

                <div className="p-6 space-y-4 min-h-[200px]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                      C
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 mb-1">Caller</div>
                      <div className="bg-white/5 border border-white/10 text-slate-200 px-4 py-3 rounded-xl text-sm">
                        "Hi, I need to schedule a plumber for tomorrow morning if possible."
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 mb-1">AI Voice Agent</div>
                      <div className="bg-green-600/10 border border-green-500/20 text-slate-200 px-4 py-3 rounded-xl text-sm">
                        "I can help with that. I have openings at 9 AM and 11 AM tomorrow. Which works better for you?"
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-4 h-4" />
                      Checking availability...
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-xs text-slate-500">Availability</div>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">&lt;2s</div>
                      <div className="text-xs text-slate-500">Response</div>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">∞</div>
                      <div className="text-xs text-slate-500">Concurrent</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-base transition-all flex items-center gap-2 shadow-lg shadow-blue-600/25"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="px-8 py-4 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl font-medium text-base transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2: DUAL PRODUCT CARDS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-6">
              Three Ways to 10x Your Revenue
            </h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
              Our clients stay because the math is undeniable. Pick one, two, or all three.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* AI Chatbot Card */}
              <div className="group p-8 rounded-2xl bg-gradient-to-b from-blue-600/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
                  <MessageCircle className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">AI Chatbot</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Trained on your website. Answers questions 24/7. Cuts support tickets by 60%.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Live in 10 minutes", "No coding required", "Captures leads automatically", "Escalates to humans when needed"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* AI Voice Agent Card */}
              <div className="group p-8 rounded-2xl bg-gradient-to-b from-green-600/5 to-transparent border border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-green-600/20 flex items-center justify-center mb-6">
                  <Mic className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">AI Voice Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Picks up every call. Books appointments. Sounds human. Never takes a sick day.
                </p>
                <ul className="space-y-3 mb-8">
                  {["24/7/365 availability", "Syncs with your calendar", "Handles unlimited calls", "Custom voice & scripts"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <Zap className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="inline-flex items-center gap-2 text-green-400 font-medium text-sm hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* SMMA / Paid Ads Card */}
              <div className="group p-8 rounded-2xl bg-gradient-to-b from-purple-600/5 to-transparent border border-purple-500/10 hover:border-purple-500/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Paid Ads (SMMA)</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  We run your Meta, Google & TikTok ads. You pay $1K/mo. You make $6-13K back. It&apos;s that simple.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Meta, Google, TikTok ads", "$1K/mo → $6-13K returns", "You own the ad accounts", "Transparent reporting"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="inline-flex items-center gap-2 text-purple-400 font-medium text-sm hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3: HOW IT WORKS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
              How Brandverse Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                { step: "1", title: "Connect", desc: "Provide your website URL or phone system details. We handle the technical integration." },
                { step: "2", title: "Train", desc: "Our AI learns your content, processes, and brand voice automatically." },
                { step: "3", title: "Deploy", desc: "Go live in minutes. Customers get instant help—you get time back." }
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4: THE PROBLEM
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Every Missed Message Costs Money.
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                { title: "Website visitors", problem: "Can't find answers. Leave frustrated." },
                { title: "Phone calls", problem: "Go to voicemail. Never call back." },
                { title: "Support teams", problem: "Answer the same questions daily." },
                { title: "Your revenue", problem: "Leaks through the cracks 24/7." }
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-white font-medium mb-1">{item.title}</div>
                  <div className="text-slate-500 text-sm">{item.problem}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5: BENEFITS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
              What Changes When You Deploy Brandverse
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "24/7 Availability", desc: "Every question answered. Every call picked up. No holidays, no sick days." },
                { icon: TrendingUp, title: "Higher Conversion", desc: "Instant responses capture leads before they bounce to competitors." },
                { icon: Users, title: "Scalable Support", desc: "Handle 10 or 10,000 conversations without hiring a single person." }
              ].map((card, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                    <card.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6: USE CASES
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
              For Teams Like Yours
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Briefcase, title: "SaaS Companies", desc: "Instant product support via chat & phone." },
                { icon: Building2, title: "Service Businesses", desc: "Book appointments 24/7 without staff." },
                { icon: Newspaper, title: "Content Sites", desc: "Help readers find what they need fast." },
                { icon: ShoppingBag, title: "E-commerce", desc: "Answer shipping, returns, product Qs." }
              ].map((uc, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all text-center group">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-blue-600/10 transition-colors">
                    <uc.icon className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{uc.title}</h3>
                  <p className="text-slate-500 text-sm">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7: COMPARISON TABLE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
              Human Staff vs Brandverse AI
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-5 text-sm font-medium text-slate-400">Metric</th>
                    <th className="p-5 text-sm font-medium text-slate-400 text-center">Human Staff</th>
                    <th className="p-5 text-sm font-medium text-blue-400 text-center">Brandverse AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { metric: "Availability", human: "8-10 hrs/day", ai: "24/7/365" },
                    { metric: "Response Time", human: "Minutes to hours", ai: "Under 2 seconds" },
                    { metric: "Concurrent Capacity", human: "1-2 at a time", ai: "Unlimited" },
                    { metric: "Monthly Cost", human: "$3,000-$5,000+", ai: "From $497/mo" },
                    { metric: "Training Time", human: "Weeks", ai: "Minutes" },
                    { metric: "Consistency", human: "Variable", ai: "Perfect every time" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 font-medium text-white">{row.metric}</td>
                      <td className="p-5 text-center text-slate-500">{row.human}</td>
                      <td className="p-5 text-center text-green-400 font-medium">{row.ai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7B: STATS BANNER
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 border-y border-blue-500/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10M+", label: "Conversations Handled" },
                { value: "99.7%", label: "Uptime Guarantee" },
                { value: "<2s", label: "Avg Response Time" },
                { value: "500+", label: "Businesses Trust Us" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7C: ROI CALCULATOR
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Calculate Your ROI
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                See how much revenue you're leaving on the table with missed conversations.
              </p>
            </div>

            <div className="bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="text-sm text-slate-400 mb-3 block">Monthly Website Visitors</label>
                    <div className="text-4xl font-bold text-white">10,000</div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-3 block">Monthly Missed Calls</label>
                    <div className="text-4xl font-bold text-white">150</div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-3 block">Average Deal Value</label>
                    <div className="text-4xl font-bold text-white">$500</div>
                  </div>
                </div>
                <div className="bg-blue-600/10 rounded-xl p-8 border border-blue-500/20">
                  <h3 className="text-lg font-medium text-blue-400 mb-6">Your Potential Recovery</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Monthly Revenue Lost</div>
                      <div className="text-3xl font-bold text-red-400">$18,000</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Recoverable with Brandverse</div>
                      <div className="text-3xl font-bold text-green-400">$12,600</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Annual Impact</div>
                      <div className="text-4xl font-bold text-white">$151,200</div>
                    </div>
                  </div>
                  <Link href="/contact" className="mt-8 block w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-center rounded-xl font-medium transition-all">
                    Get Your Custom Analysis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7D: INTEGRATIONS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Connects With Your Stack
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Brandverse integrates with the tools you already use. No workflow disruption.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Salesforce", "HubSpot", "Zendesk", "Intercom",
                "Slack", "Google Calendar", "Calendly", "ServiceTitan",
                "Shopify", "WordPress", "Webflow", "Custom API"
              ].map((tool, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 text-center hover:border-blue-500/20 transition-all">
                  <div className="text-slate-300 font-medium">{tool}</div>
                </div>
              ))}
            </div>

            <p className="text-center text-slate-500 mt-8 text-sm">
              Don't see your tool? We build custom integrations.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7E: INDUSTRY SOLUTIONS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Industry-Specific Solutions
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Pre-trained models and workflows for your vertical. Deploy in days, not months.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { industry: "Healthcare & Clinics", features: ["HIPAA-compliant conversations", "Appointment scheduling", "Insurance verification", "Prescription refill requests"] },
                { industry: "Home Services", features: ["Emergency dispatch routing", "Service area qualification", "Quote collection", "Technician scheduling"] },
                { industry: "Real Estate", features: ["Property inquiry handling", "Showing scheduling", "Lead qualification", "Market info delivery"] },
                { industry: "Legal Services", features: ["Initial case screening", "Consultation booking", "Document requests", "Conflict checks"] },
                { industry: "Financial Services", features: ["Account inquiries", "Appointment setting", "Product information", "Compliance-safe responses"] },
                { industry: "Restaurants & Hospitality", features: ["Reservation management", "Menu inquiries", "Event booking", "Wait time updates"] }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                  <h3 className="text-xl font-semibold text-white mb-4">{item.industry}</h3>
                  <ul className="space-y-2">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-400 text-sm">
                        <Zap className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7F: IMPLEMENTATION TIMELINE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Live in 7 Days or Less
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Our proven deployment process gets you operational fast.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { day: "Day 1", title: "Discovery Call", desc: "We map your use case, integrations, and success metrics." },
                { day: "Day 2-3", title: "Content Ingestion", desc: "AI learns your website, docs, scripts, and brand voice." },
                { day: "Day 4-5", title: "Integration Setup", desc: "Connect to your CRM, calendar, and phone system." },
                { day: "Day 6", title: "Testing & Tuning", desc: "Run test scenarios. Refine responses. Verify flows." },
                { day: "Day 7", title: "Go Live", desc: "Flip the switch. Monitor. Scale." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start p-6 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-20 flex-shrink-0">
                    <div className="text-blue-400 font-bold">{step.day}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7G: PRICING
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                No hidden fees. No per-message charges. No surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
                <p className="text-slate-500 text-sm mb-6">For small teams getting started</p>
                <div className="text-4xl font-bold text-white mb-6">$497<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {["AI Chatbot OR Voice Agent", "1 Website / Phone Line", "5,000 messages included", "Email support", "Basic analytics"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <Zap className="w-4 h-4 text-blue-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block w-full py-3 text-center rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
                  Get Started
                </Link>
              </div>

              {/* Growth - Featured */}
              <div className="p-8 rounded-2xl bg-blue-600 border border-blue-400 shadow-lg shadow-blue-600/20 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-blue-600 text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Growth</h3>
                <p className="text-blue-200 text-sm mb-6">For scaling businesses</p>
                <div className="text-4xl font-bold text-white mb-6">$997<span className="text-lg text-blue-200 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {["AI Chatbot + Voice Agent", "3 Websites / Phone Lines", "Unlimited messages", "CRM integrations", "Priority support", "Advanced analytics"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-white text-sm">
                      <Zap className="w-4 h-4" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block w-full py-3 text-center rounded-xl bg-white text-blue-600 font-medium hover:bg-blue-50 transition-all">
                  Get Started
                </Link>
              </div>

              {/* Enterprise */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-slate-500 text-sm mb-6">For large organizations</p>
                <div className="text-4xl font-bold text-white mb-6">Custom</div>
                <ul className="space-y-3 mb-8">
                  {["Everything in Growth", "Unlimited sites & lines", "Custom integrations", "Dedicated account manager", "SLA guarantees", "White-label options"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <Zap className="w-4 h-4 text-blue-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block w-full py-3 text-center rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 8: SEO CONTENT BLOCK
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-invert prose-slate max-w-none">
              <h2 className="text-3xl font-semibold text-white mb-8">
                AI Customer Engagement for Modern Businesses
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Customer expectations have changed. People expect instant answers—whether they're on your website at 2 PM or calling your business at 2 AM. Traditional support models can't keep up without massive overhead.
              </p>

              <h3 className="text-xl font-medium text-white mt-10 mb-4">
                AI Chatbots That Actually Help
              </h3>

              <p className="text-slate-400 leading-relaxed mb-6">
                Brandverse's AI chatbot learns from your existing website content—documentation, FAQs, product pages, blog posts—and makes it all conversationally accessible. Visitors ask questions in natural language and get accurate, contextual answers instantly. No more digging through menus or waiting for email replies.
              </p>

              <h3 className="text-xl font-medium text-white mt-10 mb-4">
                AI Voice Agents That Sound Human
              </h3>

              <p className="text-slate-400 leading-relaxed mb-6">
                For businesses that rely on phone calls—service companies, healthcare practices, real estate agencies—our voice agents handle inbound calls with human-level conversation quality. They book appointments, qualify leads, answer FAQs, and route complex issues to your team. Every call answered, every opportunity captured.
              </p>

              <h4 className="text-lg font-medium text-white mt-8 mb-3">
                One Platform, Complete Coverage
              </h4>

              <p className="text-slate-400 leading-relaxed">
                The power of Brandverse is in the combination. Website visitors get instant chat support. Callers get a professional voice agent. Your team gets detailed insights into every conversation. And you get time back to focus on what matters—growing your business.
              </p>
            </article>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 9: TRUST SIGNALS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Built With Integrity
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                { icon: Shield, text: "Privacy-First: We never train on your customer data." },
                { icon: Gauge, text: "Fast & Lightweight: Adds no performance drag." },
                { icon: Code2, text: "Simple Integration: One snippet or API call." },
                { icon: Unlock, text: "No Lock-In: Export your data anytime." }
              ].map((trust, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-green-600/10 flex items-center justify-center flex-shrink-0">
                    <trust.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">{trust.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 9B: TESTIMONIALS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
              What Our Clients Say
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "We went from missing 40% of after-hours calls to zero. Brandverse paid for itself in the first week.",
                  name: "Marcus Chen",
                  role: "CEO, Pacific Plumbing",
                  metric: "+$12K/mo revenue"
                },
                {
                  quote: "Our support tickets dropped 60% after installing the chatbot. Customers actually prefer it.",
                  name: "Sarah Okonkwo",
                  role: "Head of Support, DevFlow",
                  metric: "60% ticket reduction"
                },
                {
                  quote: "I was skeptical about AI agents. Now I can't imagine running my practice without one.",
                  name: "Dr. James Rivera",
                  role: "Owner, Riverside Dental",
                  metric: "200+ hrs saved/month"
                }
              ].map((t, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-slate-300 leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{t.name}</div>
                      <div className="text-slate-500 text-sm">{t.role}</div>
                    </div>
                    <div className="text-green-400 text-sm font-medium">{t.metric}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 9C: SECURITY & COMPLIANCE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Enterprise-Grade Security
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Your data is protected by industry-leading security practices.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "SOC 2 Type II", desc: "Certified" },
                { label: "HIPAA", desc: "Compliant" },
                { label: "GDPR", desc: "Ready" },
                { label: "256-bit SSL", desc: "Encryption" }
              ].map((badge, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-xl font-bold text-white mb-1">{badge.label}</div>
                  <div className="text-slate-500 text-sm">{badge.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-3">Data Handling</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>• Customer conversations encrypted at rest and in transit</li>
                  <li>• No training on your proprietary data</li>
                  <li>• Optional data residency controls</li>
                  <li>• Automatic PII redaction available</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-3">Access Controls</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>• Role-based access management</li>
                  <li>• SSO/SAML integration</li>
                  <li>• Audit logs for all actions</li>
                  <li>• Regular third-party penetration testing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 9D: CHATBOT FEATURES DEEP DIVE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                  <MessageCircle className="w-3 h-3" />
                  AI Chatbot
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                  Smarter Than a FAQ Page
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Traditional chatbots rely on rigid decision trees. Users click through menus that never quite match their question. Brandverse understands natural language—the way people actually ask questions.
                </p>
                <ul className="space-y-4">
                  {[
                    { title: "Contextual Understanding", desc: "Handles follow-up questions and remembers conversation history." },
                    { title: "Source Attribution", desc: "Shows users exactly where answers come from on your site." },
                    { title: "Smart Escalation", desc: "Knows when to hand off to a human and captures context." },
                    { title: "Lead Capture", desc: "Qualifies visitors and collects info naturally in conversation." }
                  ].map((f, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="w-3 h-3 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{f.title}</div>
                        <div className="text-slate-500 text-sm">{f.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#12121a] rounded-2xl border border-white/10 p-6">
                <div className="space-y-4">
                  <div className="flex justify-end"><div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">What's your refund policy?</div></div>
                  <div className="flex gap-2"><div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0"></div><div className="bg-white/5 text-slate-200 px-4 py-2 rounded-xl text-sm">We offer full refunds within 30 days. Would you like me to start a refund request?</div></div>
                  <div className="flex justify-end"><div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">Yes please</div></div>
                  <div className="flex gap-2"><div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0"></div><div className="bg-white/5 text-slate-200 px-4 py-2 rounded-xl text-sm">I'll need your order number to proceed. You can find it in your confirmation email.</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 9E: VOICE AGENT FEATURES DEEP DIVE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-[#12121a] rounded-2xl border border-white/10 p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">C</div>
                    <div className="bg-white/5 text-slate-200 px-4 py-3 rounded-xl">"Hi, I need to schedule a cleaning for next Tuesday."</div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0"><Mic className="w-4 h-4 text-white" /></div>
                    <div className="bg-green-600/10 border border-green-500/20 text-slate-200 px-4 py-3 rounded-xl">"I can help with that. I see openings at 9 AM and 2 PM on Tuesday. Which works better for you?"</div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">C</div>
                    <div className="bg-white/5 text-slate-200 px-4 py-3 rounded-xl">"2 PM works. Can I also get a quote for deep cleaning?"</div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0"><Mic className="w-4 h-4 text-white" /></div>
                    <div className="bg-green-600/10 border border-green-500/20 text-slate-200 px-4 py-3 rounded-xl">"Absolutely. Deep cleaning for a 3-bedroom home is $250. Should I add that to your Tuesday appointment?"</div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-6">
                  <Mic className="w-3 h-3" />
                  AI Voice Agent
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                  A Receptionist That Never Sleeps
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Every missed call is a missed opportunity. Our voice agents pick up on the first ring, 24/7/365. They sound natural, handle interruptions, and never put callers on hold.
                </p>
                <ul className="space-y-4">
                  {[
                    { title: "Natural Conversation", desc: "Handles accents, interruptions, and multi-part questions." },
                    { title: "Real-Time Booking", desc: "Checks calendar availability and books appointments instantly." },
                    { title: "CRM Integration", desc: "Logs every call with full transcripts and caller details." },
                    { title: "Smart Routing", desc: "Transfers urgent calls to the right person immediately." }
                  ].map((f, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="w-3 h-3 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{f.title}</div>
                        <div className="text-slate-500 text-sm">{f.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION: FREE TOOLS (VALUE-FIRST)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 border border-green-500/20 rounded-full mb-6">
                <span className="text-sm font-medium text-green-400">100% Free • No Card Required</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
                Free Tools to Grow Your Business
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Before you pay us a cent, use these calculators and generators to understand your numbers.
                We're here to help, not to hide value behind paywalls.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: 'Missed Call Calculator',
                  description: 'See exactly how much revenue voicemail is costing you',
                  href: '/tools/missed-call-calculator',
                  icon: '📞',
                  color: 'from-red-500/10 to-orange-500/10',
                  border: 'border-red-500/20'
                },
                {
                  title: 'AI ROI Calculator',
                  description: 'Compare human receptionist costs vs. AI agents',
                  href: '/tools/ai-receptionist-roi-calculator',
                  icon: '🤖',
                  color: 'from-green-500/10 to-emerald-500/10',
                  border: 'border-green-500/20'
                },
                {
                  title: 'Response Time Impact',
                  description: 'Calculate conversion drop from slow lead response',
                  href: '/tools/lead-response-time-calculator',
                  icon: '⚡',
                  color: 'from-orange-500/10 to-yellow-500/10',
                  border: 'border-orange-500/20'
                },
                {
                  title: '24/7 Coverage Cost',
                  description: 'True cost of round-the-clock human staffing',
                  href: '/tools/24-7-coverage-calculator',
                  icon: '🌙',
                  color: 'from-indigo-500/10 to-purple-500/10',
                  border: 'border-indigo-500/20'
                },
                {
                  title: 'Margin Calculator',
                  description: 'See how automation impacts your bottom line',
                  href: '/tools/margin-calculator',
                  icon: '📈',
                  color: 'from-emerald-500/10 to-teal-500/10',
                  border: 'border-emerald-500/20'
                },
                {
                  title: 'Call Script Generator',
                  description: 'Professional scripts for any customer scenario',
                  href: '/tools/call-script-generator',
                  icon: '🎤',
                  color: 'from-blue-500/10 to-cyan-500/10',
                  border: 'border-blue-500/20'
                },
                {
                  title: 'Support Cost Analyzer',
                  description: 'Total cost of ownership for your support team',
                  href: '/tools/customer-service-calculator',
                  icon: '💸',
                  color: 'from-pink-500/10 to-rose-500/10',
                  border: 'border-pink-500/20'
                },
                {
                  title: 'Google Ads ROI',
                  description: 'How conversion rate affects your ad spend returns',
                  href: '/tools/google-ads-roi-calculator',
                  icon: '🎯',
                  color: 'from-yellow-500/10 to-orange-500/10',
                  border: 'border-yellow-500/20'
                }
              ].map((tool, i) => (
                <Link
                  key={i}
                  href={tool.href}
                  className={`group p-6 rounded-2xl bg-gradient-to-br ${tool.color} border ${tool.border} hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/25"
              >
                View All Free Tools <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-slate-500 text-sm mt-4">
                No email required • Use them as many times as you want • Share with your team
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 10: FAQ
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-[#08080c] border-y border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center group"
                  >
                    <span className="text-base font-medium text-white group-hover:text-blue-400 transition-colors pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-blue-400' : 'text-slate-500'
                        }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="px-6 pb-5 text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION: CLIENT ROI PROOF
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-gradient-to-r from-green-600/10 via-transparent to-green-600/10 border-y border-green-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
              Why Clients Stay For Years
            </h2>
            <div className="bg-[#12121a] rounded-2xl border border-white/10 p-8 md:p-12">
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                "I paid Brandverse $1,000/month to run my ads. In return, I made <span className="text-green-400 font-bold">$6,000 to $13,000+ every single month</span>.
                After three months, I stopped asking questions. I just kept paying because the math was undeniable."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-left">
                  <div className="text-white font-semibold">Dr. Anonymous</div>
                  <div className="text-slate-500 text-sm">Dental Practice Owner</div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">$1K</div>
                  <div className="text-slate-500 text-xs">Monthly Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">$6-13K</div>
                  <div className="text-slate-500 text-xs">Monthly Returns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">6-13x</div>
                  <div className="text-slate-500 text-xs">ROI Multiple</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION: BLOG PREVIEW
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                  Latest Insights
                </h2>
                <p className="text-slate-400">Practical guides for business owners who want more customers.</p>
              </div>
              <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-blue-400 font-medium hover:gap-3 transition-all">
                View all articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { slug: "how-ai-boosts-leads", title: "How AI Voice Agents Boost Leads by 200%", category: "Growth" },
                { slug: "ai-voice-roi", title: "The Real ROI of AI Voice Automation", category: "ROI" },
                { slug: "scripts-that-convert", title: "Scripts That Actually Convert Callers", category: "Tactics" },
                { slug: "crm-integration-guide", title: "Complete CRM Integration Guide", category: "Setup" }
              ].map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`} className="group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all">
                  <div className="text-blue-400 text-xs font-medium uppercase tracking-wider mb-3">{post.category}</div>
                  <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors leading-snug">{post.title}</h3>
                </Link>
              ))}
            </div>

            <div className="mt-8 md:hidden text-center">
              <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 font-medium">
                View all articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 11: FINAL CTA
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              Stop Losing Customers to Silence.
            </h2>
            <p className="text-xl text-slate-400">
              Deploy AI that answers every question and picks up every call.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-lg transition-all shadow-lg shadow-blue-600/25"
              >
                Get Started Today
              </Link>
              <Link
                href="/contact"
                className="text-slate-400 hover:text-white transition-colors text-base"
              >
                Talk to Sales →
              </Link>
            </div>
            <p className="text-slate-600 text-sm">
              No credit card required • Live demo available • Setup in minutes
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
