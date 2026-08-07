interface SectionHeaderProps {
    label?: string;
    title: string;
    subtitle?: string;
    align?: 'center' | 'left';
    gradient?: boolean;
}

export default function SectionHeader({ label, title, subtitle, align = 'center', gradient = true }: SectionHeaderProps) {
    return (
        <div className={`space-y-4 mb-16 ${align === 'center' ? 'text-center' : ''}`}>
            {label && (
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">{label}</p>
            )}
            <h2 className={`text-4xl md:text-5xl font-black text-white leading-tight ${align === 'center' ? 'mx-auto max-w-3xl' : ''}`}>
                {gradient ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{title}</span>
                ) : title}
            </h2>
            {subtitle && (
                <p className={`text-lg text-slate-400 font-medium ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>{subtitle}</p>
            )}
        </div>
    );
}
