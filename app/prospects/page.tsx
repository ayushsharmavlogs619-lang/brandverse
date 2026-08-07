import Link from 'next/link';
import { ArrowLeft, AlertTriangle, TrendingUp, Clock, Phone, CheckCircle2 } from 'lucide-react';

export default function ProspectsPage() {
    const prospects = [
        {
            name: 'Citywide Electric',
            slug: 'citywide-electric',
            lostRevenue: '$2,500+',
            status: 'Audit Complete',
            issues: 4,
            opportunity: 'High'
        },
        {
            name: 'Gueldner Electric Company',
            slug: 'gueldner-electric',
            lostRevenue: '$3,200+',
            status: 'Audit Complete',
            issues: 4,
            opportunity: 'Very High'
        },
        {
            name: 'Bolt Electric',
            slug: 'bolt-electric',
            lostRevenue: '$2,800+',
            status: 'Audit Complete',
            issues: 4,
            opportunity: 'High'
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Header */}
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Brandverse
                </Link>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest mb-6">
                        San Antonio Dominance Campaign
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
                        Lead-Loss <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Audits</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Digital triage reports for San Antonio electrical contractors showing revenue leakage and AI automation opportunities
                    </p>
                </div>

                {/* Campaign Overview */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-16">
                    <h2 className="text-2xl font-black text-white mb-6">Phase 1: Lead-Loss Audit (Days 1–5)</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Website Triage</h3>
                                <p className="text-slate-400 text-sm">Before/after analysis of current digital presence</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Secret Shopper Tests</h3>
                                <p className="text-slate-400 text-sm">8 PM call testing to capture missed opportunities</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Revenue Analysis</h3>
                                <p className="text-slate-400 text-sm">Quantified impact of missed calls and poor UX</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Prospect Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {prospects.map((prospect) => (
                        <Link
                            key={prospect.slug}
                            href={`/prospects/${prospect.slug}`}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                        {prospect.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm">Electrical Contractor</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    prospect.status === 'Audit Complete' 
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                    {prospect.status}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Monthly Revenue Loss</span>
                                    <span className="text-red-400 font-bold">{prospect.lostRevenue}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Issues Identified</span>
                                    <span className="text-white font-bold">{prospect.issues}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Opportunity Level</span>
                                    <span className={`font-bold ${
                                        prospect.opportunity === 'Very High' 
                                            ? 'text-red-400' 
                                            : 'text-orange-400'
                                    }`}>
                                        {prospect.opportunity}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold">
                                View Full Audit <Clock className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Add New Prospect */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 border-dashed">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Identify New Prospects</h3>
                        <p className="text-slate-400 mb-6">
                            Add more San Antonio electrical contractors to the audit pipeline
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
                            >
                                Add Prospect
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Campaign Progress */}
                <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-green-500/30">
                    <h3 className="text-2xl font-black text-white mb-6">Campaign Progress</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                            <div className="flex-1">
                                <div className="font-bold text-white">Phase 1: Lead-Loss Audit</div>
                                <div className="text-slate-400 text-sm">3 prospects analyzed, diagnostic reports complete</div>
                            </div>
                            <div className="text-green-400 font-bold">100%</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Clock className="w-6 h-6 text-yellow-400" />
                            <div className="flex-1">
                                <div className="font-bold text-white">Phase 2: Inception Outreach</div>
                                <div className="text-slate-400 text-sm">AI cold calling setup pending - starting Day 6</div>
                            </div>
                            <div className="text-yellow-400 font-bold">0%</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Clock className="w-6 h-6 text-slate-400" />
                            <div className="flex-1">
                                <div className="font-bold text-white">Phase 3: Tactical Networking</div>
                                <div className="text-slate-400 text-sm">Sunbelt Builders Show (July 22–23, 2026)</div>
                            </div>
                            <div className="text-slate-400 font-bold">Scheduled</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}