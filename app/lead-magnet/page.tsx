'use client';

import { FORMSUBMIT_ACTION } from '@/lib/forms';
import { Download, CheckCircle2, TrendingUp, Users, Clock, Shield } from 'lucide-react';
import { useState } from 'react';
import { mailchimpService } from '@/lib/mailchimp-service';

// Declare global types for analytics
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
    lintrk?: (command: string, data?: Record<string, any>) => void;
  }
}

export default function LeadMagnetPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const name = formData.get('name') as string;
        const nameParts = name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Add to Mailchimp for automated follow-ups
        try {
            await mailchimpService.addContact(email, firstName, lastName, ['Lead Magnet Download']);
            // Contact added to Mailchimp successfully
        } catch (error) {
            console.error('Mailchimp error (form will still submit):', error);
        }

        // Submit to FormSubmit.co for email delivery
        const form = e.currentTarget;
        form.submit();
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-widest mb-6">
                        Free Download
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        2025 AI Automation
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"> Audit Guide</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Discover exactly how AI voice agents can save your business 40+ hours per week and boost revenue by 200%+
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Left: What's Inside */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">What You'll Discover:</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-white mb-1">The 5 Automation Bottlenecks</h3>
                                        <p className="text-slate-400 text-sm">Identify exactly where you're losing money and time in your current workflow</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-white mb-1">The ROI Calculator Framework</h3>
                                        <p className="text-slate-400 text-sm">Simple math to calculate if AI automation is profitable for your business</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Implementation Timeline</h3>
                                        <p className="text-slate-400 text-sm">Step-by-step 48-hour deployment roadmap with checklists</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Vendor Comparison Matrix</h3>
                                        <p className="text-slate-400 text-sm">Side-by-side comparison of AI voice providers with pricing</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Industry-Specific Scripts</h3>
                                        <p className="text-slate-400 text-sm">Ready-to-use conversation scripts for HVAC, Real Estate, and more</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Download Form */}
                    <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shrink-0">
                                    <Download className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white">Download Free Guide</h2>
                                    <p className="text-slate-400 text-sm">No spam. Just valuable insights.</p>
                                </div>
                            </div>
                        </div>

                        <form 
                            action={FORMSUBMIT_ACTION}
                            method="POST"
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="_subject" value="New Lead Magnet Download - Brandverse" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_next" value="https://brandverse.tech/lead-magnet/thank-you/" />
                            <input type="hidden" name="lead_magnet" value="2025_AI_Automation_Audit_Guide" />

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Business Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                                    placeholder="john@company.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                                <input 
                                    type="text" 
                                    name="company"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                                    placeholder="Your Company"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? 'Processing...' : 'Download Now'} <Download className="w-5 h-5" />
                            </button>

                            <p className="text-center text-xs text-slate-500 mt-4">
                                🔒 Your information is secure. Unsubscribe anytime.
                            </p>
                        </form>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">2,500+</div>
                        <div className="text-slate-400 text-sm">Business Owners</div>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <TrendingUp className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">200%</div>
                        <div className="text-slate-400 text-sm">Avg Revenue Increase</div>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Clock className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">40+ hrs</div>
                        <div className="text-slate-400 text-sm">Saved Per Week</div>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Shield className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">100%</div>
                        <div className="text-slate-400 text-sm">Risk-Free Download</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-12 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10">
                    <h2 className="text-2xl font-black text-white mb-4">Ready to Stop Burning Cash?</h2>
                    <p className="text-slate-300 max-w-xl mx-auto mb-8">
                        The guide will show you exactly where you're losing money. If you want to fix it fast, book a free strategy call.
                    </p>
                    <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#020617] font-bold rounded-lg hover:bg-slate-200 transition-colors">
                        Book Strategy Call →
                    </a>
                </div>
            </div>
        </div>
    );
}