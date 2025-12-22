'use client';

import { useState } from 'react';
import { Check, Send, Phone, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const metadata = {
    title: 'Contact — Brandverse',
    description: 'Book a demo or request a free AI audit to see how Brandverse can recover lost revenue for your business.',
};

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
            <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                        BRANDVERSE
                    </Link>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20">

                    {/* Info Side */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Let&apos;s Scale Your Business</h1>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                Ready to automate your operations? Fill out the form and our AI Architect team will build a custom demo for your business within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Talk to Sales</h3>
                                    <p className="text-slate-400">Our experts are ready to map out your automation strategy.</p>
                                    <p className="text-blue-400 font-bold mt-2">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
                                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                                    <p className="text-slate-400">Send us your requirements or general queries.</p>
                                    <p className="text-purple-400 font-bold mt-2">hello@brandverse.tech</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/10 blur-[100px]" />
                        <div className="relative bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl">

                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-6">Get Your Free AI Audit</h2>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">First Name</label>
                                            <input required type="text" name="firstName" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
                                            <input required type="text" name="lastName" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Work Email</label>
                                        <input required type="email" name="email" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors" placeholder="john@company.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Company Website</label>
                                        <input type="url" name="website" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors" placeholder="company.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">How can we help?</label>
                                        <textarea required rows={4} name="message" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors resize-none" placeholder="Tell us about your current challenges..." />
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-black text-lg text-white hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Sending...' : (
                                            <>
                                                Submit Request <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-slate-500 text-center">
                                        By clicking submit, you agree to our <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                                    </p>
                                </form>
                            ) : (
                                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-4">
                                        <Check className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white">Request Received!</h3>
                                    <p className="text-slate-400 text-lg max-w-md">
                                        Our AI team has received your details. Expect a personal email from our founder within the next 24 hours.
                                    </p>
                                    <button onClick={() => setSubmitted(false)} className="text-blue-400 hover:text-blue-300 font-bold">
                                        Send another request
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
