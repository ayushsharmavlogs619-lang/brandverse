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

                    {/* Calendly Widget */}
                    <div className="lg:col-span-2">
                        <CalendlyEmbed />
                    </div>
                </div>
            </div>
        </div>
    );
}
