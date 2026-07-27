import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('case-study-brightsmile-dental')!;

export const metadata = {
  title: 'Case Study: Brightsmile Dental | Brandverse',
  description: 'From vendor to Backend Digital In-Charge.',
  keywords: ['dental practice case study', 'dental AI automation', 'Brandverse dental case study'],
  openGraph: { title: 'Case Study: Brightsmile Dental', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Case Study: Brightsmile Dental', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/case-study-brightsmile-dental' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Case Study: Brightsmile Dental"
      subtitle="From vendor to Backend Digital In-Charge."
      description={post.excerpt}
      date="Dec 15, 2024"
      readTime="9 min read"
      category={post.category}
      accent="blue"
      keywords={metadata.keywords}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}