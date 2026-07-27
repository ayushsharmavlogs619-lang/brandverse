import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('electrician-ai-customer-calls')!;

export const metadata = {
  title: 'AI Customer Calls for Electricians: Automate Emergency Dispatch, Estimates, and Scheduling',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Customer Calls for Electricians: Automate Emergency Dispatch, Estimates, and Scheduling',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Customer Calls for Electricians: Automate Emergency Dispatch, Estimates, and Scheduling',
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
    canonical: 'https://brandverse.tech/blog/electrician-ai-customer-calls',
  },
  keywords: ['AI customer calls electrician', 'electrical contractor automation', 'AI phone agent electrician', 'automated dispatch electrician', 'electrical estimate scheduling AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Customer Calls for Electricians: Automate Emergency Dispatch, Estimates, and Scheduling"
      subtitle="How electrical contractors use AI voice agents to handle emergency calls, estimate requests, and service scheduling 24/7 without tying up the office."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="blue"
      keywords={['AI customer calls electrician', 'electrical contractor automation', 'AI phone agent electrician', 'automated dispatch electrician', 'electrical estimate scheduling AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="home services"
        industry="electrical contractor"
      />
    </ArticleLayout>
  );
}
