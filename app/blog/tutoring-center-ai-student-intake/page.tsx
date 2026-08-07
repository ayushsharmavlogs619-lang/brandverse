import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('tutoring-center-ai-student-intake')!;

export const metadata = {
  title: 'AI Student Intake for Tutoring Centers: Automate Enrollment and Parent Communication',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Student Intake for Tutoring Centers: Automate Enrollment and Parent Communication',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Student Intake for Tutoring Centers: Automate Enrollment and Parent Communication',
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
    canonical: 'https://brandverse.tech/blog/tutoring-center-ai-student-intake',
  },
  keywords: ['AI student intake tutoring', 'tutoring center automation', 'AI phone agent education', 'automated enrollment tutoring', 'parent communication AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Student Intake for Tutoring Centers: Automate Enrollment and Parent Communication"
      subtitle="How tutoring centers, learning academies, and educational services use AI to handle parent inquiries, assess student needs, and book trial sessions."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="violet"
      keywords={['AI student intake tutoring', 'tutoring center automation', 'AI phone agent education', 'automated enrollment tutoring', 'parent communication AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="education"
        industry="tutoring"
      />
    </ArticleLayout>
  );
}
