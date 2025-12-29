export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
}

export const articles: Article[] = [
    {
        slug: 'why-never-regret-ai-agents',
        title: 'Why Smart Business Owners Choose AI Voice Agents (And Never Look Back)',
        excerpt: 'The decision that pays for itself in 48 hours. Zero regrets. Ever.',
        date: 'Dec 29, 2024',
        category: 'Value Proposition'
    },
    {
        slug: 'cost-of-not-using-ai',
        title: 'The True Cost of NOT Using AI Voice Agents in 2025',
        excerpt: 'Every day you wait is $500-$2000 donated to competitors.',
        date: 'Dec 28, 2024',
        category: 'Warning'
    },
    {
        slug: '5-signs-youre-ready',
        title: '5 Signs You\'re Ready for AI Voice Agents',
        excerpt: 'If you recognize 3+ of these signs, you\'re leaving money on the table.',
        date: 'Dec 27, 2024',
        category: 'Assessment'
    },
    {
        slug: 'case-study-elite-climate',
        title: 'Case Study: Elite Climate Control & Plumbing',
        excerpt: 'How a skeptical HVAC owner recovered $15k in month one.',
        date: 'Dec 22, 2024',
        category: 'Case Study'
    },
    {
        slug: 'case-study-apex-property',
        title: 'Case Study: Apex Property Group',
        excerpt: 'Scaling trust through personal branding and automation.',
        date: 'Dec 18, 2024',
        category: 'Case Study'
    },
    {
        slug: 'case-study-brightsmile-dental',
        title: 'Case Study: Brightsmile Dental',
        excerpt: 'From vendor to Backend Digital In-Charge.',
        date: 'Dec 15, 2024',
        category: 'Case Study'
    },
    {
        slug: 'ai-voice-roi',
        title: 'The Math of "Always On": Calculating AI Voice ROI',
        excerpt: 'Interactive calculator + breakeven analysis.',
        date: 'Dec 10, 2024',
        category: 'Financial Strategy'
    },
    {
        slug: 'how-ai-boosts-leads',
        title: 'How AI Voice Agents Boost Leads by 200%',
        excerpt: 'The math behind 24/7 instant lead response.',
        date: 'Dec 12, 2024',
        category: 'Growth'
    },
];

/**
 * Get 2 related articles for the current article
 * Prioritizes same category, then falls back to random selection
 */
export function getRelatedArticles(currentSlug: string, count: number = 2): Article[] {
    const current = articles.find(a => a.slug === currentSlug);
    if (!current) return articles.slice(0, count);

    // First, try to get articles from the same category
    const sameCategory = articles.filter(
        a => a.slug !== currentSlug && a.category === current.category
    );

    // If not enough same-category articles, add from different categories
    if (sameCategory.length >= count) {
        return sameCategory.slice(0, count);
    }

    const different = articles.filter(
        a => a.slug !== currentSlug && a.category !== current.category
    );

    return [...sameCategory, ...different].slice(0, count);
}
