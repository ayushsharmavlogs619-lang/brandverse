import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('sms-followups')!;

export const metadata = {
  title: 'Automated SMS Follow-ups that Convert | Brandverse',
  description: 'Best practices for SMS confirmations and follow-ups that increase show-rates and conversions.',
  keywords: ['SMS follow-up automation', 'AI SMS campaigns', 'appointment reminder SMS', 'text marketing automation'],
  openGraph: { title: 'Automated SMS Follow-ups that Convert', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Automated SMS Follow-ups that Convert', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/sms-followups' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Automated SMS Follow-ups that Convert"
      subtitle="Best practices for SMS confirmations and follow-ups that increase show-rates and conversions."
      description={post.excerpt}
      date="Jan 3, 2025"
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