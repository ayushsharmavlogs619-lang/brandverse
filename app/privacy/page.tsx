export const metadata = {
    title: 'Privacy Policy — Brandverse',
    description: 'Brandverse privacy policy — how we collect, use, and protect your data and voice recordings.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 py-20 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Privacy Policy</h1>
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">Last updated: May 5, 2026</p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        🏢 Business Information
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        <strong>Brandverse</strong> provides AI Voice Agent services and business automation solutions.<br />
                        <strong>Website:</strong> brandverse.tech<br />
                        <strong>Contact:</strong> +91 88510 05278 | ayush@brandverse.tech<br />
                        <strong>Services:</strong> AI Voice Agents, Lead Automation, Appointment Setting, Customer Support Automation
                    </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        ⚠️ Official Brand Identity
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        Our services are provided exclusively under the domain <strong>brandverse.tech</strong>. We are a distinct legal entity and are <strong>NOT</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with any other company, agency, or website with a similar name. Any other entity claiming to vary our name or represent "Brandverse" without the <strong>.tech</strong> domain is an imposter.
                    </p>
                </div>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">01</span>
                        Information We Collect
                    </h2>
                    <div className="pl-11 space-y-4">
                        <p>We collect information that you provide directly to us when you use our AI Voice Agent services, including:</p>
                        <ul className="list-disc space-y-2 text-slate-400">
                            <li><strong className="text-slate-200">Contact Information:</strong> Name, email address, phone number, and business details.</li>
                            <li><strong className="text-slate-200">AI Interaction Data:</strong> Voice recordings, call transcripts, and appointment data processed by our AI agents.</li>
                            <li><strong className="text-slate-200">Usage Data:</strong> Information on how you interact with our platform and services.</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">02</span>
                        How We Use Your Data
                    </h2>
                    <div className="pl-11 space-y-4">
                        <p>We use the collected information for various professional purposes:</p>
                        <ul className="list-disc space-y-2 text-slate-400">
                            <li>To provide, maintain, and improve our AI Voice Agent technology.</li>
                            <li>To process leads, schedule appointments, and automate your business operations.</li>
                            <li>To analyze performance and optimize call scripts/AI responses.</li>
                            <li>To comply with legal obligations and protect against fraudulent activity.</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">03</span>
                        Data Sharing and Security
                    </h2>
                    <div className="pl-11 space-y-4 text-slate-400">
                        <p>We do not sell your personal data. We only share information with third-party service providers (like Firebase or AI model providers) necessary for delivering our services.</p>
                        <p>We implement robust, industry-standard AES-256 encryption and secure API protocols to ensure your data and your clients&apos; voice data remains private and protected.</p>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">04</span>
                        GDPR Compliance
                    </h2>
                    <div className="pl-11 space-y-4 text-slate-400">
                        <p><strong>Your Rights Under GDPR:</strong></p>
                        <ul className="list-disc space-y-2">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
                            <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                            <li><strong>Portability:</strong> Request transfer of your data</li>
                            <li><strong>Objection:</strong> Object to processing of your data</li>
                        </ul>
                        <p>To exercise these rights, contact us at ayush@brandverse.tech or call +91 88510 05278</p>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 text-sm">05</span>
                        Contact Information
                    </h2>
                    <div className="pl-11 space-y-4 text-slate-400">
                        <p><strong>Data Protection Officer:</strong></p>
                        <ul className="space-y-1">
                            <li><strong>Email:</strong> ayush@brandverse.tech</li>
                            <li><strong>Phone:</strong> +91 88510 05278</li>
                            <li><strong>Website:</strong> brandverse.tech</li>
                            <li><strong>Response Time:</strong> Within 48 hours for data protection requests</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6 text-slate-400 border-t border-white/5 pt-12">
                    <p>By using Brandverse services, you acknowledge that you have read and understood this Privacy Policy. This policy is effective as of May 5, 2026 and will remain in effect until modified.</p>
                    <p><strong>Last Updated:</strong> May 5, 2026</p>
                </section>
            </div>
        </div>
    );
}
