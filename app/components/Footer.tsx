import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-neutral-800">
            <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
                <div className="space-y-3 md:col-span-2">
                    <h3 className="text-xl font-semibold tracking-tight">BRANDVERSE</h3>
                    <p className="text-sm text-neutral-400">
                        We aren&apos;t a marketing agency. We are an operational engine. We build the systems that build the businesses.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold tracking-wide text-neutral-300 uppercase mb-3">
                        TACTICAL
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li><Link href="/#services" className="hover:text-white transition-colors">AI Agents</Link></li>
                        <li><Link href="/#roi" className="hover:text-white transition-colors">ROI Engine</Link></li>
                        <li><Link href="/portfolio" className="hover:text-white transition-colors">Case Studies</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold tracking-wide text-neutral-300 uppercase mb-3">
                        LEGAL
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-neutral-800">
                <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-neutral-500">
                        © 2025 BRANDVERSE.TECH TECHNOLOGIES. ALL RIGHTS RESERVED.
                    </p>
                    <p className="text-xs text-neutral-500">
                        SECURITY AUDITED • SYSTEMS LIVE
                    </p>
                </div>
            </div>
        </footer>
    );
}
