import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('electrical-business-automation-guide')!;

export const metadata = {
    title: 'Electrical Business Automation: A Step-by-Step Guide | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Electrical Business Automation: A Step-by-Step Guide | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Electrical Business Automation: A Step-by-Step Guide | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/electrical-business-automation-guide' },
    keywords: ['electrical business automation', 'automate electrical contractor', 'electrical contractor software automation', 'electrical dispatch automation', 'AI for electrical contractors'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Electrical Business Automation: A Step-by-Step Guide"
            subtitle="Automate your electrical business from the first phone call to the final invoice. No coding required."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="9 min read"
            category={POST.category}
            accent="blue"
            keywords={['electrical business automation', 'automate electrical contractor', 'electrical contractor software automation', 'electrical dispatch automation', 'AI for electrical contractors']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
