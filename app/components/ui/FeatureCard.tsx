import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    accent?: string;
    className?: string;
}

const accentMap: Record<string, string> = {
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 group-hover:border-blue-500/50',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 group-hover:border-purple-500/50',
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 group-hover:border-emerald-500/50',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 group-hover:border-amber-500/50',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 group-hover:border-rose-500/50',
    cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 group-hover:border-cyan-500/50',
    orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 group-hover:border-orange-500/50',
    pink: 'from-pink-500/20 to-pink-600/10 border-pink-500/30 group-hover:border-pink-500/50',
    indigo: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 group-hover:border-indigo-500/50',
};

export default function FeatureCard({ icon: Icon, title, description, accent = 'blue', className = '' }: FeatureCardProps) {
    const gradient = accentMap[accent] || accentMap.blue;
    return (
        <div className={`group p-6 rounded-2xl bg-gradient-to-br ${gradient} bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${className}`}>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}
