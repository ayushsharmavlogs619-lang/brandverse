export interface Author {
    slug: string;
    name: string;
    title: string;
    avatar: string;
    bio: string;
    shortBio: string;
    expertise: string[];
    social: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
}

export const authors: Author[] = [
    {
        slug: 'brandverse-editorial-team',
        name: 'Brandverse Editorial Team',
        title: 'AI Automation Content Team',
        avatar: '/images/author-placeholder.svg',
        bio: 'The Brandverse Editorial Team is a group of AI automation experts, content strategists, and technical writers dedicated to helping businesses harness the power of conversational AI. With backgrounds in SaaS, local service business operations, and digital transformation, our team has helped hundreds of small and medium businesses automate their lead capture, customer service, and operational workflows. We publish in-depth research, practical guides, and real-world case studies that cut through the hype and deliver actionable strategies.',
        shortBio: 'AI automation experts helping businesses automate lead capture and customer service.',
        expertise: ['AI Voice Agents', 'Business Automation', 'Lead Generation', 'Customer Service Automation', 'CRM Integration', 'Conversational AI'],
        social: {
            twitter: 'https://twitter.com/brandverse_tech',
            linkedin: 'https://linkedin.com/company/brandverse',
        },
    },
];
