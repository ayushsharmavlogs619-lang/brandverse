export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 py-20 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Privacy Policy</h1>
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">Last updated: December 23, 2025</p>
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

                <section className="space-y-6 text-slate-400 border-t border-white/5 pt-12">
                    <p>By using Brandverse, you acknowledge that you have read and understood this Privacy Policy. If you have any questions regarding your data, please contact us at <span className="text-blue-400">privacy@brandverse.tech</span>.</p>
                </section>
            </div>
        </div>
    );
}
