'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const headings = document.querySelectorAll('article h2, article h3');
        const tocItems: TOCItem[] = [];
        headings.forEach((h) => {
            const id = h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
            h.id = id;
            tocItems.push({ id, text: h.textContent || '', level: h.tagName === 'H2' ? 2 : 3 });
        });
        setItems(tocItems);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-80px 0px -80% 0px' }
        );
        items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [items]);

    if (items.length < 2) return null;

    return (
        <nav className="hidden lg:block sticky top-24 w-56 shrink-0">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">On This Page</p>
            <ul className="space-y-2 border-l border-white/10">
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={`block text-xs py-1 pl-4 border-l-2 transition-all ${
                                activeId === item.id
                                    ? 'border-blue-400 text-blue-400'
                                    : 'border-transparent text-slate-500 hover:text-slate-300'
                            } ${item.level === 3 ? 'pl-8' : ''}`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
