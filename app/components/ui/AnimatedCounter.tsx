'use client';

import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    duration?: number;
    label: string;
}

export default function AnimatedCounter({ end, suffix = '', prefix = '', decimals = 0, duration = 2000, label }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const startTime = Date.now();
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.round(eased * end * Math.pow(10, decimals)) / Math.pow(10, decimals));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration, decimals]);

    return (
        <div ref={ref} className="text-center">
            <p className="text-5xl md:text-6xl font-black text-white">
                {prefix}{count.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
            </p>
            <p className="text-sm text-slate-400 font-medium mt-2">{label}</p>
        </div>
    );
}
