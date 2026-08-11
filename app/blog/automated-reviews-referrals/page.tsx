import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('automated-reviews-referrals')!;

export const metadata = {
    title: 'Reviews and Referrals on Autopilot: Turn Happy Customers Into Your Marketing Team | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Reviews and Referrals on Autopilot: Turn Happy Customers Into Your Marketing Team | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Reviews and Referrals on Autopilot: Turn Happy Customers Into Your Marketing Team | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/automated-reviews-referrals' },
    keywords: ['automate review requests', 'get more google reviews', 'referral marketing automation', 'review request sms', 'word of mouth system'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Reviews and Referrals on Autopilot: Turn Happy Customers Into Your Marketing Team"
            subtitle="Timing is everything: ask for the review while the experience is fresh. How automated SMS follow-ups multiply reviews and referrals without nagging."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="7 min read"
            category={POST.category}
            accent="amber"
            keywords={['automate review requests', 'get more google reviews', 'referral marketing automation', 'review request sms', 'word of mouth system']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="Multiply What You Already Earned"
            ctaSubheadline="See how Brandverse automates the ask at the peak of satisfaction — ethically and on every job."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/blog/sms-followups', text: 'Automated SMS Follow-Ups That Convert' },
                { href: '/blog/ai-customer-retention', text: 'AI Customer Retention' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="service business" industry="service" />
        </ArticleLayout>
    );
}