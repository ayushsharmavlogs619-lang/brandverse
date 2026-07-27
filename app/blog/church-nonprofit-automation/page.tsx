import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('church-nonprofit-automation')!;

export const metadata = {
  title: 'Non-Profit & Church Automation: AI for Donation Calls, Event Registration, and Volunteer Coordination | Brandverse',
  description: 'Churches, non-profits, and charitable organizations use AI to handle donation pledge calls, event registration, volunteer scheduling, pastoral care check-ins, and membership inquiries.',
  openGraph: { title: 'Non-Profit & Church Automation: AI for Donation Calls, Event Registration, and Volunteer Coordination', description: 'Churches, non-profits, and charitable organizations use AI to handle donation pledge calls, event registration, volunteer scheduling, pastoral care check-ins, and membership inquiries.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'Non-Profit & Church Automation: AI for Donation Calls, Event Registration, and Volunteer Coordination', description: 'Churches, non-profits, and charitable organizations use AI to handle donation pledge calls, event registration, volunteer scheduling, pastoral care check-ins, and membership inquiries.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/church-nonprofit-automation' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Non-Profit & Church Automation: AI for Donation Calls, Event Registration, and Volunteer Coordination"
      subtitle="Churches, non-profits, and charitable organizations use AI to handle donation pledge calls, event registration, volunteer scheduling, pastoral care check-ins, and membership inquiries."
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
