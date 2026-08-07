import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('hotel-hospitality-ai')!;

export const metadata = {
  title: 'How Hotels & Hospitality Businesses Use AI Voice to Book Rooms and Handle Guest Inquiries | Brandverse',
  description: 'Hotels, motels, B&Bs, and hospitality businesses use AI voice agents to handle reservation inquiries, group booking requests, concierge questions, and after-hours guest emergencies 24/7 with PMS integration.',
  openGraph: { title: 'How Hotels & Hospitality Businesses Use AI Voice to Book Rooms and Handle Guest Inquiries', description: 'Hotels, motels, B&Bs, and hospitality businesses use AI voice agents to handle reservation inquiries, group booking requests, concierge questions, and after-hours guest emergencies 24/7 with PMS integration.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'How Hotels & Hospitality Businesses Use AI Voice to Book Rooms and Handle Guest Inquiries', description: 'Hotels, motels, B&Bs, and hospitality businesses use AI voice agents to handle reservation inquiries, group booking requests, concierge questions, and after-hours guest emergencies 24/7 with PMS integration.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/hotel-hospitality-ai' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="How Hotels & Hospitality Businesses Use AI Voice to Book Rooms and Handle Guest Inquiries"
      subtitle="Hotels, motels, B&Bs, and hospitality businesses use AI voice agents to handle reservation inquiries, group booking requests, concierge questions, and after-hours guest emergencies 24/7 with PMS integration."
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
