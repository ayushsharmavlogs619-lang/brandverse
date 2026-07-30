import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('best-ai-tools-for-electrical-contractors')!;

export const metadata = {
    title: 'Best AI Tools for Electrical Contractors in 2026 | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'Best AI Tools for Electrical Contractors in 2026 | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'Best AI Tools for Electrical Contractors in 2026 | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/best-ai-tools-for-electrical-contractors' },
    keywords: ['AI tools electrical contractors', 'AI for electricians', 'best AI phone system electrician', 'electrical contractor software', 'AI receptionist electrical'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="Best AI Tools for Electrical Contractors in 2026"
            subtitle="A practical comparison of AI tools built for electrical contractors — from call handling to dispatch to CRM."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="9 min read"
            category={POST.category}
            accent="blue"
            keywords={['AI tools electrical contractors', 'AI for electricians', 'best AI phone system electrician', 'electrical contractor software', 'AI receptionist electrical']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
