'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  { value: 'ai-voice-agents', label: 'AI Voice Agents' },
  { value: 'lead-automation', label: 'Lead Automation' },
  { value: 'appointment-setting', label: 'Appointment Setting' },
  { value: 'customer-support', label: '24/7 Customer Support' },
  { value: 'custom-solution', label: 'Custom Solution' },
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');
    setErrorMessage(null);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      company: String(formData.get('company') ?? ''),
      message: [
        formData.get('service') ? `Service: ${formData.get('service')}` : null,
        String(formData.get('message') ?? '') || null,
      ]
        .filter(Boolean)
        .join('\n\n'),
      source: 'contact-form',
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(typeof data?.error === 'string' ? data.error : 'Submission failed');
      }

      // Best-effort fire-and-forget mirror to formsubmit so email notifications
      // keep flowing while you wire up Supabase email triggers.
      void fetch('https://formsubmit.co/ajax/ayush@brandverse.tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...payload, form_type: 'contact_form' }),
      }).catch(() => {});

      form.reset();
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Submission failed');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
        <h4 className="text-xl font-bold text-emerald-400 mb-2">Message received</h4>
        <p className="text-slate-300">
          Thanks — we&apos;ll be in touch within one business day. For an instant slot, book via Calendly below.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
          <input
            type="text"
            name="company"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Your Company"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="+91 88510 05278"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">What are you looking for?</label>
        <select
          name="service"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          placeholder="Tell us about your business and what you'd like to automate..."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">
          {errorMessage ?? 'Something went wrong. Please email ayush@brandverse.tech directly.'}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
