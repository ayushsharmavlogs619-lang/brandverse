import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('voice-cloning-ethics')!;

export const metadata = {
  title: 'Voice Cloning: Ethics & Best Practices | Brandverse',
  description: 'Guidance on using voice cloning responsibly and building consent-forward experiences for customers.',
  keywords: ['voice cloning ethics', 'AI voice cloning best practices', 'consent-forward AI', 'voice synthesis ethics'],
  openGraph: { title: 'Voice Cloning: Ethics & Best Practices', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Voice Cloning: Ethics & Best Practices', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/voice-cloning-ethics' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Voice Cloning: Ethics & Best Practices"
      subtitle="Guidance on using voice cloning responsibly and building consent-forward experiences for customers."
      description={post.excerpt}
      date="Jan 3, 2025"
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