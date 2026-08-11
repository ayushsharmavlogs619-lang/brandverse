import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('reduce-no-shows-guide')!;

export const metadata = {
    title: 'The No-Show System: How to Cut Missed Appointments by More Than Half | Brandverse',
    description: POST.excerpt,
    openGraph: {
        title: 'The No-Show System: How to Cut Missed Appointments by More Than Half | Brandverse',
        description: POST.excerpt,
        type: 'article' as const,
        siteName: 'Brandverse',
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: 'The No-Show System: How to Cut Missed Appointments by More Than Half | Brandverse',
        description: POST.excerpt,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/reduce-no-shows-guide' },
    keywords: ['reduce no shows', 'no show appointment system', 'appointment reminders', 'waitlist automation', 'cancelation fill'],
};

export default function Post() {
    return (
        <ArticleLayout
            slug={POST.slug}
            title="The No-Show System: How to Cut Missed Appointments by More Than Half"
            subtitle="No-shows quietly cost service businesses five figures a year. A practical system of confirmations, reminders, waitlists, and instant rebooking that closes the gap."
            description={POST.excerpt}
            date="Aug 5, 2026"
            readTime="8 min read"
            category={POST.category}
            accent="emerald"
            keywords={['reduce no shows', 'no show appointment system', 'appointment reminders', 'waitlist automation', 'cancelation fill']}
            takeaways={POST.takeaways}
            faqs={POST.faqs}
            ctaHeadline="Close the Gaps, Fill the Slots"
            ctaSubheadline="Brandverse AI books, confirms, reminds, and fills cancellations — see the system in action for your industry."
            internalLinks={[
                { href: '/audit', text: 'Book a Brandverse Audit' },
                { href: '/blog/ai-appointment-setting', text: '24/7 Appointment Setting' },
                { href: '/blog/sms-followups', text: 'Automated SMS Follow-Ups That Convert' },
            ]}
        >
            <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
            <BookingContactSection businessType="appointment-based business" industry="appointment-based" />
        </ArticleLayout>
    );
}