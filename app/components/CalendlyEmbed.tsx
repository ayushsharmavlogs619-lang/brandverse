'use client';

import { useEffect, useState } from 'react';

interface CalendlyEmbedProps {
    url?: string;
    height?: string;
}

export default function CalendlyEmbed({
    url = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/ayushsharmavlogs619/30-minute-meeting',
    height = '700px'
}: CalendlyEmbedProps) {
    // Brandverse styling parameters
    const styledUrl = `${url}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=020617&text_color=cbd5e1&primary_color=3b82f6`;

    return (
        <div className="w-full bg-[#020617] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <iframe
                src={styledUrl}
                width="100%"
                height={height}
                frameBorder="0"
                title="Schedule a Strategy Session"
                className="relative z-10"
            />
        </div>
    );
}
