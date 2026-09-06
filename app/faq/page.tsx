
'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from 'next/link';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    {
      name: "Capabilities & Quality",
      items: [
        {
          q: "Does it actually sound human? Be honest.",
          a: "Yes. It sounds 99% human. We use 'ultra-low latency' voice synthesis that includes breaths, pauses, and natural intonation. Most callers just think they're talking to a very sharp dispatcher."
        },
        {
          q: "What voices and accents do you have?",
          a: "We have a library of 50+ professionally cloned voices. American (Southern, East Coast, Neutral), British, Australian, and Spanish. We can pick a voice that perfectly matches your brand's vibe."
        },
        {
          q: "Can it handle angry customers?",
          a: "Surprisingly, yes. The AI never loses its temper. It is programmed to de-escalate situations, listen patiently, and apologize sincerely. It then flags the call as 'Urgent' so you can handle it personally."
        },
        {
          q: "What if the AI makes a mistake?",
          a: "Our agents are programmed with 'Safe Handoff' protocols. If a caller asks something complex or gets frustrated, the AI instantly forwards the call to your personal cell or an emergency backup line. You're always in control."
        },
        {
          q: "Will my customers know it's AI?",
          a: "They might suspect it because it's polite, efficient, and never puts them on hold. But the voice quality is indistinguishable from a human on a slightly grainy cell connection. Most callers just think they're talking to a very sharp dispatcher."
        }
      ]
    },
    {
      name: "Technical & Setup",
      items: [
        {
          q: "Do I need to change my phone number?",
          a: "No. You keep your existing business number. We simply set up 'Conditional Call Forwarding'. If you don't answer after 3 rings, it forwards to us. Or, you can have us answer immediately. You are in full control."
        },
        {
          q: "Does it integrate with ServiceTitan / Housecall Pro?",
          a: "Yes. We have deep native integrations. The AI can look up your real-time availability and inject bookings directly into your dispatch board. No manual data entry required."
        },
        {
          q: "How long does setup take?",
          a: "We move fast. Kickoff to Go-Live is typically 48–72 hours. We build your infrastructure, test it, and hand you the keys."
        },
        {
          q: "Do I need technical skills?",
          a: "No. We handle all the technical implementation. You just provide your business information, service menu, and preferred workflows. We take care of the rest."
        },
        {
          q: "What happens when it cannot answer?",
          a: "The AI is programmed to recognize when it doesn't know the answer. It will either transfer to a human, take a message, or provide a clear next step. It never guesses or makes up information."
        },
        {
          q: "Can it transfer or escalate?",
          a: "Yes. You define escalation rules—emergency calls, VIP customers, specific questions—the AI instantly routes these to your designated staff or your personal phone."
        }
      ]
    },
    {
      name: "Billing & Contracts",
      items: [
        {
          q: "Is there a long-term contract?",
          a: "Never. We operate month-to-month. We believe we should earn your business every single month. You can cancel anytime with a simple email."
        },
        {
          q: "What happens if I go over my minutes?",
          a: "If you're on the Starter plan, we simply bill a small per-minute overage fee (similar to a cell carrier). However, most growing businesses switch to our Unlimited plan to avoid thinking about limits."
        },
        {
          q: "What's your refund policy?",
          a: "We offer a 7-day money-back guarantee. If you're not satisfied within the first 7 days, we'll refund your subscription in full. No questions asked."
        },
        {
          q: "Why not build this myself?",
          a: "You could, but it requires AI engineering, voice integration, CRM connections, ongoing maintenance, and continuous optimization. We've already built and tested the infrastructure. You get the benefit immediately without the development cost and time."
        },
        {
          q: "Why not use a cheaper AI tool?",
          a: "Generic AI tools don't understand your business, your service menu, your pricing, or your customers. We build custom-trained agents specific to your industry, integrated with your existing systems, and optimized for your actual workflows."
        },
        {
          q: "What does Brandverse actually manage?",
          a: "We handle the entire AI infrastructure: voice training, integration with your CRM/calendar, ongoing optimization, monitoring, and support. You focus on running your business; we ensure your AI works perfectly."
        },
        {
          q: "What happens after the system goes live?",
          a: "We monitor performance, analyze call data, and continuously optimize the AI's responses. We also provide regular reports on call volume, lead capture, and areas for improvement."
        }
      ]
    }
  ];

  let chatIndex = 0;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Common Questions</h1>
          <p className="text-xl text-slate-400">Everything you need to know about replacing your front desk with AI.</p>
        </div>

        <div className="space-y-12">
          {categories.map((cat, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/5 pb-2">{cat.name}</h2>
              <div className="space-y-4">
                {cat.items.map((faq, i) => {
                  const index = chatIndex++;
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
                      <button
                        id={`faq-question-${index}`}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                        className="w-full p-6 text-left flex justify-between items-center group focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl"
                      >
                        <span className="text-lg font-bold group-hover:text-blue-400 transition-colors">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                      >
                        <p className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-blue-600 border border-blue-400 text-center text-white">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-8 text-blue-100">Our founders read every email. Sends us a message and we'll reply within an hour.</p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
