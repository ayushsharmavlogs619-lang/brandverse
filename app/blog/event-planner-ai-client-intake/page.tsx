import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('event-planner-ai-client-intake')!;

export const metadata = {
  title: 'AI Client Intake for Event Planners: Automate Inquiries, Proposals, and Vendor Coordination',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Client Intake for Event Planners: Automate Inquiries, Proposals, and Vendor Coordination',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Client Intake for Event Planners: Automate Inquiries, Proposals, and Vendor Coordination',
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
    canonical: 'https://brandverse.tech/blog/event-planner-ai-client-intake',
  },
  keywords: ['AI client intake event planner', 'event planning automation', 'AI phone agent event planner', 'automated event inquiries', 'event planner vendor coordination'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Client Intake for Event Planners: Automate Inquiries, Proposals, and Vendor Coordination"
      subtitle="How event planning businesses use AI to qualify leads, send proposals, and coordinate with vendors — all while you focus on designing unforgettable events."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="9 min read"
      category={POST.category}
      accent="violet"
      keywords={['AI client intake event planner', 'event planning automation', 'AI phone agent event planner', 'automated event inquiries', 'event planner vendor coordination']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="event services"
        industry="event planning"
      />
    </ArticleLayout>
  );
}
