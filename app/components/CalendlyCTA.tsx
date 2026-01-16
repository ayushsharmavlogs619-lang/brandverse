import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export default function CalendlyCTA() {
    return (
        <section className="my-16 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-8 h-8 text-blue-400" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">
                        Ready to Automate Your Growth?
                    </h3>
                    <p className="text-slate-400 font-bold">
                        Book a free 30-minute strategy call. We&apos;ll analyze your current setup and show you exactly how AI can 10x your lead response.
                    </p>
                </div>
                
                <Link 
                    href="https://calendly.com/ayushsharmavlogs619/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-brand-gradient text-white rounded-full text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group whitespace-nowrap"
                >
                    Book Free Call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
