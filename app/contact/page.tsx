'use client';

import Navbar from '../components/Navbar';
import CalendlyEmbed from '../components/CalendlyEmbed';
import { Mail, MessageSquare, Phone, Calendar } from 'lucide-react';
import { config } from '@/lib/config';
import { useState } from 'react';
import LeadForm, { SuccessMessage } from '../components/LeadForm';

// Declare global types for analytics
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
    lintrk?: (command: string, data?: Record<string, any>) => void;
  }
}

export default function ContactPage() {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleFormSubmit = async (result: any) => {
        if (result.success) {
            setShowSuccess(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
                        Let's Talk Business
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Scale?</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Book a 30-minute discovery call. No hard sales. Just exploring if AI can fix your bottlenecks.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Calendly Booking */}
                    <div className="lg:col-span-1">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Book a Call</h3>
                                    <p className="text-xs text-slate-400">Schedule directly</p>
                                </div>
                            </div>
                            <CalendlyEmbed url={config.calendlyUrl} />
                            <a
                                href={config.calendlyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold hover:bg-blue-500/20 transition-all"
                            >
                                <Calendar className="w-4 h-4" /> Open Booking Page Instead
                            </a>
                        </div>
                    </div>
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                            <h3 className="text-xl font-bold text-white mb-4">Direct Lines</h3>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Email</div>
                                    <a href="mailto:ayush@brandverse.tech" className="text-white hover:text-blue-400 transition-colors">ayush@brandverse.tech</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Phone</div>
                                    <a href="tel:+918851005278" className="text-white hover:text-emerald-400 transition-colors">+91 88510 05278</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Socials</div>
                                    <div className="flex gap-4 mt-2">
                                        <a href="https://twitter.com/brandverse_tech" target="_blank" className="text-slate-400 hover:text-white transition-colors">X (Twitter)</a>
                                        <a href="https://instagram.com/brandverse.tech" target="_blank" className="text-slate-400 hover:text-white transition-colors">Instagram</a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                            <h3 className="text-lg font-bold text-white mb-2">What happens on the call?</h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex gap-2"><span className="text-blue-400">✓</span> We analyze your current workflow</li>
                                <li className="flex gap-2"><span className="text-blue-400">✓</span> Identify 2-3 automation quick wins</li>
                                <li className="flex gap-2"><span className="text-blue-400">✓</span> Live demo of relevant agents</li>
                                <li className="flex gap-2"><span className="text-blue-400">✓</span> Zero obligation to buy</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>
                            
                            <LeadForm 
                                sourceForm="contact"
                                onSubmit={handleFormSubmit}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                        <input 
                                            type="text" 
                                            name="full_name"
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                                        <input 
                                            type="text" 
                                            name="company"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Your Company"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="+91 88510 05278"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Service Interest</label>
                                    <select 
                                        name="service_interest"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="" className="bg-[#0f172a]">Select a service</option>
                                        <option value="AI Voice Agents" className="bg-[#0f172a]">AI Voice Agents</option>
                                        <option value="Custom Solution" className="bg-[#0f172a]">Custom Solution</option>
                                        <option value="Consultation" className="bg-[#0f172a]">Consultation</option>
                                        <option value="Other" className="bg-[#0f172a]">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                    <textarea 
                                        name="message"
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Send Message →
                                </button>
                            </LeadForm>
                        </div>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <SuccessMessage 
                    title="Message Sent!"
                    message="We'll get back to you within 24 hours."
                    onDismiss={() => setShowSuccess(false)}
                />
            )}
        </div>
    );
}