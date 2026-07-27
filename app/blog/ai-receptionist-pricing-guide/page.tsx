import Link from 'next/link';
import { ArrowLeft, DollarSign, Shield, Layers, BarChart3, ArrowRight, Calendar, Check } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import ArticleSchema from '../../components/Article/ArticleSchema';
import KeyTakeaways from '../../components/Article/KeyTakeaways';
import CTABlock from '../../components/Article/CTABlock';
import { config } from '@/lib/config';

export const metadata = {
    title: 'AI Receptionist Pricing Guide 2025 — Full Cost Breakdown — Brandverse',
    description: 'Complete guide to AI receptionist pricing. Compare per-minute, flat-rate, and hybrid pricing models. Includes hidden costs, ROI calculator, and vendor comparison.',
    openGraph: { title: 'AI Receptionist Pricing Guide 2025 — Full Cost Breakdown — Brandverse', description: 'Complete pricing guide for AI receptionists with model comparison and ROI analysis.' },
    twitter: { card: 'summary_large_image', title: 'AI Receptionist Pricing Guide 2025', description: 'AI receptionist pricing models compared: per-minute vs flat-rate vs hybrid.' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/ai-receptionist-pricing-guide' }
};

const pricingModels = [
    { name: 'Per-Minute', best: 'Low-volume businesses', cost: '$0.10 – $0.50/min', pros: ['Pay only for what you use', 'No long-term commitment', 'Scales with call volume'], cons: ['Can spike with high call volume', 'Hard to predict monthly cost', 'Often lacks premium features'] },
    { name: 'Flat-Rate', best: 'High-volume businesses', cost: '$300 – $1,500/mo', pros: ['Predictable monthly cost', 'Unlimited calls included', 'Full feature access'], cons: ['Higher floor cost', 'May overpay if low volume', 'Longer contract terms'] },
    { name: 'Hybrid', best: 'Growing businesses', cost: '$200 base + $0.05–0.15/min', pros: ['Low base cost', 'Moderate scalability', 'Good for seasonal businesses'], cons: ['Complex pricing structure', 'Mid-range complexity', 'Overage surprises possible'] },
];

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-emerald-500/30">
            <ArticleSchema title="AI Receptionist Pricing Guide 2025" description="Complete guide to AI receptionist pricing models, hidden costs, and ROI." slug="ai-receptionist-pricing-guide" date="Mar 15, 2025" category="Guides" />
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-emerald-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Intelligence</Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">Guides</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">AI Receptionist <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Pricing Guide 2025</span></h1>
                    <p className="text-lg text-slate-400 font-medium">Complete cost breakdown: per-minute vs flat-rate vs hybrid pricing, hidden costs, and ROI analysis.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500"><span>Mar 15, 2025</span><span>·</span><span>10 min read</span><span>·</span><span className="text-emerald-400">Guides</span></div>
                </div>
            </header>
            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-12">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-emerald-500">
                        <h2 className="text-lg font-bold text-white mb-3">How much does an AI receptionist cost?</h2>
                        <p className="text-slate-300 leading-relaxed">AI receptionists typically cost $300–$1,500/month for flat-rate plans or $0.10–$0.50/minute for usage-based pricing. A typical small business paying a human receptionist $35,000–$45,000/year can save 50–80% by switching to an AI alternative while gaining 24/7 coverage.</p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Pricing Model Comparison</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {pricingModels.map((model) => (
                                <div key={model.name} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-1">{model.name}</h3>
                                    <p className="text-2xl font-black text-emerald-400 mb-1">{model.cost}</p>
                                    <p className="text-xs text-slate-500 mb-3">Best for: {model.best}</p>
                                    <div className="space-y-1 mb-3">
                                        {model.pros.map((p) => <p key={p} className="text-xs text-green-400 flex items-start gap-1"><Check className="w-3 h-3 shrink-0 mt-0.5" />{p}</p>)}
                                    </div>
                                    <div className="space-y-1">
                                        {model.cons.map((c) => <p key={c} className="text-xs text-red-400 flex items-start gap-1">– {c}</p>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Hidden Costs to Watch For</h2>
                        <div className="space-y-4">
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-1">Setup & Onboarding Fees</h3><p className="text-sm text-slate-400">Some vendors charge $500–$2,000 upfront for script development, voice cloning, and CRM integration. Ask whether onboarding is included in the monthly price.</p></div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-1">CRM Integration Costs</h3><p className="text-sm text-slate-400">Native integrations are usually included, but custom API integrations may carry additional development fees. Confirm which CRMs are supported out of the box.</p></div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-1">Overage Charges</h3><p className="text-sm text-slate-400">Flat-rate plans often have fair usage caps (e.g., 5,000 minutes/month). Exceeding the cap can trigger overage charges of $0.05–$0.15/minute. Check the fine print on call volume limits.</p></div>
                        </div>
                    </section>

                    <section className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-4">True ROI: Your Bottom Line</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div><p className="text-sm text-slate-400">Human receptionist cost</p><p className="text-3xl font-black text-white">$35,000–$45,000/yr</p><p className="text-xs text-slate-500">Per full-time employee including benefits</p></div>
                            <div><p className="text-sm text-slate-400">AI receptionist cost</p><p className="text-3xl font-black text-emerald-400">$3,600–$18,000/yr</p><p className="text-xs text-slate-500">Flat-rate plan, 24/7 coverage</p></div>
                            <div><p className="text-sm text-slate-400">Annual savings</p><p className="text-3xl font-black text-green-400">$17,000–$41,400/yr</p><p className="text-xs text-slate-500">50–92% cost reduction</p></div>
                            <div><p className="text-sm text-slate-400">Added value: missed call recovery</p><p className="text-3xl font-black text-blue-400">$10,000–$50,000+/yr</p><p className="text-xs text-slate-500">Revenue from calls that were previously missed</p></div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Vendor Pricing Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead><tr className="border-b border-white/10"><th className="text-left py-3 text-slate-400 font-bold uppercase tracking-widest text-xs">Vendor</th><th className="text-left py-3 text-slate-400 font-bold uppercase tracking-widest text-xs">Starting Price</th><th className="text-left py-3 text-slate-400 font-bold uppercase tracking-widest text-xs">Model</th><th className="text-left py-3 text-slate-400 font-bold uppercase tracking-widest text-xs">Best For</th></tr></thead>
                                <tbody>
                                    <tr className="border-b border-white/5"><td className="py-3 text-white font-semibold">Brandverse</td><td className="py-3">Custom</td><td className="py-3">Flat-rate</td><td className="py-3">Service businesses</td></tr>
                                    <tr className="border-b border-white/5"><td className="py-3 text-white font-semibold">Vendor A</td><td className="py-3">$500/mo</td><td className="py-3">Per-minute</td><td className="py-3">Enterprise call centers</td></tr>
                                    <tr className="border-b border-white/5"><td className="py-3 text-white font-semibold">Vendor B</td><td className="py-3">$0.30/min</td><td className="py-3">Per-minute</td><td className="py-3">Low-volume businesses</td></tr>
                                    <tr><td className="py-3 text-white font-semibold">Vendor C</td><td className="py-3">$299/mo</td><td className="py-3">Flat-rate</td><td className="py-3">Small businesses</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <KeyTakeaways items={['AI receptionists cost 50–80% less than human alternatives.', 'Flat-rate pricing ($300–$1,500/mo) offers predictable costs.', 'Per-minute pricing ($0.10–$0.50/min) suits low-volume businesses.', 'Watch for hidden setup fees, integration costs, and overage charges.', 'ROI includes direct savings plus revenue from recovered missed calls.']} color="emerald" />

                    <CTABlock headline="See Your Pricing" subheadline="Get a custom quote for your business volume and needs." color="emerald" />
                </article>
                <RelatedArticles currentSlug="ai-receptionist-pricing-guide" />
            </main>
        </div>
    );
}
