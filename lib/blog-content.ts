import { articles, type Article } from '@/app/lib/articles';

const categoryLinkMap: Record<string, { guides: string[]; caseStudy: string; calculator: string }> = {
  'Industry Focus': {
    guides: ['/blog/ai-receptionist-guide-2026', '/blog/ultimate-guide-business-automation'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Guides': {
    guides: ['/blog/ai-receptionist-pricing-guide', '/blog/ai-receptionist-migration-guide'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Comparison': {
    guides: ['/blog/ai-receptionist-guide-2026', '/blog/voice-ai-vs-human-receptionists'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Lead Generation': {
    guides: ['/blog/stop-losing-leads-after-hours', '/blog/how-ai-boosts-leads'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Customer Experience': {
    guides: ['/blog/ai-voice-agents-transforming-customer-service', '/blog/voice-ai-ethics-trust'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Operations': {
    guides: ['/blog/ultimate-guide-business-automation', '/blog/internal-operations-ai-automation'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Growth Strategy': {
    guides: ['/blog/scaling-multi-location', '/blog/multilingual-outreach'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Technical Guide': {
    guides: ['/blog/crm-integration-guide', '/blog/crm-automation-blueprint'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Analytics': {
    guides: ['/blog/measuring-success', '/blog/voice-analytics-conversation-intelligence'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Implementation': {
    guides: ['/blog/onboarding-checklist', '/blog/change-management-ai-adoption'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Legal & Compliance': {
    guides: ['/blog/tcpa-gdpr-compliance', '/blog/hipaa-compliance-ai-healthcare'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Ethics & Trust': {
    guides: ['/blog/voice-ai-ethics-trust', '/blog/voice-cloning-ethics'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
  'Templates & Scripts': {
    guides: ['/blog/scripts-that-convert', '/blog/sms-followups'],
    caseStudy: '/case-studies',
    calculator: '/roi-calculator',
  },
};

function buildLinks(category: string): { guides: string[]; caseStudy: string; calculator: string } {
  return categoryLinkMap[category] || categoryLinkMap['Guides'];
}

function industryCaseStudyMap(article: Article): string | null {
  const slugLower = article.slug.toLowerCase();
  if (slugLower.includes('hvac')) return '/case-studies/hvac';
  if (slugLower.includes('plumb') || slugLower.includes('pipe')) return '/case-studies/plumbing';
  if (slugLower.includes('electrical') || slugLower.includes('electric')) return '/case-studies/electricians';
  if (slugLower.includes('roof')) return '/case-studies/roofing';
  if (slugLower.includes('dental') || slugLower.includes('dentist')) return '/case-studies/dental';
  if (slugLower.includes('medical') || slugLower.includes('health') || slugLower.includes('clinic')) return '/case-studies/medical';
  if (slugLower.includes('legal') || slugLower.includes('law')) return '/case-studies/legal';
  if (slugLower.includes('property') || slugLower.includes('tenant')) return '/case-studies/property-management';
  if (slugLower.includes('restaurant') || slugLower.includes('reservation')) return '/case-studies/restaurants';
  if (slugLower.includes('salon') || slugLower.includes('spa')) return '/case-studies/salons';
  if (slugLower.includes('auto') || slugLower.includes('car')) return '/case-studies/auto-repair';
  if (slugLower.includes('home')) return '/case-studies/home-services';
  return null;
}

/** Rich HTML overrides (optional). Falls back to a full article template from metadata. */
const CONTENT_OVERRIDES: Record<string, string> = {
  'how-ai-boosts-leads': `
    <section class="space-y-6">
      <p class="text-slate-400 leading-8 text-lg">Let's face it: relying on voicemail is like throwing money into a black hole. In 2024, if you do not answer the phone, your customer calls the next business on Google. It is that simple.</p>
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">The Speed to Lead Problem</h2>
      <p class="text-slate-400 leading-8 text-lg">Statistics show that lead qualification drops by 80% if you wait more than 5 minutes to respond. Yet, most contractors are busy on job sites and can not answer calls instantly. This is where AI voice agents bridge the gap. Unlike a human receptionist who takes breaks, goes home at 5 PM, and can only handle one call at a time, an AI agent is available 24/7/365, instantly scalable, and always professional.</p>
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Real World Math</h2>
      <p class="text-slate-400 leading-8 text-lg">If you miss 10 calls a week, and your average customer value is $500, that is $5,000 a week in potential revenue lost. An AI agent might cost a few hundred dollars per month. The ROI is immediate. Use our <a href="/roi-calculator" class="text-blue-400 underline hover:text-blue-300">ROI calculator</a> to see your exact numbers.</p>
    </section>`,
  'human-vs-ai-receptionist': `
    <section class="space-y-6">
      <p class="text-slate-400 leading-8 text-lg">Hiring staff is expensive. It is not just the salary — it is the taxes, benefits, training time, and turnover.</p>
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">The True Cost of a Human</h2>
      <p class="text-slate-400 leading-8 text-lg">A decent receptionist costs at least $3,000/month. Add in payroll taxes and benefits, and you are looking at $40k-$50k per year. And what do you get? 40 hours of coverage a week. That leaves 128 hours a week where your business is technically closed.</p>
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">The AI Advantage</h2>
      <p class="text-slate-400 leading-8 text-lg">Brandverse AI plans start at a fraction of a full-time salary. You get 168 hours of coverage per week. No sick days. No bad attitudes. No training ramp-up. Read our <a href="/blog/voice-ai-vs-human-receptionists" class="text-blue-400 underline hover:text-blue-300">full comparison of AI vs human receptionists</a>.</p>
    </section>`,
};

function defaultArticleBody(article: Article): string {
  const links = buildLinks(article.category);
  const caseStudyLink = industryCaseStudyMap(article);
  const relatedGuides = links.guides.map((g, i) => {
    const guide = articles.find(a => `/blog/${a.slug}` === g);
    return guide ? guide : null;
  }).filter(Boolean);

  const guideLinks = relatedGuides.slice(0, 2).map(g =>
    `<a href="/blog/${(g as Article).slug}" class="text-blue-400 underline hover:text-blue-300">${(g as Article).title}</a>`
  );

  return `
    <section class="space-y-6">
      <p class="text-slate-400 leading-8 text-lg">${article.excerpt}</p>
      <p class="text-slate-400 leading-8 text-lg">Every missed call is a missed opportunity. When a potential customer calls your business and gets voicemail, they do not leave a message — they call your competitor. In 2026, consumers expect instant responses. Businesses that cannot deliver lose 40% or more of their inbound leads to competitors who answer.</p>
      <p class="text-slate-400 leading-8 text-lg">AI voice agents solve this problem permanently. They answer every call instantly, 24 hours a day, 7 days a week, 365 days a year. They never take breaks, never call in sick, and never have bad days. Every caller gets the same professional, consistent experience — every single time.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Why This Matters for Your Business</h2>
      <p class="text-slate-400 leading-8 text-lg">The average service business loses 20-40% of inbound calls. For a business receiving 100 calls per month with an average job value of $500, that is $10,000-$20,000 in monthly revenue walking out the door — every single month.</p>
      <p class="text-slate-400 leading-8 text-lg">AI voice agents fix the highest-leverage gap first: instant response and qualified booking — without adding payroll. They qualify every lead, book appointments directly into your calendar, and log everything in your CRM.</p>
      ${caseStudyLink ? `<p class="text-slate-400 leading-8 text-lg">See how businesses in your industry achieve these results: <a href="${caseStudyLink}" class="text-blue-400 underline hover:text-blue-300">Read our ${article.category.toLowerCase()} case study</a>.</p>` : ''}
      <p class="text-slate-400 leading-8 text-lg">Want to calculate exactly how much your business is losing? Try our <a href="/roi-calculator" class="text-blue-400 underline hover:text-blue-300">interactive ROI calculator</a> for a personalized estimate.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">The Solution: AI Voice Agents</h2>
      <p class="text-slate-400 leading-8 text-lg">AI voice agents use natural language processing to understand callers, qualify leads, book appointments, and handle routine inquiries — all in a natural, human-like conversation. Unlike clunky IVR phone trees that frustrate callers, modern AI agents sound natural and adapt to each caller's needs.</p>
      <p class="text-slate-400 leading-8 text-lg">Key capabilities include:</p>
      <ul class="list-disc ml-6 space-y-2 text-slate-400 leading-relaxed">
        <li><strong class="text-white">24/7 Call Answering:</strong> Every call is answered instantly, never sent to voicemail</li>
        <li><strong class="text-white">Appointment Booking:</strong> Checks calendar availability and books directly into your schedule</li>
        <li><strong class="text-white">Lead Qualification:</strong> Asks qualifying questions and scores leads before routing</li>
        <li><strong class="text-white">CRM Integration:</strong> Automatically logs calls, updates records, and syncs data</li>
        <li><strong class="text-white">SMS Follow-ups:</strong> Sends confirmations, reminders, and follow-up messages</li>
        <li><strong class="text-white">Multilingual Support:</strong> Speaks 50+ languages fluently</li>
      </ul>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Industry Applications</h2>
      <p class="text-slate-400 leading-8 text-lg">AI voice agents deliver results across industries. Service businesses with high inbound call volume see the strongest ROI — particularly HVAC, plumbing, medical, dental, legal, real estate, and home services.</p>
      <p class="text-slate-400 leading-8 text-lg">${guideLinks.length > 0 ? `For more specific guidance, read: ${guideLinks.join(' and ')}.` : ''}</p>
      ${caseStudyLink ? `<p class="text-slate-400 leading-8 text-lg">Industry-specific results: <a href="${caseStudyLink}" class="text-blue-400 underline hover:text-blue-300">View case studies</a> from businesses like yours.</p>` : ''}
      <p class="text-slate-400 leading-8 text-lg">Every industry has unique call handling challenges. Whether it is emergency dispatch for HVAC, appointment no-shows for dental practices, or client intake for law firms, AI voice agents can be trained on your specific terminology, workflows, and compliance requirements.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Implementation Timeline</h2>
      <p class="text-slate-400 leading-8 text-lg">Deploying an AI voice agent is faster than hiring and training a human receptionist. Most businesses go from sign-up to live in 2-3 weeks:</p>
      <ul class="list-disc ml-6 space-y-2 text-slate-400 leading-relaxed">
        <li><strong class="text-white">Week 1:</strong> Discovery, script design, and CRM integration setup</li>
        <li><strong class="text-white">Week 2:</strong> AI training, testing, and refinement with your team</li>
        <li><strong class="text-white">Week 3:</strong> Go-live, monitoring, and optimization</li>
      </ul>
      <p class="text-slate-400 leading-8 text-lg">See our detailed <a href="/implementation" class="text-blue-400 underline hover:text-blue-300">implementation guide</a> for the complete process.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Measuring Success</h2>
      <p class="text-slate-400 leading-8 text-lg">Track these key metrics to measure the impact of your AI voice agent:</p>
      <ul class="list-disc ml-6 space-y-2 text-slate-400 leading-relaxed">
        <li><strong class="text-white">Answer Rate:</strong> Percentage of calls answered (target: 100%)</li>
        <li><strong class="text-white">Booking Rate:</strong> Percentage of calls that result in booked appointments</li>
        <li><strong class="text-white">Lead Capture Rate:</strong> Percentage of leads successfully qualified and captured</li>
        <li><strong class="text-white">Cost Per Lead:</strong> Monthly AI cost divided by leads captured</li>
        <li><strong class="text-white">Customer Satisfaction:</strong> Post-call ratings and sentiment analysis</li>
      </ul>
      <p class="text-slate-400 leading-8 text-lg">Our <a href="/blog/measuring-success" class="text-blue-400 underline hover:text-blue-300">KPI measurement guide</a> provides detailed tracking frameworks.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Ready to Take Action?</h2>
      <p class="text-slate-400 leading-8 text-lg">The cost of inaction is clear: every day without an AI voice agent means more missed calls, more lost leads, and more revenue handed to competitors who answer their phones.</p>
      <p class="text-slate-400 leading-8 text-lg">Start by <a href="/roi-calculator" class="text-blue-400 underline hover:text-blue-300">calculating your potential ROI</a>, then <a href="/pricing" class="text-blue-400 underline hover:text-blue-300">explore pricing</a> or <a href="/demo" class="text-blue-400 underline hover:text-blue-300">see a live demo</a> of Brandverse AI in action.</p>
    </section>
  `;
}

export type BlogPost = Article & {
  content: string;
  faqs?: { question: string; answer: string }[];
  takeaways?: string[];
  ctaHeadline?: string;
  ctaSubheadline?: string;
};

export function getBlogPost(slug: string): BlogPost | null {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;

  const baseFAQs = [
    { question: 'How much does an AI voice agent cost?', answer: 'AI voice agents typically range from $300 to $1,500 per month depending on call volume, features, and integrations. Compared to a human receptionist at $2,500-$4,500/month plus benefits, the savings are substantial.' },
    { question: 'How long does it take to set up an AI voice agent?', answer: 'Basic setup takes 1-3 days. Full customization with custom scripts and CRM integration typically takes 1-2 weeks. Most businesses go live within 2-3 weeks.' },
    { question: 'Will customers be frustrated talking to an AI?', answer: 'Research shows that customers care more about getting fast, accurate answers than whether they are speaking to a human or AI. Most customers prefer AI because it eliminates hold times and provides consistent information.' },
    { question: 'Can the AI handle complex or emotional calls?', answer: 'Yes. AI voice agents are programmed with escalation rules. If a caller is frustrated, the request is complex, or the caller explicitly asks for a human, the AI seamlessly transfers the call to a designated team member.' },
  ];

  return {
    ...article,
    content: CONTENT_OVERRIDES[slug] ?? defaultArticleBody(article),
    faqs: baseFAQs,
    takeaways: [
      'AI voice agents answer every call, 24/7, and never put callers on hold',
      'They cost 80-90% less than a human receptionist per hour of coverage',
      'Setup takes 1-3 weeks, not months — most businesses go live quickly',
      'Integration with your calendar and CRM is essential for full value',
      'Most businesses see positive ROI within the first 30 days of deployment',
      'AI voice agents work across every industry — from HVAC to healthcare',
    ],
    ctaHeadline: 'Ready to Never Miss Another Lead?',
    ctaSubheadline: 'See how Brandverse AI can handle your business calls 24/7, book appointments, and capture every lead.',
  };
}

export function getAllBlogSlugs(): string[] {
  return articles.map((a) => a.slug);
}
