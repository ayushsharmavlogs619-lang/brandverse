import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('ai-call-scoring-quality-assurance')!;

export const metadata = {
  title: 'AI Call Scoring: How to Measure and Improve Your Phone Performance | Brandverse',
  description: 'How automated call scoring measures greeting quality, objection handling, compliance adherence, and sentiment to improve every phone conversation.',
  openGraph: { title: 'AI Call Scoring: How to Measure and Improve Your Phone Performance', description: 'How automated call scoring measures greeting quality, objection handling, compliance adherence, and sentiment to improve every phone conversation.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'AI Call Scoring: How to Measure and Improve Your Phone Performance', description: 'How automated call scoring measures greeting quality, objection handling, compliance adherence, and sentiment to improve every phone conversation.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/ai-call-scoring-quality-assurance' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="AI Call Scoring: How to Measure and Improve Your Phone Performance"
      subtitle="How automated call scoring measures greeting quality, objection handling, compliance adherence, and sentiment to improve every phone conversation."
      description={post.excerpt}
      date="Jul 27, 2026"
      readTime="9 min read"
      category={post.category}
      accent="blue"
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}
