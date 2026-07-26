interface StatCardProps {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.07] transition-all">
            {icon && <div className="flex justify-center mb-3">{icon}</div>}
            <p className="text-3xl md:text-4xl font-black text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400 font-medium">{label}</p>
        </div>
    );
}
