import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { config } from '@/lib/config';

interface CTABlockProps {
    headline: string;
    subheadline: string;
    color?: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'violet' | 'orange' | 'green' | 'red';
}

const gradientMap = {
    blue: 'from-blue-900/40 to-purple-900/40 border-blue-500/30 shadow-blue-500/25 bg-blue-500',
    purple: 'from-purple-900/40 to-pink-900/40 border-purple-500/30 shadow-purple-500/25 bg-purple-500',
    emerald: 'from-emerald-900/40 to-teal-900/40 border-emerald-500/30 shadow-emerald-500/25 bg-emerald-500',
    amber: 'from-amber-900/40 to-orange-900/40 border-amber-500/30 shadow-amber-500/25 bg-amber-500',
    rose: 'from-rose-900/40 to-pink-900/40 border-rose-500/30 shadow-rose-500/25 bg-rose-500',
    cyan: 'from-cyan-900/40 to-blue-900/40 border-cyan-500/30 shadow-cyan-500/25 bg-cyan-500',
    violet: 'from-violet-900/40 to-purple-900/40 border-violet-500/30 shadow-violet-500/25 bg-violet-500',
    orange: 'from-orange-900/40 to-red-900/40 border-orange-500/30 shadow-orange-500/25 bg-orange-500',
    green: 'from-green-900/40 to-emerald-900/40 border-green-500/30 shadow-green-500/25 bg-green-500',
    red: 'from-red-900/40 to-rose-900/40 border-red-500/30 shadow-red-500/25 bg-red-500',
};

export default function CTABlock({ headline, subheadline, color = 'blue' }: CTABlockProps) {
    const g = gradientMap[color];
    return (
        <div className={`bg-gradient-to-r ${g} p-10 rounded-3xl border text-center space-y-6`}>
            <h3 className="text-3xl font-black text-white italic">{headline}</h3>
            <p className="text-slate-300 font-medium max-w-lg mx-auto">
                {subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href={config.calendlyUrl}
                    className={`inline-flex items-center gap-2 ${g.split(' ')[5]} text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-lg ${g.split(' ')[4]}`}
                >
                    Book a Free Strategy Call <Calendar className="w-4 h-4" />
                </Link>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-colors border border-white/20"
                >
                    Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
