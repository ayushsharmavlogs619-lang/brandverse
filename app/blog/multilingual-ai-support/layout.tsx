export const metadata = {
  title: 'Multilingual Ai Support | Brandverse',
  description: '',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/multilingual-ai-support' },
  openGraph: { title: '...', description: '...', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: '...', description: '...' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
