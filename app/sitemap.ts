
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://brandverse.tech';

    const routes = [
        '',
        '/features',
        '/process',
        '/pricing',
        '/faq',
        '/contact',
        '/privacy',
        '/terms',
        '/blog',
        '/blog/case-study-elite-climate',
        '/blog/case-study-apex-property',
        '/blog/case-study-brightsmile-dental',
        '/blog/why-never-regret-ai-agents',
        '/blog/cost-of-not-using-ai',
        '/blog/5-signs-youre-ready',
        '/blog/ai-voice-roi',
        '/blog/crm-integration-guide',
        '/blog/how-ai-boosts-leads',
        '/blog/measuring-success',
        '/blog/multilingual-outreach',
        '/blog/onboarding-checklist',
        '/blog/scaling-multi-location',
        '/blog/scripts-that-convert',
        '/blog/sms-followups',
        '/blog/tcpa-gdpr-compliance',
        '/blog/voice-cloning-ethics',
        '/demos',
        '/demos/voice',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
