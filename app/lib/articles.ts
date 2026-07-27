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
    {
        slug: 'crm-integration-guide',
        title: 'CRM & Calendar Integration Guide',
        excerpt: 'How to connect Brandverse to ServiceTitan, Housecall Pro, Calendly, and CRMs for seamless booking.',
        date: 'Jan 3, 2025',
        category: 'Technical Guide'
    },
    {
        slug: 'measuring-success',
        title: 'Measuring AI Agent Performance & KPIs',
        excerpt: 'KPIs and dashboards you should track to measure the success of your AI voice agent.',
        date: 'Jan 3, 2025',
        category: 'Analytics'
    },
    {
        slug: 'multilingual-outreach',
        title: 'Multilingual Outreach Strategies',
        excerpt: 'How to use multilingual AI agents to expand market reach and improve lead capture.',
        date: 'Jan 3, 2025',
        category: 'Growth Strategy'
    },
    {
        slug: 'onboarding-checklist',
        title: 'Onboarding Checklist for AI Agents',
        excerpt: 'A step-by-step onboarding checklist to get your AI agent live and converting quickly.',
        date: 'Jan 3, 2025',
        category: 'Implementation'
    },
    {
        slug: 'scaling-multi-location',
        title: 'Scaling Across Multiple Locations',
        excerpt: 'Best practices for deploying AI agents across franchises, multi-location businesses, and regional teams.',
        date: 'Jan 3, 2025',
        category: 'Growth Strategy'
    },
    {
        slug: 'scripts-that-convert',
        title: 'High-Converting Call Scripts (Examples)',
        excerpt: 'Real script examples that convert callers into booked appointments.',
        date: 'Jan 3, 2025',
        category: 'Templates & Scripts'
    },
    {
        slug: 'sms-followups',
        title: 'Automated SMS Follow-ups that Convert',
        excerpt: 'Best practices for SMS confirmations and follow-ups that increase show-rates and conversions.',
        date: 'Jan 3, 2025',
        category: 'Templates & Scripts'
    },
    {
        slug: 'tcpa-gdpr-compliance',
        title: 'Telecom & Privacy Compliance (TCPA/GDPR)',
        excerpt: 'Practical checklist for TCPA and GDPR when deploying AI voice agents.',
        date: 'Jan 3, 2025',
        category: 'Legal & Compliance'
    },
    {
        slug: 'voice-cloning-ethics',
        title: 'Voice Cloning: Ethics & Best Practices',
        excerpt: 'Guidance on using voice cloning responsibly and building consent-forward experiences for customers.',
        date: 'Jan 3, 2025',
        category: 'Ethics & Trust'
    },
    {
        slug: 'restaurant-reservations-ai',
        title: 'AI Voice for Restaurants: Automating Reservations, Takeout, and Catering Inquiries',
        excerpt: 'How restaurants use AI voice agents to handle reservations, takeout orders, and catering inquiries 24/7 without adding staff.',
        date: 'Jul 26, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'fitness-studio-booking-ai',
        title: 'How Gyms and Fitness Studios Use AI to Book More Classes and Sell Memberships',
        excerpt: 'Fitness studios and gyms use AI voice agents to book classes, sell memberships, and handle member inquiries around the clock.',
        date: 'Jul 26, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'salon-spa-cancellation-fill',
        title: 'Salon & Spa Automation: Fill Last-Minute Cancellations with AI Booking',
        excerpt: 'No-shows and last-minute cancellations drain salon revenue. Use AI voice agents to instantly fill gaps from your waitlist.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'property-management-tenant-screening',
        title: 'Property Management Automation: AI for Maintenance Requests and Tenant Screening',
        excerpt: 'Property managers waste hours on maintenance calls and tenant screening. Automate emergency dispatch and tenant qualification.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'ai-receptionist-guide-2026',
        title: 'The Complete Guide to AI Receptionists for Small Businesses in 2026',
        excerpt: 'Everything small business owners need to know about AI receptionists in 2026: costs, features, setup process, ROI, and how they compare to human receptionists.',
        date: 'Jul 26, 2026',
        category: 'Guides'
    },
    {
        slug: 'ai-voice-agents-transforming-customer-service',
        title: 'How AI Voice Agents Are Transforming Customer Service',
        excerpt: 'AI voice agents are revolutionizing customer service. Learn how businesses use voice AI to reduce costs, improve satisfaction, and provide instant 24/7 support.',
        date: 'Jul 26, 2026',
        category: 'Customer Experience'
    },
    {
        slug: 'ultimate-guide-business-automation',
        title: 'The Ultimate Guide to Business Automation for Service Businesses',
        excerpt: 'A comprehensive guide to automating your service business: CRM automation, AI phone agents, scheduling, follow-ups, and more. Reduce costs and scale without adding staff.',
        date: 'Jul 26, 2026',
        category: 'Operations'
    },
    {
        slug: 'stop-losing-leads-after-hours',
        title: 'How Local Businesses Can Stop Losing Leads After Business Hours',
        excerpt: 'Local businesses lose 40% of leads after hours. Learn how AI receptionists, automated booking, and 24/7 lead capture can recover thousands in monthly revenue.',
        date: 'Jul 26, 2026',
        category: 'Lead Generation'
    },
    {
        slug: 'voice-ai-vs-human-receptionists',
        title: 'Voice AI vs Human Receptionists: Which Is Right for Your Business?',
        excerpt: 'A detailed comparison of AI receptionists vs human receptionists: costs, coverage, customer experience, and which option is best for different business types.',
        date: 'Jul 26, 2026',
        category: 'Comparison'
    },
    {
        slug: 'internal-operations-ai-automation',
        title: 'Beyond Customer-Facing: Using AI Voice for Internal Operations and Team Coordination',
        excerpt: 'How businesses use AI voice agents for employee shift scheduling, IT help desk, supply chain coordination, and inter-departmental notifications.',
        date: 'Jul 27, 2026',
        category: 'Operations'
    },
    {
        slug: 'ecommerce-abandoned-cart-recovery-ai',
        title: 'Winning Back Lost Sales: AI Voice for Abandoned Cart Recovery',
        excerpt: 'How ecommerce businesses use AI voice agents to recover abandoned carts with intelligent outbound calls that convert lost sales into revenue.',
        date: 'Jul 27, 2026',
        category: 'Lead Generation'
    },
    {
        slug: 'missed-call-recovery-systems',
        title: 'Missed Call Recovery Systems: How AI Captures Revenue from Every Missed Opportunity',
        excerpt: 'A complete system for recovering missed calls with automated callback systems, SMS follow-up, voicemail-to-text triage, and multi-touch recovery sequences.',
        date: 'Jul 27, 2026',
        category: 'Lead Generation'
    },
    {
        slug: 'ai-call-scoring-quality-assurance',
        title: 'AI Call Scoring: How to Measure and Improve Your Phone Performance',
        excerpt: 'How automated call scoring measures greeting quality, objection handling, compliance adherence, and sentiment to improve every phone conversation.',
        date: 'Jul 27, 2026',
        category: 'Analytics'
    },
    {
        slug: 'ai-receptionist-migration-guide',
        title: 'AI Receptionist Migration Guide: Switching from Human to AI Without Losing Calls',
        excerpt: 'A step-by-step migration playbook for businesses switching from a human receptionist to an AI receptionist without missing a single call.',
        date: 'Jul 27, 2026',
        category: 'Guides'
    },
    {
        slug: 'financial-advisor-ai-automation',
        title: 'How Financial Advisors Use AI to Qualify Leads and Book Consultations',
        excerpt: 'Financial advisors, wealth managers, and RIAs use AI voice agents to qualify leads by assets, goals, and timeline, book consultations, and integrate with CRM platforms.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'home-services-landscaping-pest-control',
        title: 'AI Voice for Home Services: Landscaping, Pest Control, and Cleaning Business Automation',
        excerpt: 'Landscaping, pest control, and cleaning businesses use AI to handle estimate requests, schedule recurring services, dispatch emergencies, collect payments, and send reminders.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'church-nonprofit-automation',
        title: 'Non-Profit & Church Automation: AI for Donation Calls, Event Registration, and Volunteer Coordination',
        excerpt: 'Churches, non-profits, and charitable organizations use AI to handle donation pledge calls, event registration, volunteer scheduling, pastoral care check-ins, and membership inquiries.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'hipaa-compliance-ai-healthcare',
        title: 'HIPAA-Compliant AI: What Healthcare Providers Must Know About Voice AI',
        excerpt: 'The complete HIPAA compliance framework for AI voice agents in healthcare: BAAs, encryption, access controls, audit logging, and integration with EHR systems like Epic and Cerner.',
        date: 'Jul 27, 2026',
        category: 'Legal & Compliance'
    },
    {
        slug: 'ai-vs-answer-service-comparison',
        title: 'AI Voice Agent vs Traditional Answering Service: Which Saves You More?',
        excerpt: 'Head-to-head comparison of AI voice agents vs traditional human answering services across cost, accuracy, scalability, integration, and customer experience.',
        date: 'Jul 27, 2026',
        category: 'Comparison'
    },
    {
        slug: 'ecommerce-customer-service-ai',
        title: 'AI Voice Agents for E-Commerce: Handling Order Status and Customer Support 24/7',
        excerpt: 'How e-commerce businesses use AI voice agents to handle order status checks, return and exchange processing, and customer support inquiries 24/7 with Shopify and WooCommerce integration.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'ai-appointment-setting',
        title: 'The AI That Never Sleeps: 24/7 Appointment Setting for Service Businesses',
        excerpt: 'Service businesses lose 30% of bookings to voicemail. AI voice agents fill your calendar with confirmed appointments while you sleep.',
        date: 'Jul 27, 2026',
        category: 'Growth Strategy'
    },
    {
        slug: 'ai-customer-retention',
        title: 'Keep Them Coming Back: AI Customer Retention for Service Businesses',
        excerpt: 'Acquiring new customers costs 5x more than retaining existing ones. AI voice agents keep customers loyal with proactive engagement and instant issue resolution.',
        date: 'Jul 27, 2026',
        category: 'Customer Experience'
    },
    {
        slug: 'ai-lead-qualification',
        title: 'Stop Chasing Bad Leads: AI Lead Qualification for Sales Teams',
        excerpt: 'Sales teams waste 60% of time on unqualified leads. AI voice agents filter, score, and route only prospects ready to buy.',
        date: 'Jul 27, 2026',
        category: 'Lead Generation'
    },
    {
        slug: 'emergency-response-automation',
        title: 'Emergency Response Automation: AI for After-Hours Service Calls',
        excerpt: 'Plumbers, HVAC techs, and emergency clinics lose 40-60% of after-hours calls. AI voice agents handle emergencies 24/7 with instant triage and dispatch.',
        date: 'Jul 27, 2026',
        category: 'Operations'
    },
    {
        slug: 'multilingual-ai-support',
        title: 'Multilingual AI Voice Agents: Speak 50+ Languages Automatically',
        excerpt: 'Language barriers cost US businesses billions. AI voice agents speak 50+ languages fluently, opening markets you could not afford to staff.',
        date: 'Jul 27, 2026',
        category: 'Growth Strategy'
    },
    {
        slug: 'future-of-voice-ai',
        title: 'The Future of Voice AI in Business: 2025–2030',
        excerpt: 'Forward-looking analysis of voice AI trends including emotional intelligence, real-time language adaptation, enterprise voice agents, and proactive outbound agents through 2030.',
        date: 'Jul 27, 2026',
        category: 'Guides'
    },
    {
        slug: 'ai-receptionist-pricing-guide',
        title: 'AI Receptionist Pricing Guide 2025: Full Cost Breakdown',
        excerpt: 'Complete AI receptionist pricing comparison across per-minute, flat-rate, and hybrid models. ROI analysis showing $17K-$41K annual savings vs human receptionists.',
        date: 'Jul 27, 2026',
        category: 'Guides'
    },
    {
        slug: 'ai-vs-ivr-comparison',
        title: 'AI vs IVR: Why Traditional Phone Trees Are Obsolete',
        excerpt: 'Feature-by-feature comparison of AI voice agents versus traditional IVR phone trees across 9 criteria including natural language, integration, analytics, and customer experience.',
        date: 'Jul 27, 2026',
        category: 'Comparison'
    },
    {
        slug: 'quickbooks-xero-integration-ai',
        title: 'Connecting AI Voice Agents to QuickBooks and Xero for Automated Billing',
        excerpt: 'How AI voice agents integrate with QuickBooks, Xero, FreshBooks, and Wave for automated billing, payment collection, invoice inquiries, and receipt generation.',
        date: 'Jul 27, 2026',
        category: 'Technical Guide'
    },
    {
        slug: 'ai-outbound-campaign-automation',
        title: 'AI Outbound Calling: Automating Follow-Ups, Reactivations, and Appointment Reminders',
        excerpt: 'How businesses use AI for outbound calling campaigns: appointment reminders, reactivation campaigns, estimate follow-ups, satisfaction surveys, and seasonal outreach.',
        date: 'Jul 27, 2026',
        category: 'Growth Strategy'
    },
    {
        slug: 'voice-analytics-conversation-intelligence',
        title: 'Voice Analytics: How Conversation Intelligence Reveals Hidden Revenue Opportunities',
        excerpt: 'How conversation intelligence and voice analytics reveal revenue opportunities through sentiment analysis, keyword spotting, objection detection, and call scoring.',
        date: 'Jul 27, 2026',
        category: 'Analytics'
    },
    {
        slug: 'change-management-ai-adoption',
        title: 'Getting Your Team Onboard: Change Management for AI Adoption',
        excerpt: 'How to manage the human side of AI adoption: addressing employee fears, building buy-in, phased rollout strategies, training, and adoption metrics.',
        date: 'Jul 27, 2026',
        category: 'Implementation'
    },
    {
        slug: 'holiday-season-prep-automation',
        title: 'Holiday Season Ready: Automating Your Business for Q4 Surge',
        excerpt: 'How to prepare your business for the holiday season using AI automation: handling increased call volume, booking rushes, seasonal staffing, and special promotions.',
        date: 'Jul 27, 2026',
        category: 'Operations'
    },
    {
        slug: 'insurance-lead-automation',
        title: 'AI for Insurance Agents: Automating Quotes, Claims, and Policy Renewals',
        excerpt: 'Independent insurance agencies use AI voice agents to handle quote requests 24/7, automate policy renewal calls, triage FNOL claims, and pre-qualify commercial and personal lines leads with seamless AMS integration.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'hotel-hospitality-ai',
        title: 'How Hotels & Hospitality Businesses Use AI Voice to Book Rooms and Handle Guest Inquiries',
        excerpt: 'Hotels, motels, B&Bs, and hospitality businesses use AI voice agents to handle reservation inquiries, group booking requests, concierge questions, and after-hours guest emergencies 24/7 with PMS integration.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'senior-care-assisted-living-automation',
        title: 'Senior Care Automation: AI for Family Inquiries, Tour Scheduling, and Medication Reminders',
        excerpt: 'Assisted living facilities, nursing homes, and home care agencies use AI voice agents to handle family inquiry calls, schedule tours, send medication and appointment reminders, and manage caregiver staffing 24/7.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'veterinary-pet-care-automation',
        title: 'Veterinary AI: Automating Appointment Booking, Emergency Triage, and Pet Health Reminders',
        excerpt: 'Veterinary clinics, animal hospitals, and pet care businesses use AI voice agents to handle appointment bookings, emergency triage calls, prescription refill requests, vaccination reminders, and follow-ups 24/7.',
        date: 'Jul 27, 2026',
        category: 'Industry Focus'
    },
    {
        slug: 'childcare-daycare-enrollment-ai',
        title: 'AI for Childcare Centers: Automating Tours, Enrollment, and Parent Communication',
        excerpt: 'Daycare centers, preschools, and childcare facilities use AI voice agents to handle enrollment inquiries, schedule tours, manage waitlists, send daily updates to parents, process billing questions, and handle after-hours calls 24/7.',
        date: 'Jul 27, 2026',
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
