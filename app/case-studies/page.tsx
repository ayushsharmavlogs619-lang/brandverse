import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HardHat, Wrench, Zap, Home, Stethoscope, Building2, Scale, UtensilsCrossed, Sparkles, Car, Briefcase } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';
import CaseStudyCard from '@/app/components/ui/CaseStudyCard';

export const metadata: Metadata = {
    title: 'Case Studies — Brandverse',
    description: 'See how businesses across 12 industries use Brandverse AI voice agents to increase revenue, reduce costs, and provide 24/7 customer service.',
    openGraph: { title: 'Case Studies — Brandverse', description: 'Industry case studies showing real AI receptionist results.' },
};

const iconMap: Record<string, React.ReactNode> = {
    'Electrical Services': <Zap className="w-5 h-5 text-yellow-400" />,
    'HVAC': <Wrench className="w-5 h-5 text-orange-400" />,
    'Plumbing': <HardHat className="w-5 h-5 text-cyan-400" />,
    'Roofing': <Home className="w-5 h-5 text-amber-400" />,
    'Dental': <Stethoscope className="w-5 h-5 text-blue-400" />,
    'Medical': <Stethoscope className="w-5 h-5 text-sky-400" />,
    'Legal': <Scale className="w-5 h-5 text-purple-400" />,
    'Property Management': <Building2 className="w-5 h-5 text-emerald-400" />,
    'Restaurants': <UtensilsCrossed className="w-5 h-5 text-red-400" />,
    'Salon & Spa': <Sparkles className="w-5 h-5 text-pink-400" />,
    'Auto Repair': <Car className="w-5 h-5 text-green-400" />,
    'Home Services': <Briefcase className="w-5 h-5 text-indigo-400" />,
};

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
                        Illustrative Deployment Playbooks
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        How Brandverse Works <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Across Industries</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                        These are illustrative deployment playbooks showing how Brandverse could be implemented in each industry. They demonstrate the system's capabilities and are not claimed customer results.
                    </p>
                </div>
            </header>

            <main className="px-6 py-16">
                <div className="max-w-6xl mx-auto space-y-16">
                    <section>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {caseStudies.map((study) => (
                                <CaseStudyCard
                                    key={study.slug}
                                    slug={study.slug}
                                    industry={study.industry}
                                    title={study.title}
                                    metric={study.metrics[0]?.value}
                                    metricLabel={study.metrics[0]?.label}
                                    timeline={study.timeline}
                                    illustrative={study.illustrative}
                                    icon={iconMap[study.industry]}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
