interface KeyTakeawaysProps {
    items: string[];
    color?: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'violet' | 'orange' | 'green' | 'red';
}

const gradientMap = {
    blue: 'from-blue-900/40 to-purple-900/40 border-blue-500/30',
    purple: 'from-purple-900/40 to-pink-900/40 border-purple-500/30',
    emerald: 'from-emerald-900/40 to-teal-900/40 border-emerald-500/30',
    amber: 'from-amber-900/40 to-orange-900/40 border-amber-500/30',
    rose: 'from-rose-900/40 to-pink-900/40 border-rose-500/30',
    cyan: 'from-cyan-900/40 to-blue-900/40 border-cyan-500/30',
    violet: 'from-violet-900/40 to-purple-900/40 border-violet-500/30',
    orange: 'from-orange-900/40 to-red-900/40 border-orange-500/30',
    green: 'from-green-900/40 to-emerald-900/40 border-green-500/30',
    red: 'from-red-900/40 to-rose-900/40 border-red-500/30',
};

export default function KeyTakeaways({ items, color = 'blue' }: KeyTakeawaysProps) {
    return (
        <div className={`p-6 rounded-2xl bg-gradient-to-r ${gradientMap[color]}`}>
            <h2 className="text-lg font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-2 text-slate-300">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">• {item}</li>
                ))}
            </ul>
        </div>
    );
}
