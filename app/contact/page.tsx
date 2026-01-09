'use client';

import { useState } from 'react';
import { Check, Send, Phone, Mail, Clock, Shield } from 'lucide-react';
import { db } from '@/app/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import CalendlyEmbed from '@/app/components/CalendlyEmbed';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            website: formData.get('website') as string,
            message: formData.get('message') as string,
            timestamp: serverTimestamp(),
            status: 'new'
        };

        if (!db) {
            setError('Database connection unavailable. Please ensure Firebase is configured.');
            setIsSubmitting(false);
            return;
        }

        try {
            await addDoc(collection(db, 'contact-submissions'), data);
            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Failed to submit. Please try again or email us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-24">

                {/* Main Split Layout */}
                <div className="grid lg:grid-cols-2 gap-20">

                    {/* Info Side */}
                    <div className="space-y-12">
                        <section className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                Deployment Request
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
                                Secure Your <span className="text-blue-500 text-glow-blue">Alpha.</span>
                            </h1>
                            <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-lg">
                                Ready to scale your output without increasing headcount? Submit your technical requirements or <span className="text-blue-400">book a strategy lock-in</span> instantly.
                            </p>
                        </section>

                        <section className="space-y-8">
                            <h2 className="sr-only">Connection Channels</h2>
                            <article className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-[#020617] border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                                    <Phone className="w-32 h-32 text-blue-500" />
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0 relative z-10">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Direct Line</h3>
                                    <p className="text-2xl font-black text-white italic">+1 (415) 851-0947</p>
                                    <h4 className="text-blue-400 font-bold text-sm mt-1 uppercase tracking-widest text-[10px]">Priority Support Active</h4>
                                </div>
                            </article>

                            <article className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-[#020617] border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:-rotate-6 transition-transform">
                                    <Mail className="w-32 h-32 text-purple-500" />
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0 relative z-10">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Encrypted Intel</h3>
                                    <p className="text-2xl font-black text-white italic">ayush@brandverse.tech</p>
                                    <h4 className="text-purple-400 font-bold text-sm mt-1 uppercase tracking-widest text-[10px]">Response Time: &lt; 2hrs</h4>
                                </div>
                            </article>
                        </section>
                    </div>

                    {/* Form / Success Side */}
                    <section className="relative">
                        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl -z-10 rounded-[4rem]" />
                        <div className="p-1 md:p-1.5 rounded-[3.5rem] bg-gradient-to-br from-blue-500/30 to-transparent shadow-4xl shadow-blue-500/10">
                            <div className="p-10 md:p-12 rounded-[3rem] bg-[#020617] border border-white/5 relative overflow-hidden min-h-[600px] flex flex-col justify-center">

                                {!submitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Get Your AI Audit</h2>
                                            <p className="text-slate-500 text-sm font-bold">Configure your technical requirements for baseline deployment.</p>
                                        </div>

                                        <div className="space-y-6 text-left">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="group relative">
                                                    <label className="absolute left-6 top-4 text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-400 transition-colors">First Name</label>
                                                    <input required type="text" name="firstName" className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 pt-10 pb-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-900/80" placeholder="John" />
                                                </div>
                                                <div className="group relative">
                                                    <label className="absolute left-6 top-4 text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-400 transition-colors">Last Name</label>
                                                    <input required type="text" name="lastName" className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 pt-10 pb-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-900/80" placeholder="Doe" />
                                                </div>
                                            </div>

                                            <div className="group relative">
                                                <label className="absolute left-6 top-4 text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-400 transition-colors">Work Email</label>
                                                <input required type="email" name="email" className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 pt-10 pb-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-900/80" placeholder="john@company.com" />
                                            </div>

                                            <div className="group relative">
                                                <label className="absolute left-6 top-4 text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-400 transition-colors">Tactical Challenges</label>
                                                <textarea required rows={4} name="message" className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 pt-10 pb-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-900/80 resize-none" placeholder="Tell us about your business bottlenecks..." />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold italic">
                                                ⚠ {error}
                                            </div>
                                        )}

                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="w-full py-6 bg-brand-gradient text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 group"
                                        >
                                            {isSubmitting ? 'Transmitting...' : (
                                                <>
                                                    Initiate System Audit <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-[10px] text-slate-600 text-center font-black uppercase tracking-widest">
                                            Security Guarded By <span className="text-blue-500/50 font-black">Brandverse Protocols</span>
                                        </p>
                                    </form>
                                ) : (
                                    <div className="py-6 text-center space-y-8 animate-fade-in w-full h-full flex flex-col justify-center">
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/30">
                                                <Check className="w-8 h-8 text-blue-400" />
                                            </div>
                                            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Transmission Confirmed</h2>
                                            <p className="text-slate-400 font-bold max-w-sm mx-auto">
                                                Our architects have your file. <br />
                                                <span className="text-blue-400">Final Step: Lock in your strategy session below.</span>
                                            </p>
                                        </div>
                                        <div className="-mx-6 md:-mx-8 border-t border-white/5 pt-4">
                                            {/* Auto-load the Calendar on Success */}
                                            <CalendlyEmbed height="500px" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Direct Booking Section - Below Fold */}
                <section id="book" className="pt-20 border-t border-white/5 relative">
                    <div className="text-center space-y-6 mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            Direct Access
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Skip The Queue.</h2>
                        <p className="text-slate-400 text-xl font-bold max-w-2xl mx-auto">
                            Know what you want? Book a time directly with our Lead Architect for a 30-minute system blueprinting session.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <CalendlyEmbed />
                    </div>
                </section>

            </main>
        </div>
    );
}
