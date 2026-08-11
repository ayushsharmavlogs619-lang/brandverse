import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('call-triage-and-routing')!;

export const metadata = {
    title: 'Inbound Call Triage: How to Qualify, Route, Book, and Escalate Every Call | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Inbound Call Triage: How to Qualify, Route, Book, and Escalate Every Call | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Inbound Call Triage: How to Qualify, Route, Book, and Escalate Every Call | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/call-triage-and-routing' },
    keywords: ['call triage', 'inbound call routing', 'call qualification', 'escalation rules', 'phone system design'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Inbound Call Triage: How to Qualify, Route, Book, and Escalate Every Call"
            subtitle="Every inbound call should end in a defined outcome — inspection booked, routed to a human, or handled. A blueprint for call flows that protect margin and customer experience."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="red"
            keywords={['call triage', 'inbound call routing', 'call qualification', 'escalation rules', 'phone system design']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="Turn the Phone Into a System"
            ctaSubheadline="Brandverse builds the flows, scripts, and integrations that route every call to the right outcome."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/blog/ai-lead-qualification', text: 'AI Lead Qualification' },
                { href: '/blog/crm-integration-guide', text: 'CRM & Calendar Integration Guide' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="business owner" industry="business" />
        </ArticleLayout>
    );
}