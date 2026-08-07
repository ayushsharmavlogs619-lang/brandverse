import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('car-wash-ai-customer-communication')!;

export const metadata = {
  title: 'AI Customer Communication for Car Washes: Automate Memberships, Bookings, and Inquiries',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Customer Communication for Car Washes: Automate Memberships, Bookings, and Inquiries',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Customer Communication for Car Washes: Automate Memberships, Bookings, and Inquiries',
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
    canonical: 'https://brandverse.tech/blog/car-wash-ai-customer-communication',
  },
  keywords: ['AI customer service car wash', 'car wash automation', 'AI phone agent car wash', 'automated membership sales car wash', 'car wash fleet account AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Customer Communication for Car Washes: Automate Memberships, Bookings, and Inquiries"
      subtitle="How car wash businesses use AI voice agents to sell unlimited wash memberships, handle customer questions, and manage fleet accounts 24/7."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="7 min read"
      category={POST.category}
      accent="cyan"
      keywords={['AI customer service car wash', 'car wash automation', 'AI phone agent car wash', 'automated membership sales car wash', 'car wash fleet account AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="automotive services"
        industry="car wash"
      />
    </ArticleLayout>
  );
}
