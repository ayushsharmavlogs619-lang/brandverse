import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('dry-cleaning-ai-order-management')!;

export const metadata = {
  title: 'AI Order Management for Dry Cleaning Businesses: Automate Pickup, Delivery, and Customer Inquiries',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Order Management for Dry Cleaning Businesses: Automate Pickup, Delivery, and Customer Inquiries',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Order Management for Dry Cleaning Businesses: Automate Pickup, Delivery, and Customer Inquiries',
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
    canonical: 'https://brandverse.tech/blog/dry-cleaning-ai-order-management',
  },
  keywords: ['AI order management dry cleaning', 'dry cleaning business automation', 'AI phone agent dry cleaning', 'automated dry cleaning pickup', 'dry cleaning customer service AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Order Management for Dry Cleaning Businesses: Automate Pickup, Delivery, and Customer Inquiries"
      subtitle="How dry cleaners and laundry services use AI to handle order status inquiries, schedule pickup and delivery, manage special care instructions, and build customer loyalty."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="7 min read"
      category={POST.category}
      accent="rose"
      keywords={['AI order management dry cleaning', 'dry cleaning business automation', 'AI phone agent dry cleaning', 'automated dry cleaning pickup', 'dry cleaning customer service AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="retail services"
        industry="dry cleaning"
      />
    </ArticleLayout>
  );
}
