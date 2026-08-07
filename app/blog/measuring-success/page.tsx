import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('measuring-success')!;

export const metadata = {
  title: 'Measuring AI Agent Performance & KPIs | Brandverse',
  description: 'KPIs and dashboards you should track to measure the success of your AI voice agent.',
  keywords: ['AI agent KPIs', 'voice AI performance metrics', 'AI receptionist analytics', 'call center AI measurement'],
  openGraph: { title: 'Measuring AI Agent Performance & KPIs', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Measuring AI Agent Performance & KPIs', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/measuring-success' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Measuring AI Agent Performance & KPIs"
      subtitle="KPIs and dashboards you should track to measure the success of your AI voice agent."
      description={post.excerpt}
      date="Jan 3, 2025"
      readTime="9 min read"
      category={post.category}
      accent="indigo"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}