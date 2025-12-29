'use client';

import Link from 'next/link';
import { Bot, Mic, FileText, ArrowRight, Lock } from 'lucide-react';

export default function DemosPage() {
    const demos = [
        {
            title: 'Voice Agent "Nexus"',
            description: 'Experience our ultra-low latency voice agent. "Nexus" can qualify leads, handle objections, and book appointments.',
            icon: <Mic className="w-8 h-8 text-blue-400" />,
            href: '/demos/voice',
            status: 'Live',
            gradient: 'from-blue-600/20 to-purple-600/20'
        },
        {
            title: 'Invoicing Assistant',
            description: 'Text-based agent that generates PDF invoices and Stripe payment links from natural language commands.',
            icon: <FileText className="w-8 h-8 text-green-400" />,
            href: '/demos/invoice',
            status: 'In Development',
            gradient: 'from-green-600/20 to-emerald-600/20'
        },
        {
            title: 'Support Dispatcher',
            description: ' triage system that listens to customer complaints and routes them to the correct department.',
            icon: <Bot className="w-8 h-8 text-orange-400" />,
            href: '#',
            status: 'Locked',
            gradient: 'from-orange-600/20 to-red-600/20'
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <header className="pt-32 pb-12 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                    Intelligence <span className="text-blue-500">Live</span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Interact with our neural networks in real-time. These demos run on the same infrastructure we deploy for clients.
                </p>
            </header>

            <main className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {demos.map((demo, i) => (
                        <Link
                            key={i}
                            href={demo.href}
                            className={`relative group p-8 rounded-3xl border border-white/5 bg-gradient-to-br ${demo.gradient} hover:border-blue-500/30 transition-all overflow-hidden`}
                        >
                            <div className="absolute top-4 right-4 text-xs font-black uppercase tracking-widest px-3 py-1 bg-black/40 rounded-full border border-white/5">
                                {demo.status === 'Locked' && <Lock className="w-3 h-3 inline mr-1" />}
                                {demo.status}
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                    {demo.icon}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-white italic mb-2">{demo.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                        {demo.description}
                                    </p>
                                </div>

                                <div className="pt-4 flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                                    Try Demo <ArrowRight className="w-4 h-4 text-blue-400" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
