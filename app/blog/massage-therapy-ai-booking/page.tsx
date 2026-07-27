import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('massage-therapy-ai-booking')!;

export const metadata = {
  title: 'AI Booking for Massage Therapy Businesses: Fill Your Table 24/7',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Booking for Massage Therapy Businesses: Fill Your Table 24/7',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Booking for Massage Therapy Businesses: Fill Your Table 24/7',
    description: POST.excerpt,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://brandverse.tech/blog/massage-therapy-ai-booking',
  },
  keywords: ['AI booking massage therapy', 'massage spa automation', 'AI phone agent massage', 'automated appointment booking massage', 'wellness center AI receptionist'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Booking for Massage Therapy Businesses: Fill Your Table 24/7"
      subtitle="How massage therapists, spas, and wellness centers use AI to book appointments, sell gift certificates, and manage memberships automatically."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="purple"
      keywords={['AI booking massage therapy', 'massage spa automation', 'AI phone agent massage', 'automated appointment booking massage', 'wellness center AI receptionist']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="wellness"
        industry="massage therapy"
      />
    </ArticleLayout>
  );
}
