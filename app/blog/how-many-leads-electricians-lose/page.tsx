import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('how-many-leads-electricians-lose')!;

export const metadata = {
    title: 'How Many Leads Do Electricians Lose to Missed Calls? (2026 Data) | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'How Many Leads Do Electricians Lose to Missed Calls? (2026 Data) | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'How Many Leads Do Electricians Lose to Missed Calls? (2026 Data) | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/how-many-leads-electricians-lose' },
    keywords: ['electrical contractor missed calls data', 'electrician lead loss statistics', 'electrical call answer rate', 'electrical contractor lead capture', 'electrician phone answering statistics'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="How Many Leads Do Electricians Lose to Missed Calls? (2026 Data)"
            subtitle="New industry data reveals exactly how many electrical service calls go unanswered — and what that costs in real dollars."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="7 min read"
            category={POST.category}
            accent="blue"
            keywords={['electrical contractor missed calls data', 'electrician lead loss statistics', 'electrical call answer rate', 'electrical contractor lead capture', 'electrician phone answering statistics']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
