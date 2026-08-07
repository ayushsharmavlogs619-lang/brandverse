import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('moving-company-ai-customer-intake')!;

export const metadata = {
  title: 'AI Customer Intake for Moving Companies: Automate Quotes, Bookings, and Logistics Coordination',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Customer Intake for Moving Companies: Automate Quotes, Bookings, and Logistics Coordination',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Customer Intake for Moving Companies: Automate Quotes, Bookings, and Logistics Coordination',
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
    canonical: 'https://brandverse.tech/blog/moving-company-ai-customer-intake',
  },
  keywords: ['AI customer intake moving company', 'moving company automation', 'AI phone agent moving', 'automated moving quotes', 'moving logistics coordination AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Customer Intake for Moving Companies: Automate Quotes, Bookings, and Logistics Coordination"
      subtitle="How moving companies use AI to handle estimate requests, coordinate logistics, and provide real-time moving day updates to customers."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="9 min read"
      category={POST.category}
      accent="blue"
      keywords={['AI customer intake moving company', 'moving company automation', 'AI phone agent moving', 'automated moving quotes', 'moving logistics coordination AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="transportation & logistics"
        industry="moving services"
      />
    </ArticleLayout>
  );
}
