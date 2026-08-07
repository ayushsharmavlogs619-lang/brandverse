import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('why-electricians-miss-more-jobs')!;

export const metadata = {
    title: 'Why Electricians Miss More Jobs Than They Realize | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Why Electricians Miss More Jobs Than They Realize | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Why Electricians Miss More Jobs Than They Realize | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/why-electricians-miss-more-jobs' },
    keywords: ['missed calls electrician', 'electrical contractor leads', 'answering service electrician', 'lost revenue electrical business', 'call tracking electrician'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Why Electricians Miss More Jobs Than They Realize"
            subtitle="Most electrical contractors have no idea how many calls slip through the cracks. The real number will surprise you."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="blue"
            keywords={['missed calls electrician', 'electrical contractor leads', 'answering service electrician', 'lost revenue electrical business', 'call tracking electrician']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
