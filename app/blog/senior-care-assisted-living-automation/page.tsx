import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('senior-care-assisted-living-automation')!;

export const metadata = {
  title: 'Senior Care Automation: AI for Family Inquiries, Tour Scheduling, and Medication Reminders | Brandverse',
  description: 'Assisted living facilities, nursing homes, and home care agencies use AI voice agents to handle family inquiry calls, schedule tours, send medication and appointment reminders, and manage caregiver staffing 24/7.',
  openGraph: { title: 'Senior Care Automation: AI for Family Inquiries, Tour Scheduling, and Medication Reminders', description: 'Assisted living facilities, nursing homes, and home care agencies use AI voice agents to handle family inquiry calls, schedule tours, send medication and appointment reminders, and manage caregiver staffing 24/7.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'Senior Care Automation: AI for Family Inquiries, Tour Scheduling, and Medication Reminders', description: 'Assisted living facilities, nursing homes, and home care agencies use AI voice agents to handle family inquiry calls, schedule tours, send medication and appointment reminders, and manage caregiver staffing 24/7.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/senior-care-assisted-living-automation' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Senior Care Automation: AI for Family Inquiries, Tour Scheduling, and Medication Reminders"
      subtitle="Assisted living facilities, nursing homes, and home care agencies use AI voice agents to handle family inquiry calls, schedule tours, send medication and appointment reminders, and manage caregiver staffing 24/7."
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
