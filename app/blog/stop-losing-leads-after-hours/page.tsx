import Link from 'next/link';
import { ArrowLeft, Phone, Clock, Moon, Sun, DollarSign, TrendingUp, Users, AlertTriangle, CheckCircle, ArrowRight, Calendar, Zap } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import { config } from '@/lib/config';

export const metadata = {
    title: 'How Local Businesses Can Stop Losing Leads After Business Hours | Brandverse',
    description: 'Local businesses lose 40% of leads after hours. Learn how AI receptionists, automated booking, and 24/7 lead capture can recover thousands in monthly revenue.',
    keywords: ['missed calls', 'after-hours answering', '24/7 ai receptionist', 'lead generation', 'appointment booking', 'customer support automation'],
    openGraph: {
        title: 'How Local Businesses Can Stop Losing Leads After Business Hours',
        description: 'Local businesses lose 40% of leads after hours. Learn how AI receptionists can recover thousands in monthly revenue.',
        type: 'article',
        publishedTime: '2026-07-26',
        authors: ['Brandverse Team'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How Local Businesses Can Stop Losing Leads After Business Hours',
        description: 'Local businesses lose 40% of leads after hours. Learn how AI receptionists can recover thousands in monthly revenue.',
    },
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-amber-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest">
                        Lead Generation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        How Local Businesses Can <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Stop Losing Leads</span>
                        <br />
                        After Business Hours
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        The silent revenue leak that costs local businesses thousands every month — and how to fix it in 48 hours.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>July 26, 2026</span>
                        <span>·</span>
                        <span>15 min read</span>
                        <span>·</span>
                        <span className="text-amber-400">Lead Generation</span>
                    </div>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    {/* AEO: Quick Answer Block */}
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-amber-500">
                        <h2 className="text-lg font-bold text-white mb-3">How can local businesses stop losing leads after hours?</h2>
                        <p className="text-slate-300 leading-relaxed mb-3">
                            The most effective way for local businesses to stop losing after-hours leads is to deploy an AI receptionist that answers calls 24/7, captures lead information, and books appointments automatically. Unlike voicemail — which converts at less than 10% — AI receptionists convert 30-50% of after-hours callers into booked appointments.
                        </p>
                        <ul className="list-disc ml-4 space-y-1 text-slate-300 text-sm">
                            <li><strong>Deploy an AI receptionist:</strong> Answers every call instantly, day or night</li>
                            <li><strong>Enable online self-booking:</strong> Let customers book from your website or Google Business Profile</li>
                            <li><strong>Automate SMS follow-ups:</strong> Text after-hours callers within 1 minute with a booking link</li>
                            <li><strong>Set expectations:</strong> Clearly display your hours AND your after-hours response capability</li>
                            <li><strong>Track every missed opportunity:</strong> Use call analytics to measure exactly what you are recovering</li>
                        </ul>
                    </div>

                    {/* The Problem */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The 5 PM Revenue Cliff</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            At 5:00 PM on a Tuesday, an HVAC customer's AC unit stops working. It is August. The temperature inside their home is climbing past 85 degrees. They Google "HVAC repair near me" and call the first three results.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            The first two businesses send the caller to voicemail. The third business has an AI receptionist that answers, asks about the issue, checks the dispatcher's schedule, and books a service call for 7 AM the next morning. The customer books immediately.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            This scenario plays out thousands of times every single night across every local service industry. The businesses with 24/7 lead capture win. The businesses relying on voicemail lose — and most never even know how much they are losing.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            This is the 5 PM revenue cliff. And it is costing local businesses more than most owners realize.
                        </p>
                    </section>

                    {/* The Numbers */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The True Cost of Missed After-Hours Calls</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Let us look at the real numbers. Studies consistently show that <strong>30-50% of inbound calls</strong> to local service businesses occur outside standard business hours. That is not a small percentage — it is nearly half of all potential customers.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-6 rounded-2xl bg-amber-900/10 border border-amber-500/20 text-center">
                                <p className="text-3xl font-black text-amber-400 mb-2">40%</p>
                                <p className="text-sm text-slate-400">of inbound calls to local businesses happen after hours or on weekends</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-red-900/10 border border-red-500/20 text-center">
                                <p className="text-3xl font-black text-red-400 mb-2">92%</p>
                                <p className="text-sm text-slate-400">of voicemails are never returned or returned too late to convert</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-green-900/10 border border-green-500/20 text-center">
                                <p className="text-3xl font-black text-green-400 mb-2">3-5x</p>
                                <p className="text-sm text-slate-400">more likely to convert a caller when you answer within 1 minute vs sending to voicemail</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-4">Annual Revenue Leak Calculator</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Monthly inbound calls</span>
                                    <span className="text-white font-semibold">300</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">After-hours calls (40%)</span>
                                    <span className="text-white font-semibold">120</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Currently captured (voicemail)</span>
                                    <span className="text-red-400 font-semibold">~12 (10%)</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Potentially captured with AI</span>
                                    <span className="text-green-400 font-semibold">~48 (40%)</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Recovered leads per month</span>
                                    <span className="text-white font-semibold">36</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Average job value</span>
                                    <span className="text-white font-semibold">$350</span>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <span className="text-slate-300 font-bold">Annual recovered revenue</span>
                                    <span className="text-green-400 font-bold text-lg">$151,200</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-3">Assumes 40% conversion rate on answered calls</p>
                        </div>
                    </section>

                    {/* Why Voicemail Fails */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Why Voicemail Is a Lead Killer</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Many business owners believe voicemail is sufficient. "Callers can leave a message and I will call them back." Here is why that belief is costing you money.
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-3 px-4 text-white font-bold">Factor</th>
                                        <th className="text-left py-3 px-4 text-amber-400 font-bold">Voicemail</th>
                                        <th className="text-left py-3 px-4 text-green-400 font-bold">AI Receptionist</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5">
                                        <td className="py-3 px-4 text-white">Response time</td>
                                        <td className="py-3 px-4 text-amber-400">Hours to never</td>
                                        <td className="py-3 px-4 text-green-400">Instant</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-3 px-4 text-white">Lead info capture</td>
                                        <td className="py-3 px-4 text-amber-400">Optional (caller decides)</td>
                                        <td className="py-3 px-4 text-green-400">Guaranteed</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-3 px-4 text-white">Booking capability</td>
                                        <td className="py-3 px-4 text-amber-400">None</td>
                                        <td className="py-3 px-4 text-green-400">Books directly into calendar</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-3 px-4 text-white">Caller experience</td>
                                        <td className="py-3 px-4 text-amber-400">Frustrating</td>
                                        <td className="py-3 px-4 text-green-400">Positive</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white">Conversion rate</td>
                                        <td className="py-3 px-4 text-amber-400">5-10%</td>
                                        <td className="py-3 px-4 text-green-400">30-50%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-slate-400 leading-8 text-lg">
                            The gap is enormous. Voicemail converts 5-10% of after-hours callers at best. An AI receptionist converts 30-50% — a 5x improvement. For a business receiving 100 after-hours calls per month, that is the difference between 5 booked jobs and 40 booked jobs.
                        </p>
                    </section>

                    {/* Solutions */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Five Solutions to Stop Losing After-Hours Leads</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            There are multiple approaches to capturing after-hours leads. The best solution depends on your business type, volume, and budget. Here are the options ranked by effectiveness.
                        </p>

                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-amber-900/10 border border-amber-500/20 relative overflow-hidden">
                                <div className="absolute top-2 right-2 text-xs font-black text-amber-500/50">RECOMMENDED</div>
                                <h3 className="font-bold text-white text-lg mb-2">1. AI Voice Receptionist (Best Overall)</h3>
                                <p className="text-sm text-slate-400 mb-3">
                                    An AI voice agent answers every after-hours call instantly. It handles the full conversation — greeting, discovery, qualification, booking — without any human involvement. Callers never know they reached a business that is "closed."
                                </p>
                                <div className="flex items-center gap-2 text-xs text-green-400">
                                    <CheckCircle className="w-3 h-3" /> Best conversion rate
                                    <span className="text-slate-600">·</span>
                                    <CheckCircle className="w-3 h-3" /> Full booking capability
                                    <span className="text-slate-600">·</span>
                                    <CheckCircle className="w-3 h-3" /> Works 24/7
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Cost: $300-$1,000/mo | Setup: 1-3 days</p>
                            </div>

                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white text-lg mb-2">2. Automated SMS Follow-Up</h3>
                                <p className="text-sm text-slate-400 mb-2">
                                    When a call goes to voicemail, an automated system immediately sends the caller a text message with a booking link. This captures some of the leads that would otherwise be lost.
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <CheckCircle className="w-3 h-3 text-green-400" /> Better than voicemail alone
                                    <span className="text-slate-600">·</span>
                                    <span className="text-amber-400">Still misses ~50% of callers who do not respond to text</span>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white text-lg mb-2">3. Online Self-Booking + Google Business Profile</h3>
                                <p className="text-sm text-slate-400 mb-2">
                                    Enable appointment booking directly on your Google Business Profile and website. Customers can see real-time availability and book without calling. This helps, but many customers still prefer to call.
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <CheckCircle className="w-3 h-3 text-green-400" /> Great for existing customers
                                    <span className="text-slate-600">·</span>
                                    <span className="text-amber-400">Does not capture phone callers</span>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white text-lg mb-2">4. Extended Human Hours (Part-Time Evening Staff)</h3>
                                <p className="text-sm text-slate-400 mb-2">
                                    Hire a remote receptionist to cover evening and weekend hours. This works but costs $1,500-$2,500/month for limited coverage and comes with scheduling and management overhead.
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-amber-400">Expensive and hard to staff</span>
                                    <span className="text-slate-600">·</span>
                                    <span className="text-amber-400">Limited hours (not truly 24/7)</span>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white text-lg mb-2">5. Voicemail + Call Back Promise (Do Nothing)</h3>
                                <p className="text-sm text-slate-400 mb-2">
                                    This is the default approach — let calls go to voicemail and return them the next business day. As the data shows, this converts less than 10% of after-hours callers.
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-red-400">Lowest conversion rate</span>
                                    <span className="text-slate-600">·</span>
                                    <span className="text-red-400">Leaves money on the table</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Real Example */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Real-World Example: HVAC Company Recovers $15,000/Month</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            A medium-sized HVAC company in Texas was receiving an average of 200 calls per month. Their team could only answer during business hours (8 AM - 5 PM, Monday through Friday). Everything else went to voicemail.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            After deploying an AI receptionist, here is what changed:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-sm text-slate-400">Before AI</p>
                                <p className="text-2xl font-black text-red-400">34%</p>
                                <p className="text-sm text-slate-400">of calls answered</p>
                            </div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-sm text-slate-400">After AI</p>
                                <p className="text-2xl font-black text-green-400">100%</p>
                                <p className="text-sm text-slate-400">of calls answered</p>
                            </div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-sm text-slate-400">Before AI</p>
                                <p className="text-2xl font-black text-red-400">12</p>
                                <p className="text-sm text-slate-400">booked appointments/month from after-hours</p>
                            </div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-sm text-slate-400">After AI</p>
                                <p className="text-2xl font-black text-green-400">47</p>
                                <p className="text-sm text-slate-400">booked appointments/month from after-hours</p>
                            </div>
                        </div>

                        <p className="text-slate-400 leading-8 text-lg">
                            At an average job value of $425, that is an additional <strong>$14,875 per month</strong> in booked revenue — directly attributable to answering after-hours calls. The AI receptionist paid for itself within the first week.
                        </p>
                        <p className="text-sm text-slate-500">
                            Read the full story in our <Link href="/blog/case-study-elite-climate" className="text-amber-400 hover:underline">Elite Climate Control case study</Link>.
                        </p>
                    </section>

                    {/* Implementation */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">How to Set Up After-Hours Lead Capture in 48 Hours</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            You can stop losing after-hours leads by this time tomorrow. Here is exactly what to do.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black shrink-0">1</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Count Your Missed Calls</h3>
                                    <p className="text-slate-400 text-sm mt-1">Check your phone system for the last 30 days. Count how many calls came in after hours and how many went to voicemail. This is your baseline. Most phone systems provide this data in their dashboard.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black shrink-0">1</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Calculate Your Revenue Leak</h3>
                                    <p className="text-slate-400 text-sm mt-1">Multiply missed after-hours calls by your average job value by your typical close rate (on answered calls). This is the revenue you are leaving on the table every month. Use the calculator above.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black shrink-0">1</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Choose Your Solution</h3>
                                    <p className="text-slate-400 text-sm mt-1">For most businesses, an AI receptionist is the best investment. At $300-$1,000/month, it pays for itself immediately if you capture even a handful of additional leads per month. Contact Brandverse for a custom setup.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black shrink-0">1</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Forward Your Phone Number</h3>
                                    <p className="text-slate-400 text-sm mt-1">Configure call forwarding so that unanswered calls during business hours AND all after-hours calls route to your AI receptionist. Your phone provider can set this up in minutes.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black shrink-0">1</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Measure Your Recovery</h3>
                                    <p className="text-slate-400 text-sm mt-1">After 30 days, compare your after-hours booking rate to your baseline. Track how many calls were answered, how many appointments were booked, and the total revenue value. Use our <Link href="/blog/measuring-success" className="text-amber-400 hover:underline">KPI measurement guide</Link>.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Block */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">What percentage of calls come after hours for local businesses?</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Studies consistently show that 30-50% of inbound calls to local service businesses occur outside standard business hours (before 8 AM, after 5 PM, weekends, and holidays). This percentage is even higher for businesses with strong Google presence, as customers search and call at all hours.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">Do customers actually book appointments through an AI at night?</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Yes. When someone's water heater bursts at 10 PM, they do not want to leave a voicemail. They want to know someone is coming. AI receptionists regularly convert 30-50% of after-hours callers into booked appointments. The urgency of after-hours situations actually drives higher conversion rates than daytime calls.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">Will the AI handle emergency calls correctly?</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Yes. You configure the AI to recognize emergency keywords (burst pipe, no heat, lockout) and respond appropriately. For true emergencies, the AI can dispatch immediately, call an on-call team member, or transfer to a 24/7 emergency response line. This is configured during setup based on your business rules.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">Do I need a separate phone number for after-hours?</h3>
                            <p className="text-slate-400 leading-relaxed">
                                No. You use your existing business number. Calls that come in during business hours ring your team first, and unanswered calls roll to the AI. After-hours calls route directly to the AI. Your customers call the same number they always have.
                            </p>
                        </div>
                    </div>

                    {/* Checklist */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h2 className="text-lg font-bold text-white mb-4">After-Hours Lead Capture Checklist</h2>
                        <ul className="space-y-2">
                            {[
                                'Audit your current after-hours call volume from phone system logs',
                                'Calculate your current monthly revenue loss from missed calls',
                                'Research AI receptionist providers and compare pricing',
                                'Set up call forwarding for unanswered and after-hours calls',
                                'Configure your AI with custom scripts and business rules',
                                'Integrate with your calendar or booking system',
                                'Set up automated SMS confirmations for booked appointments',
                                'Create escalation rules for emergencies and urgent calls',
                                'Train your team on the new system and escalation procedures',
                                'Review first 30 days of transcripts and optimize',
                                'Track monthly after-hours booking rate and revenue recovered',
                                'Scale to weekend and holiday coverage if not already included',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded border-2 border-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-sm bg-amber-400" />
                                    </div>
                                    <span className="text-sm text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Key Takeaways */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/30">
                        <h2 className="text-lg font-bold text-white mb-4">Key Takeaways</h2>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-start gap-2">• 40% of inbound calls to local businesses happen outside business hours.</li>
                            <li className="flex items-start gap-2">• Voicemail captures only 5-10% of after-hours leads; AI captures 30-50%.</li>
                            <li className="flex items-start gap-2">• The average local business loses $50,000-$200,000/year in after-hours revenue.</li>
                            <li className="flex items-start gap-2">• An AI receptionist pays for itself within the first week of after-hours coverage.</li>
                            <li className="flex items-start gap-2">• Setup takes 1-3 days and uses your existing phone number.</li>
                            <li className="flex items-start gap-2">• After-hours callers are often more motivated and convert at higher rates.</li>
                            <li className="flex items-start gap-2">• Measure your baseline first, then track recovery monthly to validate ROI.</li>
                        </ul>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 p-10 rounded-3xl border border-amber-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Stop Losing Leads After Hours.</h3>
                        <p className="text-slate-300 font-medium max-w-lg mx-auto">
                            See how Brandverse AI can capture every after-hours call and book appointments while you sleep.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={config.calendlyUrl}
                                className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25"
                            >
                                Book a Free Strategy Call <Calendar className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-colors border border-white/20"
                            >
                                Contact Us <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </article>

                <RelatedArticles currentSlug="stop-losing-leads-after-hours" />
            </main>
        </div>
    );
}
