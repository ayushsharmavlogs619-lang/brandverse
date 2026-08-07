import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('healthcare-no-show-cure')!;

export const metadata = {
  title: 'The No-Show Cure: AI Appointment Reminders for Clinics | Brandverse',
  description: 'Eliminate schedule gaps with conversational AI that fills cancellations instantly.',
  keywords: ['healthcare no-show reduction', 'AI appointment reminders', 'medical clinic automation', 'patient scheduling AI'],
  openGraph: { title: 'The No-Show Cure: AI Appointment Reminders for Clinics', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'The No-Show Cure: AI Appointment Reminders for Clinics', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/healthcare-no-show-cure' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="The No-Show Cure: AI Appointment Reminders for Clinics"
      subtitle="Eliminate schedule gaps with conversational AI that fills cancellations instantly."
      description={post.excerpt}
      date="Jan 2, 2025"
      readTime="9 min read"
      category={post.category}
      accent="green"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}