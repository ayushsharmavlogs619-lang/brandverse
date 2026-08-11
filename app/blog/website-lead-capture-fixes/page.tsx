import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('website-lead-capture-fixes')!;

export const metadata = {
    title: 'Your Website Is Leaking Leads: 9 Fixes That Pay for Themselves | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Your Website Is Leaking Leads: 9 Fixes That Pay for Themselves | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Your Website Is Leaking Leads: 9 Fixes That Pay for Themselves | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/website-lead-capture-fixes' },
    keywords: ['website lead conversion', 'increase website leads', 'click to call', 'lead capture optimization', 'service business website'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Your Website Is Leaking Leads: 9 Fixes That Pay for Themselves"
            subtitle="You do not need a redesign to capture more leads. These nine conversion fixes — forms, call buttons, speed, follow-up — recover revenue your website already generates."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="violet"
            keywords={['website lead conversion', 'increase website leads', 'click to call', 'lead capture optimization', 'service business website']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="Stop Leaking, Start Converting"
            ctaSubheadline="Let Brandverse trace your website's actual revenue leaks and hand you a fix list ranked by dollars recovered."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/contact', text: 'Talk to the Brandverse Team' },
                { href: '/blog/hidden-cost-good-enough-web-design', text: 'The Hidden Cost of "Good Enough" Web Design' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="service business" industry="service" />
        </ArticleLayout>
    );
}