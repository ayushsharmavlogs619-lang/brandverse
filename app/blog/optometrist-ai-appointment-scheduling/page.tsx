import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('optometrist-ai-appointment-scheduling')!;

export const metadata = {
  title: 'AI Appointment Scheduling for Optometrists: Fill Your Calendar with Confirmed Patients',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Appointment Scheduling for Optometrists: Fill Your Calendar with Confirmed Patients',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Appointment Scheduling for Optometrists: Fill Your Calendar with Confirmed Patients',
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
    canonical: 'https://brandverse.tech/blog/optometrist-ai-appointment-scheduling',
  },
  keywords: ['AI appointment scheduling optometrist', 'eye care practice automation', 'AI phone agent optometry', 'automated patient booking eye clinic', 'reduce no-shows optometry'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Appointment Scheduling for Optometrists: Fill Your Calendar with Confirmed Patients"
      subtitle="How eye care practices use AI voice agents to book exams, handle insurance questions, and reduce no-shows 24/7."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="blue"
      keywords={['AI appointment scheduling optometrist', 'eye care practice automation', 'AI phone agent optometry', 'automated patient booking eye clinic', 'reduce no-shows optometry']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="healthcare"
        industry="optometry and eye care"
      />
    </ArticleLayout>
  );
}
