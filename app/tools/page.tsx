import Link from 'next/link';
import { Phone, TrendingUp, Clock, Moon, PieChart, Mic, Users, Target, ArrowRight, CalendarX } from 'lucide-react';

export const metadata = {
    title: 'Free AI & Business Growth Tools | Brandverse',
    description: 'A suite of free calculators and generators to help service businesses grow. Calculate lost revenue, ROI, margins, and more.',
};

const tools = [
    {
        title: 'Missed Call Calculator',
        description: 'See exactly how much revenue you lose every month to voicemail.',
        href: '/tools/missed-call-calculator',
        icon: Phone,
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20'
    },
    {
        title: 'AI ROI Calculator',
        description: 'Compare the cost of human receptionists vs. AI voice agents.',
        href: '/tools/ai-receptionist-roi-calculator',
        icon: TrendingUp,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20'
    },
    {
        title: 'Lead Response Time',
        description: 'Calculate conversion rate drop from slow lead response.',
        href: '/tools/lead-response-time-calculator',
        icon: Clock,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20'
    },
    {
        title: '24/7 Coverage Cost',
        description: 'Analyze the true cost of staffing your phones 24/7 with humans.',
        href: '/tools/24-7-coverage-calculator',
        icon: Moon,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20'
    },
    {
        title: 'Margin Calculator',
        description: 'See how AI automation improves your service business profit margins.',
        href: '/tools/margin-calculator',
        icon: PieChart,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
    },
    {
        title: 'Call Script Generator',
        description: 'Create professional scripts for missed calls and appointments.',
        href: '/tools/call-script-generator',
        icon: Mic,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    {
        title: 'Support Cost Calculator',
        description: 'Calculate the total cost of ownership for your support team.',
        href: '/tools/customer-service-calculator',
        icon: Users,
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        border: 'border-pink-500/20'
    },
    {
        title: 'Google Ads ROI',
        description: 'See how conversion rate optimization impacts your ad spend returns.',
        href: '/tools/google-ads-roi-calculator',
        icon: Target,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20'
    },
    {
        title: 'No-Show Calculator',
        description: 'Calculate the true cost of appointment no-shows and recovery potential.',
        href: '/tools/appointment-no-show-calculator',
        icon: CalendarX,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20'
    }
];

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Free Business Growth Tools
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Calculators, generators, and analyzers to help you understand your metrics, optimize your operations, and grow your revenue.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className={`group relative p-6 bg-white/5 border ${tool.border} rounded-2xl hover:scale-105 transition-all duration-300`}
                        >
                            <div className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center mb-4`}>
                                <tool.icon className={`w-6 h-6 ${tool.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                                {tool.description}
                            </p>
                            <div className="flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
                                Try Tool <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Want Custom Tools for Your Business?</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        We build custom AI agents and tools that integration directly with your CRM and workflows.
                    </p>
                    <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all">
                        Discuss Your Needs <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
