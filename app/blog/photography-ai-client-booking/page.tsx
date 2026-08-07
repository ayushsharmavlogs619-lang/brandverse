import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('photography-ai-client-booking')!;

export const metadata = {
  title: 'AI Client Booking for Photographers: Automate Sessions, Galleries, and Client Communication',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Client Booking for Photographers: Automate Sessions, Galleries, and Client Communication',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Client Booking for Photographers: Automate Sessions, Galleries, and Client Communication',
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
    canonical: 'https://brandverse.tech/blog/photography-ai-client-booking',
  },
  keywords: ['AI client booking photographer', 'photography studio automation', 'AI phone agent photographer', 'automated session booking', 'photography client communication'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Client Booking for Photographers: Automate Sessions, Galleries, and Client Communication"
      subtitle="How photographers, photo studios, and creative professionals use AI to book sessions, answer pricing questions, and deliver seamless client experiences."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="amber"
      keywords={['AI client booking photographer', 'photography studio automation', 'AI phone agent photographer', 'automated session booking', 'photography client communication']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="creative services"
        industry="photography"
      />
    </ArticleLayout>
  );
}
