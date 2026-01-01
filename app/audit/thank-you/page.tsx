'use client';

import Link from 'next/link';
import { CheckCircle2, Mail, Phone, ArrowRight } from 'lucide-react';

export default function AuditThankYouPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-blue-900/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-2xl w-full bg-[#0f172a] border border-white/10 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative z-10">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-6">
                    Protocol <span className="text-green-500">Activated</span>
                </h1>

                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                    We've received your request. Our system is generating your dedicated tracking line.
                </p>

                <div className="space-y-4 bg-white/5 rounded-3xl p-8 border border-white/5 text-left mb-10">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Next Steps</h3>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 shrink-0">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">Check Your Email (5-10 Mins)</div>
                            <div className="text-slate-500 text-sm">We'll send your tracking number and setup guide.</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 shrink-0">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">Forward Your Calls</div>
                            <div className="text-slate-500 text-sm">Follow instructions to set call forwarding for the 24h test period.</div>
                        </div>
                    </div>
                </div>

                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 font-black uppercase tracking-widest text-xs hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Return to Command Center
                </Link>
            </div>
        </div>
    );
}
