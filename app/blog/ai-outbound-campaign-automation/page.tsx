import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('ai-outbound-campaign-automation')!;

export const metadata = {
  title: 'AI Outbound Calling: Automating Follow-Ups, Reactivations, and Appointment Reminders | Brandverse',
  description: 'How businesses use AI for outbound calling campaigns: appointment reminders, reactivation campaigns, estimate follow-ups, satisfaction surveys, and seasonal outreach.',
  openGraph: { title: 'AI Outbound Calling: Automating Follow-Ups, Reactivations, and Appointment Reminders', description: 'How businesses use AI for outbound calling campaigns: appointment reminders, reactivation campaigns, estimate follow-ups, satisfaction surveys, and seasonal outreach.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'AI Outbound Calling: Automating Follow-Ups, Reactivations, and Appointment Reminders', description: 'How businesses use AI for outbound calling campaigns: appointment reminders, reactivation campaigns, estimate follow-ups, satisfaction surveys, and seasonal outreach.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/ai-outbound-campaign-automation' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="AI Outbound Calling: Automating Follow-Ups, Reactivations, and Appointment Reminders"
      subtitle="How businesses use AI for outbound calling campaigns: appointment reminders, reactivation campaigns, estimate follow-ups, satisfaction surveys, and seasonal outreach."
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
