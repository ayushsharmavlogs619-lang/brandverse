'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, Phone, Mail, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuditPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        phone: '',
        email: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Redirect to thank you (we'll build this next)
        router.push('/audit/thank-you');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-red-500/30 font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
            <div className="absolute -top-[200px] right-[10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-16">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back into the Matrix
                    </Link>
                    <div className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                        ● Limited Availability: 3 Spots Left
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left Column: The Pitch */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9]">
                                We Prove You're <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Bleeding Money</span> <br />
                                In 24 Hours.
                            </h1>
                            <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-lg">
                                The Brandverse "Trojan Horse" Audit. We monitor your missed calls for one day.
                                If we don't find at least <strong className="text-green-400">$500</strong> in lost revenue opportunities,
                                <span className="text-white border-b-2 border-red-500/50"> we pay you $100</span>.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">100% Passive Test</div>
                                    <div className="text-slate-400 text-sm">We handle the setup. Zero disruption to your ops.</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">Risk Reversal Guarantee</div>
                                    <div className="text-slate-400 text-sm">If we waste your time, we literally pay you.</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/10 text-xs text-slate-500 font-mono">
                            <div className="flex items-center gap-2 mb-2 text-slate-400 font-bold uppercase tracking-widest">
                                <AlertTriangle className="w-3 h-3 text-yellow-500" /> Audit Protocol
                            </div>
                            1. We generate a tracking number.<br />
                            2. You forward missed calls to it for 24h.<br />
                            3. AI analyzes every voicemail & hangup.<br />
                            4. You get a "Lost Revenue Report" PDF.
                        </div>
                    </div>

                    {/* Right Column: The Application */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

                        <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10">
                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-white italic">Claim Your Audit</h3>
                                <p className="text-slate-400">Enter your details to generate your tracking line.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Business Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                                        placeholder="e.g. Apex Plumbing Co."
                                        value={formData.businessName}
                                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Direct Phone Line</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                                            placeholder="(555) 123-4567"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email for Report</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                                            placeholder="you@company.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white p-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Authorization...
                                        </>
                                    ) : (
                                        <>
                                            Activate Protocol <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                    No Credit Card Required • Instant Setup
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
