import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('how-ai-improves-customer-experience-electricians')!;

export const metadata = {
    title: 'How AI Improves Customer Experience for Electrical Contractors | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'How AI Improves Customer Experience for Electrical Contractors | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'How AI Improves Customer Experience for Electrical Contractors | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/how-ai-improves-customer-experience-electricians' },
    keywords: ['AI customer experience electrical', 'electrical contractor customer service', 'AI answering service electricians', 'electrical call customer experience', 'electrical service customer satisfaction'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="How AI Improves Customer Experience for Electrical Contractors"
            subtitle="Why homeowners and commercial clients actually prefer instant AI answers over waiting for a callback."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="blue"
            keywords={['AI customer experience electrical', 'electrical contractor customer service', 'AI answering service electricians', 'electrical call customer experience', 'electrical service customer satisfaction']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
