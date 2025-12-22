import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Pricing — Brandverse',
  description: 'Simple, transparent pricing for AI voice agents — Starter, Growth, and Enterprise plans to fit your business.',
};

export default function PricingPage() {
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

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-4">Pricing</h1>
        <p className="text-slate-400 mb-8">Transparent plans built to deliver ROI — pick a plan or contact us for a tailored enterprise solution.</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
            <h3 className="text-2xl font-bold mb-4">Starter</h3>
            <div className="text-4xl font-black mb-4">$497<span className="text-sm text-slate-400">/mo</span></div>
            <ul className="text-slate-400 space-y-3 mb-6 text-left">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 24/7 Call Answering</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Appointment Booking</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 500 Minutes Included</li>
            </ul>
            <Link href="/contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold">Get Started</Link>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-blue-600 border border-blue-400 relative shadow-2xl shadow-blue-500/40 text-center -translate-y-4">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-blue-600 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase">Most Popular</div>
            <h3 className="text-2xl font-bold mb-4">Growth</h3>
            <div className="text-5xl font-black mb-4 text-white">$997<span className="text-lg text-blue-200 font-normal">/mo</span></div>
            <ul className="text-blue-50 space-y-3 mb-6 text-left">
              <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Everything in Starter</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5" /> CRM Integration</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Custom Voice Cloning</li>
            </ul>
            <Link href="/contact" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-black">Start Growth</Link>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <div className="text-4xl font-black mb-4">Custom</div>
            <ul className="text-slate-400 space-y-3 mb-6 text-left">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Multi-location Routing</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Account Manager</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> SLA & White Label Options</li>
            </ul>
            <Link href="/contact" className="inline-block px-6 py-3 border border-white/10 rounded-lg text-white">Contact Sales</Link>
          </div>
        </div>

        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold text-white">Why our pricing wins</h2>
          <p className="text-slate-400">Our pricing is designed to be a high-ROI replacement for expensive reception teams. Typical customers break even within 30–90 days thanks to recovered leads and reduced staffing costs.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-bold text-white">No surprise fees</h4>
              <p className="text-slate-400">Transparent monthly plans and add-ons only when you need them.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-bold text-white">Predictable ROI</h4>
              <p className="text-slate-400">We focus on booked jobs and measurable revenue, not vanity metrics.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-bold text-white">Flexible upgrades</h4>
              <p className="text-slate-400">Start small and scale to unlimited minutes and multi-location routing.</p>
            </div>
          </div>
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
              <Link href="/blog" className="block hover:text-blue-500">Blog</Link>
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
