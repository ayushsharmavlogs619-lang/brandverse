import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('case-study-apex-property')!;

export const metadata = {
  title: 'Case Study: Apex Property Group | Brandverse',
  description: 'Scaling trust through personal branding and automation.',
  keywords: ['real estate case study', 'property group automation', 'Brandverse case study'],
  openGraph: { title: 'Case Study: Apex Property Group', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Case Study: Apex Property Group', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/case-study-apex-property' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Case Study: Apex Property Group"
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
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}