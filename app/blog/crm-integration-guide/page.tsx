import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('crm-integration-guide')!;

export const metadata = {
  title: 'CRM & Calendar Integration Guide | Brandverse',
  description: 'How to connect Brandverse to ServiceTitan, Housecall Pro, Calendly, and CRMs.',
  keywords: ['AI CRM integration', 'calendar sync AI', 'ServiceTitan integration', 'Brandverse CRM setup'],
  openGraph: { title: 'CRM & Calendar Integration Guide', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'CRM & Calendar Integration Guide', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/crm-integration-guide' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="CRM & Calendar Integration Guide"
      subtitle="How to connect Brandverse to ServiceTitan, Housecall Pro, Calendly, and CRMs."
      description={post.excerpt}
      date="Jan 3, 2025"
      readTime="9 min read"
      category={post.category}
      accent="blue"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}