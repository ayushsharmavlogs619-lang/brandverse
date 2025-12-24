'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Phone,
  X
} from "lucide-react";



export default function Home() {
  const [calculatorValue, setCalculatorValue] = useState(10);
  // Reduced component set to standard layout

  const avgJobValue = 300;
  const conversionRate = 0.4;
  const monthlyRevenue = Math.round(calculatorValue * avgJobValue * conversionRate * 4);
  const yearlyRevenue = monthlyRevenue * 12;

  const faqs = [
    {
      q: "Does it sound like a robot?",
      a: "Not at all. We use advanced voice synthesis that sounds 99% human. Most callers don't even realize they're talking to an AI. Listen to a demo on our call!"
    },
    {
      q: "How long does setup take?",
      a: "We can have your AI agent live in as little as 48 hours. We handle all the technical setup, script writing, and integration."
    },
    {
      q: "What if the AI doesn't know the answer?",
      a: "The AI is trained on your specific business knowledge. If it encounters a complex situation it can't handle, it can intelligently transfer the call to you or take a detailed message."
    },
    {
      q: "Does it integrate with my calendar?",
      a: "Yes! We integrate with Google Calendar, Outlook, Calendly, ServiceTitan, Housecall Pro, and many others to book appointments directly into your schedule."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">


      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Nebula Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50 mix-blend-screen animate-pulse" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -z-10 opacity-30 mix-blend-screen" />

        <div className="relative max-w-7xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm font-bold backdrop-blur-md hover:bg-white/10 transition-all cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting New Beta Access Clients
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] tracking-tighter">
            Automate Your
            <br />
            <span className="bg-gradient-to-b from-blue-400 via-blue-200 to-blue-600 bg-clip-text text-transparent">
              Inbound Calls
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            The AI Receptionist that sounds human, books jobs, and syncs with your CRM.
            <span className="text-white"> Stop trading time for money.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <Link href="/contact" className="group relative px-10 py-5 bg-white text-black hover:bg-blue-50 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.3)] text-center flex items-center justify-center gap-2">
              Hire Your Agent
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/features" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-xl transition-all border border-white/10 backdrop-blur-sm flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              See Capabilities
            </Link>
          </div>

          <div className="pt-8 text-sm text-slate-500 font-bold uppercase tracking-widest">
            Trusted by 50+ Home Service Businesses
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden relative">
          <div className="flex gap-20 items-center justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['SERVICE', 'TITAN', 'HOUSECALL', 'SALESFORCE', 'HUBSPOT'].map((logo, i) => (
              <span key={i} className="text-2xl font-black text-white italic tracking-tighter">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features - The "High Level" Overview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">The Operational OS</h2>
            <p className="text-xl text-slate-400">Everything you need to remove yourself from the phone lines.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Main Feature - Large */}
            <div className="md:col-span-2 row-span-2 rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 to-slate-900 border border-white/10 p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mb-8">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-4">Human-Level Voice AI</h3>
                  <p className="text-xl text-slate-400 leading-relaxed max-w-md">Our models detect nuance, pauses, and interruptions. 92% of callers believe they are speaking to a real person.</p>
                </div>
                <Link href="/features" className="text-blue-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                  Listen to Demos <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Side feature 1 */}
            <div className="rounded-[2.5rem] bg-[#0b101b] border border-white/10 p-8 flex flex-col justify-between group hover:border-blue-500/30 transition-all">
              <Zap className="w-10 h-10 text-amber-400 mb-4" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Instant Booking</h3>
                <p className="text-slate-400 text-sm">Syncs with Google Cal & Outlook in 200ms.</p>
              </div>
            </div>

            {/* Side feature 2 */}
            <div className="rounded-[2.5rem] bg-[#0b101b] border border-white/10 p-8 flex flex-col justify-between group hover:border-green-500/30 transition-all">
              <ShieldCheck className="w-10 h-10 text-green-400 mb-4" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Spam Filtering</h3>
                <p className="text-slate-400 text-sm">Blocks solicitors and robocalls automatically.</p>
              </div>
            </div>

            {/* Bottom Wide */}
            <div className="md:col-span-3 rounded-[2.5rem] bg-[#0b101b] border border-white/10 p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h3 className="text-3xl font-bold text-white mb-4">Integrates with your stack</h3>
                  <p className="text-slate-400">Connects natively with ServiceTitan, Housecall Pro, Jobber, and 50+ other tools via Zapier.</p>
                </div>
                <div className="flex gap-4 opacity-50">
                  <div className="w-16 h-16 rounded-xl bg-white/5" />
                  <div className="w-16 h-16 rounded-xl bg-white/5" />
                  <div className="w-16 h-16 rounded-xl bg-white/5" />
                  <div className="w-16 h-16 rounded-xl bg-white/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 relative border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Logical Choice
            </h2>
            <p className="text-lg text-slate-400">Why hire a liability when you can rent an asset?</p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-lg font-bold">Feature</th>
                  <th className="p-6 text-center text-slate-400">Human Receptionist</th>
                  <th className="p-6 text-center text-blue-400 bg-blue-500/5">Brandverse AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { f: "Monthly Cost", h: "$3,500+", a: "$497", win: true },
                  { f: "Availability", h: "9 AM - 5 PM", a: "24/7/365", win: true },
                  { f: "Sick Days", h: "14 days/yr", a: "0 days", win: true },
                  { f: "Concurrent Calls", h: "1 at a time", a: "Unlimited", win: true },
                  { f: "Training", h: "4 weeks", a: "Instant", win: true }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-slate-300">{row.f}</td>
                    <td className="p-6 text-center text-slate-500 decoration-slate-600 line-through decoration-2">{row.h}</td>
                    <td className="p-6 text-center font-bold text-white bg-blue-500/5 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]">
                      {row.win ? <span className="text-blue-400">{row.a}</span> : row.a}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px]" />

            <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12">
              Calculate Your Lost Revenue
            </h2>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-xl text-slate-300 font-medium">Weekly Missed Calls</label>
                  <div className="text-6xl font-black text-blue-500">{calculatorValue}</div>
                </div>
                <input
                  type="range"
                  aria-label="Current Monthly Revenue"
                  min="5"
                  max="50"
                  step="1"
                  value={calculatorValue}
                  onChange={(e) => setCalculatorValue(parseInt(e.target.value))}
                  className="w-full h-4 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500 hover:bg-white/10 transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm">
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Monthly Lost Revenue</div>
                  <div className="text-5xl font-black text-white">${monthlyRevenue.toLocaleString()}</div>
                  <div className="text-red-400 text-sm mt-4 font-semibold flex items-center gap-2">
                    <X className="w-4 h-4" /> Donated to Competitors
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-blue-600 border border-blue-400 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                  <div className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-2">Yearly Recoverable</div>
                  <div className="text-5xl font-black text-white">${yearlyRevenue.toLocaleString()}</div>
                  <div className="text-blue-100 text-sm mt-4 font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Yours to keep
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/contact" className="inline-block px-12 py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-slate-200 transition-all hover:scale-105">
                Stop Losing Money Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">Ready to Scale?</h2>
          <p className="text-2xl text-slate-400 max-w-2xl mx-auto">Book a 15-minute demo. We'll show you exactly how to automate your front desk.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/contact" className="inline-block px-12 py-6 bg-blue-600 rounded-3xl text-xl font-black hover:bg-blue-700 transition-all hover:scale-105 shadow-[0_0_60px_rgba(59,130,246,0.5)] text-center text-white">
              📅 Schedule Demo
            </Link>
          </div>
          <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">No Credit Card Required • Live Demo</p>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <Link href="/contact" className="flex w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-lg shadow-2xl shadow-blue-500/50 items-center justify-center gap-3">
          <Phone className="w-5 h-5 fill-current" />
          Book Free Demo
        </Link>
      </div>
    </div>
  );
}
