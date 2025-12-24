
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
          a: "Yes. It sounds 99% human. We use 'ultra-low latency' voice synthesis that includes breaths, pauses, and natural intonation. We've had clients tell us their own mothers couldn't tell the difference. You have to hear it to believe it."
        },
        {
          q: "What voices and accents do you have?",
          a: "We have a library of 50+ professionally cloned voices. American (Southern, East Coast, Neutral), British, Australian, and Spanish. We can pick a voice that perfectly matches your brand's vibe."
        },
        {
          q: "Can it handle angry customers?",
          a: "Surprisingly, yes. The AI never loses its temper. It is programmed to de-escalate situations, listen patiently, and apologize sincerely. It then flags the call as 'Urgent' so you can handle it personally."
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
              <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/5 pb-2">{cat.name}</h3>
              <div className="space-y-4">
                {cat.items.map((faq, i) => {
                  const index = chatIndex++;
                  return (
                    <div key={index} className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full p-6 text-left flex justify-between items-center group"
                      >
                        <span className="text-lg font-bold group-hover:text-blue-400 transition-colors">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`transition-all duration-300 overflow-hidden ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
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
