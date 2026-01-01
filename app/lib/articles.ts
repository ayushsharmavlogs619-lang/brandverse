export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
}

export const articles: Article[] = [
    {
        slug: 'scaling-vs-swelling-automation',
        title: 'Scaling vs. Swelling: The Difference That Kills Companies',
        excerpt: 'Most businesses don\'t scale; they swell. Learn how to grow your revenue without bloating your payroll.',
        date: 'Jan 1, 2025',
        category: 'Business Strategy'
    },
    {
        slug: 'cure-data-blindness-analytics',
        title: 'Cure Data Blindness: Stop Guessing Where Your Money Is',
        excerpt: 'You are flying blind. Precision analytics reveals exactly where you are losing revenue in your funnel.',
        date: 'Jan 1, 2025',
        category: 'Marketing Intelligence'
    },
    {
        slug: '24-7-employee-paradox',
        title: 'The 24/7 Employee Paradox: Doing More by Doing Less',
        excerpt: 'Stop hiring humans for robot jobs. Get the output of a 10-person team for a fraction of the cost.',
        date: 'Jan 1, 2025',
        category: 'Operational Efficiency'
    },
    {
        slug: 'hidden-cost-good-enough-web-design',
        title: 'The Hidden Cost of "Good Enough" Web Design',
        excerpt: 'A "good enough" website is costing you your best clients. Premium design is the only way to command premium prices.',
        date: 'Jan 1, 2025',
        category: 'Brand Authority'
    },
    {
        slug: 'stop-burning-cash-customer-support',
        title: 'Stop Burning Cash on Customer Support',
        excerpt: 'Manual support is bleeding your margins. AI Agents resolve 90% of queries instantly for pennies.',
        date: 'Jan 1, 2025',
        category: 'Profit Protection'
    },
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
        slug: '24-7-sales-revolution',
        title: 'Your 24/7 Sales Team: Why "Business Hours" Are Killing Your Growth',
        excerpt: 'The modern consumer doesn\'t wait. Capture the 40% of leads you\'re ignoring.',
        date: 'Dec 30, 2024',
        category: 'Growth Strategy'
    },
    {
        slug: 'stop-wasting-marketing-budget',
        title: 'Stop Paying for Ads Until You Fix This One Phone Problem',
        excerpt: 'Fix your lead capture rate before you spend another cent on Google Ads.',
        date: 'Dec 30, 2024',
        category: 'Marketing ROI'
    },
    {
        slug: 'voice-ai-ethics-trust',
        title: 'Will My Customers Hate It? The Truth About AI Voice Acceptance',
        excerpt: 'Data shows customers prefer instant AI answers over voicemail.',
        date: 'Dec 30, 2024',
        category: 'Ethics & Trust'
    },
    {
        slug: 'crm-automation-blueprint',
        title: 'The Perfect Handoff: Connecting AI Voice Agents to Your CRM',
        excerpt: 'An AI that answers phones AND updates Salesforce automatically.',
        date: 'Dec 30, 2024',
        category: 'Technical Guide'
    },
    {
        slug: 'how-ai-boosts-leads',
        title: 'How AI Voice Agents Boost Leads by 200%',
        excerpt: 'The math behind 24/7 instant lead response.',
        date: 'Dec 12, 2024',
        category: 'Growth'
    },
    {
        slug: 'hvac-dispatch-automation',
        title: 'Why 78% of Emergency Plumbing Calls Go to Voicemail',
        excerpt: 'Stop losing jobs to competitors. Learn how AI dispatchers verify emergencies and book jobs 24/7.',
        date: 'Jan 2, 2025',
        category: 'Industry Focus'
    },
    {
        slug: 'real-estate-lead-speed',
        title: 'The 5-Minute Lead Rule: How Top Realtors Automate Follow-Up',
        excerpt: 'Lead response time is the #1 predictor of conversion. Automate your Zillow lead nurture.',
        date: 'Jan 2, 2025',
        category: 'Industry Focus'
    },
    {
        slug: 'legal-intake-ethics',
        title: 'Stop Missing Clients: The Ethics of AI Legal Intake',
        excerpt: 'Law firms lose high-value cases to missed calls. Use AI for secure, instant client intake.',
        date: 'Jan 2, 2025',
        category: 'Industry Focus'
    },
    {
        slug: 'construction-bidding-automation',
        title: 'Automating Bids: How to Quote Jobs While You Sleep',
        excerpt: 'Stop driving for tire kickers. Pre-qualify construction leads automatically.',
        date: 'Jan 2, 2025',
        category: 'Industry Focus'
    },
    {
        slug: 'healthcare-no-show-cure',
        title: 'The No-Show Cure: AI Appointment Reminders for Clinics',
        excerpt: 'Eliminate schedule gaps with conversational AI that fills cancellations instantly.',
        date: 'Jan 2, 2025',
        category: 'Industry Focus'
    },
    {
        slug: 'auto-service-retention',
        title: 'Fill Your Bays: Automating Service Reminders for Auto Shops',
        excerpt: 'Predictive maintenance texts that drive repeat business without postcard waste.',
        date: 'Jan 2, 2025',
        category: 'Industry Focus'
    },
    {
        slug: 'podiatry-patient-growth',
        title: 'Step Up Your Practice: Filling Cancellations with AI in Podiatry',
        excerpt: 'Automate orthotic updates and fill last-minute slots from your waitlist.',
        date: 'Jan 2, 2025',
        category: 'Industry Focus'
    },
    {
        slug: 'dermatology-cosmetic-bookings',
        title: 'Cosmetic Consultations on Autopilot: Filtering Serious Patients',
        excerpt: 'Use AI deposit collection to filter out tire kickers from high-value patients.',
        date: 'Jan 2, 2025',
        category: 'Industry Focus'
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
