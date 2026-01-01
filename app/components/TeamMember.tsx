'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeamMemberProps {
    name: string;
    role: string;
    description: string;
    initials: string;
    imageSrc?: string;
    color?: 'blue' | 'purple' | 'slate';
    isLegacy?: boolean;
}

export default function TeamMember({ name, role, description, initials, imageSrc, color = 'slate', isLegacy = false }: TeamMemberProps) {
    const [imgError, setImgError] = useState(false);

    const colorClasses = {
        blue: { bg: 'bg-blue-900/10', border: 'border-blue-500/20', hover: 'hover:bg-blue-900/20', icon: 'bg-blue-600', text: 'text-blue-400' },
        purple: { bg: 'bg-purple-900/10', border: 'border-purple-500/20', hover: 'hover:bg-purple-900/20', icon: 'bg-purple-600', text: 'text-purple-400' },
        slate: { bg: 'bg-white/5', border: 'border-white/10', hover: 'hover:border-white/20', icon: 'bg-slate-800', text: 'text-slate-400' },
    };

    const styles = colorClasses[color];

    return (
        <div className={`p-6 rounded-3xl ${styles.bg} border ${styles.border} group ${styles.hover} transition-all relative overflow-hidden`}>
            {isLegacy && (
                <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-purple-400/50">Legacy</div>
            )}

            <div className={`w-16 h-16 rounded-2xl ${styles.icon} flex items-center justify-center text-xl font-bold text-white mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform relative overflow-hidden`}>
                {!imgError && imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={name}
                        fill
                        className="object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span>{initials}</span>
                )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            <div className={`${styles.text} font-bold uppercase tracking-widest text-xs mb-4`}>{role}</div>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}
