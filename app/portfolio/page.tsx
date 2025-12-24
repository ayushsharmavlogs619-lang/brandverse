import Link from 'next/link';

export const metadata = {
  title: 'Portfolio — Brandverse',
  description: 'Case studies and success stories showing how Brandverse AI agents increased booked jobs and revenue for clients.',
};

export default function PortfolioPage() {
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
        <h1 className="text-5xl font-black text-white mb-6">Portfolio & Case Studies</h1>
        <p className="text-slate-400 mb-10">Real results from local businesses who implemented Brandverse AI agents.</p>

        <div className="space-y-8">
          {/* Case Study 1: HVAC */}
          <article className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
              <div>
                <div className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-2">HVAC & Plumbing</div>
                <h3 className="text-3xl font-bold text-white">Elite Climate Control</h3>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">+42%</div>
                  <div className="text-xs text-slate-500 uppercase">Revenue</div>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">0</div>
                  <div className="text-xs text-slate-500 uppercase">Missed Calls</div>
                </div>
              </div>
            </div>

            <p className="text-slate-400 mb-6 text-lg">
              Elite Climate Control was missing ~15 calls a week during after-hours and weekends. They were losing high-value emergency repair jobs to competitors who picked up the phone.
            </p>

            <div className="grid md:grid-cols-3 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5">
              <div>
                <strong className="block text-white mb-1">Challenge</strong>
                <span className="text-slate-500 text-sm"> staffing 24/7 was too expensive ($12k/mo), but voicemail wasn't converting.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Solution</strong>
                <span className="text-slate-500 text-sm">Deployed Brandverse AI to handle overflow and after-hours calls, syncing directly to ServiceTitan.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Outcome</strong>
                <span className="text-slate-500 text-sm">Recovered $28k in lost revenue in the first 90 days. Reduced lead response time to &lt;2 seconds.</span>
              </div>
            </div>
          </article>

          {/* Case Study 2: Real Estate */}
          <article className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
              <div>
                <div className="text-purple-400 font-bold text-sm tracking-wider uppercase mb-2">Real Estate</div>
                <h3 className="text-3xl font-bold text-white">Apex Property Group</h3>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">24/7</div>
                  <div className="text-xs text-slate-500 uppercase">Coverage</div>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">150+</div>
                  <div className="text-xs text-slate-500 uppercase">Leads Qual.</div>
                </div>
              </div>
            </div>

            <p className="text-slate-400 mb-6 text-lg">
              Apex's agents were overwhelmed by inbound inquiries from Zillow and generic listing ads. They spent hours qualifying "low-intent" leads instead of closing deals.
            </p>

            <div className="grid md:grid-cols-3 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5">
              <div>
                <strong className="block text-white mb-1">Challenge</strong>
                <span className="text-slate-500 text-sm">Agents wasting 20+ hours/week on cold leads.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Solution</strong>
                <span className="text-slate-500 text-sm">Brandverse AI pre-screens every caller, asking budget, timeline, and pre-approval status before transferring.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Outcome</strong>
                <span className="text-slate-500 text-sm">Agent productivity soared. 150+ qualified appointments booked automatically in month 1.</span>
              </div>
            </div>
          </article>

          {/* Case Study 3: Dental */}
          <article className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
              <div>
                <div className="text-green-400 font-bold text-sm tracking-wider uppercase mb-2">Medical & Dental</div>
                <h3 className="text-3xl font-bold text-white">BrightSmile Dental</h3>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">95%</div>
                  <div className="text-xs text-slate-500 uppercase">Booking Rate</div>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">$14k</div>
                  <div className="text-xs text-slate-500 uppercase">Saved/mo</div>
                </div>
              </div>
            </div>

            <p className="text-slate-400 mb-6 text-lg">
              Front desk staff were missing calls during busy lunch hours and patient check-ins. New patient inquiries were going to voicemail and never calling back.
            </p>

            <div className="grid md:grid-cols-3 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5">
              <div>
                <strong className="block text-white mb-1">Challenge</strong>
                <span className="text-slate-500 text-sm">High missed call rate during operational hours caused lost revenue.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Solution</strong>
                <span className="text-slate-500 text-sm">"Overflow" AI agent that picks up only when the front desk is busy after 3 rings.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Outcome</strong>
                <span className="text-slate-500 text-sm">Zero missed new patient calls. Front desk stress reduced. $14k/mo saved in hypothetical hiring costs.</span>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-block px-10 py-4 bg-blue-600 rounded-2xl font-black text-white">Get a Custom Case Study</Link>
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
