
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
          a: "Yes — very close. We use low-latency voice synthesis with natural pacing and intonation. Most callers don't notice they're speaking with AI, and we never misrepresent it if asked."
        },
        {
          q: "What voices and accents do you have?",
          a: "We have a library of 50+ voices: American (Southern, East Coast, Neutral), British, Australian, and Spanish. We'll pick a voice that matches your brand's vibe."
        },
        {
          q: "Can it handle angry customers?",
          a: "Yes. The AI never loses its temper. It's programmed to de-escalate, listen patiently, and apologize sincerely. It then flags the call as 'Urgent' so you can follow up personally."
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
          a: "Yes. We connect with your existing dispatch tools, including ServiceTitan and Housecall Pro. The AI can check real-time availability and write bookings straight to your dispatch board — no manual data entry."
        }
      ]
    },
    {
      name: "Billing & Contracts",
      items: [
        {
          q: "How much does it cost?",
          a: "Starter is $497/mo, Growth is $997/mo, and Enterprise is $1,497/mo. Growth and Enterprise include unlimited minutes; Starter includes 500 AI minutes with transparent per-minute overage. No contracts, no setup fees."
        },
        {
          q: "Is there a long-term contract?",
          a: "Never. We operate month-to-month. We believe we should earn your business every single month. You can cancel anytime with a simple email."
        },
        {
          q: "What happens if I go over my minutes?",
          a: "If you're on the Starter plan, we bill a transparent per-minute rate for anything beyond your 500 included minutes — no surprise charges. Most growing businesses switch to Growth for unlimited minutes."
        },
        {
          q: "How fast do I go live after signing up?",
          a: "Most businesses are answering calls within 48–72 hours. Full optimization — CRM depth, custom scripts, and conversion tuning — continues over the following 2–3 weeks."
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
          <p className="mb-8 text-blue-100">Our founders read every email. Send us a message and we'll reply within one business day.</p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
