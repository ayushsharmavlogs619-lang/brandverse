import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('hvac-dispatch-automation')!;

export const metadata = {
  title: 'Why 78% of Emergency Plumbing Calls Go to Voicemail | Brandverse',
  description: 'Stop losing jobs to competitors. Learn how AI dispatchers verify emergencies and book jobs 24/7.',
  keywords: ['HVAC dispatch automation', 'plumbing emergency dispatch', 'HVAC AI receptionist', 'service dispatch AI'],
  openGraph: { title: 'Why 78% of Emergency Plumbing Calls Go to Voicemail', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Why 78% of Emergency Plumbing Calls Go to Voicemail', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/hvac-dispatch-automation' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Why 78% of Emergency Plumbing Calls Go to Voicemail"
      subtitle="Stop losing jobs to competitors. Learn how AI dispatchers verify emergencies and book jobs 24/7."
      description={post.excerpt}
      date="Jan 2, 2025"
      readTime="9 min read"
      category={post.category}
      accent="orange"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}