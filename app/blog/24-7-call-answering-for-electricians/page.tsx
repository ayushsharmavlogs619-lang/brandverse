import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('24-7-call-answering-for-electricians')!;

export const metadata = {
    title: '24/7 Call Answering for Electrical Contractors | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: '24/7 Call Answering for Electrical Contractors | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: '24/7 Call Answering for Electrical Contractors | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/24-7-call-answering-for-electricians' },
    keywords: ['24/7 call answering electricians', 'after-hours electrical calls', 'emergency electrical dispatch', '24 hour electrician answering service', 'electrical on-call automation'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="24/7 Call Answering for Electrical Contractors: What You Need to Know"
            subtitle="How round-the-clock AI call answering captures emergency panel upgrades, after-hours calls, and weekend estimates."
            description={POST.excerpt}
            date="Jul 31, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="blue"
            keywords={['24/7 call answering electricians', 'after-hours electrical calls', 'emergency electrical dispatch', '24 hour electrician answering service', 'electrical on-call automation']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="electrical contractor" industry="electrical" />
        </ArticleLayout>
    );
}
