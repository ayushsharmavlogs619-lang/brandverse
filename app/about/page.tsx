import { Shield, Zap, Target, Lock } from 'lucide-react';

export const metadata = {
  title: 'About — Brandverse',
  description: 'Building the next generation of business automation with autonomous AI infrastructure.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto space-y-32">

          {/* Manifesto Header */}
          <section className="text-center space-y-12 relative py-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
              System Manifesto
            </div>
            <h1 className="text-5xl md:text-[10rem] font-black text-white tracking-tighter leading-none uppercase italic">
              Code Over <span className="text-blue-500 text-glow-blue">Chaos.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto font-bold leading-relaxed">
              We replace empty corporate rhetoric with <span className="text-blue-400">autonomous infrastructure</span>. We don't build sites; we build operational machines.
            </p>
          </section>

          {/* Core Values - Next Level */}
          <section className="grid md:grid-cols-2 gap-8">
            <h2 className="sr-only">Core Values</h2>

            <article className="p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Zap className="w-48 h-48 text-blue-500" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Speed is Security</h3>
                <p className="text-slate-400 text-lg font-bold leading-relaxed">
                  Slow is dead. Our AI agents operate in <span className="text-blue-400">sub-200ms</span> latency, capturing opportunities before your competitors even see the notification.
                </p>
              </div>
            </article>

            <article className="p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-red-500/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Target className="w-48 h-48 text-red-500" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-red-600/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Absolute Revenue</h3>
                <p className="text-slate-400 text-lg font-bold leading-relaxed">
                  We measure success in <span className="bold text-red-500">dollars settled</span>, not clicks received. If it doesn't move the bottom line, we don't build it.
                </p>
              </div>
            </article>

            <article className="p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-emerald-500/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Shield className="w-48 h-48 text-emerald-500" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Resilient Systems</h3>
                <p className="text-slate-400 text-lg font-bold leading-relaxed">
                  Built on enterprise-grade stacks. Our systems are designed to weather <span className="text-emerald-400">1,000% traffic spikes</span> without breaking a sweat.
                </p>
              </div>
            </article>

            <article className="p-12 rounded-[3.5rem] bg-[#020617] border border-white/5 hover:border-indigo-500/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Lock className="w-48 h-48 text-indigo-500" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Data Sovereignty</h3>
                <p className="text-slate-400 text-lg font-bold leading-relaxed">
                  Your customer data is your <span className="text-indigo-400">most valuable asset</span>. We implement bank-level encryption to ensure it remains yours alone.
                </p>
              </div>
            </article>
          </section>

          {/* Founder's Vision - High Impact */}
          <section className="relative p-1 md:p-1.5 rounded-[5rem] bg-gradient-to-br from-blue-600/30 via-transparent to-indigo-600/30 overflow-hidden shadow-4xl shadow-blue-500/10">
            <div className="relative p-16 md:p-24 rounded-[4.8rem] bg-[#020617] overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
                <img src="/images/hq_war_room.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[150px] pointer-events-none" />
              <div className="max-w-3xl relative z-10 space-y-12">
                <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">The <span className="text-blue-500">Vision.</span></h2>
                <div className="space-y-10 text-xl md:text-2xl text-slate-400 font-bold leading-relaxed">
                  <p>
                    Most "agencies" are just middle-men for mediocre talent. Brandverse is different. We are engineers building the <span className="text-blue-400">foundational tech</span> that allows businesses to scale without the headache of infinite hiring.
                  </p>
                  <p>
                    We exist to give founders their time back. Code doesn't take sick days. Code doesn't have bad moods. Code just works.
                  </p>
                </div>
                <div className="pt-16 border-t border-white/10 flex items-center gap-8">
                  <div className="w-24 h-24 rounded-3xl bg-brand-gradient p-1 shadow-2xl">
                    <div className="w-full h-full bg-[#020617] rounded-[1.4rem] flex items-center justify-center font-black text-3xl text-white italic">
                      AS
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tight">Ayush Sharma</h3>
                    <h4 className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mt-1">Architect & Founder</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
