import Link from 'next/link';
import { Globe, Zap, ShieldCheck, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'About — Brandverse',
  description: 'Learn about Brandverse: our mission, team, and how our AI voice agents deliver ROI for small businesses.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            BRANDVERSE
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
          </div>
          <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">Book Demo</Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <section className="md:col-span-2 space-y-8">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">About Brandverse</h1>
            <p className="text-xl text-slate-400">We build AI voice agents that act like your best sales rep — friendly, reliable, and available 24/7. Our mission is to help small and medium businesses capture more leads, reduce overhead, and scale predictably.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">Why Brandverse?</h3>
                <ul className="text-slate-400 space-y-2 text-sm">
                  <li>Proven ROI — typical clients see 2x+ revenue within 3 months.</li>
                  <li>Enterprise-grade reliability with SME-friendly pricing.</li>
                  <li>Deep integrations — calendars, CRMs, SMS and more.</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">Our Values</h3>
                <ul className="text-slate-400 space-y-2 text-sm">
                  <li>Customer-first engineering and white-glove onboarding.</li>
                  <li>Transparent pricing and measurable outcomes.</li>
                  <li>Privacy and security by design for voice data.</li>
                </ul>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Our Story</h2>
              <p className="text-slate-400 leading-relaxed">Founded by engineers and operators who built call automation at scale, Brandverse was created to make advanced AI accessible and affordable for local businesses. We observed the same pain — missed calls, lost jobs, and expensive front-desk staffing — and designed a product to replace cost centers with a growth engine.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Leadership & Team</h2>
              <p className="text-slate-400">Our small, cross-functional team combines AI research, voice UX, and operations experts. We provide personalized onboarding and an assigned AI Architect for every customer.</p>
              <div className="grid sm:grid-cols-3 gap-6 pt-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-white">Ayush Sharma</div>
                  <div className="text-slate-400 text-sm">Founder & CEO — product, GTM</div>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-white">Head of AI</div>
                  <div className="text-slate-400 text-sm">Voice models & training</div>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-white">Customer Success</div>
                  <div className="text-slate-400 text-sm">Onboarding & growth</div>
                </div>
              </div>
            </section>
          </section>

          <aside className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-white/10">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">By the numbers</h4>
              <div className="text-4xl font-black text-white">200%+</div>
              <div className="text-slate-400 text-sm">Average ROI increase for clients in year one</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-white">Trusted Integrations</h4>
              <div className="flex gap-3 pt-4 text-slate-400">
                <Globe className="w-5 h-5" />
                <Zap className="w-5 h-5" />
                <ShieldCheck className="w-5 h-5" />
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-sm text-slate-400">Ready to get started?</div>
              <Link href="/contact" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold">Book Free Demo</Link>
            </div>
          </aside>
        </div>
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
              <Link href="/services" className="block hover:text-blue-500">Services</Link>
              <Link href="/portfolio" className="block hover:text-blue-500">Case Studies</Link>
              <Link href="/about" className="block hover:text-blue-500">About Us</Link>
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
