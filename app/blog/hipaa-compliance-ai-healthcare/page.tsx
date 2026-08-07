import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('hipaa-compliance-ai-healthcare')!;

export const metadata = {
  title: 'HIPAA-Compliant AI: What Healthcare Providers Must Know About Voice AI | Brandverse',
  description: 'The complete HIPAA compliance framework for AI voice agents in healthcare: BAAs, encryption, access controls, audit logging, and integration with EHR systems like Epic and Cerner.',
  openGraph: { title: 'HIPAA-Compliant AI: What Healthcare Providers Must Know About Voice AI', description: 'The complete HIPAA compliance framework for AI voice agents in healthcare: BAAs, encryption, access controls, audit logging, and integration with EHR systems like Epic and Cerner.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'HIPAA-Compliant AI: What Healthcare Providers Must Know About Voice AI', description: 'The complete HIPAA compliance framework for AI voice agents in healthcare: BAAs, encryption, access controls, audit logging, and integration with EHR systems like Epic and Cerner.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/hipaa-compliance-ai-healthcare' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="HIPAA-Compliant AI: What Healthcare Providers Must Know About Voice AI"
      subtitle="The complete HIPAA compliance framework for AI voice agents in healthcare: BAAs, encryption, access controls, audit logging, and integration with EHR systems like Epic and Cerner."
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
