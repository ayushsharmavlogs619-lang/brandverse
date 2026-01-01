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
          {/* The Team */}
          <section className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Leadership</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">The minds building the infrastructure of tomorrow.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Ayush Sharma */}
              <div className="p-6 rounded-3xl bg-blue-900/10 border border-blue-500/20 group hover:bg-blue-900/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">AS</div>
                <h3 className="text-2xl font-bold text-white mb-1">Ayush Sharma</h3>
                <div className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">Founder & CEO</div>
                <p className="text-slate-400 text-sm leading-relaxed">Visionary leader driving the transition from manual operations to autonomous enterprise infrastructure.</p>
              </div>

              {/* Arjun Sen */}
              <div className="p-6 rounded-3xl bg-purple-900/10 border border-purple-500/20 group hover:bg-purple-900/20 transition-all relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-purple-400/50">Legacy</div>
                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">AS</div>
                <h3 className="text-2xl font-bold text-white mb-1">Arjun Sen</h3>
                <div className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4">Co-Founder & CTO</div>
                <p className="text-slate-400 text-sm leading-relaxed">The architectural genius behind our core technology stack. His code lives on in every system we deploy.</p>
              </div>

              {/* Raveena Kataria */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center text-xl font-bold text-white mb-6 group-hover:scale-110 transition-transform">RK</div>
                <h3 className="text-2xl font-bold text-white mb-1">Raveena Kataria</h3>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Co-Founder & Legal Counsel</div>
                <p className="text-slate-500 text-sm leading-relaxed">Ensuring enterprise-grade compliance, data sovereignty, and regulatory adherence across all deployments.</p>
              </div>

              {/* Rohit Monga */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-bold text-white mb-6 group-hover:scale-110 transition-transform">RM</div>
                <h3 className="text-xl font-bold text-white mb-1">Rohit Monga</h3>
                <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4">Senior Solutions Architect</div>
                <p className="text-slate-500 text-sm leading-relaxed">Lead engineer for custom integrations and complex backend workflows.</p>
              </div>

              {/* Krishanu Maik */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-bold text-white mb-6 group-hover:scale-110 transition-transform">KM</div>
                <h3 className="text-xl font-bold text-white mb-1">Krishanu Maik</h3>
                <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4">Director of Sales (APAC)</div>
                <p className="text-slate-500 text-sm leading-relaxed">Leading expansion and partnerships across Australia, New Zealand, and Asia-Pacific markets.</p>
              </div>

              {/* Arjun Nair */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-bold text-white mb-6 group-hover:scale-110 transition-transform">AN</div>
                <h3 className="text-xl font-bold text-white mb-1">Arjun Nair</h3>
                <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4">Director of Sales (Middle East & Asia)</div>
                <p className="text-slate-500 text-sm leading-relaxed">Driving strategic partnerships and growth across the Middle East and Asian markets.</p>
              </div>

              {/* Siddhant Mohapatra */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-bold text-white mb-6 group-hover:scale-110 transition-transform">SM</div>
                <h3 className="text-xl font-bold text-white mb-1">Siddhant Mohapatra</h3>
                <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4">Director of Sales (Europe & South America)</div>
                <p className="text-slate-500 text-sm leading-relaxed">Leading our expansion into European and LATAM territories with enterprise-grade solutions.</p>
              </div>

              {/* Amit Tiwari */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all lg:col-span-3 lg:w-1/3 lg:mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-bold text-white mb-6 group-hover:scale-110 transition-transform">AT</div>
                <h3 className="text-xl font-bold text-white mb-1">Amit Tiwari</h3>
                <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4">Head of Customer Success</div>
                <p className="text-slate-500 text-sm leading-relaxed">Ensuring every partner deployment achieves maximum ROI and long-term stability.</p>
              </div>
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
                  <div className="text-blue-400 text-sm">Founder & CEO, Brandverse.Tech</div>
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
