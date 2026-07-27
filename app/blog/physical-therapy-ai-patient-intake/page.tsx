import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('physical-therapy-ai-patient-intake')!;

export const metadata = {
  title: 'AI Patient Intake for Physical Therapy Clinics: Automate New Patient Onboarding',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Patient Intake for Physical Therapy Clinics: Automate New Patient Onboarding',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Patient Intake for Physical Therapy Clinics: Automate New Patient Onboarding',
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
    canonical: 'https://brandverse.tech/blog/physical-therapy-ai-patient-intake',
  },
  keywords: ['AI patient intake physical therapy', 'PT clinic automation', 'AI phone agent physical therapy', 'automated patient scheduling PT', 'physical therapy front desk automation'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Patient Intake for Physical Therapy Clinics: Automate New Patient Onboarding"
      subtitle="Reduce administrative burden and get new PT patients scheduled faster with AI-powered phone automation."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="emerald"
      keywords={['AI patient intake physical therapy', 'PT clinic automation', 'AI phone agent physical therapy', 'automated patient scheduling PT', 'physical therapy front desk automation']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="healthcare"
        industry="physical therapy"
      />
    </ArticleLayout>
  );
}
