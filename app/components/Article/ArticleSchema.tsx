interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  modifiedDate?: string;
  category: string;
  authorName?: string;
  authorUrl?: string;
  faqs?: FAQItem[];
  howToSteps?: HowToStep[];
  keywords?: string[];
  estimatedTime?: string;
}

export default function ArticleSchema({
  title, description, slug, date, modifiedDate, category,
  authorName = 'Brandverse Editorial Team',
  authorUrl = 'https://brandverse.tech/author/brandverse-editorial-team',
  faqs, howToSteps, keywords, estimatedTime,
}: ArticleSchemaProps) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      headline: title,
      description,
      image: 'https://brandverse.tech/images/og-default.jpg',
      datePublished: date,
      dateModified: modifiedDate || date,
      author: { '@type': 'Person', name: authorName, url: authorUrl },
      publisher: { '@type': 'Organization', name: 'Brandverse', logo: { '@type': 'ImageObject', url: 'https://brandverse.tech/logo.png' } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://brandverse.tech/blog/${slug}` },
      articleSection: category,
      ...(keywords ? { keywords: keywords.join(', ') } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://brandverse.tech/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://brandverse.tech/blog' },
        { '@type': 'ListItem', position: 3, name: title },
      ],
    },
  ];

  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  if (howToSteps && howToSteps.length > 0) {
    graph.push({
      '@type': 'HowTo',
      name: title,
      description,
      ...(estimatedTime ? { totalTime: estimatedTime } : {}),
      step: howToSteps.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.name,
        text: step.text,
        ...(step.image ? { image: step.image } : {}),
      })),
    });
  }

  const schema = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
