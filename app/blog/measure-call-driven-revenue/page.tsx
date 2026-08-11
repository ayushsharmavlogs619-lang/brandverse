import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('measure-call-driven-revenue')!;

export const metadata = {
    title: 'Phone Calls Are Revenue Data: How to Measure What Your Inbound Calls Are Worth | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Phone Calls Are Revenue Data: How to Measure What Your Inbound Calls Are Worth | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Phone Calls Are Revenue Data: How to Measure What Your Inbound Calls Are Worth | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/measure-call-driven-revenue' },
    keywords: ['call revenue tracking', 'answer rate metric', 'phone leads measurement', 'call analytics local business', 'revenue per call'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Phone Calls Are Revenue Data: How to Measure What Your Inbound Calls Are Worth"
            subtitle="Most owners cannot answer one question: how much revenue came from the phone last month? A practical system for call tracking, conversion, and revenue per call."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="green"
            keywords={['call revenue tracking', 'answer rate metric', 'phone leads measurement', 'call analytics local business', 'revenue per call']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="Measure the Phone Like a Channel"
            ctaSubheadline="Brandverse measures your real call funnel — rates, leaks, and the dollar value of each one."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/blog/measuring-success', text: 'Measuring AI Agent Performance & KPIs' },
                { href: '/blog/voice-analytics-conversation-intelligence', text: 'Voice Analytics & Conversation Intelligence' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="business owner" industry="business" />
        </ArticleLayout>
    );
}