import Link from 'next/link';

export const metadata = {
  title: 'Blog — Brandverse',
  description: 'Insights and articles about AI voice automation, onboarding, scripts, and case studies for local businesses.',
};

export default function BlogIndex() {
  const posts = [
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
      slug: 'why-never-regret-ai-agents',
      title: 'Why Smart Business Owners Choose AI Voice Agents (And Never Look Back)',
      excerpt: 'The decision that pays for itself in 48 hours. Zero regrets. Ever. Here\'s why thousands never return to human-only teams.',
      date: 'Dec 29, 2024',
      category: 'Value Proposition'
    },
    {
      slug: 'cost-of-not-using-ai',
      title: 'The True Cost of NOT Using AI Voice Agents in 2025',
      excerpt: 'Every day you wait is $500-$2000 donated to competitors. A sobering breakdown of the hidden costs killing your margins.',
      date: 'Dec 28, 2024',
      category: 'Warning'
    },
    {
      slug: '5-signs-youre-ready',
      title: '5 Signs You\'re Ready for AI Voice Agents (And Why Waiting Costs You)',
      excerpt: 'If you recognize 3+ of these signs, you\'re not "exploring"—you\'re leaving money on the table every single day.',
      date: 'Dec 27, 2024',
      category: 'Assessment'
    },
    {
      slug: 'case-study-elite-climate',
      title: 'Case Study: Elite Climate Control & Plumbing',
      excerpt: 'How a skeptical HVAC owner automated 40% of his booking workflow and recovered $15k in missed calls in month one.',
      date: 'Dec 22, 2024',
      category: 'Case Study'
    },
    {
      slug: 'case-study-apex-property',
      title: 'Case Study: Apex Property Group',
      excerpt: 'How we used personal branding and automation to scale a real estate portfolio alongside Ayush\'s operations expertise.',
      date: 'Dec 18, 2024',
      category: 'Case Study'
    },
    {
      slug: 'case-study-brightsmile-dental',
      title: 'Case Study: Brightsmile Dental',
      excerpt: 'From vendor to "Backend Digital In-Charge": How Brandverse architected the entire patient flow for a chaotic dental clinic.',
      date: 'Dec 15, 2024',
      category: 'Case Study'
    },
    {
      slug: 'how-ai-boosts-leads',
      title: 'How AI Voice Agents Boost Leads by 200%',
      excerpt: 'Stop losing money to voicemail. Discover the math behind 24/7 instant lead response and how it doubles conversion rates for contractors.',
      date: 'Dec 12, 2024',
      category: 'Growth'
    },
    {
      slug: 'human-vs-ai-receptionist',
      title: 'Human vs. AI Receptionist: The Real Cost Breakdown',
      excerpt: 'We crunched the numbers on salary, benefits, sick days, and training vs. a flat-rate AI employee. The savings are shocking.',
      date: 'Dec 08, 2024',
      category: 'Comparison'
    },
    {
      slug: 'future-of-service-business',
      title: 'The Future of Service Businesses is "Always On"',
      excerpt: 'Why modern customers expect instant gratification and how service businesses must adapt their communication stack to survive.',
      date: 'Nov 28, 2024',
      category: 'Industry Trends'
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-6">Insights & Articles</h1>
        <p className="text-slate-400 mb-10">Practical guides and case studies about AI voice automation for local businesses.</p>

        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group">
              <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-widest">
                <span className="text-blue-400">{p.category}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">{p.date}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h2>
              <p className="text-slate-400 mb-6 text-lg leading-relaxed">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all">
                Read Article <span className="text-blue-500">→</span>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
