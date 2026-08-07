import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('pool-maintenance-ai-customer-scheduling')!;

export const metadata = {
  title: 'AI Customer Scheduling for Pool Maintenance: Automate Service Routes, Chemical Balancing, and Seasonal Openings',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Customer Scheduling for Pool Maintenance: Automate Service Routes, Chemical Balancing, and Seasonal Openings',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Customer Scheduling for Pool Maintenance: Automate Service Routes, Chemical Balancing, and Seasonal Openings',
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
    canonical: 'https://brandverse.tech/blog/pool-maintenance-ai-customer-scheduling',
  },
  keywords: ['AI customer scheduling pool maintenance', 'pool service automation', 'AI phone agent pool service', 'automated pool service routing', 'pool maintenance scheduling AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Customer Scheduling for Pool Maintenance: Automate Service Routes, Chemical Balancing, and Seasonal Openings"
      subtitle="How pool service companies use AI to handle maintenance inquiries, schedule weekly routes, manage chemical balancing calls, and book seasonal opening and closing services."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="cyan"
      keywords={['AI customer scheduling pool maintenance', 'pool service automation', 'AI phone agent pool service', 'automated pool service routing', 'pool maintenance scheduling AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="home services"
        industry="pool maintenance"
      />
    </ArticleLayout>
  );
}
