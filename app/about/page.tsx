import { Shield, Zap, Target, Lock, Globe, Database, Users, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'About — Brandverse',
  description: 'Building the next generation of business automation with autonomous AI infrastructure.',
};

const TeamMember = ({ name, role, initials, color = "blue" }: { name: string, role: string, initials: string, color?: "blue" | "purple" | "emerald" | "amber" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-600 border-blue-500/20 text-blue-400 bg-blue-500/10",
    purple: "from-purple-500 to-pink-600 border-purple-500/20 text-purple-400 bg-purple-500/10",
    emerald: "from-emerald-500 to-green-600 border-emerald-500/20 text-emerald-400 bg-emerald-500/10",
    amber: "from-amber-500 to-orange-600 border-amber-500/20 text-amber-400 bg-amber-500/10"
  };

  return (
    <div className={`p-6 md:p-8 rounded-[2rem] bg-[#020617] border border-white/5 hover:border-white/10 transition-all group flex items-start gap-6`}>
      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${colorClasses[color]} bg-opacity-10 p-[1px] shrink-0`}>
        <div className="w-full h-full bg-[#020617] rounded-[0.9rem] flex items-center justify-center font-black text-xl md:text-2xl text-white italic opacity-80 group-hover:opacity-100 transition-opacity">
          {initials}
        </div>
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-white/90 transition-colors">
          {name}
        </h3>
        <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-80 ${color === 'blue' ? 'text-blue-400' : color === 'purple' ? 'text-purple-400' : color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>
          {role}
        </h4>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans">

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-40">

          {/* Manifesto Header */}
          <section className="text-center space-y-12 relative py-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
              The Organization
            </div>
            <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-black text-white tracking-tighter leading-[0.85] uppercase italic">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 text-glow-blue">Command.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto font-bold leading-relaxed pt-8">
              Decentralized Intelligence. Unified Execution.
            </p>
          </section>

          {/* LEADERSHIP MATRIX */}
          <div className="space-y-24">

            {/* C-SUITE */}
            <section className="space-y-12">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl"><Briefcase className="w-6 h-6 text-blue-400" /></div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Executive Board</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TeamMember name="Ayush Sharma" role="Founder & CEO" initials="AS" color="blue" />
                <TeamMember name="Arjun Sen" role="Co-Founder & CTO" initials="ASen" color="blue" />
                <TeamMember name="Raveena Kataria" role="Co-Founder, Legal & Head of Media" initials="RK" color="blue" />
              </div>
            </section>

            {/* TECH INFRASTRUCTURE */}
            <section className="space-y-12">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="p-3 bg-purple-500/10 rounded-xl"><Database className="w-6 h-6 text-purple-400" /></div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Infrastructure Division</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <TeamMember name="Anil Vedi" role="Lead Architect & Systems Engineer" initials="AV" color="purple" />
                <TeamMember name="Rohit Monga" role="Lead Systems Engineer" initials="RM" color="purple" />
                <TeamMember name="Harsh Varma" role="Lead Systems Engineer" initials="HV" color="purple" />
                <TeamMember name="Amit Tiwari" role="Head of Customer Success" initials="AT" color="purple" />
              </div>
            </section>

            {/* GLOBAL SALES */}
            <section className="space-y-12">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl"><Globe className="w-6 h-6 text-emerald-400" /></div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Global Expansion</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <TeamMember name="Siddhant Mohapatra" role="Head of Sales: Americas & Europe" initials="SM" color="emerald" />
                <TeamMember name="Arjun Nair" role="Head of Sales: MEA" initials="AN" color="emerald" />
                <TeamMember name="Krishanu Malik" role="Head of Sales: APAC" initials="KM" color="emerald" />
              </div>
            </section>

          </div>

          {/* VALUES GRID (Kept but moved down) */}
          <section className="pt-20 border-t border-white/5">
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Our Core Doctrines</h2>
              <p className="text-slate-400 font-bold">The code we live by.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
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
                    Slow is dead. We operate in <span className="text-blue-400">sub-200ms</span> latency.
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
                    We treat your data like state secrets. Bank-level encryption is standard.
                  </p>
                </div>
              </article>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
