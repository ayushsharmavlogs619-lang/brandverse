'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  DollarSign,
  Check,
  X,
  ChevronDown,
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe,
  Calendar
} from "lucide-react";

export const metadata = {
  title: 'Brandverse — AI Voice Agents',
  description: '24/7 AI voice agents for contractors and local businesses. Capture more leads, book more jobs, and reduce staffing costs.',
};

export default function Home() {
  const [calculatorValue, setCalculatorValue] = useState(10);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            BRANDVERSE
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors">Process</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
          </div>
          <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
            Book Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
            <Zap className="w-4 h-4 fill-current" />
            <span>24/7 AI Voice Solutions for Contractors</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight">
            Double Your Business,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Half Your Costs
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Stop losing leads to voicemail. Our AI Voice Agents answer <span className="text-blue-400 font-bold">24/7</span>,
            qualify clients, and book appointments while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/contact" className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.3)] text-center">
              Schedule Your Free Demo
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-lg transition-all border border-white/10 backdrop-blur-sm">
              Listen to AI Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">100%</span>
              <span className="text-xs uppercase tracking-widest text-slate-500">Calls Answered</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">2s</span>
              <span className="text-xs uppercase tracking-widest text-slate-500">Pick-up Time</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">200%</span>
              <span className="text-xs uppercase tracking-widest text-slate-500">ROI Increase</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">85%</span>
              <span className="text-xs uppercase tracking-widest text-slate-500">Conversion Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Why Smart Businesses Are Switching
          </h2>

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
                  { f: "Monthly Cost", h: "$3,000 - $4,000", a: "$497", win: true },
                  { f: "Availability", h: "40 hours/week", a: "168 hours (24/7)", win: true },
                  { f: "Capacity", h: "1 call at a time", a: "Unlimited concurrent", win: true },
                  { f: "Training Time", h: "4-6 weeks", a: "Instant", win: true },
                  { f: "Sick Days", h: "10+ per year", a: "Zero. Ever.", win: true },
                  { f: "Attitude", h: "Unpredictable", a: "Always Professional", win: true }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium">{row.f}</td>
                    <td className="p-6 text-center text-slate-500">{row.h}</td>
                    <td className="p-6 text-center font-bold text-white bg-blue-500/5">
                      {row.win ? <span className="text-green-400">{row.a}</span> : row.a}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 px-6 bg-[#03081a]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2.5rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px]" />

            <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12">
              Calculate Your Lost Revenue
            </h2>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-xl text-slate-300 font-medium">Weekly Missed Calls</label>
                  <div className="text-5xl font-black text-blue-400">{calculatorValue}</div>
                </div>
                <input
                  type="range"
                  aria-label="Current Monthly Revenue"
                  min="5"
                  max="50"
                  step="1"
                  value={calculatorValue}
                  onChange={(e) => setCalculatorValue(parseInt(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm">
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Monthly Lost Revenue</div>
                  <div className="text-5xl font-black text-white">${monthlyRevenue.toLocaleString()}</div>
                  <div className="text-red-400 text-sm mt-4 font-semibold flex items-center gap-1">
                    <X className="w-4 h-4" /> Going to competitors
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-blue-600 border border-white/10 shadow-2xl shadow-blue-500/20">
                  <div className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-2">Yearly Lost Revenue</div>
                  <div className="text-5xl font-black text-white">${yearlyRevenue.toLocaleString()}</div>
                  <div className="text-blue-100 text-sm mt-4 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> That we can recover
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/contact" className="inline-block px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all hover:scale-105">
                Stop Losing Money Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-20 underline decoration-blue-500 decoration-8 underline-offset-8">
            How Your AI Employee Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Customer Calls",
                desc: "Your AI answers in 2 rings, 24/7 - even at 3 AM on holidays. Natural conversation that sounds 100% human.",
                icon: Phone
              },
              {
                step: "02",
                title: "AI Qualifies & Books",
                desc: "Asks the right questions, checks availability in your calendar, and books appointments instantly. No back-and-forth.",
                icon: Calendar
              },
              {
                step: "03",
                title: "You Get Paid",
                desc: "Get instant SMS notifications with customer details. Show up, do the job, collect payment. That simple.",
                icon: DollarSign
              }
            ].map((s, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="text-7xl font-black text-white/5 absolute -top-8 -left-2 group-hover:text-blue-500/10 transition-colors uppercase italic">{s.step}</div>
                <div className="mb-6 w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <s.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-[#03081a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Built To Scale Your Business</h2>
            <p className="text-xl text-slate-400">The most powerful AI Voice technology ever built for contractors.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { t: "Multilingual", d: "Fluent in English & Spanish. Capture every lead in your market.", i: Globe },
              { t: "CRM Sync", d: "Instantly pushes leads to ServiceTitan, Housecall Pro, or HubSpot.", i: Zap },
              { t: "Smart Triage", d: "Detects emergencies vs routine calls and prioritizes accordingly.", i: ShieldCheck },
              { t: "Full Transcripts", d: "Read every conversation and listen to recordings instantly.", i: MessageSquare }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#020617] border border-white/5 hover:bg-white/5 transition-all">
                <f.i className="w-10 h-10 text-blue-500 mb-6" />
                <h4 className="text-xl font-bold text-white mb-3">{f.t}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-20">Simple, Transparent Pricing</h2>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-5xl font-black mb-6">$497<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="text-slate-400 space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 24/7 Call Answering</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Appointment Booking</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> SMS Follow-ups</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 500 Minutes Included</li>
              </ul>
              <Link href="/contact" className="block w-full py-4 text-center rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all">Get Started</Link>
            </div>

            {/* Growth */}
            <div className="p-12 rounded-[2.5rem] bg-blue-600 border border-blue-400 relative shadow-2xl shadow-blue-500/40 -translate-y-4">
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-blue-600 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase">Most Popular</div>
              <h3 className="text-2xl font-bold mb-4">Growth</h3>
              <div className="text-6xl font-black mb-6 text-white">$997<span className="text-lg text-blue-200 font-normal">/mo</span></div>
              <ul className="text-blue-50 space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3"><Check className="w-5 h-5" /> <strong>Everything in Starter</strong></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5" /> CRM Integration</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Custom Voice Cloning</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Unlimited Minutes</li>
              </ul>
              <Link href="/contact" className="block w-full py-5 text-center rounded-2xl bg-white text-blue-600 font-black text-lg hover:bg-slate-100 transition-all shadow-xl">Get Started Now</Link>
            </div>

            {/* Enterprise */}
            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-5xl font-black mb-6">Custom</div>
              <ul className="text-slate-400 space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Multi-location Routing</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Account Manager</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> API Access</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> White Label Options</li>
              </ul>
              <Link href="/contact" className="block w-full py-4 text-center rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-[#03081a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className="text-lg font-bold group-hover:text-blue-400 transition-colors">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl md:text-8xl font-black text-white">Ready to Never Miss Another Customer?</h2>
          <p className="text-2xl text-slate-400">Book a 15-minute demo and see your AI Voice Agent live in action.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/contact" className="inline-block px-12 py-6 bg-blue-600 rounded-3xl text-xl font-black hover:bg-blue-700 transition-all hover:scale-105 shadow-[0_0_60px_rgba(59,130,246,0.5)] text-center">
              📅 Schedule Demo Now
            </Link>
          </div>
          <p className="text-slate-500 font-medium tracking-wide italic">&quot;No credit card required • 15-minute call • See real AI calls in action&quot;</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="text-2xl font-black text-white">BRANDVERSE</div>
            <p className="text-slate-500 leading-relaxed">AI-powered solutions specifically designed for Small to Medium Sized Businesses. Transform your operations with intelligent automation.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <div className="space-y-2 text-slate-400">
              <p>ayush@brandverse.tech</p>
              <p>Live Chat Available 24/7</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <div className="space-y-2 text-slate-400">
              <a href="#" className="block hover:text-blue-500">Solutions</a>
              <a href="#" className="block hover:text-blue-500">Case Studies</a>
              <a href="#" className="block hover:text-blue-500">About Us</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <div className="space-y-2 text-slate-400 text-sm">
              <a href="/privacy" className="block hover:text-blue-500">Privacy Policy</a>
              <a href="/terms" className="block hover:text-blue-500">Terms & Conditions</a>
              <p className="pt-4">© 2025 Brandverse AI.</p>
            </div>
          </div>
        </div>
      </footer>

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
