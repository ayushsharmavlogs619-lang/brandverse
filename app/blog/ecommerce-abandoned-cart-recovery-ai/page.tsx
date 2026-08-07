import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('ecommerce-abandoned-cart-recovery-ai')!;

export const metadata = {
  title: 'Winning Back Lost Sales: AI Voice for Abandoned Cart Recovery | Brandverse',
  description: 'How ecommerce businesses use AI voice agents to recover abandoned carts with intelligent outbound calls that convert lost sales into revenue.',
  openGraph: { title: 'Winning Back Lost Sales: AI Voice for Abandoned Cart Recovery', description: 'How ecommerce businesses use AI voice agents to recover abandoned carts with intelligent outbound calls that convert lost sales into revenue.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'Winning Back Lost Sales: AI Voice for Abandoned Cart Recovery', description: 'How ecommerce businesses use AI voice agents to recover abandoned carts with intelligent outbound calls that convert lost sales into revenue.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/ecommerce-abandoned-cart-recovery-ai' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Winning Back Lost Sales: AI Voice for Abandoned Cart Recovery"
      subtitle="How ecommerce businesses use AI voice agents to recover abandoned carts with intelligent outbound calls that convert lost sales into revenue."
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
