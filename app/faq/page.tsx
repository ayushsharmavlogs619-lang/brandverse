import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'FAQ — Brandverse',
  description: 'Common questions about onboarding, integrations, compliance, and pricing for Brandverse AI agents.',
};

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: 'How long does onboarding take?', a: 'Onboarding is typically 3–7 days for small businesses; enterprise setups can take longer depending on integrations.' },
    { q: 'Do you record calls?', a: 'Yes, recordings and transcripts are available to customers for training and compliance; recordings are stored securely.' },
    { q: 'Which CRMs do you support?', a: 'We support ServiceTitan, Housecall Pro, HubSpot, and can integrate with most platforms via API or Zapier.' },
    { q: 'What about legal compliance?', a: 'We help customers comply with TCPA/GDPR requirements and provide controls for consent and opt-outs.' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">BRANDVERSE</Link>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
          </div>
          <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">Book Demo</Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-slate-400 mb-8">Answers to common questions about onboarding, privacy, pricing, and integrations.</p>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center">
                <span className="text-lg font-bold">{f.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === i ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-6 pt-0 text-slate-400 border-t border-white/5">{f.a}</div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 text-slate-400">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p>Contact our team for a detailed walkthrough and a tailored ROI estimate.</p>
          <Link href="/contact" className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold">Get in touch</Link>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="text-2xl font-black text-white">BRANDVERSE</div>
            <p className="text-slate-500 leading-relaxed">AI-powered solutions specifically designed for Small to Medium Sized Businesses.</p>
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
              <Link href="/about" className="block hover:text-blue-500">About</Link>
              <Link href="/services" className="block hover:text-blue-500">Services</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <div className="space-y-2 text-slate-400 text-sm">
              <Link href="/privacy" className="block hover:text-blue-500">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-blue-500">Terms & Conditions</Link>
              <p className="pt-4">© 2025 Brandverse AI.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
