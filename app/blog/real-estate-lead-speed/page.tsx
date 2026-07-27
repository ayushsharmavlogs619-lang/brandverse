import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('real-estate-lead-speed')!;

export const metadata = {
  title: 'The 5-Minute Lead Rule: How Top Realtors Automate Follow-Up | Brandverse',
  description: 'Lead response time is the #1 predictor of conversion. Automate your Zillow lead nurture.',
  keywords: ['real estate lead response', 'Zillow lead automation', 'realtor follow-up automation', 'real estate AI'],
  openGraph: { title: 'The 5-Minute Lead Rule: How Top Realtors Automate Follow-Up', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'The 5-Minute Lead Rule: How Top Realtors Automate Follow-Up', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/real-estate-lead-speed' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="The 5-Minute Lead Rule: How Top Realtors Automate Follow-Up"
      subtitle="Lead response time is the #1 predictor of conversion. Automate your Zillow lead nurture."
      description={post.excerpt}
      date="Jan 2, 2025"
      readTime="9 min read"
      category={post.category}
      accent="cyan"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}