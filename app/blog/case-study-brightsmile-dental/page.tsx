import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('case-study-brightsmile-dental')!;

export const metadata = {
  title: 'Deployment Playbook: Dental Practice Automation | Brandverse',
  description: 'From vendor to Backend Digital In-Charge.',
  keywords: ['dental practice playbook', 'dental AI automation', 'Brandverse deployment playbook'],
  openGraph: { title: 'Deployment Playbook: Dental Practice Automation', description: post.excerpt, type: 'article' },
  twitter: { card: 'summary_large_image', title: 'Deployment Playbook: Dental Practice Automation', description: post.excerpt },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/case-study-brightsmile-dental' }
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Deployment Playbook: Dental Practice Automation"
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
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-200/90 leading-relaxed mb-8">
        <strong className="text-amber-300 font-black uppercase tracking-widest text-xs block mb-1">Illustrative Example</strong>
        This is a deployment playbook — a representative example of how Brandverse handles dental practice overflow calls, not a claim about a specific client's results.
      </div>
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}