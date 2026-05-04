import { Download, CheckCircle2, TrendingUp, Users, Clock, Shield } from 'lucide-react';

// Declare global types for analytics
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
    lintrk?: (command: string, data?: Record<string, any>) => void;
  }
}

export const metadata = {
    title: 'Free AI Automation Audit — Brandverse',
    description: 'Download our free 2025 AI Automation Audit guide and discover how to save 40+ hours per week with AI voice agents.',
};

export default function LeadMagnetPage() {
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
                                        <h3 className="font-bold text-white mb-1">AI Voice Agent ROI Calculator</h3>
                                        <p className="text-slate-400 text-sm">See exactly how much you'll save with our proven calculator</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Implementation Checklist</h3>
                                        <p className="text-slate-400 text-sm">Step-by-step guide to deploy AI agents in your business this week</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Real Case Studies</h3>
                                        <p className="text-slate-400 text-sm">See how businesses like yours increased revenue by 200%+</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                                Proven Results
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-400">200%</div>
                                    <div className="text-sm text-slate-400">Revenue Increase</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-400">40hrs</div>
                                    <div className="text-sm text-slate-400">Time Saved/Week</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Download Form */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Download Free Guide</h2>
                        
                        <form 
                            action="https://formsubmit.co/ayush@brandverse.tech" 
                            method="POST"
                            className="space-y-6"
                        >
                            <input type="hidden" name="form_type" value="lead_magnet_download" />
                            <input type="hidden" name="lead_magnet" value="2025_AI_Automation_Audit_Guide" />
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Business Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="john@company.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                                <input 
                                    type="text" 
                                    name="company"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Your Company"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Phone (Optional)</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="+91 88510 05278"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm text-slate-300">
                                    <input type="checkbox" name="newsletter" className="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500" defaultChecked />
                                    Send me AI automation tips (unsubscribe anytime)
                                </label>
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Download Free Guide
                            </button>

                            <p className="text-xs text-slate-500 text-center">
                                No spam. Unsubscribe anytime. Instant download.
                            </p>
                        </form>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">10,000+ Businesses</h3>
                        <p className="text-slate-400 text-sm">Already using AI automation to scale</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">24/7 Availability</h3>
                        <p className="text-slate-400 text-sm">Never miss a lead or customer call again</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">GDPR Compliant</h3>
                        <p className="text-slate-400 text-sm">Fully compliant with data protection laws</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Automate Your Business?</h2>
                    <p className="text-slate-400 mb-6">Book a free 15-minute strategy call and see exactly how AI can transform your operations</p>
                    <a 
                        href="https://calendly.com/ayushsharmavlogs619/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Book Free Strategy Call
                    </a>
                </div>
            </div>
        </div>
    );
}
