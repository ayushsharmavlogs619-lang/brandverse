import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('chiropractic-ai-patient-intake')!;

export const metadata = {
  title: 'AI for Chiropractic Practices: Automate New Patient Intake, Insurance Verification, and Appointment Scheduling',
  description: POST.excerpt,
  openGraph: {
    title: 'AI for Chiropractic Practices: Automate New Patient Intake, Insurance Verification, and Appointment Scheduling',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI for Chiropractic Practices: Automate New Patient Intake, Insurance Verification, and Appointment Scheduling',
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
    canonical: 'https://brandverse.tech/blog/chiropractic-ai-patient-intake',
  },
  keywords: ['AI for chiropractic practices', 'chiropractic AI receptionist', 'chiropractic appointment scheduling', 'chiropractic patient intake', 'chiropractic front desk automation', 'AI receptionist for chiropractors', 'chiropractic call answering', 'chiropractic after-hours calls'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI for Chiropractic Practices: Automate New Patient Intake, Insurance Verification, and Appointment Scheduling"
      subtitle="The repetitive front-desk work that leaks new patients — and which parts of it AI should and should not handle."
      description={POST.excerpt}
      date="Aug 12, 2026"
      readTime="10 min read"
      category={POST.category}
      accent="violet"
      keywords={['AI for chiropractic practices', 'chiropractic AI receptionist', 'chiropractic appointment scheduling', 'chiropractic patient intake', 'chiropractic front desk automation', 'AI receptionist for chiropractors', 'chiropractic call answering', 'chiropractic after-hours calls']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
      internalLinks={[
        { href: '/blog/healthcare-no-show-cure', text: 'The No-Show Cure: AI Appointment Reminders for Clinics' },
        { href: '/blog/physical-therapy-ai-patient-intake', text: 'AI Patient Intake for Physical Therapy Clinics' },
        { href: '/blog/reduce-no-shows-guide', text: 'The No-Show System: How to Cut Missed Appointments by More Than Half' },
        { href: '/blog/hipaa-compliance-ai-healthcare', text: 'HIPAA-Compliant AI: What Healthcare Providers Must Know' },
        { href: '/audit', text: 'Book a Free Brandverse Audit' },
      ]}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="healthcare"
        industry="chiropractic"
      />
    </ArticleLayout>
  );
}
