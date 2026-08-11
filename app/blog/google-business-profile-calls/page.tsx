import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('google-business-profile-calls')!;

export const metadata = {
    title: 'Your Google Business Profile Generates Calls You Are Not Answering | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Your Google Business Profile Generates Calls You Are Not Answering | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Your Google Business Profile Generates Calls You Are Not Answering | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/google-business-profile-calls' },
    keywords: ['google business profile calls', 'local business missed calls', 'google maps leads', 'answer rate local business', 'profile call tracking'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Your Google Business Profile Generates Calls You Are Not Answering"
            subtitle="For most local businesses, Google Maps is the #1 source of phone leads — and the most ignored. Track profile-driven calls, measure what they are worth, and stop leaking them."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="7 min read"
            category={POST.category}
            accent="blue"
            keywords={['google business profile calls', 'local business missed calls', 'google maps leads', 'answer rate local business', 'profile call tracking']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="See What Your Profile Is Really Making You"
            ctaSubheadline="Let Brandverse measure your profile-driven call losses and close the capture gap — starting this week."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/contact', text: 'Contact the Brandverse Team' },
                { href: '/blog/missed-call-recovery-systems', text: 'Missed Call Recovery Systems' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="local service business" industry="local service" />
        </ArticleLayout>
    );
}