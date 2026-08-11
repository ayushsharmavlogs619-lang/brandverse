import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('chatbot-vs-ai-voice-agent')!;

export const metadata = {
    title: 'Website Chatbot vs AI Voice Agent: Which One Does Your Business Need First? | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Website Chatbot vs AI Voice Agent: Which One Does Your Business Need First? | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Website Chatbot vs AI Voice Agent: Which One Does Your Business Need First? | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/chatbot-vs-ai-voice-agent' },
    keywords: ['chatbot vs voice AI', 'website chatbot', 'AI voice agent', 'chatbot or voice agent', 'phone answering automation'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Website Chatbot vs AI Voice Agent: Which One Does Your Business Need First?"
            subtitle="Chatbots answer questions on your website; voice agents answer calls. Compare coverage, cost, and conversion impact to decide where your first automation dollar goes."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="rose"
            keywords={['chatbot vs voice AI', 'website chatbot', 'AI voice agent', 'chatbot or voice agent', 'phone answering automation']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="Pick the Tool That Pays First"
            ctaSubheadline="Brandverse will measure your call volume and conversion to tell you plainly which automation pays for itself first."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/demos', text: 'Hear an AI Voice Agent Live' },
                { href: '/blog/ai-vs-ivr-comparison', text: 'AI vs IVR Comparison' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="business owner" industry="business" />
        </ArticleLayout>
    );
}