import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('multilingual-outreach')!;

export const metadata = {
  title: 'Multilingual Outreach Strategies | Brandverse',
  description: 'How to use multilingual AI agents to expand market reach and improve lead capture.',
  keywords: ['multilingual AI outreach', 'language AI agents', 'multilingual lead generation', 'AI translation calls'],
  openGraph: { title: 'Multilingual Outreach Strategies', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Multilingual Outreach Strategies', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/multilingual-outreach' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Multilingual Outreach Strategies"
      subtitle="How to use multilingual AI agents to expand market reach and improve lead capture."
      description={post.excerpt}
      date="Jan 3, 2025"
      readTime="9 min read"
      category={post.category}
      accent="emerald"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}