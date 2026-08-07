import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('how-to-grow-an-electrical-business')!;

export const metadata = {
    title: 'How to Grow an Electrical Business: The Complete Guide | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'How to Grow an Electrical Business: The Complete Guide | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'How to Grow an Electrical Business: The Complete Guide | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/how-to-grow-an-electrical-business' },
    keywords: ['grow electrical business', 'electrical contractor growth', 'scale electrical company', 'electrical business systems', 'electrical contractor marketing'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="How to Grow an Electrical Business: The Complete Guide"
            subtitle="Systems, tools, and strategies that turn a one-truck electrical operation into a multi-crew business."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="10 min read"
            category={POST.category}
            accent="blue"
            keywords={['grow electrical business', 'electrical contractor growth', 'scale electrical company', 'electrical business systems', 'electrical contractor marketing']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
