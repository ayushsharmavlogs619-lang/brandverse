import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('insurance-lead-automation')!;

export const metadata = {
  title: 'AI for Insurance Agents: Automating Quotes, Claims, and Policy Renewals | Brandverse',
  description: 'Independent insurance agencies use AI voice agents to handle quote requests 24/7, automate policy renewal calls, triage FNOL claims, and pre-qualify commercial and personal lines leads with seamless AMS integration.',
  openGraph: { title: 'AI for Insurance Agents: Automating Quotes, Claims, and Policy Renewals', description: 'Independent insurance agencies use AI voice agents to handle quote requests 24/7, automate policy renewal calls, triage FNOL claims, and pre-qualify commercial and personal lines leads with seamless AMS integration.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'AI for Insurance Agents: Automating Quotes, Claims, and Policy Renewals', description: 'Independent insurance agencies use AI voice agents to handle quote requests 24/7, automate policy renewal calls, triage FNOL claims, and pre-qualify commercial and personal lines leads with seamless AMS integration.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/insurance-lead-automation' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="AI for Insurance Agents: Automating Quotes, Claims, and Policy Renewals"
      subtitle="Independent insurance agencies use AI voice agents to handle quote requests 24/7, automate policy renewal calls, triage FNOL claims, and pre-qualify commercial and personal lines leads with seamless AMS integration."
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
