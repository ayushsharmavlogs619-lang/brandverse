import Link from 'next/link';
import CalendlyCTA from '@/app/components/CalendlyCTA';

export const metadata = {
    title: 'Appointment No-Show Rate: How to Calculate & Reduce It | Brandverse',
    description: 'Calculate your appointment no-show cost and learn proven tactics to reduce no-shows by 60-70%. Includes free calculator and industry benchmarks.',
    keywords: ['appointment no show rate', 'no show calculator', 'reduce no shows', 'appointment reminders'],
};

export default function Article() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6 text-sm">
                        <span className="text-blue-400 font-medium">Operations Guide</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">January 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">9 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
                        Appointment No-Show Rate: How to Calculate & Reduce It
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        No-shows cost service businesses tens of thousands annually. Here's how to calculate your exact cost and cut no-shows by 60-70%.
                    </p>
                </header>

                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-8 mb-12">
                    <h3 className="text-xl font-semibold text-white mb-3">Calculate Your No-Show Cost</h3>
                    <p className="text-slate-400 mb-4">Free calculator. See how much no-shows are costing your business.</p>
                    <Link href="/tools/appointment-no-show-calculator" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all">
                        Calculate Your No-Show Cost →
                    </Link>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">What is a No-Show Rate?</h2>

                    <p>Your no-show rate is the percentage of scheduled appointments where the customer doesn't show up and doesn't cancel in advance.</p>

                    <div className="my-8 p-8 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-2xl text-white font-mono text-center">
                            No-Show Rate = (No-Shows ÷ Total Scheduled Appointments) × 100
                        </p>
                    </div>

                    <p><strong className="text-white">Industry Averages:</strong></p>
                    <ul>
                        <li>Dental practices: 10-20%</li>
                        <li>Medical practices: 15-25%</li>
                        <li>Med spas/salons: 20-30%</li>
                        <li>Contractors (consultations): 12-18%</li>
                        <li>Legal consultations: 8-15%</li>
                    </ul>

                    <p>If your rate is higher than your industry average, you're leaving significant money on the table.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">The True Cost of No-Shows</h2>

                    <p>No-shows hurt in three ways:</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">1. Direct Revenue Loss</h3>

                    <p>Empty appointment slots = zero revenue for that time block.</p>

                    <div className="my-6 p-6 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white mb-2"><strong>Example: Dental Practice</strong></p>
                        <ul className="list-none p-0 m-0 space-y-1">
                            <li>• 80 appointments scheduled/month</li>
                            <li>• 15% no-show rate = 12 no-shows</li>
                            <li>• 30% eventually reschedule = 4 patients</li>
                            <li>• <strong className="text-red-400">8 permanent losses × $250 = $2,000/month</strong></li>
                            <li>• <strong className="text-white">Annual cost: $24,000</strong></li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">2. Wasted Staff Time</h3>

                    <p>Your team prepped for that appointment. Charts pulled, rooms cleaned, confirmation calls made. All for nothing.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">3. Lost Opportunity Cost</h3>

                    <p>You could have filled that slot with another patient. Now it's too late—that time is gone forever.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Why Customers No-Show</h2>

                    <div className="grid md:grid-cols-3 gap-6 my-8">
                        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-3xl font-bold text-purple-400 mb-2">45%</div>
                            <div className="text-white font-medium mb-2">Forgot</div>
                            <div className="text-sm text-slate-400">Simply forgot the appointment was scheduled</div>
                        </div>
                        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-3xl font-bold text-purple-400 mb-2">30%</div>
                            <div className="text-white font-medium mb-2">Conflict</div>
                            <div className="text-sm text-slate-400">Schedule conflict arose, didn't bother calling</div>
                        </div>
                        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-3xl font-bold text-purple-400 mb-2">25%</div>
                            <div className="text-white font-medium mb-2">Lost Interest</div>
                            <div className="text-sm text-slate-400">No longer need service or went elsewhere</div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">7 Proven Tactics to Reduce No-Shows</h2>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">1. Automated Reminder System</h3>

                    <p><strong className="text-white">Impact: 30-50% reduction</strong></p>

                    <p>Send reminders via:</p>
                    <ul>
                        <li>SMS at 24 hours before</li>
                        <li>Email at 48 hours before</li>
                        <li>Phone call 2 hours before (for high-value appointments)</li>
                    </ul>

                    <p>AI-powered systems can personalize these messages and even handle rescheduling automatically.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">2. Easy Rescheduling</h3>

                    <p><strong className="text-white">Impact: 20-30% reduction</strong></p>

                    <p>Make it frictionless to reschedule. Include a "click to reschedule" link in reminder messages. The easier it is to reschedule, the less likely they'll just ghost.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">3. Confirmation at Booking</h3>

                    <p>Get multiple contact methods (phone + email) and send instant confirmation. People who confirm are 40% less likely to no-show.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">4. Require Credit Card on File</h3>

                    <p><strong className="text-white">Impact: 50-70% reduction</strong></p>

                    <p>When there's financial skin in the game, people show up. Many practices charge a $25-50 no-show fee.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">5. Shorter Booking Windows</h3>

                    <p>Appointments booked 2+ weeks out have 2-3x higher no-show rates. Try to fill slots within 7 days.</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">6. Value Reinforcement</h3>

                    <p>In reminders, include WHY the appointment matters: "Your cleaning protects against gum disease" vs. just "You have an appointment tomorrow."</p>

                    <h3 className="text-xl font-medium text-white mt-8 mb-4">7. Waitlist System</h3>

                    <p>When someone cancels, instantly notify people on your waitlist. Fills slots and shows customers their time is valuable.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Automation: The Complete Solution</h2>

                    <p>Manual reminder calls take time and still result in 15-20% no-shows. Automation handles:</p>

                    <ul>
                        <li>Multi-channel reminders (SMS + email + voice)</li>
                        <li>Personalized messaging based on appointment type</li>
                        <li>Automatic rescheduling via two-way SMS</li>
                        <li>Waitlist management</li>
                        <li>Analytics on which patients are high-risk</li>
                    </ul>

                    <p><strong className="text-white">Result:</strong> 60-70% reduction in no-shows. For the dental practice above losing $24K/year, that's $15K-17K recovered.</p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Calculate Your Exact Cost</h2>

                    <p>Use our free calculator to see what no-shows are actually costing your business—and how much you could recover with better systems.</p>

                    <div className="my-8 p-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl text-center">
                        <h3 className="text-2xl font-semibold text-white mb-3">Appointment No-Show Calculator</h3>
                        <p className="text-slate-400 mb-6">Free tool. Input your numbers, get your cost.</p>
                        <Link href="/tools/appointment-no-show-calculator" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-lg transition-all">
                            Calculate Your No-Show Cost →
                        </Link>
                    </div>

                </div>

                <CalendlyCTA />

            </article>
        </div>
    );
}
