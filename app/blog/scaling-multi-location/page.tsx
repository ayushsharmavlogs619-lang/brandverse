import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('scaling-multi-location')!;

export const metadata = {
  title: 'Scaling Across Multiple Locations | Brandverse',
  description: 'Best practices for deploying AI agents across franchises, multi-location businesses, and regional teams.',
  keywords: ['multi-location AI', 'franchise automation', 'scaling voice agents', 'multi-site AI deployment'],
  openGraph: { title: 'Scaling Across Multiple Locations', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Scaling Across Multiple Locations', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/scaling-multi-location' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Scaling Across Multiple Locations"
      subtitle="Best practices for deploying AI agents across franchises, multi-location businesses, and regional teams."
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