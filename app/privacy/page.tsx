export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 py-20 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-black text-white mb-8">Privacy Policy</h1>
                <p>Last updated: December 19, 2025</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
                    <p>Brandverse (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This policy explains how we collect, use, and protect your data when using our AI automation services.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Data Collection</h2>
                    <p>We collect information you provide directly to us (e.g., name, email, business details) and data automatically collected via our AI agents (e.g., call transcripts, appointment details).</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Data Usage</h2>
                    <p>We use your data to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide and improve our AI voice agent services.</li>
                        <li>Process transactions and appointments.</li>
                        <li>Communicate with you regarding service updates.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Data Security</h2>
                    <p>We implement industry-standard encryption and security measures to protect your data. Call recordings and transcripts are stored securely and accessible only to authorized personnel.</p>
                </section>
            </div>
        </div>
    );
}
