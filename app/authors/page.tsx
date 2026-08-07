import Link from 'next/link';
import { authors } from '@/lib/authors';
import { ArrowLeft, Users, Linkedin, Twitter } from 'lucide-react';

export const metadata = {
    title: 'Authors — Brandverse',
    description: 'Meet the Brandverse editorial team: AI automation experts, content strategists, and technical writers helping businesses harness conversational AI.',
    openGraph: {
        title: 'Authors — Brandverse',
        description: 'Meet the Brandverse editorial team.',
        type: 'website',
    },
};

export default function AuthorsIndex() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <Link href="/blog" className="text-blue-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                </Link>

                <h1 className="text-5xl font-black text-white mb-4">Our Authors</h1>
                <p className="text-slate-400 text-lg mb-12 max-w-2xl">
                    Meet the experts behind Brandverse's content. Our team combines deep technical knowledge with practical business experience.
                </p>

                <div className="space-y-8">
                    {authors.map((author) => (
                        <Link
                            key={author.slug}
                            href={`/author/${author.slug}`}
                            className="block p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group"
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-black text-2xl shrink-0">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{author.name}</h2>
                                    <p className="text-sm text-blue-400 font-semibold mb-3">{author.title}</p>
                                    <p className="text-slate-400 leading-relaxed mb-4">{author.shortBio}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {author.expertise.map((area) => (
                                            <span key={area} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-3 shrink-0">
                                    {author.social.twitter && (
                                        <span className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-blue-400 transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </span>
                                    )}
                                    {author.social.linkedin && (
                                        <span className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-blue-400 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
