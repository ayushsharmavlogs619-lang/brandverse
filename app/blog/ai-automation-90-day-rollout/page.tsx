import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('ai-automation-90-day-rollout')!;

export const metadata = {
    title: 'The 90-Day AI Rollout: A Realistic Automation Roadmap for Service Businesses | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'The 90-Day AI Rollout: A Realistic Automation Roadmap for Service Businesses | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'The 90-Day AI Rollout: A Realistic Automation Roadmap for Service Businesses | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/ai-automation-90-day-rollout' },
    keywords: ['ai rollout plan', 'automation roadmap', 'ai for small business roadmap', 'what to automate first', 'ai adoption plan'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="The 90-Day AI Rollout: A Realistic Automation Roadmap for Service Businesses"
            subtitle="Which automation first? A week-by-week roadmap for deploying AI call handling, appointment setting, and follow-up — with the metrics that prove it is working."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="9 min read"
            category={POST.category}
            accent="purple"
            keywords={['ai rollout plan', 'automation roadmap', 'ai for small business roadmap', 'what to automate first', 'ai adoption plan']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="Start Week Zero This Week"
            ctaSubheadline="Let Brandverse run the baseline audit and map your 90-day plan against real call data."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/blog/onboarding-checklist', text: 'Onboarding Checklist for AI Agents' },
                { href: '/blog/change-management-ai-adoption', text: 'Change Management for AI Adoption' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="service business owner" industry="service" />
        </ArticleLayout>
    );
}