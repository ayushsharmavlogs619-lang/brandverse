interface QuickAnswerProps {
    question: string;
    children: React.ReactNode;
    items?: string[];
    color?: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose';
}

const colorMap = {
    blue: 'border-blue-500 bg-blue-500/5',
    purple: 'border-purple-500 bg-purple-500/5',
    emerald: 'border-emerald-500 bg-emerald-500/5',
    amber: 'border-amber-500 bg-amber-500/5',
    rose: 'border-rose-500 bg-rose-500/5',
};

export default function QuickAnswer({ question, children, items, color = 'blue' }: QuickAnswerProps) {
    return (
        <div className={`p-6 rounded-2xl ${colorMap[color]} border-l-4`}>
            <h2 className="text-lg font-bold text-white mb-3">{question}</h2>
            <div className="text-slate-300 leading-relaxed mb-3">{children}</div>
            {items && (
                <ul className="list-disc ml-4 space-y-1 text-slate-300 text-sm">
                    {items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            )}
        </div>
    );
}
