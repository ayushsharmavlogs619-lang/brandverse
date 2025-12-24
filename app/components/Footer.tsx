
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-20 px-6 border-t border-white/5 bg-[#020617] text-slate-200">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="text-2xl font-black text-white">BRANDVERSE.TECH</div>
                    <p className="text-slate-500 leading-relaxed">AI-powered solutions specifically designed for Small to Medium Sized Businesses. Transform your operations with intelligent automation.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
                    <div className="space-y-2 text-slate-400">
                        <p>ayush@brandverse.tech</p>
                        <p>Live Chat Available 24/7</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
                    <div className="space-y-2 text-slate-400">
                        <Link href="/features" className="block hover:text-blue-500">Solutions</Link>
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
