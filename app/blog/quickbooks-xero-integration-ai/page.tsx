import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('quickbooks-xero-integration-ai')!;

export const metadata = {
  title: 'Connecting AI Voice Agents to QuickBooks and Xero for Automated Billing | Brandverse',
  description: 'How AI voice agents integrate with QuickBooks, Xero, FreshBooks, and Wave for automated billing, payment collection, invoice inquiries, and receipt generation.',
  openGraph: { title: 'Connecting AI Voice Agents to QuickBooks and Xero for Automated Billing', description: 'How AI voice agents integrate with QuickBooks, Xero, FreshBooks, and Wave for automated billing, payment collection, invoice inquiries, and receipt generation.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'Connecting AI Voice Agents to QuickBooks and Xero for Automated Billing', description: 'How AI voice agents integrate with QuickBooks, Xero, FreshBooks, and Wave for automated billing, payment collection, invoice inquiries, and receipt generation.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/quickbooks-xero-integration-ai' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Connecting AI Voice Agents to QuickBooks and Xero for Automated Billing"
      subtitle="How AI voice agents integrate with QuickBooks, Xero, FreshBooks, and Wave for automated billing, payment collection, invoice inquiries, and receipt generation."
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
