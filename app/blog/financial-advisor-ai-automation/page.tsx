import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('financial-advisor-ai-automation')!;

export const metadata = {
  title: 'How Financial Advisors Use AI to Qualify Leads and Book Consultations | Brandverse',
  description: 'Financial advisors, wealth managers, and RIAs use AI voice agents to qualify leads by assets, goals, and timeline, book consultations, and integrate with CRM platforms.',
  openGraph: { title: 'How Financial Advisors Use AI to Qualify Leads and Book Consultations', description: 'Financial advisors, wealth managers, and RIAs use AI voice agents to qualify leads by assets, goals, and timeline, book consultations, and integrate with CRM platforms.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'How Financial Advisors Use AI to Qualify Leads and Book Consultations', description: 'Financial advisors, wealth managers, and RIAs use AI voice agents to qualify leads by assets, goals, and timeline, book consultations, and integrate with CRM platforms.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/financial-advisor-ai-automation' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="How Financial Advisors Use AI to Qualify Leads and Book Consultations"
      subtitle="Financial advisors, wealth managers, and RIAs use AI voice agents to qualify leads by assets, goals, and timeline, book consultations, and integrate with CRM platforms."
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
