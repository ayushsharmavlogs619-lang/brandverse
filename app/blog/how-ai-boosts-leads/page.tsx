import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('how-ai-boosts-leads')!;

export const metadata = {
  title: 'How AI Voice Agents Boost Leads by 200% | Brandverse',
  description: 'The math behind 24/7 instant lead response.',
  keywords: ['AI lead boost', 'voice agent ROI', 'lead generation AI', '24/7 lead capture'],
  openGraph: { title: 'How AI Voice Agents Boost Leads by 200%', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'How AI Voice Agents Boost Leads by 200%', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/how-ai-boosts-leads' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="How AI Voice Agents Boost Leads by 200%"
      subtitle="The math behind 24/7 instant lead response."
      description={post.excerpt}
      date="Dec 12, 2024"
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