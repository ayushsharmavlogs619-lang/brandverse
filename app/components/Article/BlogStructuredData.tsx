interface FAQItem {
    question: string;
    answer: string;
}

interface BlogStructuredDataProps {
    title: string;
    description: string;
    slug: string;
    date: string;
    modifiedDate?: string;
    category: string;
    faqs?: FAQItem[];
    authorName?: string;
    authorUrl?: string;
}

export default function BlogStructuredData({
    title,
    description,
    slug,
    date,
    modifiedDate,
    category,
    faqs,
    authorName = 'Brandverse Editorial Team',
    authorUrl = 'https://brandverse.tech/author/brandverse-editorial-team',
}: BlogStructuredDataProps) {
    const webPageId = `https://brandverse.tech/blog/${slug}`;

    const schemas: Record<string, unknown>[] = [
        {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: description,
            image: 'https://brandverse.tech/images/og-default.jpg',
            datePublished: date,
            dateModified: modifiedDate || date,
            author: {
                '@type': 'Person',
                name: authorName,
                url: authorUrl,
            },
            publisher: {
                '@type': 'Organization',
                name: 'Brandverse',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://brandverse.tech/logo.png',
                },
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': webPageId,
            },
            articleSection: category,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://brandverse.tech/blog' },
                { '@type': 'ListItem', position: 2, name: category, item: `https://brandverse.tech/blog?category=${encodeURIComponent(category)}` },
                { '@type': 'ListItem', position: 3, name: title, item: webPageId },
            ],
        },
    ];

    if (faqs && faqs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        });
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas) }}
        />
    );
}
