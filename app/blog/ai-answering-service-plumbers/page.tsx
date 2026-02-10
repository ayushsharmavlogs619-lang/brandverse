import Link from 'next/link';
import CalendlyCTA from '@/app/components/CalendlyCTA';

export const metadata = {
    title: 'AI Answering Service for Plumbers: Never Miss a Service Call | Brandverse',
    description: 'AI answering services built for plumbers. Capture emergency calls 24/7, book appointments, and never lose a job to voicemail again.',
    keywords: ['plumber answering service', 'AI for plumbing company', 'plumber call answering', 'plumbing receptionist', 'plumber phone service'],
};

export default function Article() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6 text-sm">
                        <span className="text-blue-400 font-medium">Industry Guide</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">January 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">11 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
                        AI Answering Service for Plumbers: Never Miss a Service Call
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Pipes burst at 2 AM. You&apos;re in bed. Customer calls, gets voicemail, calls the next plumber.
                        $500+ job gone. Here&apos;s how to capture every emergency without being on call yourself.
                    </p>
                </header>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-8 mb-12">
                    <h3 className="text-xl font-semibold text-white mb-3">See Plumbing AI in Action</h3>
                    <p className="text-slate-400 mb-4">Book a demo to see how plumbers are capturing every call—even at 2 AM—without hiring night staff.</p>
                    <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all">
                        Book Your Free Demo →
                    </Link>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">The Plumber&apos;s Call Problem</h2>

                    <p>Plumbing has a unique challenge: emergencies happen constantly, but you can&apos;t physically answer calls while snaking a drain.</p>

                    <p>The typical plumber faces:</p>
                    <ul>
                        <li><strong className="text-white">Hands-on work:</strong> Can&apos;t stop mid-repair to answer a call</li>
                        <li><strong className="text-white">Emergency calls at all hours:</strong> Burst pipes don&apos;t wait for business hours</li>
                        <li><strong className="text-white">Small team:</strong> No dedicated receptionist to handle calls</li>
                        <li><strong className="text-white">Competition:</strong> Customers call multiple plumbers—first responder wins</li>
                    </ul>

                    <p>Research shows plumbers miss 35-50% of incoming calls. For emergency calls specifically, the miss rate is even higher because they often come during busy periods or after hours.</p>

                    <p>At an average job value of $350-500, missing 40 calls per month costs $4,000-7,000 in lost revenue.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">What Plumbing AI Answering Services Do</h2>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">24/7 Call Answering</h3>
                    <p>AI answers every call instantly—nights, weekends, holidays. No voicemail, no hold times. Customer talks to what sounds like a professional receptionist, even at 3 AM.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Emergency Triage</h3>
                    <p>The AI identifies true emergencies:</p>
                    <ul>
                        <li>Burst pipes / active flooding</li>
                        <li>Sewage backup</li>
                        <li>Gas smell (pipe-related)</li>
                        <li>No water to the house</li>
                    </ul>
                    <p>Emergencies trigger immediate notification to your on-call tech. Non-emergencies get scheduled appropriately.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Job Information Collection</h3>
                    <p>The AI gathers everything you need before dispatching:</p>
                    <ul>
                        <li>Customer name and phone</li>
                        <li>Service address</li>
                        <li>Problem description</li>
                        <li>Access information (gate code, etc.)</li>
                        <li>Whether they&apos;ve seen this issue before</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Appointment Scheduling</h3>
                    <p>Connects to your calendar (ServiceTitan, Housecall Pro, Jobber) and books appointments in real-time. Customer selects a time, tech gets notified, no back-and-forth needed.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Service Area Verification</h3>
                    <p>Customer in a city you don&apos;t serve? AI politely declines and suggests they find a local plumber. No wasted time on calls you can&apos;t help with.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Top AI Options for Plumbers</h2>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">1. Brandverse AI Voice Agent — Best Overall</h3>

                    <p><strong className="text-white">Price:</strong> From $497/month (flat rate)</p>
                    <p><strong className="text-white">Best for:</strong> Plumbers wanting maximum call capture and ROI</p>

                    <p>Brandverse specializes in service businesses. Their AI voice agents handle all call types—emergency routing, appointment booking, simple quotes—with natural conversation quality.</p>

                    <p>What sets them apart for plumbers: flat-rate pricing (crucial during burst pipe season), deep integration with contractor software, and proven ROI in home services.</p>

                    <p>One plumbing company captured 18 additional emergency calls per month—worth $7,200+ in recovered revenue from a $497 investment.</p>

                    <p><strong className="text-white">Plumbing features:</strong></p>
                    <ul>
                        <li>ServiceTitan, Housecall Pro, Jobber integration</li>
                        <li>Emergency escalation to on-call</li>
                        <li>Service area verification</li>
                        <li>Job detail collection</li>
                        <li>Website chatbot included</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">2. Rosie — Best Budget Option</h3>

                    <p><strong className="text-white">Price:</strong> From $49/month</p>
                    <p><strong className="text-white">Best for:</strong> Solo plumbers testing AI</p>

                    <p>Rosie is built for home services contractors. Simple to set up, affordable, covers the basics. The AI is less sophisticated than premium options, but at $49/month, the bar is low.</p>

                    <p>Good starter option. You&apos;ll likely outgrow it as you scale.</p>

                    <h3 className="text-xl font-medium text-white mt-10 mb-4">3. AnswerConnect — Best Human Option</h3>

                    <p><strong className="text-white">Price:</strong> From $325/month</p>
                    <p><strong className="text-white">Best for:</strong> Plumbers who specifically want human voices</p>

                    <p>If you&apos;re not comfortable with AI handling your calls, AnswerConnect provides 24/7 human receptionists. More expensive and less consistent (humans have off days), but some plumbers prefer the human touch.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">ROI: The Math for Plumbers</h2>

                    <p>Let&apos;s calculate real numbers for a typical plumbing company:</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Current Situation</h3>
                    <ul>
                        <li>Missed calls per month: 45 (including after-hours)</li>
                        <li>Estimated conversion rate: 30%</li>
                        <li>Average job value: $450</li>
                    </ul>

                    <p><strong className="text-white">Lost revenue: 45 × 0.30 × $450 = $6,075/month</strong></p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">With AI Answering</h3>
                    <ul>
                        <li>Calls now answered: 100%</li>
                        <li>Previously missed calls captured: ~40 (AI can&apos;t save every lost call)</li>
                        <li>Conversions: 12 additional jobs/month</li>
                        <li>Revenue recovered: 12 × $450 = $5,400/month</li>
                    </ul>

                    <p><strong className="text-white">Cost: $497/month</strong></p>
                    <p><strong className="text-white">Net gain: $4,903/month ($58,836/year)</strong></p>
                    <p><strong className="text-white">ROI: 10.87x</strong></p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Implementation for Plumbers</h2>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Week 1: Setup</h3>
                    <ul>
                        <li>Connect to your scheduling software</li>
                        <li>Define service areas and services offered</li>
                        <li>Set up emergency escalation protocols</li>
                        <li>Train AI on your pricing structure (if sharing)</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Week 2: Testing</h3>
                    <ul>
                        <li>Run test calls with common scenarios</li>
                        <li>Verify emergency routing works</li>
                        <li>Confirm scheduling integrates properly</li>
                    </ul>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">Week 3+: Live</h3>
                    <ul>
                        <li>Go live with monitoring</li>
                        <li>Review transcripts and adjust as needed</li>
                        <li>Track conversion rates vs. before</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Common Questions from Plumbers</h2>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">&quot;Will customers know it&apos;s AI?&quot;</h3>
                    <p>Most can&apos;t tell. Modern AI handles accents, background noise, interruptions, and follow-up questions naturally. Some plumbers disclose; some don&apos;t. Customer satisfaction is the same either way.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">&quot;What about emergency urgency?&quot;</h3>
                    <p>AI understands urgency. &quot;Water is spraying everywhere&quot; triggers immediate escalation. The AI can even coach the caller: &quot;Have you turned off the main water shutoff valve?&quot; while routing to on-call.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">&quot;What if I&apos;m already on another call?&quot;</h3>
                    <p>That&apos;s exactly when AI shines. AI answers instantly while you&apos;re busy. You never miss a call because you&apos;re on another call.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">&quot;Does it work with my software?&quot;</h3>
                    <p>Brandverse integrates with ServiceTitan, Housecall Pro, Jobber, and most major contractor platforms. Ask about your specific setup during the demo.</p>

                </div>

                <div className="mt-16 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">Stop Losing Jobs to Voicemail</h3>
                    <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                        Book a demo and see how AI answering works for plumbers—with a custom ROI calculation for your business.
                    </p>
                    <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-lg transition-all">
                        Book Your Free Demo →
                    </Link>
                </div>

                <CalendlyCTA />

            </article>
        </div>
    );
}
