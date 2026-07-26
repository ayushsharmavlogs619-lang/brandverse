interface ArticleSchemaProps {
    title: string;
    description: string;
    slug: string;
    date: string;
    modifiedDate?: string;
    category: string;
    authorName?: string;
    authorUrl?: string;
}

export default function ArticleSchema({ title, description, slug, date, modifiedDate, category, authorName = 'Brandverse Editorial Team', authorUrl = 'https://brandverse.tech/author/brandverse-editorial-team' }: ArticleSchemaProps) {
    const schema = {
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
            '@id': `https://brandverse.tech/blog/${slug}`,
        },
        articleSection: category,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
