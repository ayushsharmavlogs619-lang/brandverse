import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('martial-arts-ai-student-retention')!;

export const metadata = {
  title: 'AI Student Retention for Martial Arts Schools: Automate Belts, Attendance, and Member Communication',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Student Retention for Martial Arts Schools: Automate Belts, Attendance, and Member Communication',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Student Retention for Martial Arts Schools: Automate Belts, Attendance, and Member Communication',
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
    canonical: 'https://brandverse.tech/blog/martial-arts-ai-student-retention',
  },
  keywords: ['AI student retention martial arts', 'martial arts school automation', 'AI phone agent martial arts', 'automated belt testing scheduling', 'martial arts membership management'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Student Retention for Martial Arts Schools: Automate Belts, Attendance, and Member Communication"
      subtitle="How martial arts schools use AI to handle trial class bookings, belt testing schedules, membership inquiries, and student retention communications."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="orange"
      keywords={['AI student retention martial arts', 'martial arts school automation', 'AI phone agent martial arts', 'automated belt testing scheduling', 'martial arts membership management']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="martial arts"
        industry="martial arts school"
      />
    </ArticleLayout>
  );
}
