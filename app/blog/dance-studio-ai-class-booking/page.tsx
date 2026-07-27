import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('dance-studio-ai-class-booking')!;

export const metadata = {
  title: 'AI Class Booking for Dance Studios: Automate Enrollment, Recitals, and Studio Management',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Class Booking for Dance Studios: Automate Enrollment, Recitals, and Studio Management',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Class Booking for Dance Studios: Automate Enrollment, Recitals, and Studio Management',
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
    canonical: 'https://brandverse.tech/blog/dance-studio-ai-class-booking',
  },
  keywords: ['AI class booking dance studio', 'dance studio automation', 'AI phone agent dance', 'automated enrollment dance', 'dance studio parent communication'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Class Booking for Dance Studios: Automate Enrollment, Recitals, and Studio Management"
      subtitle="How dance studios use AI voice agents to book trial classes, manage recital registrations, handle costume inquiries, and communicate with parents 24/7."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="rose"
      keywords={['AI class booking dance studio', 'dance studio automation', 'AI phone agent dance', 'automated enrollment dance', 'dance studio parent communication']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="performing arts"
        industry="dance studio"
      />
    </ArticleLayout>
  );
}
