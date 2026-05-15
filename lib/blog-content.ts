import { articles, type Article } from '@/app/lib/articles';

/** Rich HTML overrides (optional). Falls back to a full article template from metadata. */
const CONTENT_OVERRIDES: Record<string, string> = {
  'how-ai-boosts-leads': `
      <p class="mb-6 text-xl text-slate-300 leading-relaxed">
        Let's face it: relying on voicemail is like throwing money into a black hole. In 2024, if you don't answer the phone, your customer calls the next business on Google. It's that simple.
      </p>
      <h2 class="text-3xl font-bold text-white mt-12 mb-6">The "Speed to Lead" Problem</h2>
      <p class="mb-6 text-slate-400 leading-relaxed">
        Statistics show that lead qualification drops by 80% if you wait more than 5 minutes to respond. Yet, most contractors are busy on job sites and can't answer calls instantly.
        <br/><br/>
        This is where AI Voice Agents bridge the gap. Unlike a human receptionist who takes breaks, goes home at 5 PM, and can only handle one call at a time, an AI agent is:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-slate-400 mb-8">
        <li>Available 24/7/365</li>
        <li>Instantly scalable (can handle 100 calls at once)</li>
        <li>Always cheerful and professional</li>
      </ul>
      <h2 class="text-3xl font-bold text-white mt-12 mb-6">Real World Math</h2>
      <p class="mb-6 text-slate-400 leading-relaxed">
        If you miss 10 calls a week, and your average customer value is $500, that's $5,000 a week in potential revenue lost. An AI agent might cost $497/month. The ROI is immediate.
      </p>
    `,
  'human-vs-ai-receptionist': `
      <p class="mb-6 text-xl text-slate-300 leading-relaxed">
        Hiring staff is expensive. It's not just the salary—it's the taxes, benefits, training time, and turnover. Let's look at the numbers.
      </p>
      <h2 class="text-3xl font-bold text-white mt-12 mb-6">The True Cost of a Human</h2>
      <p class="mb-6 text-slate-400 leading-relaxed">
        A decent receptionist costs at least $3,000/month (often more). Add in payroll taxes and benefits, and you're looking at $40k-$50k per year.
        <br/><br/>
        And what do you get? 40 hours of coverage a week. That leaves 128 hours a week where your business is technically "closed."
      </p>
      <h2 class="text-3xl font-bold text-white mt-12 mb-6">The AI Advantage</h2>
      <p class="mb-6 text-slate-400 leading-relaxed">
        Brandverse AI plans start at a fraction of a full-time salary. You get 168 hours of coverage per week. No sick days. No bad attitudes. No training ramp-up.
      </p>
    `,
};

function defaultArticleBody(article: Article): string {
  return `
    <p class="mb-6 text-xl text-slate-300 leading-relaxed">${article.excerpt}</p>
    <h2 class="text-3xl font-bold text-white mt-12 mb-6">Why this matters for your business</h2>
    <p class="mb-6 text-slate-400 leading-relaxed">
      Local service businesses lose revenue every day from missed calls, slow follow-up, and manual bottlenecks.
      AI voice agents fix the highest-leverage gap first: <strong class="text-white">instant response and qualified booking</strong>—without adding payroll.
    </p>
    <h2 class="text-3xl font-bold text-white mt-12 mb-6">What to do next</h2>
    <ul class="list-disc pl-6 space-y-2 text-slate-400 mb-8">
      <li>Audit where leads are leaking (missed calls, voicemail, slow SMS)</li>
      <li>Deploy a branded AI agent that books into your calendar or CRM</li>
      <li>Measure booked appointments and cost-per-lead weekly</li>
    </ul>
    <p class="mb-6 text-slate-400 leading-relaxed">
      Want a custom plan for your industry? Book a free strategy call with Brandverse—we'll map quick wins for your workflow.
    </p>
  `;
}

export type BlogPost = Article & { content: string };

export function getBlogPost(slug: string): BlogPost | null {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  return {
    ...article,
    content: CONTENT_OVERRIDES[slug] ?? defaultArticleBody(article),
  };
}

export function getAllBlogSlugs(): string[] {
  return articles.map((a) => a.slug);
}
