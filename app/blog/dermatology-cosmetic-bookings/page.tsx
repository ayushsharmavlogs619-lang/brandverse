import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('dermatology-cosmetic-bookings')!;

export const metadata = {
  title: 'Cosmetic Consultations on Autopilot: Filtering Serious Patients | Brandverse',
  description: 'Use AI deposit collection to filter out tire kickers from high-value patients.',
  keywords: ['cosmetic consultation booking', 'dermatology AI automation', 'aesthetic clinic phone system', 'patient filtering AI'],
  openGraph: { title: 'Cosmetic Consultations on Autopilot: Filtering Serious Patients', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Cosmetic Consultations on Autopilot: Filtering Serious Patients', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/dermatology-cosmetic-bookings' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Cosmetic Consultations on Autopilot: Filtering Serious Patients"
      subtitle="Use AI deposit collection to filter out tire kickers from high-value patients."
      description={post.excerpt}
      date="Jan 2, 2025"
      readTime="9 min read"
      category={post.category}
      accent="rose"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}