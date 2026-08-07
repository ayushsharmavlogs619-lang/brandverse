import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('ai-vs-ivr-comparison')!;

export const metadata = {
  title: 'AI vs IVR: Why Traditional Phone Trees Are Obsolete | Brandverse',
  description: 'Feature-by-feature comparison of AI voice agents versus traditional IVR phone trees.',
  keywords: ['AI vs IVR', 'voice AI vs phone tree', 'IVR replacement', 'AI phone system comparison'],
  openGraph: { title: 'AI vs IVR: Why Traditional Phone Trees Are Obsolete', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'AI vs IVR: Why Traditional Phone Trees Are Obsolete', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/ai-vs-ivr-comparison' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="AI vs IVR: Why Traditional Phone Trees Are Obsolete"
      subtitle="Feature-by-feature comparison of AI voice agents versus traditional IVR phone trees."
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