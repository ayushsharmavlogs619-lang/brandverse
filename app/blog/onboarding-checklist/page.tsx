import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('onboarding-checklist')!;

export const metadata = {
  title: 'Onboarding Checklist for AI Agents | Brandverse',
  description: 'A step-by-step onboarding checklist to get your AI agent live and converting quickly.',
  keywords: ['AI agent onboarding', 'voice agent setup', 'AI receptionist deployment', 'implementation checklist'],
  openGraph: { title: 'Onboarding Checklist for AI Agents', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Onboarding Checklist for AI Agents', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/onboarding-checklist' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Onboarding Checklist for AI Agents"
      subtitle="A step-by-step onboarding checklist to get your AI agent live and converting quickly."
      description={post.excerpt}
      date="Jan 3, 2025"
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