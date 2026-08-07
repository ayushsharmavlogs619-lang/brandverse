import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('tcpa-gdpr-compliance')!;

export const metadata = {
  title: 'Telecom & Privacy Compliance (TCPA/GDPR) | Brandverse',
  description: 'Practical checklist for TCPA and GDPR when deploying AI voice agents.',
  keywords: ['TCPA compliance AI', 'GDPR voice AI', 'telecom regulations AI', 'AI call compliance'],
  openGraph: { title: 'Telecom & Privacy Compliance (TCPA/GDPR)', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Telecom & Privacy Compliance (TCPA/GDPR)', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/tcpa-gdpr-compliance' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Telecom & Privacy Compliance (TCPA/GDPR)"
      subtitle="Practical checklist for TCPA and GDPR when deploying AI voice agents."
      description={post.excerpt}
      date="Jan 3, 2025"
      readTime="9 min read"
      category={post.category}
      accent="red"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}