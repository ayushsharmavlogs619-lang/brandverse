import ArticleLayout from '../../components/Article/ArticleLayout';
import BookingContactSection from '../../components/Article/BookingContactSection';
import { getBlogPost } from '@/lib/blog-content';

const POST = getBlogPost('catering-ai-event-coordination')!;

export const metadata = {
  title: 'AI Event Coordination for Catering Companies: Automate Quotes, Menus, and Event Logistics',
  description: POST.excerpt,
  openGraph: {
    title: 'AI Event Coordination for Catering Companies: Automate Quotes, Menus, and Event Logistics',
    description: POST.excerpt,
    type: 'article' as const,
    siteName: 'Brandverse',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AI Event Coordination for Catering Companies: Automate Quotes, Menus, and Event Logistics',
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
    canonical: 'https://brandverse.tech/blog/catering-ai-event-coordination',
  },
  keywords: ['AI catering event coordination', 'catering company automation', 'AI phone agent catering', 'automated catering quotes', 'catering menu management AI'],
};

export default function Post() {
  return (
    <ArticleLayout
      slug={POST.slug}
      title="AI Event Coordination for Catering Companies: Automate Quotes, Menus, and Event Logistics"
      subtitle="How catering businesses use AI to handle menu inquiries, quote requests, tasting scheduling, and event day coordination without missing a single lead."
      description={POST.excerpt}
      date="Jul 27, 2026"
      readTime="8 min read"
      category={POST.category}
      accent="orange"
      keywords={['AI catering event coordination', 'catering company automation', 'AI phone agent catering', 'automated catering quotes', 'catering menu management AI']}
      takeaways={POST.takeaways}
      faqs={POST.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: POST.content }} />
      <BookingContactSection
        businessType="food service"
        industry="catering"
      />
    </ArticleLayout>
  );
}
