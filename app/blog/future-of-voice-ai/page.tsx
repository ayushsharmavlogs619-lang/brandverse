import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('future-of-voice-ai')!;

export const metadata = {
  title: 'The Future of Voice AI in Business: 2025-2030 | Brandverse',
  description: 'Forward-looking analysis of voice AI trends through 2030.',
  keywords: ['future of voice AI', 'voice AI trends', 'AI voice prediction', 'conversational AI future'],
  openGraph: { title: 'The Future of Voice AI in Business: 2025-2030', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'The Future of Voice AI in Business: 2025-2030', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/future-of-voice-ai' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="The Future of Voice AI in Business: 2025-2030"
      subtitle="Forward-looking analysis of voice AI trends through 2030."
      description={post.excerpt}
      date="Jul 27, 2026"
      readTime="9 min read"
      category={post.category}
      accent="purple"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}