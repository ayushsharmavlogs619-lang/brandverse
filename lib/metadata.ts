export function articleMetadata(slug: string, title: string, description: string, opts?: {
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
  publishedTime?: string;
}) {
  const url = `https://brandverse.tech/blog/${slug}`;
  return {
    title,
    description,
    ...(opts?.keywords?.length ? { keywords: opts.keywords } : {}),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: { canonical: url },
    openGraph: {
      title: opts?.ogTitle || title,
      description: opts?.ogDescription || description,
      type: 'article' as const,
      url,
      siteName: 'Brandverse',
      ...(opts?.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: opts?.ogTitle || title,
      description: opts?.ogDescription || description,
    },
  };
}
