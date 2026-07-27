import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('voice-analytics-conversation-intelligence')!;

export const metadata = {
  title: 'Voice Analytics: How Conversation Intelligence Reveals Hidden Revenue Opportunities | Brandverse',
  description: 'How conversation intelligence and voice analytics reveal revenue opportunities through sentiment analysis, keyword spotting, objection detection, and call scoring.',
  openGraph: { title: 'Voice Analytics: How Conversation Intelligence Reveals Hidden Revenue Opportunities', description: 'How conversation intelligence and voice analytics reveal revenue opportunities through sentiment analysis, keyword spotting, objection detection, and call scoring.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'Voice Analytics: How Conversation Intelligence Reveals Hidden Revenue Opportunities', description: 'How conversation intelligence and voice analytics reveal revenue opportunities through sentiment analysis, keyword spotting, objection detection, and call scoring.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/voice-analytics-conversation-intelligence' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Voice Analytics: How Conversation Intelligence Reveals Hidden Revenue Opportunities"
      subtitle="How conversation intelligence and voice analytics reveal revenue opportunities through sentiment analysis, keyword spotting, objection detection, and call scoring."
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
