import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('case-study-apex-property')!;

export const metadata = {
  title: 'Deployment Playbook: Real Estate Lead Response | Brandverse',
  description: 'Scaling trust through personal branding and automation.',
  keywords: ['real estate playbook', 'property group automation', 'Brandverse deployment playbook'],
  openGraph: { title: 'Deployment Playbook: Real Estate Lead Response', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Deployment Playbook: Real Estate Lead Response', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/case-study-apex-property' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Deployment Playbook: Real Estate Lead Response"
      subtitle="Scaling trust through personal branding and automation."
      description={post.excerpt}
      date="Dec 18, 2024"
      readTime="9 min read"
      category={post.category}
      accent="blue"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-200/90 leading-relaxed mb-8">
        <strong className="text-amber-300 font-black uppercase tracking-widest text-xs block mb-1">Illustrative Example</strong>
        This is a deployment playbook — a representative example of how Brandverse qualifies real estate leads, not a claim about a specific client's results.
      </div>
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}