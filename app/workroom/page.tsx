import { ChevronRight, Radio, Activity, Eye, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function WarRoomPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-red-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                            Live War Room
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                            Active Operational <span className="text-blue-500">Monitor</span>
                        </h1>
                    </div>

                    <Link
                        href="https://calendly.com/ayushsharmavlogs619/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
                    >
                        Book Your Briefing
                        <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Live Feed Placeholder */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 aspect-video flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-gradient opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" />

                            <Radio className="w-12 h-12 text-blue-500 mb-6 animate-pulse" />
                            <h2 className="text-2xl font-bold mb-2">Establishing Secure Connection...</h2>
                            <p className="text-slate-400 max-w-sm text-sm">
                                The War Room provides real-time visualization of agent conversations, call metrics, and deployment status. <span className="text-blue-400">Apply for deployment today.</span>
                            </p>

                            <div className="mt-8 flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                            </div>
                        </div>

                        {/* Recent Alerts */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> System Heartbeat
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { msg: "Global Edge Network: Online", status: "green", time: "Now" },
                                    { msg: "Voice Processing Engine: Optimal", status: "green", time: "2m ago" },
                                    { msg: "Redis Rate Limiter: Normal", status: "green", time: "5m ago" },
                                ].map((alert, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${alert.status === 'green' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-yellow-500'}`} />
                                            <span className="text-sm font-medium">{alert.msg}</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{alert.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats & Meta */}
                    <div className="space-y-6">
                        <div className="bg-brand-gradient rounded-2xl p-6 shadow-2xl shadow-blue-500/10">
                            <ShieldCheck className="w-8 h-8 text-white mb-4" />
                            <h3 className="text-lg font-bold mb-2">Protocol 7 Activation</h3>
                            <p className="text-sm text-white/70 mb-6 leading-relaxed">
                                You are viewing a secured operational feed. All actions are logged and audited in accordance with Enterprise standards.
                            </p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/50">
                                    <span>Encryption</span>
                                    <span>AES-256</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-full" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                                <Eye className="w-4 h-4" /> Current Oversight
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Active Agents</p>
                                    <p className="text-2xl font-black">1.2k+</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">System Load</p>
                                    <p className="text-2xl font-black">12%</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="https://calendly.com/ayushsharmavlogs619/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 border border-blue-500/20 bg-blue-500/5 rounded-2xl block hover:bg-blue-500/10 transition-all text-center group"
                        >
                            <p className="text-xs text-blue-400 leading-relaxed italic mb-4">
                                "In the War Room, seconds matter more than hours. We build for speed."
                            </p>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-blue-400">Join the operation →</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
