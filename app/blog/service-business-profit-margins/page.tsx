import Link from 'next/link';

export const metadata = {
    title: 'Service Business Profit Margins: How to Calculate & Improve Yours | Brandverse',
    description: 'Learn how to calculate true profit margins for service businesses and discover proven tactics to improve profitability without raising prices.',
    keywords: ['service business margins', 'profit calculator', 'improve margins', 'service business profitability'],
};

export default function Article() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6 text-sm">
                        <span className="text-blue-400 font-medium">Finance Guide</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">January 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">11 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
                        Service Business Profit Margins: How to Calculate & Improve Yours
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Most service business owners don't know their true margins. Here's how to calculate accurately—and 7 ways to improve them without raising prices.
                    </p>
                </header>

                <div className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 rounded-2xl p-8 mb-12">
                    <h3 className="text-xl font-semibold text-white mb-3">Calculate Your Margins</h3>
                    <p className="text-slate-400 mb-4">Free calculator with profit optimization scenarios.</p>
                    <Link href="/tools/margin-calculator" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-all">
                        Calculate Your Profit Margin →
                    </Link>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">What Are "Good" Margins for Service Businesses?</h2>

                    <p>Service businesses typically have higher margins than product-based businesses because there's no cost of goods sold. But healthy margins vary by industry:</p>

                    <div className="overflow-x-auto my-8">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-4 text-white">Industry</th>
                                    <th className="p-4 text-white">Healthy Range</th>
                                    <th className="p-4 text-white">Excellent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr><td className="p-4">HVAC/Plumbing</td><td className="p-4">15-25%</td><td className="p-4">30%+</td></tr>
                                <tr><td className="p-4">Electrical</td><td className="p-4">12-20%</td><td className="p-4">25%+</td></tr>
                                <tr><td className="p-4">Dental</td><td className="p-4">35-45%</td><td className="p-4">50%+</td></tr>
                                <tr><td className="p-4">Legal</td><td className="p-4">30-40%</td><td className="p-4">45%+</td></tr>
                                <tr><td className="p-4">Consulting</td><td className="p-4">25-35%</td><td className="p-4">40%+</td></tr>
                                <tr><td className="p-4">Landscaping</td><td className="p-4">10-18%</td><td className="p-4">22%+</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <p>If you're below your industry's healthy range, you're either underpriced or overspending. If you're in the excellent range, you're doing something right.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">How to Calculate Your True Margin</h2>

                    <p>Most business owners calculate "gross profit" and think they're done. But that doesn't account for overhead, which is where profit dies.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">The Complete Formula</h3>

                    <div className="my-8 p-8 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                        <p className="text-white font-mono">Revenue - (Labor + Materials + Overhead + Marketing) = Net Profit</p>
                        <p className="text-white font-mono">Net Profit ÷ Revenue × 100 = Profit Margin %</p>
                    </div>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Example: HVAC Company</h3>

                    <div className="my-6 p-6 bg-white/5 rounded-xl border border-white/10">
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li><strong className="text-white">Monthly Revenue:</strong> $50,000</li>
                            <li><strong className="text-white">Labor:</strong> $20,000 (40%)</li>
                            <li><strong className="text-white">Materials:</strong> $10,000 (20%)</li>
                            <li><strong className="text-white">Overhead:</strong> $8,000 (16%) — office, trucks, insurance</li>
                            <li><strong className="text-white">Marketing:</strong> $2,000 (4%)</li>
                            <li className="pt-2 border-t border-white/10"><strong className="text-emerald-400">Net Profit: $10,000 (20%)</strong></li>
                        </ul>
                    </div>

                    <p>20% is solid for HVAC. But what if we could push it to 25% without raising prices?</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">7 Ways to Improve Margins (Without Raising Prices)</h2>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">1. Reduce Overhead with Automation</h3>

                    <p><strong className="text-white">Target: 2-5% margin improvement</strong></p>

                    <p>Every dollar of overhead you cut goes straight to profit. Common overhead automation wins:</p>

                    <ul>
                        <li>AI receptionist ($497/mo) vs. human ($3,500/mo) = $3,000/mo saved</li>
                        <li>Automated scheduling reduces admin time by 10-15 hours/week</li>
                        <li>AI follow-ups eliminate need for SDR ($4,000+/mo saved)</li>
                    </ul>

                    <p>For the HVAC company: cutting $2,000/mo in overhead pushes margin from 20% to 24%.</p>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">2. Improve First-Time Fix Rate</h3>

                    <p><strong className="text-white">Target: 1-3% margin improvement</strong></p>

                    <p>Every callback costs you labor and gas with no additional revenue. Train techs better, stock trucks better, use diagnostic checklists.</p>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">3. Capture More Leads from Same Marketing Spend</h3>

                    <p><strong className="text-white">Target: 2-4% margin improvement</strong></p>

                    <p>If you're spending $2,000/mo on ads and missing 30% of calls, you're throwing away $600 in wasted ad spend. Fix conversion, reduce effective CAC.</p>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">4. Negotiate Better Supplier Terms</h3>

                    <p><strong className="text-white">Target: 1-2% margin improvement</strong></p>

                    <p>Get volume discounts, pay early for 2% discounts, find alternative suppliers. Every 1% saved on materials is pure profit.</p>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">5. Reduce Labor Waste</h3>

                    <p><strong className="text-white">Target: 2-4% margin improvement</strong></p>

                    <p>Track billable hours vs. total hours. If techs are only billing 70% of their time, that's 30% waste. Improve routing, reduce admin burden, better scheduling.</p>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">6. Upsell/Cross-Sell More Per Job</h3>

                    <p><strong className="text-white">Target: 3-5% margin improvement</strong></p>

                    <p>If average ticket goes from $500 to $600 with minimal added cost, profit jumps from $150 to $250 per job—a 67% increase in profit per transaction.</p>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">7. Cut Turnover Costs</h3>

                    <p><strong className="text-white">Target: 1-2% margin improvement</strong></p>

                    <p>Hiring + training a new tech costs $5,000-10,000. If you have 4 techs and 50% annual turnover, that's $10K-20K/year just replacing people.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">The Compound Effect</h2>

                    <p>These improvements stack:</p>

                    <div className="my-8 p-8 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 rounded-xl">
                        <p className="text-white mb-4"><strong>Starting Margin:</strong> 20%</p>
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li>• +4% from overhead automation</li>
                            <li>• +2% from better lead capture</li>
                            <li>• +3% from labor efficiency</li>
                            <li>• +3% from higher average tickets</li>
                        </ul>
                        <p className="text-2xl font-bold text-emerald-400 mt-6">New Margin: 32%</p>
                        <p className="text-sm text-slate-400 mt-2">That's 60% more profit without a single price increase.</p>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Calculate Your Improvement Potential</h2>

                    <p>Use our free margin calculator to model these scenarios with your actual numbers.</p>

                    <div className="my-8 p-8 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 rounded-2xl text-center">
                        <h3 className="text-2xl font-semibold text-white mb-3">Service Business Margin Calculator</h3>
                        <p className="text-slate-400 mb-6">See how automation and efficiency impact your bottom line.</p>
                        <Link href="/tools/margin-calculator" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-lg transition-all">
                            Calculate Your Margins →
                        </Link>
                    </div>

                </div>

            </article>
        </div>
    );
}
