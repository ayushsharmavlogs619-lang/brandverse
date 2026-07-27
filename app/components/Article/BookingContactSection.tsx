'use client';

import { config } from '@/lib/config';
import LeadForm from '../LeadForm';
import { Calendar } from 'lucide-react';

interface BookingContactSectionProps {
  businessType: string;
  industry: string;
}

export default function BookingContactSection({ businessType, industry }: BookingContactSectionProps) {
  return (
    <>
      <section className="space-y-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-10 rounded-3xl border border-blue-500/30 text-center">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Book a Free Strategy Call</h2>
        <p className="text-slate-300 font-medium text-lg max-w-xl mx-auto">
          Ready to see how Brandverse AI can help your {industry} business capture more leads, book more appointments, and save thousands every month?
        </p>
        <a
          href={config.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/25"
        >
          Schedule Your Free Call <Calendar className="w-4 h-4" />
        </a>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Get In Touch</h2>
        <p className="text-slate-400 leading-8 text-lg">
          Have questions? Want a custom demo tailored to your {industry} business? Fill out the form below and our team will reach out within 24 hours.
        </p>
        <LeadForm
          sourceForm="blog-article"
          businessType={businessType}
          serviceInterest={`${industry} AI Voice Agent`}
          className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
            />
            <input
              name="company"
              placeholder="Business Name"
              className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
            />
          </div>
          <textarea
            name="message"
            placeholder="Tell us about your business and what you're looking for..."
            rows={4}
            className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm resize-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/25"
          >
            Send Message
          </button>
        </LeadForm>
      </section>
    </>
  );
}
