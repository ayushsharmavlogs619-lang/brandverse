import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('childcare-daycare-enrollment-ai')!;

export const metadata = {
  title: 'AI for Childcare Centers: Automating Tours, Enrollment, and Parent Communication | Brandverse',
  description: 'Daycare centers, preschools, and childcare facilities use AI voice agents to handle enrollment inquiries, schedule tours, manage waitlists, send daily updates to parents, process billing questions, and handle after-hours calls 24/7.',
  openGraph: { title: 'AI for Childcare Centers: Automating Tours, Enrollment, and Parent Communication', description: 'Daycare centers, preschools, and childcare facilities use AI voice agents to handle enrollment inquiries, schedule tours, manage waitlists, send daily updates to parents, process billing questions, and handle after-hours calls 24/7.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'AI for Childcare Centers: Automating Tours, Enrollment, and Parent Communication', description: 'Daycare centers, preschools, and childcare facilities use AI voice agents to handle enrollment inquiries, schedule tours, manage waitlists, send daily updates to parents, process billing questions, and handle after-hours calls 24/7.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/childcare-daycare-enrollment-ai' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="AI for Childcare Centers: Automating Tours, Enrollment, and Parent Communication"
      subtitle="Daycare centers, preschools, and childcare facilities use AI voice agents to handle enrollment inquiries, schedule tours, manage waitlists, send daily updates to parents, process billing questions, and handle after-hours calls 24/7."
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
