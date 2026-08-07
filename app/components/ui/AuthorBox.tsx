import Link from 'next/link';
import { Twitter, Linkedin, Globe } from 'lucide-react';

interface AuthorBoxProps {
    name: string;
    role: string;
    bio: string;
    slug: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
}

export default function AuthorBox({ name, role, bio, slug, twitter, linkedin, website }: AuthorBoxProps) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
            <Link href={`/author/${slug}`} className="shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-lg">
                    {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
            </Link>
            <div className="min-w-0">
                <Link href={`/author/${slug}`} className="font-bold text-white hover:text-blue-400 transition-colors">{name}</Link>
                <p className="text-xs text-slate-500 mb-2">{role}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{bio}</p>
                {(twitter || linkedin || website) && (
                    <div className="flex items-center gap-3 mt-3">
                        {twitter && (
                            <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="Twitter">
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                        {website && (
                            <a href={website} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="Website">
                                <Globe className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
