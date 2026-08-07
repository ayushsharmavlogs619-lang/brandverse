import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('scripts-that-convert')!;

export const metadata = {
  title: 'High-Converting Call Scripts (Examples) | Brandverse',
  description: 'Real script examples that convert callers into booked appointments.',
  keywords: ['AI call scripts', 'converting phone scripts', 'voice agent script examples', 'appointment booking scripts'],
  openGraph: { title: 'High-Converting Call Scripts (Examples)', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'High-Converting Call Scripts (Examples)', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/scripts-that-convert' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="High-Converting Call Scripts (Examples)"
      subtitle="Real script examples that convert callers into booked appointments."
      description={post.excerpt}
      date="Jan 3, 2025"
      readTime="9 min read"
      category={post.category}
      accent="amber"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}