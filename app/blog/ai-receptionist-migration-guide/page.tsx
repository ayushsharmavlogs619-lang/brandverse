import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('ai-receptionist-migration-guide')!;

export const metadata = {
  title: 'AI Receptionist Migration Guide: Switching from Human to AI Without Losing Calls | Brandverse',
  description: 'A step-by-step migration playbook for businesses switching from a human receptionist to an AI receptionist without missing a single call.',
  openGraph: { title: 'AI Receptionist Migration Guide: Switching from Human to AI Without Losing Calls', description: 'A step-by-step migration playbook for businesses switching from a human receptionist to an AI receptionist without missing a single call.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'AI Receptionist Migration Guide: Switching from Human to AI Without Losing Calls', description: 'A step-by-step migration playbook for businesses switching from a human receptionist to an AI receptionist without missing a single call.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/ai-receptionist-migration-guide' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="AI Receptionist Migration Guide: Switching from Human to AI Without Losing Calls"
      subtitle="A step-by-step migration playbook for businesses switching from a human receptionist to an AI receptionist without missing a single call."
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
