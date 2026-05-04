import Navbar from '../components/Navbar';
import CalendlyEmbed from '../components/CalendlyEmbed';
import { Mail, MessageSquare, Phone } from 'lucide-react';

export const metadata = {
    title: 'Book a Strategy Call — Brandverse',
    description: 'Schedule a free consultation to discuss your AI automation needs.',
};

export default function ContactPage() {
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
                        Book a 15-minute discovery call. No hard sales. Just exploring if AI can fix your bottlenecks.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8 lg:col-span-1">
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
                                        {/* Add your social links here */}
                                        <a href="https://twitter.com/brandverse_tech" target="_blank" className="text-slate-400 hover:text-white transition-colors">X (Twitter)</a>
                                        <a href="https://linkedin.com/company/brandverse-tech" target="_blank" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Voice Demo</div>
                                    <div className="mt-1">
                                        <a href="/demos/voice" className="text-green-400 hover:underline font-bold">Talk to our AI Agent →</a>
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
                            
                            <form 
                                action="https://formspree.io/f/xyzyzyzy" 
                                method="POST"
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                        <input 
                                            type="text" 
                                            name="name"
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
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="+91 88510 05278"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">What are you looking for?</label>
                                    <select 
                                        name="service"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select a service</option>
                                        <option value="ai-voice-agents">AI Voice Agents</option>
                                        <option value="lead-automation">Lead Automation</option>
                                        <option value="appointment-setting">Appointment Setting</option>
                                        <option value="customer-support">24/7 Customer Support</option>
                                        <option value="custom-solution">Custom Solution</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                    <textarea 
                                        name="message"
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                        placeholder="Tell us about your business and what you'd like to automate..."
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Calendly Widget */}
                        <div className="mt-12">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Or Book a Call Directly</h3>
                                <p className="text-slate-400">Skip the email back-and-forth</p>
                            </div>
                            <CalendlyEmbed />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
