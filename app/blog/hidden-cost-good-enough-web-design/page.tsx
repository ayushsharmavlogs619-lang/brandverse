import Link from 'next/link';
import { ArrowLeft, Monitor, Eye, MousePointer, Award, Trophy, Layout } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'The Hidden Cost of "Good Enough" Web Design | Brandverse',
    description: 'A cheap website signals low quality to high-ticket clients. Learn why premium web design is the highest leverage asset for increasing conversion rates.',
    keywords: ['premium web design ROI', 'high ticket website design', 'luxury web design', 'website conversion rate optimization', 'cost of bad web design'],
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-amber-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest">
                        Brand Authority
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        The Hidden Cost of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">"Good Enough"</span> Web Design
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        If you're trying to sell a premium service on a budget website, you aren't just losing sales. You're damaging your reputation.
                    </p>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    {/* AEO: Quick Answer Block */}
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-amber-500">
                        <h2 className="text-lg font-bold text-white mb-2">Does web design affect sales conversion?</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Yes. Research from Stanford University indicates that <strong>75%</strong> of users admit to judging a company's credibility based solely on their website design. A "good enough" site often caps conversion rates at 1%, whereas a premium, trust-optimized design can consistently achieve <strong>3-5%</strong> conversion rates from the same traffic source.
                        </p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The 50-Millisecond Judgement</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            User psychology is brutal usually. Studies show it takes exactly <strong>0.05 seconds</strong> (50 milliseconds) for a visitor to form an opinion about your website. That split-second feeling determines whether they stay or leave.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            If your site looks like a template—clunky, slow, generic—the subconscious assumption is immediate: <em>"This business is cheap, outdated, or struggling."</em>
                        </p>
                    </section>

                    <section className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Monitor className="w-5 h-5 text-slate-500" />
                                    The "Budget" Site
                                </h3>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-500">1</div>
                                        <span>Slow load times (3s+)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-500">2</div>
                                        <span>Generic, stock imagery</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-500">3</div>
                                        <span>Cluttered navigation</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                                        <span className="text-red-400 font-bold uppercase text-xs tracking-widest">Result: 80% Bounce Rate</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Award className="w-5 h-5 text-amber-500" />
                                    The Brandverse Standard
                                </h3>
                                <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-900/10 to-transparent border border-amber-500/20 space-y-4">
                                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                                        <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-bold text-black">1</div>
                                        <span>Instant load (Under 1s)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                                        <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-bold text-black">2</div>
                                        <span>Bespoke, cinematic visuals</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                                        <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-bold text-black">3</div>
                                        <span>Intuitive user journeys</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-amber-500/20 text-center">
                                        <span className="text-green-400 font-bold uppercase text-xs tracking-widest">Result: 4x Conversion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The "Leaky Bucket" Effect</h2>
                        <div className="relative p-8 rounded-3xl overflow-hidden group">
                            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500"></div>
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="p-4 bg-slate-950 rounded-full border border-white/10">
                                    <MousePointer className="w-8 h-8 text-slate-400" />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xl font-bold text-white">Ad Spend vs. Web Conv.</h4>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        If you spend $5,000 on ads to drive traffic to a site that converts at 1%, you get 50 leads. (Cost per lead: $100).
                                        <br /><br />
                                        If valid design improvements bump that conversion to 3%, you get 150 leads from the <em>same ad spend</em>. (Cost per lead: $33).
                                        <br /><br />
                                        <strong>Your website design is the biggest lever in your marketing funnel.</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 p-10 rounded-3xl border border-amber-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Stop The Leaks.</h3>
                        <p className="text-slate-300 font-medium max-w-lg mx-auto">
                            Upgrade to a digital presence that actually reflects the quality of your work.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25"
                        >
                            Audit My Website <Layout className="w-4 h-4" />
                        </Link>
                    </div>

                </article>

                <RelatedArticles currentSlug="hidden-cost-good-enough-web-design" />
            </main>
        </div>
    );
}
