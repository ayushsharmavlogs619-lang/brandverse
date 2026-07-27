import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('yoga-studio-ai-member-engagement')!;

export const metadata = {
  title: 'AI Member Engagement for Yoga Studios: Automate Class Bookings, Memberships, and Wellness Communication',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Member Engagement for Yoga Studios: Automate Class Bookings, Memberships, and Wellness Communication',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Member Engagement for Yoga Studios: Automate Class Bookings, Memberships, and Wellness Communication',
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
    canonical: 'https://brandverse.tech/blog/yoga-studio-ai-member-engagement',
  },
  keywords: ['AI member engagement yoga', 'yoga studio automation', 'AI phone agent yoga', 'automated class booking yoga', 'yoga studio membership management'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Member Engagement for Yoga Studios: Automate Class Bookings, Memberships, and Wellness Communication"
      subtitle="How yoga studios, pilates studios, and barre fitness businesses use AI to deepen member engagement and streamline operations."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="emerald"
      keywords={['AI member engagement yoga', 'yoga studio automation', 'AI phone agent yoga', 'automated class booking yoga', 'yoga studio membership management']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="fitness & wellness"
        industry="yoga studio"
      />
    </ArticleLayout>
  );
}
