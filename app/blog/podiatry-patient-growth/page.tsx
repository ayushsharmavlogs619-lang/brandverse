import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('podiatry-patient-growth')!;

export const metadata = {
  title: 'Step Up Your Practice: Filling Cancellations with AI in Podiatry | Brandverse',
  description: 'Automate orthotic updates and fill last-minute slots from your waitlist.',
  keywords: ['podiatry practice growth', 'AI cancellation fill', 'podiatrist scheduling', 'medical appointment automation'],
  openGraph: { title: 'Step Up Your Practice: Filling Cancellations with AI in Podiatry', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Step Up Your Practice: Filling Cancellations with AI in Podiatry', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/podiatry-patient-growth' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Step Up Your Practice: Filling Cancellations with AI in Podiatry"
      subtitle="Automate orthotic updates and fill last-minute slots from your waitlist."
      description={post.excerpt}
      date="Jan 2, 2025"
      readTime="9 min read"
      category={post.category}
      accent="teal"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}