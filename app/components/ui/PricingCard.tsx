import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

interface PricingCardProps {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    ctaLink: string;
    popular?: boolean;
    accent?: string;
}

const accentMap: Record<string, { border: string; badge: string; button: string; shadow: string }> = {
    blue: { border: 'border-blue-500/30', badge: 'bg-blue-500', button: 'bg-blue-500 hover:bg-blue-400', shadow: 'shadow-blue-500/25' },
    purple: { border: 'border-purple-500/30', badge: 'bg-purple-500', button: 'bg-purple-500 hover:bg-purple-400', shadow: 'shadow-purple-500/25' },
    amber: { border: 'border-amber-500/30', badge: 'bg-amber-500', button: 'bg-amber-500 hover:bg-amber-400', shadow: 'shadow-amber-500/25' },
    emerald: { border: 'border-emerald-500/30', badge: 'bg-emerald-500', button: 'bg-emerald-500 hover:bg-emerald-400', shadow: 'shadow-emerald-500/25' },
};

export default function PricingCard({ name, price, description, features, cta, ctaLink, popular, accent = 'blue' }: PricingCardProps) {
    const a = accentMap[accent] || accentMap.blue;
    return (
        <div className={`relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border ${popular ? `${a.border} ring-1 ring-blue-500/20` : 'border-white/10'} hover:bg-white/[0.07] transition-all`}>
            {popular && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${a.badge} text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full`}>
                    Most Popular
                </div>
            )}
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{description}</p>
                </div>
                <div>
                    <p className="text-4xl font-black text-white">{price}</p>
                    <p className="text-xs text-slate-500 mt-1">per month</p>
                </div>
                <ul className="space-y-3">
                    {features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                            <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            {f}
                        </li>
                    ))}
                </ul>
                <Link
                    href={ctaLink}
                    className={`block text-center ${a.button} text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg ${a.shadow}`}
                >
                    {cta} <ArrowRight className="w-4 h-4 inline ml-1" />
                </Link>
            </div>
        </div>
    );
}
