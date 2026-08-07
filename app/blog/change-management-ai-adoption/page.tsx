import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('change-management-ai-adoption')!;

export const metadata = {
  title: 'Getting Your Team Onboard: Change Management for AI Adoption | Brandverse',
  description: 'How to manage the human side of AI adoption: addressing employee fears, building buy-in, phased rollout strategies, training, and adoption metrics.',
  openGraph: { title: 'Getting Your Team Onboard: Change Management for AI Adoption', description: 'How to manage the human side of AI adoption: addressing employee fears, building buy-in, phased rollout strategies, training, and adoption metrics.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'Getting Your Team Onboard: Change Management for AI Adoption', description: 'How to manage the human side of AI adoption: addressing employee fears, building buy-in, phased rollout strategies, training, and adoption metrics.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/change-management-ai-adoption' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Getting Your Team Onboard: Change Management for AI Adoption"
      subtitle="How to manage the human side of AI adoption: addressing employee fears, building buy-in, phased rollout strategies, training, and adoption metrics."
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
