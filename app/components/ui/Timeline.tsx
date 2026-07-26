'use client';

import { useState } from 'react';
import { ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TimelinePhase {
    icon: LucideIcon;
    title: string;
    duration: string;
    description: string;
    deliverables: string[];
}

interface TimelineProps {
    phases: TimelinePhase[];
}

export default function Timeline({ phases }: TimelineProps) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [completed, setCompleted] = useState<number[]>([]);

    return (
        <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />
            <div className="space-y-8">
                {phases.map((phase, i) => {
                    const Icon = phase.icon;
                    const isExpanded = expanded === i;
                    const isCompleted = completed.includes(i);
                    return (
                        <div key={phase.title} className="relative pl-16">
                            <button
                                onClick={() => setExpanded(isExpanded ? null : i)}
                                className="absolute left-4 -translate-x-1/2 top-0 w-5 h-5 rounded-full bg-[#020617] border-2 border-blue-500 flex items-center justify-center z-10 hover:scale-110 transition-transform"
                            >
                                {isCompleted ? (
                                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                                ) : (
                                    <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />
                                )}
                            </button>
                            <div
                                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                                    isExpanded
                                        ? 'bg-white/10 border-blue-500/30'
                                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                                }`}
                                onClick={() => setExpanded(isExpanded ? null : i)}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-white">{phase.title}</h3>
                                            <p className="text-xs text-slate-500">{phase.duration}</p>
                                        </div>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                                {isExpanded && (
                                    <div className="mt-4 space-y-4 animate-fade-in">
                                        <p className="text-sm text-slate-400 leading-relaxed">{phase.description}</p>
                                        <ul className="space-y-1">
                                            {phase.deliverables.map((d) => (
                                                <li key={d} className="flex items-start gap-2 text-sm text-slate-300">
                                                    <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0 mt-1" />
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCompleted((prev) =>
                                                    prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
                                                );
                                            }}
                                            className={`text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-colors ${
                                                isCompleted
                                                    ? 'text-green-400 border-green-500/30 bg-green-500/10'
                                                    : 'text-slate-400 border-white/10 hover:text-white'
                                            }`}
                                        >
                                            {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
