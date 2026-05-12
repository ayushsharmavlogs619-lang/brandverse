import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brandverse.tech'

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/features', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/process', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/portfolio', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/demos', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/demos/voice', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/audit', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

const BLOG_SLUGS = [
  '24-7-employee-paradox',
  '24-7-sales-revolution',
  '5-signs-youre-ready',
  'ai-voice-roi',
  'auto-service-retention',
  'case-study-apex-property',
  'case-study-brightsmile-dental',
  'case-study-elite-climate',
  'construction-bidding-automation',
  'cost-of-not-using-ai',
  'crm-automation-blueprint',
  'crm-integration-guide',
  'cure-data-blindness-analytics',
  'dermatology-cosmetic-bookings',
  'healthcare-no-show-cure',
  'hidden-cost-good-enough-web-design',
  'how-ai-boosts-leads',
  'hvac-dispatch-automation',
  'legal-intake-ethics',
  'measuring-success',
  'multilingual-outreach',
  'onboarding-checklist',
  'podiatry-patient-growth',
  'real-estate-lead-speed',
  'scaling-multi-location',
  'scaling-vs-swelling-automation',
  'scripts-that-convert',
  'sms-followups',
  'stop-burning-cash-customer-support',
  'stop-wasting-marketing-budget',
  'tcpa-gdpr-compliance',
  'voice-ai-ethics-trust',
  'voice-cloning-ethics',
  'why-never-regret-ai-agents',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    ...STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...BLOG_SLUGS.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
