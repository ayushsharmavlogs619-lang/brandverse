import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Blog — Brandverse',
    description: 'Insights about AI voice agents and business automation.',
};

// Mock data store
const BLOG_POSTS: Record<string, { title: string; date: string; category: string; content: string }> = {
    'how-ai-boosts-leads': {
        title: 'How AI Voice Agents Boost Leads by 200%',
        date: 'Dec 12, 2024',
        category: 'Growth',
        content: `
      <p class="mb-6 text-xl text-slate-300 leading-relaxed">
        Let's face it: relying on voicemail is like throwing money into a black hole. In 2024, if you don't answer the phone, your customer calls the next business on Google. It's that simple.
      </p>
      <h2 class="text-3xl font-bold text-white mt-12 mb-6">The "Speed to Lead" Problem</h2>
      <p class="mb-6 text-slate-400 leading-relaxed">
        Statistics show that lead qualification drops by 80% if you wait more than 5 minutes to respond. Yet, most contractors are busy on job sites and can't answer calls instantly.
        <br/><br/>
        This is where AI Voice Agents bridge the gap. Unlike a human receptionist who takes breaks, goes home at 5 PM, and can only handle one call at a time, an AI agent is:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-slate-400 mb-8">
        <li>Available 24/7/365</li>
        <li>Instantly scalable (can handle 100 calls at once)</li>
        <li>Always cheerful and professional</li>
      </ul>
      <h2 class="text-3xl font-bold text-white mt-12 mb-6">Real World Math</h2>
      <p class="mb-6 text-slate-400 leading-relaxed">
        If you miss 10 calls a week, and your average customer value is $500, that's $5,000 a week in potential revenue lost. An AI agent might cost $497/month. The ROI is immediate.
      </p>
    `
    },
    'human-vs-ai-receptionist': {
        title: 'Human vs. AI Receptionist: The Real Cost Breakdown',
        date: 'Dec 08, 2024',
        category: 'Comparison',
        content: `
      <p class="mb-6 text-xl text-slate-300 leading-relaxed">
        Hiring staff is expensive. It's not just the salary—it's the taxes, benefits, training time, and turnover. Let's look at the numbers.
      </p>
      <h2 class="text-3xl font-bold text-white mt-12 mb-6">The True Cost of a Human</h2>
      <p class="mb-6 text-slate-400 leading-relaxed">
        A decent receptionist costs at least $3,000/month (often more). Add in payroll taxes and benefits, and you're looking at $40k-$50k per year.
        <br/><br/>
        And what do you get? 40 hours of coverage a week. That leaves 128 hours a week where your business is technically "closed."
      </p>
      <h2 class="text-3xl font-bold text-white mt-12 mb-6">The AI Advantage</h2>
      <p class="mb-6 text-slate-400 leading-relaxed">
        Brandverse AI plans start at a fraction of a full-time salary. You get 168 hours of coverage per week. No sick days. No bad attitudes. No training ramp-up.
      </p>
    `
    },
    'future-of-service-business': {
        title: 'The Future of Service Businesses is "Always On"',
        date: 'Nov 28, 2024',
        category: 'Industry Trends',
        content: `
      <p class="mb-6 text-xl text-slate-300 leading-relaxed">
        The "Amazon Effect" has changed customer expectations forever. People want instant answers, instant booking, and instant confirmation.
      </p>
      <p class="mb-6 text-slate-400 leading-relaxed">
        Service businesses that cling to "9-to-5" hours are being left behind. If a pipe bursts at 2 AM or a furnace dies on Christmas Eve, the customer isn't going to leave a voicemail and wait. They are going to keep calling until someone answers.
        <br/><br/>
        That "someone" needs to be you. And with AI, it can be—without you actually waking up.
      </p>
    `
    }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = BLOG_POSTS[resolvedParams.slug];

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">BRANDVERSE</Link>
                    <div className="hidden md:flex gap-8 text-sm font-medium">
                        <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
                        <Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link>
                        <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
                    </div>
                    <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">Book Demo</Link>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
                <Link href="/blog" className="text-slate-500 hover:text-blue-400 mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors">
                    ← Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6 text-sm font-bold uppercase tracking-widest">
                        <span className="text-blue-400">{post.category}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">{post.date}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{post.title}</h1>
                </header>

                <article className="prose prose-invert prose-lg max-w-none text-slate-400">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                <div className="mt-16 pt-12 border-t border-white/10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to automate your business?</h3>
                    <Link href="/contact" className="inline-block px-8 py-4 bg-blue-600 rounded-xl font-black text-white hover:bg-blue-700 transition-all">
                        Schedule Your Demo
                    </Link>
                </div>
            </main>
        </div>
    );
}
