import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('choose-crm-service-business')!;

export const metadata = {
    title: 'How to Choose a CRM for Your Service Business: A Practical Buying Guide | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'How to Choose a CRM for Your Service Business: A Practical Buying Guide | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'How to Choose a CRM for Your Service Business: A Practical Buying Guide | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/choose-crm-service-business' },
    keywords: ['choose crm', 'crm for service business', 'ServiceTitan vs Housecall Pro vs Jobber', 'field service crm', 'crm buying guide'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="How to Choose a CRM for Your Service Business: A Practical Buying Guide"
            subtitle="The right CRM becomes your revenue backbone; the wrong one becomes an expensive spreadsheet. Compare field-service platforms, sales CRMs, and light options on the criteria that actually matter."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="9 min read"
            category={POST.category}
            accent="cyan"
            keywords={['choose crm', 'crm for service business', 'ServiceTitan vs Housecall Pro vs Jobber', 'field service crm', 'crm buying guide']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="Buy a CRM You Will Actually Feed"
            ctaSubheadline="Get Brandverse's take on your tool stack and see how AI logging keeps any CRM alive."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/blog/crm-integration-guide', text: 'CRM & Calendar Integration Guide' },
                { href: '/blog/crm-automation-blueprint', text: 'The CRM Automation Blueprint' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="service business owner" industry="service" />
        </ArticleLayout>
    );
}