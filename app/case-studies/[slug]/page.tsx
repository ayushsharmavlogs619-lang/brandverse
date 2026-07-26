import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle2, ArrowRight, Calendar, Wrench } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';
import { config } from '@/lib/config';
import CTABlock from '@/app/components/Article/CTABlock';
import KeyTakeaways from '@/app/components/Article/KeyTakeaways';

export function generateStaticParams() {
    return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const study = caseStudies.find((cs) => cs.slug === params.slug);
    if (!study) return notFound();

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/case-studies" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Case Studies
                    </Link>
                    {study.illustrative && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest">
                            Illustrative Example
                        </div>
                    )}
                    <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400">{study.industry}</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">{study.title}</h1>
                    <p className="text-lg text-slate-400 font-medium">{study.subtitle}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {study.timeline} implementation</span>
                    </div>
                </div>
            </header>

            <main className="px-6 py-16">
                <article className="max-w-3xl mx-auto space-y-12">
                    {/* Metrics */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {study.metrics.map((m) => (
                            <div key={m.label} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <p className="text-2xl font-black text-blue-400">{m.value}</p>
                                <p className="text-xs text-slate-400 mt-1">{m.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Problem */}
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-4">The Problem</h2>
                        <p className="text-slate-300 leading-relaxed">{study.problem}</p>
                    </section>

                    {/* Solution */}
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-4">The Solution</h2>
                        <p className="text-slate-300 leading-relaxed">{study.solution}</p>
                    </section>

                    {/* Implementation */}
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-4">Implementation</h2>
                        <p className="text-slate-300 leading-relaxed">{study.implementation}</p>
                    </section>

                    {/* Results */}
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-4">Results</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">{study.results}</p>
                        <div className="space-y-2">
                            {study.metrics.map((m) => (
                                <div key={m.label} className="flex items-center gap-2 text-sm text-slate-300">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                                    <span className="font-bold text-white">{m.value}</span> — {m.label}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Technology */}
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-4">Technology Used</h2>
                        <div className="flex flex-wrap gap-2">
                            {study.technology.map((t) => (
                                <span key={t} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">{t}</span>
                            ))}
                        </div>
                    </section>

                    <KeyTakeaways items={[
                        `${study.metrics[0]?.value} ${study.metrics[0]?.label}`,
                        `Implementation completed in ${study.timeline}`,
                        `24/7 call coverage with zero missed calls`,
                        `AI trained on industry-specific knowledge`,
                        `Seamless integration with existing tools`,
                    ]} color="blue" />

                    {/* FAQ */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
                        {study.faqs.map((faq) => (
                            <div key={faq.q} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </section>

                    <CTABlock headline="Get These Results" subheadline="Book a free strategy call to see how Brandverse can help your business." color="blue" />
                </article>
            </main>
        </div>
    );
}
