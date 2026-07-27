import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('painting-contractor-ai-lead-generation')!;

export const metadata = {
  title: 'AI Lead Generation for Painting Contractors: Automate Estimates, Color Consultations, and Project Bids',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Lead Generation for Painting Contractors: Automate Estimates, Color Consultations, and Project Bids',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Lead Generation for Painting Contractors: Automate Estimates, Color Consultations, and Project Bids',
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
    canonical: 'https://brandverse.tech/blog/painting-contractor-ai-lead-generation',
  },
  keywords: ['AI lead generation painting contractor', 'painting contractor automation', 'AI phone agent painting', 'automated painting estimates', 'painting project management AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Lead Generation for Painting Contractors: Automate Estimates, Color Consultations, and Project Bids"
      subtitle="How painting contractors use AI to handle estimate requests, color consultation scheduling, and project management communication."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="purple"
      keywords={['AI lead generation painting contractor', 'painting contractor automation', 'AI phone agent painting', 'automated painting estimates', 'painting project management AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="home services"
        industry="painting contractor"
      />
    </ArticleLayout>
  );
}
