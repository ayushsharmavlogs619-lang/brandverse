import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend: number;
    color: 'blue' | 'green' | 'indigo' | 'purple';
}

export function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
    const colorClasses = {
        blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400 bg-blue-500/10',
        green: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-400 bg-emerald-500/10',
        indigo: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 text-indigo-400 bg-indigo-500/10',
        purple: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400 bg-purple-500/10',
    };

    const trendColor = trend >= 0 ? 'text-emerald-400' : 'text-red-400';

    return (
        <div
            className={`bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-all duration-300 group`}
        >
            <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${colorClasses[color].split('from')[0]} ${colorClasses[color].split('text')[1]} bg-opacity-100`}>
                    <Icon size={24} className={`text-${color}-400`} />
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-black px-2 py-1 rounded-full bg-slate-950/50 border border-white/5 ${trendColor}`}>
                    {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </div>
            </div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">{title}</p>
            <p className="text-4xl font-black text-white tracking-tight">{value}</p>
        </div>
    );
}
