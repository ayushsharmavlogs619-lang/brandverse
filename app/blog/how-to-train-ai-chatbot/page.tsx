import Link from 'next/link';
import CalendlyCTA from '@/app/components/CalendlyCTA';

export const metadata = {
    title: 'How to Train an AI Chatbot on Your Business Data: Step-by-Step Guide | Brandverse',
    description: 'Learn how to train an AI chatbot on your website, FAQs, and business data. Complete guide for non-technical business owners.',
    keywords: ['train AI chatbot', 'custom AI chatbot', 'train chatbot on data', 'business chatbot training', 'AI chatbot setup'],
};

export default function Article() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6 text-sm">
                        <span className="text-blue-400 font-medium">How-To Guide</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">January 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">11 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
                        How to Train an AI Chatbot on Your Business Data
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Generic chatbots give generic answers. Here&apos;s how to train AI on YOUR business—your
                        products, prices, services, and FAQs—so it actually helps your customers.
                    </p>
                </header>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-8 mb-12">
                    <h3 className="text-xl font-semibold text-white mb-3">Skip the DIY?</h3>
                    <p className="text-slate-400 mb-4">We train AI chatbots on your business data for you. Live in 7 days or less.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all">
                        Book Your Setup Call →
                    </Link>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Why Training Matters</h2>

                    <p>An untrained chatbot is useless. Customer asks &quot;What are your hours?&quot; and it responds &quot;I&apos;m an AI assistant, I don&apos;t have information about business hours.&quot; That&apos;s worse than no chatbot at all.</p>

                    <p>A trained chatbot knows your business. Same question: &quot;We&apos;re open Monday-Friday 8 AM to 6 PM, and Saturdays 9 AM to 2 PM. Would you like to schedule an appointment?&quot;</p>

                    <p>The difference is training—feeding the AI your specific information so it responds accurately.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">What Data to Train On</h2>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Essential (Must Have)</h3>
                    <ul>
                        <li><strong className="text-white">Business basics:</strong> Hours, location, contact info, service areas</li>
                        <li><strong className="text-white">Products/services:</strong> What you offer, descriptions, categories</li>
                        <li><strong className="text-white">Pricing:</strong> Rates, packages, how pricing works (if not sensitive)</li>
                        <li><strong className="text-white">FAQs:</strong> The 20-50 questions you get asked most often</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Important (Should Have)</h3>
                    <ul>
                        <li><strong className="text-white">Policies:</strong> Returns, warranties, payment terms</li>
                        <li><strong className="text-white">Process:</strong> How to get started, what to expect</li>
                        <li><strong className="text-white">Differentiators:</strong> Why choose you over competitors</li>
                        <li><strong className="text-white">Common objections:</strong> Responses to &quot;It&apos;s too expensive&quot; or &quot;I need to think about it&quot;</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Optional (Nice to Have)</h3>
                    <ul>
                        <li><strong className="text-white">Team info:</strong> Who does what, backgrounds</li>
                        <li><strong className="text-white">History:</strong> How long in business, story</li>
                        <li><strong className="text-white">Technical details:</strong> Specifics for complex products</li>
                        <li><strong className="text-white">Industry context:</strong> General information relevant to your field</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">3 Ways to Train Your AI Chatbot</h2>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">Method 1: Website Crawling (Easiest)</h3>

                    <p>Most AI chatbot platforms can crawl your website and learn from existing content. Just point it at your URL and it extracts information from:</p>
                    <ul>
                        <li>Service/product pages</li>
                        <li>About page</li>
                        <li>FAQ page</li>
                        <li>Blog posts</li>
                        <li>Contact information</li>
                    </ul>

                    <p><strong className="text-white">Pros:</strong> Fast, automatic, no extra work if your website is already comprehensive.</p>
                    <p><strong className="text-white">Cons:</strong> Only as good as your website content. If information isn&apos;t on the site, AI won&apos;t know it.</p>

                    <p><strong className="text-white">How to do it:</strong></p>
                    <ol>
                        <li>Sign up for a chatbot platform (Brandverse, Tidio, etc.)</li>
                        <li>Enter your website URL</li>
                        <li>Let it crawl and extract content</li>
                        <li>Review what it learned</li>
                        <li>Fill gaps with manual additions</li>
                    </ol>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">Method 2: Document Upload</h3>

                    <p>Upload PDFs, Word docs, spreadsheets, or text files containing business information. Good for:</p>
                    <ul>
                        <li>Internal training manuals</li>
                        <li>Product catalogs</li>
                        <li>Policy documents</li>
                        <li>Price sheets</li>
                        <li>Technical specifications</li>
                    </ul>

                    <p><strong className="text-white">Pros:</strong> Use existing documentation. Can include info not on website.</p>
                    <p><strong className="text-white">Cons:</strong> Requires having organized documents. May need cleanup.</p>

                    <p><strong className="text-white">How to do it:</strong></p>
                    <ol>
                        <li>Gather all relevant business documents</li>
                        <li>Remove outdated or incorrect information</li>
                        <li>Upload to your chatbot platform&apos;s knowledge base</li>
                        <li>Test with sample questions</li>
                        <li>Iterate based on gaps</li>
                    </ol>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">Method 3: Q&A Pairs (Most Precise)</h3>

                    <p>Manually create question-answer pairs for the AI to learn from. Most work upfront, but most control over responses.</p>

                    <p><strong className="text-white">Example format:</strong></p>
                    <div className="my-6 p-6 bg-white/5 rounded-xl border border-white/10 font-mono text-sm">
                        <p className="text-slate-400">Q: What are your hours?</p>
                        <p className="text-white mb-4">A: We&apos;re open Monday-Friday 8 AM to 6 PM, and Saturdays 9 AM to 2 PM. Closed Sundays.</p>
                        <p className="text-slate-400">Q: Do you offer financing?</p>
                        <p className="text-white mb-4">A: Yes! We offer 0% financing for 12 months on projects over $1,000. We can discuss options during your consultation.</p>
                        <p className="text-slate-400">Q: How quickly can you respond to an emergency?</p>
                        <p className="text-white">A: We have technicians on call 24/7. For emergencies, we typically arrive within 2 hours.</p>
                    </div>

                    <p><strong className="text-white">Pros:</strong> Complete control. Can craft perfect responses. Handles edge cases.</p>
                    <p><strong className="text-white">Cons:</strong> Time-consuming. Requires anticipating all questions.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Step-by-Step Training Process</h2>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Step 1: Audit Your Information</h3>
                    <p>Before training, gather all sources of truth:</p>
                    <ul>
                        <li>Review your website for accuracy</li>
                        <li>List your top 50 customer questions</li>
                        <li>Collect pricing/service information</li>
                        <li>Note anything NOT on your website that customers ask about</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Step 2: Choose Your Approach</h3>
                    <p>For most businesses, this combination works best:</p>
                    <ol>
                        <li>Website crawl for baseline information</li>
                        <li>Document upload for detailed/internal info</li>
                        <li>Q&A pairs for high-stakes questions (pricing, policies, objections)</li>
                    </ol>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Step 3: Initial Training</h3>
                    <ul>
                        <li>Connect your website URL</li>
                        <li>Upload relevant documents</li>
                        <li>Add 20-30 critical Q&A pairs</li>
                        <li>Test with sample conversations</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Step 4: Test Thoroughly</h3>
                    <p>Ask the chatbot:</p>
                    <ul>
                        <li>Your 20 most common customer questions</li>
                        <li>Edge cases (&quot;What if I need service on Sunday?&quot;)</li>
                        <li>Pricing questions</li>
                        <li>Competitor comparisons (&quot;Why should I choose you over [competitor]?&quot;)</li>
                    </ul>
                    <p>Note every bad answer and add corrections.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Step 5: Launch and Iterate</h3>
                    <p>Go live but continue improving:</p>
                    <ul>
                        <li>Review chat transcripts weekly</li>
                        <li>Note questions the AI couldn&apos;t answer well</li>
                        <li>Add new Q&A pairs for gaps</li>
                        <li>Update information as your business changes</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Common Training Mistakes</h2>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">1. Not Enough Information</h3>
                    <p>If the AI doesn&apos;t have information, it can&apos;t share it. Many businesses train on just their homepage, then wonder why the AI can&apos;t answer detailed questions. More training data = better answers.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">2. Outdated Information</h3>
                    <p>Trained on last year&apos;s pricing? Old team members? Discontinued services? Keep your knowledge base current. Set a quarterly review reminder.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">3. No Escalation Path</h3>
                    <p>The AI won&apos;t know everything. Train it to recognize when to escalate: &quot;That&apos;s a great question—let me connect you with our team who can give you detailed specifics.&quot;</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">4. Ignoring Post-Launch Feedback</h3>
                    <p>Real conversations reveal gaps you didn&apos;t anticipate. If you launch and never review transcripts, you&apos;re missing the most valuable training data—actual customer questions.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">How Brandverse Does Training</h2>

                    <p>If you choose Brandverse, here&apos;s what our process looks like:</p>

                    <ol>
                        <li><strong className="text-white">Discovery call:</strong> We learn your business, services, and common questions</li>
                        <li><strong className="text-white">Website analysis:</strong> We crawl and analyze your current content</li>
                        <li><strong className="text-white">Gap identification:</strong> We identify information missing from your site</li>
                        <li><strong className="text-white">Custom training:</strong> We build your knowledge base with your input</li>
                        <li><strong className="text-white">Testing:</strong> We run scenarios and refine responses</li>
                        <li><strong className="text-white">Launch:</strong> Go live with monitoring</li>
                        <li><strong className="text-white">Optimization:</strong> Continuous improvement based on real conversations</li>
                    </ol>

                    <p>Total time: 5-7 days from kickoff to live chatbot.</p>

                </div>

                <div className="mt-16 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">Want Us to Handle Training?</h3>
                    <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                        We&apos;ll train the AI chatbot on your business data—you just answer a few questions during setup.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-lg transition-all">
                        Book Your Setup Call →
                    </Link>
                </div>

            </article>
        </div>
    );
}
