import Link from 'next/link';
import { ArrowLeft, HardHat, FileText, Calculator, Ruler } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'Automating Bids: How to Quote Jobs While You Sleep | Brandverse',
    description: 'Contractors spend 10+ hours a week driving to estimates that don\'t convert. Automate your bidding process with AI.',
    keywords: ['construction estimating automation', 'automated quoting software', 'contractor sales automation', 'ai for construction', 'digital bidding'],
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-yellow-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-yellow-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black uppercase tracking-widest">
                        Industry Focus: Construction
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Automating Bids: How to Quote Jobs <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">While You Sleep</span>
                    </h1>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-yellow-500">
                        <h2 className="text-lg font-bold text-white mb-2">Estimate Burnout</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Stop driving across town for "tire kickers." Modern automated systems can collect project dimensions, photos, and specs via a mobile form, crunch the numbers against your material costs, and deliver a preliminary estimate instantly.
                        </p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">The Pre-Qualification AI</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Brandverse sets up Voice Agents that ask the hard questions: "What is your budget?" "When are you looking to start?" "Do you have financing?"
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            If they don't fit your ideal client profile, the AI politely refers them elsewhere. If they do, it puts them straight onto your calendar for a site visit. You focus on building, not selling.
                        </p>
                    </section>
                </article>
                <RelatedArticles currentSlug="construction-bidding-automation" />
            </main>
        </div>
    );
}
