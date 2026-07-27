import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('construction-bidding-automation')!;

export const metadata = {
  title: 'Automating Bids: How to Quote Jobs While You Sleep | Brandverse',
  description: 'Stop driving for tire kickers. Pre-qualify construction leads automatically.',
  keywords: ['construction bidding automation', 'automated quoting system', 'construction lead qualification', 'contractor phone automation'],
  openGraph: { title: 'Automating Bids: How to Quote Jobs While You Sleep', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Automating Bids: How to Quote Jobs While You Sleep', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/construction-bidding-automation' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Automating Bids: How to Quote Jobs While You Sleep"
      subtitle="Stop driving for tire kickers. Pre-qualify construction leads automatically."
      description={post.excerpt}
      date="Jan 2, 2025"
      readTime="9 min read"
      category={post.category}
      accent="amber"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}