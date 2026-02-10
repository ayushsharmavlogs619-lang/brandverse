import Link from 'next/link';
import CalendlyCTA from '@/app/components/CalendlyCTA';

export const metadata = {
    title: 'Missed Call Revenue Calculator: How Much Are You Losing? | Brandverse',
    description: 'Calculate how much revenue your business loses from missed calls. Free calculator with industry benchmarks and actionable solutions.',
    keywords: ['missed call calculator', 'missed call revenue', 'lost revenue calculator', 'business call analytics', 'missed opportunity cost'],
};

export default function Article() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6 text-sm">
                        <span className="text-blue-400 font-medium">Calculator & Guide</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">January 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">8 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
                        Missed Call Revenue Calculator: How Much Money Are You Losing?
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Every missed call is money walking out the door. But how much exactly?
                        Let&apos;s calculate your specific number—and then fix it.
                    </p>
                </header>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-8 mb-12">
                    <h3 className="text-xl font-semibold text-white mb-3">Stop the Bleeding</h3>
                    <p className="text-slate-400 mb-4">AI voice agents answer every call, 24/7. See how much you could recover.</p>
                    <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all">
                        Get Your Custom Analysis →
                    </Link>
                </div>

                <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/20 rounded-2xl p-8 mb-12">
                    <h3 className="text-2xl font-semibold text-white mb-3">🧮 Use Our Free Calculator</h3>
                    <p className="text-slate-400 mb-4">Get your exact lost revenue number in 60 seconds. Choose your industry, input your data, see the damage.</p>
                    <Link href="/tools/missed-call-calculator" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-all">
                        Calculate My Lost Revenue →
                    </Link>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">The Missed Call Calculator</h2>

                    <p>Here&apos;s the simple formula:</p>

                    <div className="my-8 p-8 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-2xl text-white font-mono text-center">
                            Monthly Lost Revenue = Missed Calls × Conversion Rate × Average Customer Value
                        </p>
                    </div>

                    <p>Let&apos;s break down each component:</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Step 1: Count Your Missed Calls</h3>
                    <p>Check your phone system for abandoned calls. If you don&apos;t have data, use this estimate based on industry research:</p>

                    <ul>
                        <li>Small service business (1-5 employees): 30-50 missed calls/month</li>
                        <li>Medium service business (6-20 employees): 50-100 missed calls/month</li>
                        <li>Medical/dental practice: 40-80 missed calls/month</li>
                        <li>Legal firm: 20-40 missed calls/month</li>
                    </ul>

                    <p>Remember: missed calls include calls that go to voicemail, calls abandoned on hold, and calls during times you&apos;re closed.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Step 2: Determine Your Conversion Rate</h3>
                    <p>Of people who reach you, what percentage become customers? Industry averages:</p>

                    <ul>
                        <li>HVAC/Plumbing/Electrical: 25-35%</li>
                        <li>Dental: 30-40%</li>
                        <li>Legal: 15-25%</li>
                        <li>Real estate: 10-20%</li>
                        <li>General home services: 25-35%</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Step 3: Calculate Average Customer Value</h3>
                    <p>Include the first transaction plus likely follow-up business over a reasonable timeframe:</p>

                    <ul>
                        <li>Plumber (first job + estimated callbacks): $400-600</li>
                        <li>HVAC (repair + maintenance plan potential): $500-800</li>
                        <li>Dental (first year value): $800-1,200</li>
                        <li>Legal (case value varies): $1,500-15,000+</li>
                        <li>Real estate (commission): $8,000-15,000</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Example Calculations by Industry</h2>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">Plumbing Company</h3>
                    <div className="my-6 p-6 bg-white/5 rounded-xl border border-white/10">
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li>Missed calls: 45/month</li>
                            <li>Conversion rate: 30%</li>
                            <li>Average job value: $450</li>
                            <li className="pt-2 border-t border-white/10"><strong className="text-white">Lost revenue: 45 × 0.30 × $450 = $6,075/month</strong></li>
                            <li className="text-green-400">Annual loss: $72,900</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">Dental Practice</h3>
                    <div className="my-6 p-6 bg-white/5 rounded-xl border border-white/10">
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li>Missed calls: 60/month</li>
                            <li>Conversion rate: 35%</li>
                            <li>First-year patient value: $950</li>
                            <li className="pt-2 border-t border-white/10"><strong className="text-white">Lost revenue: 60 × 0.35 × $950 = $19,950/month</strong></li>
                            <li className="text-green-400">Annual loss: $239,400</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">HVAC Contractor</h3>
                    <div className="my-6 p-6 bg-white/5 rounded-xl border border-white/10">
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li>Missed calls: 50/month</li>
                            <li>Conversion rate: 30%</li>
                            <li>Average job value: $650</li>
                            <li className="pt-2 border-t border-white/10"><strong className="text-white">Lost revenue: 50 × 0.30 × $650 = $9,750/month</strong></li>
                            <li className="text-green-400">Annual loss: $117,000</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">Law Firm</h3>
                    <div className="my-6 p-6 bg-white/5 rounded-xl border border-white/10">
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li>Missed calls: 25/month</li>
                            <li>Conversion rate: 20%</li>
                            <li>Average case value: $5,000</li>
                            <li className="pt-2 border-t border-white/10"><strong className="text-white">Lost revenue: 25 × 0.20 × $5,000 = $25,000/month</strong></li>
                            <li className="text-green-400">Annual loss: $300,000</li>
                        </ul>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Where Do Missed Calls Come From?</h2>

                    <p>Understanding the sources helps you fix the problem:</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">1. After-Hours Calls (35-45% of missed calls)</h3>
                    <p>Your business hours are 8-5. Customers need you at 7 PM and on weekends. Most after-hours callers won&apos;t leave voicemails—they&apos;ll just call someone else.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">2. High-Volume Periods (20-30% of missed calls)</h3>
                    <p>Monday mornings. First hot day of summer for HVAC. Tax season for accountants. When you&apos;re busiest, you miss the most.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">3. Staff Busy/Unavailable (15-25% of missed calls)</h3>
                    <p>Lunch breaks, meetings, helping other customers, bathroom breaks—any time your phone person is occupied.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">4. Hold Time Abandonment (10-20% of missed calls)</h3>
                    <p>Caller placed on hold, wait too long, hang up. The threshold is shorter than you think—42% of people hang up after 1 minute.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Solutions by Problem Type</h2>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">For After-Hours: AI Voice Agents</h3>
                    <p>AI voice agents answer 24/7/365 with the same quality as your best receptionist. They book appointments, capture information, and route emergencies—all while you sleep.</p>
                    <p>Cost: $400-700/month. ROI: Typically 5-15x for businesses with significant after-hours call volume.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">For High-Volume: AI + Human Hybrid</h3>
                    <p>AI handles overflow during peak times. Never tells a customer to hold. Never lets calls go to voicemail.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">For Staff Gaps: Call Routing with AI Backup</h3>
                    <p>Phone rings, staff misses it, AI picks up immediately. Seamless experience for the caller.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">For Hold Time: AI Pre-Qualification</h3>
                    <p>AI gathers information while caller would otherwise be on hold. When staff picks up, they have context and the call is faster.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">The Cost of Fixing It</h2>

                    <p>Here&apos;s the math on common solutions:</p>

                    <div className="overflow-x-auto my-8">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-4 text-white">Solution</th>
                                    <th className="p-4 text-white">Monthly Cost</th>
                                    <th className="p-4 text-white">Calls Captured</th>
                                    <th className="p-4 text-white">Typical ROI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr><td className="p-4">Additional full-time receptionist</td><td className="p-4">$3,500-4,500</td><td className="p-4">Business hours only</td><td className="p-4">1-2x</td></tr>
                                <tr><td className="p-4">Human answering service</td><td className="p-4">$300-800</td><td className="p-4">After-hours + overflow</td><td className="p-4">2-4x</td></tr>
                                <tr><td className="p-4 text-blue-400 font-medium">AI Voice Agent</td><td className="p-4">$400-700</td><td className="p-4">24/7, unlimited</td><td className="p-4">6-15x</td></tr>
                                <tr><td className="p-4">Voicemail-to-text + fast callback</td><td className="p-4">$50-100</td><td className="p-4">Varies (many won&apos;t leave VM)</td><td className="p-4">1-3x</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Case Study: The 23-Call Recovery</h2>

                    <p>Here&apos;s what happened when a plumbing company implemented Brandverse AI voice agents:</p>

                    <p><strong className="text-white">Before:</strong></p>
                    <ul>
                        <li>47 missed calls/month documented</li>
                        <li>Estimated 35% would have converted = 16 lost jobs</li>
                        <li>At $450 average = $7,200/month lost</li>
                    </ul>

                    <p><strong className="text-white">After 60 days:</strong></p>
                    <ul>
                        <li>0 calls going to voicemail</li>
                        <li>23 additional jobs booked from after-hours calls</li>
                        <li>Revenue recovered: $10,350/month</li>
                        <li>AI cost: $497/month</li>
                    </ul>

                    <p><strong className="text-white">Net gain: $9,853/month</strong></p>
                    <p>That&apos;s $118,236/year from solving one problem.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Calculate Your Number</h2>

                    <p>Use this template with your real numbers:</p>

                    <div className="my-8 p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                        <p className="text-white">Your missed calls per month: _____</p>
                        <p className="text-white">Your conversion rate (% that become customers): _____</p>
                        <p className="text-white">Your average customer value: $_____</p>
                        <p className="pt-4 border-t border-white/10 text-lg"><strong className="text-white">Your monthly loss: Missed × Rate × Value = $_____</strong></p>
                        <p className="text-green-400"><strong>Annual loss: Monthly × 12 = $_____</strong></p>
                    </div>

                    <p>If that number makes you uncomfortable, good. Now you know what to fix.</p>

                </div>

                <div className="mt-16 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">Ready to Fix the Leak?</h3>
                    <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                        Book a call and we&apos;ll calculate your specific opportunity—with a plan to capture every call starting week one.
                    </p>
                    <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-lg transition-all">
                        Get Your Custom Analysis →
                    </Link>
                </div>

            </article>
        </div>
    );
}
