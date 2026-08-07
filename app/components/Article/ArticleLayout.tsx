'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, ArrowRight, Clock } from 'lucide-react';
import { config } from '@/lib/config';
import ArticleSchema from './ArticleSchema';
import KeyTakeaways from './KeyTakeaways';
import RelatedArticles from '../RelatedArticles';

interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface InternalLink {
  href: string;
  text: string;
}

interface ArticleLayoutProps {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  accent?: string;
  keywords?: string[];
  faqs?: FAQItem[];
  howToSteps?: HowToStep[];
  takeaways?: string[];
  children: React.ReactNode;
  ctaHeadline?: string;
  ctaSubheadline?: string;
  internalLinks?: InternalLink[];
}

const accentMap: Record<string, { text: string; border: string; bg: string; gradient: string }> = {
  blue: { text: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10', gradient: 'from-blue-900/40 to-purple-900/40' },
  purple: { text: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10', gradient: 'from-purple-900/40 to-pink-900/40' },
  emerald: { text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', gradient: 'from-emerald-900/40 to-teal-900/40' },
  amber: { text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', gradient: 'from-amber-900/40 to-orange-900/40' },
  rose: { text: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10', gradient: 'from-rose-900/40 to-pink-900/40' },
  cyan: { text: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', gradient: 'from-cyan-900/40 to-blue-900/40' },
  violet: { text: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10', gradient: 'from-violet-900/40 to-purple-900/40' },
  orange: { text: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/10', gradient: 'from-orange-900/40 to-red-900/40' },
  green: { text: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/10', gradient: 'from-green-900/40 to-emerald-900/40' },
  red: { text: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10', gradient: 'from-red-900/40 to-rose-900/40' },
};

export default function ArticleLayout({
  slug, title, subtitle, description, date, readTime, category, accent = 'blue',
  keywords, faqs, howToSteps, takeaways, children, ctaHeadline, ctaSubheadline, internalLinks,
}: ArticleLayoutProps) {
  const a = accentMap[accent] || accentMap.blue;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <ArticleSchema
        title={title}
        description={description}
        slug={slug}
        date={date}
        category={category}
        keywords={keywords}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]" style={{ background: `${accent === 'blue' ? '#2563eb' : accent === 'red' ? '#dc2626' : '#7c3aed'}10`, filter: 'blur(100px)', borderRadius: '50%' }} />
        <div className="max-w-3xl mx-auto space-y-6">
          <Link href="/blog" className={`${a.text} text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors`}>
            <ArrowLeft className="w-4 h-4" /> Back to Intelligence
          </Link>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${a.bg} border ${a.border} ${a.text} text-xs font-black uppercase tracking-widest`}>{category}</div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">{title}</h1>
          {subtitle && <p className="text-lg text-slate-400 font-medium leading-relaxed">{subtitle}</p>}
          <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
            <span>{date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{readTime}</span>
            <span>·</span>
            <span className={a.text}>{category}</span>
          </div>
        </div>
      </header>

      <main className="px-6 py-20">
        <article className="max-w-3xl mx-auto space-y-12">
          {children}

          {takeaways && takeaways.length > 0 && (
            <section>
              <KeyTakeaways items={takeaways} color={accent as any} />
            </section>
          )}

          {internalLinks && internalLinks.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Related Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {internalLinks.map((link) => (
                  <Link key={link.href} href={link.href}
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30"
                  >
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.text}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className={`bg-gradient-to-r ${a.gradient} p-10 rounded-3xl border ${a.border} text-center space-y-6`}>
            <h3 className="text-3xl font-black text-white italic">{ctaHeadline || 'Ready to Never Miss Another Lead?'}</h3>
            <p className="text-slate-300 font-medium max-w-lg mx-auto">{ctaSubheadline || 'See how Brandverse AI can handle your business calls 24/7, book appointments, and capture every lead.'}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={config.calendlyUrl}
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/25"
              >
                Book a Free Strategy Call <Calendar className="w-4 h-4" />
              </Link>
              <Link href="/roi-calculator"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-colors border border-white/20"
              >
                Calculate Your ROI <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {faqs && faqs.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </section>
          )}
        </article>

        <RelatedArticles currentSlug={slug} />
      </main>
    </div>
  );
}
