import { Star, Quote, BadgeCheck } from 'lucide-react';

interface TestimonialCardProps {
    quote: string;
    name?: string;
    role?: string;
    company?: string;
    rating?: number;
    verified?: boolean;
    video?: boolean;
    metric?: string;
    metricLabel?: string;
    placeholder?: boolean;
}

export default function TestimonialCard({ quote, name, role, company, rating, verified, video, metric, metricLabel, placeholder }: TestimonialCardProps) {
    if (placeholder) {
        return (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 border-dashed text-center">
                <Quote className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500 font-medium italic mb-4">Customer success stories coming soon.</p>
                <div className="w-12 h-12 rounded-full bg-white/5 mx-auto border border-white/10" />
            </div>
        );
    }

    return (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:bg-white/[0.07] transition-all">
            {verified && (
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-green-400 mb-3">
                    <BadgeCheck className="w-3 h-3" />
                    Verified Client
                </div>
            )}
            {rating && (
                <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    ))}
                </div>
            )}
            <p className="text-slate-300 leading-relaxed mb-6 italic">"{quote}"</p>
            {(name || metric) && (
                <div className="flex items-center gap-4">
                    {name && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                    )}
                    <div className="min-w-0">
                        {name && <p className="text-sm font-bold text-white">{name}</p>}
                        {(role || company) && <p className="text-xs text-slate-400">{[role, company].filter(Boolean).join(' · ')}</p>}
                        {metric && <p className="text-xs text-green-400 font-semibold mt-1">{metric} {metricLabel}</p>}
                    </div>
                    {video && (
                        <div className="ml-auto shrink-0 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                            Video
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
