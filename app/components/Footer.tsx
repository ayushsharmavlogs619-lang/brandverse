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
                        FREE TOOLS
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li><Link href="/tools/missed-call-calculator" className="hover:text-white transition-colors">Missed Call Calculator</Link></li>
                        <li><Link href="/tools/ai-receptionist-roi-calculator" className="hover:text-white transition-colors">AI ROI Calculator</Link></li>
                        <li><Link href="/tools/call-script-generator" className="hover:text-white transition-colors">Script Generator</Link></li>
                        <li><Link href="/tools" className="hover:text-white text-blue-400 transition-colors">View All 8 Tools →</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold tracking-wide text-neutral-300 uppercase mb-3">
                        CONNECT
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-400 font-medium">
                        <li className="text-white">+918851005278</li>
                        <li><a href="mailto:ayush@brandverse.tech" className="hover:text-white transition-colors">ayush@brandverse.tech</a></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-neutral-800">
                <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-neutral-500">
                        © 2026 BRANDVERSE.TECH TECHNOLOGIES. ALL RIGHTS RESERVED.
                    </p>
                    <p className="text-xs text-neutral-500">
                        SECURITY AUDITED • SYSTEMS LIVE
                    </p>
                </div>
            </div>
        </footer>
    );
}
