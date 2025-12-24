import Link from 'next/link';
import { Shield, Zap, Target, Lock } from 'lucide-react';

export const metadata = {
  title: 'About — Brandverse',
  description: 'Building the next generation of business automation.',
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
            <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Case Studies</Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>
          <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">Book Demo</Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-24">

          {/* Mission Header */}
          <section className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
              Our Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
              We don't sell hype.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                We build engines.
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The modern business landscape is filled with empty promises and "fake excellence."
              At Brandverse, we replace chaos with code, and overhead with automation.
            </p>
          </section>

          {/* Core Values */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
              <Zap className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Speed is Security</h3>
              <p className="text-slate-400 leading-relaxed">
                In a fast-moving market, slow response times kill deals. Our AI agents operate in milliseconds, ensuring you never miss an opportunity due to latency.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
              <Target className="w-10 h-10 text-red-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Results Over Rhetoric</h3>
              <p className="text-slate-400 leading-relaxed">
                We have zero tolerance for vanity metrics. We measure success in booked appointments, collected payments, and hours saved. Real work, real revenue.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
              <Shield className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Built to Last</h3>
              <p className="text-slate-400 leading-relaxed">
                We don't rely on trends. We build resilient systems using enterprise-grade infrastructure that can weather any market condition.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
              <Lock className="w-10 h-10 text-green-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Privacy First</h3>
              <p className="text-slate-400 leading-relaxed">
                Your data is your asset. We implement bank-level security protocols to ensure your customer conversations and business intelligence remain strictly yours.
              </p>
            </div>
          </section>

          {/* Vision Statement */}
          <section className="relative p-12 rounded-[3rem] overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900 -z-10" />
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">Why We Exist</h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  We founded Brandverse because we saw too many businesses trapped in the "corporate hamster wheel"—high effort, loud leadership, and low impact.
                </p>
                <p>
                  We believe that the future belongs to those who leverage technology to reclaim their time. Our goal is simple: to provide the operational clarity and automation that allows founders to focus on growth, not admin.
                </p>
              </div>
              <div className="mt-10 pt-10 border-t border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                  AS
                </div>
                <div>
                  <div className="text-white font-bold">Ayush Sharma</div>
                  <div className="text-blue-400 text-sm">Founder, Brandverse.Tech</div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer className="py-12 border-t border-white/5 bg-[#020617] text-center">
        <div className="text-slate-500 text-sm">
          © 2025 Brandverse.Tech Technologies. Built for performance.
        </div>
      </footer>
    </div>
  );
}
