import Link from 'next/link';
import CalendlyCTA from '@/app/components/CalendlyCTA';

export const metadata = {
  title: 'Blog — Brandverse',
  description: 'Insights and articles about AI automation, voice agents, chatbots, and paid advertising for local businesses.',
};

export default function BlogIndex() {
  const posts = [
    {
      slug: '24-7-answering-service-small-business',
      title: '24/7 Answering Service for Small Business: Complete Guide',
      excerpt: 'Your customers need you at 9 PM on a Saturday. Here is how 24/7 coverage works and why AI is the best fit.',
      date: 'Jan 12, 2026',
      category: 'Service'
    },
    {
      slug: 'ai-answering-service-hvac',
      title: 'Best AI Answering Service for HVAC Companies in 2026',
      excerpt: 'Handle emergency no-heat calls instantly. How HVAC companies use AI to capture leads 24/7.',
      date: 'Jan 12, 2026',
      category: 'Industry'
    },
    {
      slug: 'ai-answering-service-plumbers',
      title: 'AI Answering Service for Plumbers: Never Miss a Service Call',
      excerpt: 'Pipes burst at 2 AM. Here is how to capture every emergency job without being on call yourself.',
      date: 'Jan 12, 2026',
      category: 'Industry'
    },
    {
      slug: 'ai-chatbot-for-dentists',
      title: 'Best AI Chatbot for Dental Practice in 2026',
      excerpt: 'Fill your schedule without extra office staff. How dentists use AI for 24/7 appointment booking.',
      date: 'Jan 11, 2026',
      category: 'Industry'
    },
    {
      slug: 'ai-chatbot-for-law-firms',
      title: 'Best AI Chatbot for Law Firms in 2026: Complete Guide',
      excerpt: 'Capture cases 11 PM with ethics-compliant AI legal intake. Compare the top solutions for attorneys.',
      date: 'Jan 11, 2026',
      category: 'Industry'
    },
    {
      slug: 'ai-chatbot-for-real-estate',
      title: 'Best AI Chatbot for Real Estate Agents in 2026',
      excerpt: 'Capture more buyer and seller leads 24/7 with real estate focused AI automation.',
      date: 'Jan 11, 2026',
      category: 'Industry'
    },
    {
      slug: 'ai-marketing-med-spas',
      title: 'Best AI Marketing Tools for Med Spas & Aesthetics in 2026',
      excerpt: 'How leading med spas use AI to convert late-night browsers into booked appointments without extra staff.',
      date: 'Jan 10, 2026',
      category: 'Industry'
    },
    {
      slug: 'ai-voice-roi',
      title: 'The Real ROI of AI Voice Automation',
      excerpt: 'We break down the numbers: what you invest vs what you get back. Measured in multiples, not percentages.',
      date: 'Jan 10, 2026',
      category: 'ROI'
    },
    {
      slug: 'answering-service-cost',
      title: 'How Much Does an Answering Service Cost in 2026?',
      excerpt: 'Complete pricing breakdown: Human vs AI. Real cost examples for dental, HVAC, and legal practices.',
      date: 'Jan 10, 2026',
      category: 'Pricing'
    },
    {
      slug: 'best-ai-receptionists',
      title: '10 Best AI Receptionists for Small Business in 2026',
      excerpt: 'A direct comparison of the top AI voice agents and virtual receptionists on the market.',
      date: 'Jan 09, 2026',
      category: 'Review'
    },
    {
      slug: 'best-free-roi-calculators',
      title: 'Best Free ROI Calculators for Small Business (2026)',
      excerpt: 'Identify the highest-impact areas for automation with these free tools.',
      date: 'Jan 09, 2026',
      category: 'Tools'
    },
    {
      slug: 'best-no-code-chatbot-builders',
      title: 'Best No-Code Chatbot Builders in 2026: Complete Comparison',
      excerpt: 'Build AI chatbots without coding skills. We compare the top 10 platforms and assess DIY vs. Done-for-you.',
      date: 'Jan 09, 2026',
      category: 'Tools'
    },
    {
      slug: 'chatbot-for-electricians',
      title: 'Chatbot for Electricians: Capture More Service Calls',
      excerpt: 'Hands-on work means missed calls. Here is how AI handles your phone and web chat while you are on a ladder.',
      date: 'Jan 08, 2026',
      category: 'Industry'
    },
    {
      slug: 'crm-integration-guide',
      title: 'AI & CRM Integration Guide: Syncing Leads Automatically',
      excerpt: 'Stop manual data entry. How to connect your AI agents to Salesforce, HubSpot, and more.',
      date: 'Jan 08, 2026',
      category: 'Guide'
    },
    {
      slug: 'facebook-ads-roi-local-business',
      title: 'Facebook Ads ROI for Local Business: Real Numbers',
      excerpt: 'What to expect from Meta ads. Case studies showing 6-13x returns for local service providers.',
      date: 'Jan 08, 2026',
      category: 'Ads'
    },
    {
      slug: 'google-ads-local-service-business',
      title: 'Google Ads for Local Service Business: Complete 2026 Guide',
      excerpt: 'Dominate "near me" searches. Strategies, bidding tips, and real ROI examples for local lead generation.',
      date: 'Jan 07, 2026',
      category: 'PPC'
    },
    {
      slug: 'how-ai-boosts-leads',
      title: 'How AI Voice Agents Boost Leads by 200%',
      excerpt: 'Stop losing money to voicemail. Discover the math behind 24/7 instant lead response.',
      date: 'Jan 07, 2026',
      category: 'Growth'
    },
    {
      slug: 'how-to-calculate-missed-call-revenue',
      title: 'How to Calculate Missed Call Revenue (The Right Way)',
      excerpt: 'Use our data-backed framework to see exactly how much revenue escapes through your voicemail.',
      date: 'Jan 07, 2026',
      category: 'Strategy'
    },
    {
      slug: 'how-to-train-ai-chatbot',
      title: 'How to Train an AI Chatbot on Your Business Data',
      excerpt: 'Generic AI is useless. Here is how to feed your business docs and FAQs to create a custom assistant.',
      date: 'Jan 06, 2026',
      category: 'How-To'
    },
    {
      slug: 'intercom-alternatives',
      title: 'Best Intercom Alternatives for Small Business in 2026',
      excerpt: 'Looking for a more cost-effective chatbot solution? Compare the top Intercom competitors.',
      date: 'Jan 06, 2026',
      category: 'Comparison'
    },
    {
      slug: 'lead-generation-for-contractors',
      title: 'Lead Generation for Contractors: 7 Proven Strategies',
      excerpt: 'Stop buying "junk" leads. Here is how to build a predictable revenue engine for your contracting business.',
      date: 'Jan 06, 2026',
      category: 'Strategy'
    },
    {
      slug: 'lead-response-time-statistics',
      title: 'Lead Response Time Statistics: Why Speed Matters (2026 Data)',
      excerpt: 'New research shows leads contacted within 1 minute convert 391% better.',
      date: 'Jan 05, 2026',
      category: 'Data'
    },
    {
      slug: 'measuring-success',
      title: 'Measuring AI Success: The 5 KPIs That Actually Matter',
      excerpt: 'Beyond chats and calls. How to track conversion uplift and true cost-per-lead reduction.',
      date: 'Jan 05, 2026',
      category: 'Strategy'
    },
    {
      slug: 'missed-call-revenue-calculator',
      title: 'Missed Call Revenue Calculator: The Financial Impact',
      excerpt: 'A eye-opening look at the financial impact of missed calls and recovered revenue.',
      date: 'Jan 05, 2026',
      category: 'Tools'
    },
    {
      slug: 'multilingual-outreach',
      title: 'Going Global: Multilingual AI for Local Businesses',
      excerpt: 'How to handle non-English speaking leads without hiring a multilingual team.',
      date: 'Jan 04, 2026',
      category: 'Growth'
    },
    {
      slug: 'onboarding-checklist',
      title: 'AI Deployment Onboarding Checklist: Live in 7 Days',
      excerpt: 'Everything you need to gather before launching your first AI voice or chat agent.',
      date: 'Jan 04, 2026',
      category: 'Guide'
    },
    {
      slug: 'reduce-appointment-no-shows',
      title: 'How to Reduce Appointment No-Shows by 40% with AI',
      excerpt: 'Automated follow-ups that go beyond simple text reminders to confirm intent.',
      date: 'Jan 04, 2026',
      category: 'Growth'
    },
    {
      slug: 'ruby-receptionists-alternatives',
      title: 'Best Ruby Receptionists Alternatives (2026)',
      excerpt: 'Comparing Ruby to modern AI-powered receptionist services. Which one delivers better ROI?',
      date: 'Jan 03, 2026',
      category: 'Comparison'
    },
    {
      slug: 'scaling-multi-location',
      title: 'Scaling Multi-Location Businesses with Unified AI',
      excerpt: 'How to maintain brand consistency across 50+ locations while keeping costs flat.',
      date: 'Jan 03, 2026',
      category: 'Strategy'
    },
    {
      slug: 'scripts-that-convert',
      title: 'AI Voice Scripts That Convert: The Triage Framework',
      excerpt: 'The psychological triggers that make customers trust an AI agent on the first call.',
      date: 'Jan 03, 2026',
      category: 'Guide'
    },
    {
      slug: 'service-business-profit-margins',
      title: 'Service Business Profit Margins: How to Improve Yours',
      excerpt: 'Learn how to calculate true profit margins and discover proven tactics to improve profitability.',
      date: 'Jan 02, 2026',
      category: 'Finance'
    },
    {
      slug: 'smith-ai-alternatives',
      title: 'Best Smith.ai Alternatives in 2026: Complete Guide',
      excerpt: 'Exploring the best alternatives to Smith.ai for virtual reception and lead intake.',
      date: 'Jan 02, 2026',
      category: 'Comparison'
    },
    {
      slug: 'sms-followups',
      title: 'The Power of Automated SMS Follow-Ups',
      excerpt: 'Why text messages are the secret weapon for lead re-engagement and booking.',
      date: 'Jan 02, 2026',
      category: 'Growth'
    },
    {
      slug: 'tcpa-gdpr-compliance',
      title: 'AI Compliance Guide: Navigating TCPA and GDPR',
      excerpt: 'Ensure your automated outreach and data handling stay on the right side of the law.',
      date: 'Jan 01, 2026',
      category: 'Legal'
    },
    {
      slug: 'virtual-receptionist-comparison',
      title: 'Top 10 Virtual Receptionist Services Compared (2026)',
      excerpt: 'Not all virtual receptionists are built equal. From legacy human pools to cutting-edge AI.',
      date: 'Jan 01, 2026',
      category: 'Comparison'
    },
    {
      slug: 'voice-cloning-ethics',
      title: 'The Ethics of Voice Cloning in Customer Service',
      excerpt: 'How to use custom voices responsibly while improving the customer experience.',
      date: 'Jan 01, 2026',
      category: 'Ethics'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-semibold text-white mb-6">Insights & Articles</h1>
        <p className="text-slate-400 mb-12 text-lg">Practical guides and case studies for business owners who want more customers.</p>

        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all group">
              <div className="flex items-center gap-3 mb-4 text-xs font-medium uppercase tracking-wider">
                <span className="text-blue-400">{p.category}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">{p.date}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 text-blue-400 font-medium hover:gap-3 transition-all">
                Read Article <span>→</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-20">
          <CalendlyCTA />
        </div>
      </main>
    </div>
  );
}
