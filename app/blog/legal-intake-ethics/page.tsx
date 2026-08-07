import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('legal-intake-ethics')!;

export const metadata = {
  title: 'Stop Missing Clients: The Ethics of AI Legal Intake | Brandverse',
  description: 'Law firms lose high-value cases to missed calls. Use AI for secure, instant client intake.',
  keywords: ['legal intake automation', 'law firm AI receptionist', 'client intake ethics', 'legal call answering'],
  openGraph: { title: 'Stop Missing Clients: The Ethics of AI Legal Intake', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Stop Missing Clients: The Ethics of AI Legal Intake', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/legal-intake-ethics' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Stop Missing Clients: The Ethics of AI Legal Intake"
      subtitle="Law firms lose high-value cases to missed calls. Use AI for secure, instant client intake."
      description={post.excerpt}
      date="Jan 2, 2025"
      readTime="9 min read"
      category={post.category}
      accent="violet"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}