import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('from-missed-calls-to-booked-jobs-electricians')!;

export const metadata = {
    title: 'From Missed Calls to Booked Jobs: How Electricians Win with AI | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'From Missed Calls to Booked Jobs: How Electricians Win with AI | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'From Missed Calls to Booked Jobs: How Electricians Win with AI | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/from-missed-calls-to-booked-jobs-electricians' },
    keywords: ['electrician AI success stories', 'electrical contractor AI case study', 'AI answered calls electrician results', 'electrician AI receptionist results', 'electrical business AI ROI'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="From Missed Calls to Booked Jobs: How Electricians Win with AI"
            subtitle="Real electrical contractors share how they turned missed calls into booked jobs and recovered thousands in lost monthly revenue."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="blue"
            keywords={['electrician AI success stories', 'electrical contractor AI case study', 'AI answered calls electrician results', 'electrician AI receptionist results', 'electrical business AI ROI']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
