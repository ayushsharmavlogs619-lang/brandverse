import Link from 'next/link';
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface CaseStudyCardProps {
    slug: string;
    industry: string;
    title: string;
    metric?: string;
    metricLabel?: string;
    timeline?: string;
    savings?: string;
    illustrative?: boolean;
    icon?: React.ReactNode;
}

export default function CaseStudyCard({ slug, industry, title, metric, metricLabel, timeline, savings, illustrative, icon }: CaseStudyCardProps) {
    return (
        <Link href={`/case-studies/${slug}`} className="group block p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:bg-white/[0.07] transition-all">
            {illustrative && (
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2">Illustrative Example</p>
            )}
            <div className="flex items-center gap-2 mb-3">
                {icon}
                <span className="text-xs font-black uppercase tracking-widest text-blue-400">{industry}</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">{title}</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
                {metric && (
                    <div>
                        <TrendingUp className="w-4 h-4 text-green-400 mb-1" />
                        <p className="text-sm font-black text-white">{metric}</p>
                        <p className="text-[10px] text-slate-500">{metricLabel}</p>
                    </div>
                )}
                {timeline && (
                    <div>
                        <Clock className="w-4 h-4 text-blue-400 mb-1" />
                        <p className="text-sm font-black text-white">{timeline}</p>
                        <p className="text-[10px] text-slate-500">Timeline</p>
                    </div>
                )}
                {savings && (
                    <div>
                        <DollarSign className="w-4 h-4 text-emerald-400 mb-1" />
                        <p className="text-sm font-black text-white">{savings}</p>
                        <p className="text-[10px] text-slate-500">Savings</p>
                    </div>
                )}
            </div>
            <span className="inline-flex items-center gap-1 text-blue-400 text-xs font-semibold group-hover:gap-2 transition-all">
                Read Full Case Study <ArrowRight className="w-3 h-3" />
            </span>
        </Link>
    );
}
