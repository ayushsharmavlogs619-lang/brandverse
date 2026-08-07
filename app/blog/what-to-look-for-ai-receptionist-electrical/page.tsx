import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('what-to-look-for-ai-receptionist-electrical')!;

export const metadata = {
    title: 'What to Look for in an AI Receptionist for Your Electrical Business | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'What to Look for in an AI Receptionist for Your Electrical Business | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'What to Look for in an AI Receptionist for Your Electrical Business | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/what-to-look-for-ai-receptionist-electrical' },
    keywords: ['AI receptionist electrical contractor', 'AI answering service electrician', 'best AI phone system contractor', 'electrical business phone automation', 'choose AI receptionist electrical'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="What to Look for in an AI Receptionist for Your Electrical Business"
            subtitle="A buyer guide for electrical contractors evaluating AI receptionists — features that matter, pricing models, and deal-breakers to avoid."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="9 min read"
            category={POST.category}
            accent="blue"
            keywords={['AI receptionist electrical contractor', 'AI answering service electrician', 'best AI phone system contractor', 'electrical business phone automation', 'choose AI receptionist electrical']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
