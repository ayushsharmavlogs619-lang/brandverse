import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('internal-operations-ai-automation')!;

export const metadata = {
  title: 'Beyond Customer-Facing: Using AI Voice for Internal Operations and Team Coordination | Brandverse',
  description: 'How businesses use AI voice agents for employee shift scheduling, IT help desk, supply chain coordination, and inter-departmental notifications.',
  openGraph: { title: 'Beyond Customer-Facing: Using AI Voice for Internal Operations and Team Coordination', description: 'How businesses use AI voice agents for employee shift scheduling, IT help desk, supply chain coordination, and inter-departmental notifications.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'Beyond Customer-Facing: Using AI Voice for Internal Operations and Team Coordination', description: 'How businesses use AI voice agents for employee shift scheduling, IT help desk, supply chain coordination, and inter-departmental notifications.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/internal-operations-ai-automation' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Beyond Customer-Facing: Using AI Voice for Internal Operations and Team Coordination"
      subtitle="How businesses use AI voice agents for employee shift scheduling, IT help desk, supply chain coordination, and inter-departmental notifications."
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
