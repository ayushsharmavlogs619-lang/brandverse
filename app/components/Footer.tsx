import { Twitter, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {


    return (
        <footer className="py-20 px-6 border-t border-white/5 bg-[#020617] text-slate-200">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="text-2xl font-black text-white">BRANDVERSE.TECH</div>
                    <p className="text-slate-500 leading-relaxed">AI-powered solutions specifically designed for Small to Medium Sized Businesses. Transform your operations with intelligent automation.</p>
                    <div className="flex gap-4">
                        <a href="https://twitter.com/brandverse_tech" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com/company/brandverse-tech" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-blue-600/20 hover:text-blue-500 transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://instagram.com/brandverse.tech" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-pink-500/20 hover:text-pink-500 transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://youtube.com/@brandverse_tech" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-colors">
                            <Youtube className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
                    <div className="space-y-4">
                        <a href="mailto:ayush@brandverse.tech" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                            <Mail className="w-4 h-4 group-hover:text-blue-400" />
                            ayush@brandverse.tech
                        </a>
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-xs font-bold text-green-400 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Accepting New Clients
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
                    <div className="space-y-2 text-slate-400">
                        <Link href="/features" className="block hover:text-blue-500">Solutions</Link>
                        <Link href="/blog" className="block hover:text-blue-500">Intelligence (Blog)</Link>
                        <Link href="/case-studies" className="block hover:text-blue-500">Case Studies</Link>
                        <Link href="/about" className="block hover:text-blue-500">About Us</Link>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Legal</h4>
                    <div className="space-y-2 text-slate-400 text-sm">
                        <Link href="/privacy" className="block hover:text-blue-500">Privacy Policy</Link>
                        <Link href="/terms" className="block hover:text-blue-500">Terms & Conditions</Link>
                        <p className="pt-4">© 2025 Brandverse AI.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
