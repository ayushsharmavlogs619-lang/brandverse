import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('home-services-landscaping-pest-control')!;

export const metadata = {
  title: 'AI Voice for Home Services: Landscaping, Pest Control, and Cleaning Business Automation | Brandverse',
  description: 'Landscaping, pest control, and cleaning businesses use AI to handle estimate requests, schedule recurring services, dispatch emergencies, collect payments, and send reminders.',
  openGraph: { title: 'AI Voice for Home Services: Landscaping, Pest Control, and Cleaning Business Automation', description: 'Landscaping, pest control, and cleaning businesses use AI to handle estimate requests, schedule recurring services, dispatch emergencies, collect payments, and send reminders.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'AI Voice for Home Services: Landscaping, Pest Control, and Cleaning Business Automation', description: 'Landscaping, pest control, and cleaning businesses use AI to handle estimate requests, schedule recurring services, dispatch emergencies, collect payments, and send reminders.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/home-services-landscaping-pest-control' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="AI Voice for Home Services: Landscaping, Pest Control, and Cleaning Business Automation"
      subtitle="Landscaping, pest control, and cleaning businesses use AI to handle estimate requests, schedule recurring services, dispatch emergencies, collect payments, and send reminders."
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
