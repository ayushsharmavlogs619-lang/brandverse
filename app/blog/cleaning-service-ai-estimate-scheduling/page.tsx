import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('cleaning-service-ai-estimate-scheduling')!;

export const metadata = {
  title: 'AI Estimate Scheduling for Cleaning Services: Automate Quotes, Bookings, and Recurring Contracts',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Estimate Scheduling for Cleaning Services: Automate Quotes, Bookings, and Recurring Contracts',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Estimate Scheduling for Cleaning Services: Automate Quotes, Bookings, and Recurring Contracts',
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
    canonical: 'https://brandverse.tech/blog/cleaning-service-ai-estimate-scheduling',
  },
  keywords: ['AI estimate scheduling cleaning', 'cleaning service automation', 'AI phone agent cleaning', 'automated cleaning booking', 'cleaning service recurring contracts'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Estimate Scheduling for Cleaning Services: Automate Quotes, Bookings, and Recurring Contracts"
      subtitle="How residential and commercial cleaning companies use AI to handle estimate requests, schedule services, and manage recurring client accounts."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="cyan"
      keywords={['AI estimate scheduling cleaning', 'cleaning service automation', 'AI phone agent cleaning', 'automated cleaning booking', 'cleaning service recurring contracts']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="home services"
        industry="cleaning services"
      />
    </ArticleLayout>
  );
}
