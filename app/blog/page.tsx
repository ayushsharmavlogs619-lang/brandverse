import Link from 'next/link';

export const metadata = {
  title: 'Blog — Brandverse',
  description: 'Insights and articles about AI automation, voice agents, chatbots, and paid advertising for local businesses.',
};

export default function BlogIndex() {
  const posts = [
    {
      slug: 'lead-generation-for-contractors',
      title: 'Lead Generation for Contractors: 7 Proven Strategies for 2026',
      excerpt: 'Stop buying "junk" leads. Here is how to build a predictable revenue engine for your contracting business that YOU own.',
      date: 'Jan 12, 2026',
      category: 'Strategy'
    },
    {
      slug: 'virtual-receptionist-comparison',
      title: 'Top 10 Virtual Receptionist Services Compared (2026)',
      excerpt: 'Not all virtual receptionists are built equal. From legacy human pools to cutting-edge AI, here is the definitive comparison.',
      date: 'Jan 11, 2026',
      category: 'Comparison'
    },
    {
      slug: 'ai-marketing-med-spas',
      title: 'Best AI Marketing Tools for Med Spas & Aesthetics in 2026',
      excerpt: 'How leading med spas use AI to convert late-night browsers into booked appointments without extra staff.',
      date: 'Jan 10, 2026',
      category: 'Industry'
    },
    {
      slug: 'chatbot-for-electricians',
      title: 'Chatbot for Electricians: Capture More Service Calls',
      excerpt: 'Hands-on work means missed calls. Here is how AI handles your phone and web chat while you are on a ladder.',
      date: 'Jan 09, 2026',
      category: 'Industry'
    },
    {
      slug: '24-7-answering-service-small-business',
      title: '24/7 Answering Service for Small Business: Complete Guide',
      excerpt: 'Your customers need you at 9 PM on a Saturday. Here is how 24/7 coverage works and why AI is the best fit.',
      date: 'Jan 08, 2026',
      category: 'Service'
    },
    {
      slug: 'best-no-code-chatbot-builders',
      title: 'Best No-Code Chatbot Builders in 2026: Complete Comparison',
      excerpt: 'Build AI chatbots without coding skills. We compare the top 10 platforms and assess DIY vs. Done-for-you.',
      date: 'Jan 07, 2026',
      category: 'Tools'
    },
    {
      slug: 'ai-answering-service-plumbers',
      title: 'AI Answering Service for Plumbers: Never Miss a Service Call',
      excerpt: 'Pipes burst at 2 AM. Here is how to capture every emergency job without being on call yourself.',
      date: 'Jan 06, 2026',
      category: 'Industry'
    },
    {
      slug: 'ai-chatbot-for-law-firms',
      title: 'Best AI Chatbot for Law Firms in 2026: Complete Guide',
      excerpt: 'Capture cases 11 PM with ethics-compliant AI legal intake. Compare the top solutions for attorneys.',
      date: 'Jan 05, 2026',
      category: 'Industry'
    },
    {
      slug: 'google-ads-local-service-business',
      title: 'Google Ads for Local Service Business: Complete 2026 Guide',
      excerpt: 'Dominate "near me" searches. Strategies, bidding tips, and real ROI examples for local lead generation.',
      date: 'Jan 04, 2026',
      category: 'PPC'
    },
    {
      slug: 'how-to-train-ai-chatbot',
      title: 'How to Train an AI Chatbot on Your Business Data',
      excerpt: 'Generic AI is useless. Here is how to feed your business docs and FAQs to create a custom assistant.',
      date: 'Jan 03, 2026',
      category: 'How-To'
    },
    {
      slug: 'answering-service-cost',
      title: 'How Much Does an Answering Service Cost in 2026?',
      excerpt: 'Complete pricing breakdown: Human vs AI. Real cost examples for dental, HVAC, and legal practices.',
      date: 'Jan 02, 2026',
      category: 'Pricing'
    },
    {
      slug: 'intercom-alternatives',
      title: 'Best Intercom Alternatives for Small Business in 2026',
      excerpt: 'Looking for a more cost-effective chatbot solution? Compare the top Intercom competitors.',
      date: 'Jan 01, 2026',
      category: 'Comparison'
    },
    {
      slug: 'ai-chatbot-for-real-estate',
      title: 'Best AI Chatbot for Real Estate Agents in 2026',
      excerpt: 'Capture more buyer and seller leads 24/7 with real estate focused AI automation.',
      date: 'Dec 30, 2025',
      category: 'Industry'
    },
    {
      slug: 'missed-call-revenue-calculator',
      title: 'Missed Call Revenue Calculator: How Much Money Are You Losing?',
      excerpt: 'A eye-opening look at the financial impact of missed calls and how much revenue you are leaving on the table.',
      date: 'Dec 28, 2025',
      category: 'Tools'
    },
    {
      slug: 'facebook-ads-roi-local-business',
      title: 'Facebook Ads ROI for Local Business: Real Numbers',
      excerpt: 'What to expect from Meta ads. Case studies showing 6-13x returns for local service providers.',
      date: 'Dec 26, 2025',
      category: 'Ads'
    },
    {
      slug: 'ai-answering-service-hvac',
      title: 'Best AI Answering Service for HVAC Companies in 2026',
      excerpt: 'Handle emergency no-heat calls instantly. How HVAC companies use AI to capture leads 24/7.',
      date: 'Dec 24, 2025',
      category: 'Trade'
    },
    {
      slug: 'ruby-receptionists-alternatives',
      title: 'Best Ruby Receptionists Alternatives in 2026',
      excerpt: 'Comparing Ruby to modern AI-powered receptionist services. Which one delivers better ROI?',
      date: 'Dec 22, 2025',
      category: 'Comparison'
    },
    {
      slug: 'ai-chatbot-for-dentists',
      title: 'Best AI Chatbot for Dental Practice in 2026',
      excerpt: 'Fill your schedule without extra office staff. How dentists use AI for 24/7 appointment booking.',
      date: 'Dec 20, 2025',
      category: 'Industry'
    },
    {
      slug: 'smith-ai-alternatives',
      title: 'Best Smith.ai Alternatives in 2026: Complete Guide',
      excerpt: 'Exploring the best alternatives to Smith.ai for virtual reception and lead intake.',
      date: 'Dec 18, 2025',
      category: 'Comparison'
    },
    {
      slug: 'best-ai-receptionists',
      title: '10 Best AI Receptionists for Small Business in 2026',
      excerpt: 'A direct comparison of the top AI voice agents and virtual receptionists on the market.',
      date: 'Dec 15, 2025',
      category: 'Review'
    },
    {
      slug: 'how-ai-boosts-leads',
      title: 'How AI Voice Agents Boost Leads by 200%',
      excerpt: 'Stop losing money to voicemail. Discover the math behind 24/7 instant lead response.',
      date: 'Dec 12, 2024',
      category: 'Growth'
    },
    {
      slug: 'ai-voice-roi',
      title: 'The Real ROI of AI Voice Automation',
      excerpt: 'We break down the numbers: what you invest vs what you get back. Measured in multiples, not percentages.',
      date: 'Dec 10, 2024',
      category: 'ROI'
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
      </main>
    </div>
  );
}
