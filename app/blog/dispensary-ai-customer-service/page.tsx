import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('dispensary-ai-customer-service')!;

export const metadata = {
  title: 'AI Customer Service for Cannabis Dispensaries: Handle Budtender Calls 24/7',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Customer Service for Cannabis Dispensaries: Handle Budtender Calls 24/7',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Customer Service for Cannabis Dispensaries: Handle Budtender Calls 24/7',
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
    canonical: 'https://brandverse.tech/blog/dispensary-ai-customer-service',
  },
  keywords: ['AI customer service dispensary', 'cannabis dispensary automation', 'AI phone agent dispensary', 'automated budtender calls', 'dispensary compliance AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Customer Service for Cannabis Dispensaries: Handle Budtender Calls 24/7"
      subtitle="Keep your dispensary connected with AI voice agents that handle product questions, order status, and compliance verification around the clock."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="9 min read"
      category={POST.category}
      accent="green"
      keywords={['AI customer service dispensary', 'cannabis dispensary automation', 'AI phone agent dispensary', 'automated budtender calls', 'dispensary compliance AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="retail"
        industry="cannabis dispensary"
      />
    </ArticleLayout>
  );
}
