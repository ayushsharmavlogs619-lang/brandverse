import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Phone, Calendar } from 'lucide-react';

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={className}>{children}</Link>;
}

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryText?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  variant?: 'default' | 'blog' | 'form' | 'minimal';
}

export default function CTASection({ 
  title = "Ready to Automate Your Business?",
  subtitle = "Join 50+ businesses that have deployed AI voice agents with Brandverse",
  primaryText = "Book Your Free Audit",
  primaryLink = 'https://calendly.com/ayushsharmavlogs619/30min',
  secondaryText = "See Live Demo",
  secondaryLink = '/portfolio',
  variant = 'default'
}: CTASectionProps) {
  
  const baseClasses = "py-16 px-6";
  const containerClasses = variant === 'minimal' 
    ? "max-w-4xl mx-auto text-center space-y-8"
    : "max-w-6xl mx-auto text-center space-y-10";

  // Set dynamic links based on variant
  const finalPrimaryLink = variant === 'form' ? 'https://calendly.com/ayushsharmavlogs619/30min' : primaryLink;
  const finalSecondaryLink = variant === 'form' ? secondaryLink : 'https://calendly.com/ayushsharmavlogs619/30min';

  const titleClasses = variant === 'minimal'
    ? "text-3xl font-black text-white"
    : variant === 'blog'
    ? "text-4xl font-black text-white uppercase italic tracking-tighter"
    : "text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter";

  const subtitleClasses = variant === 'minimal'
    ? "text-lg text-slate-300"
    : "text-xl text-slate-300 max-w-3xl mx-auto font-bold leading-relaxed";

  const buttonClasses = variant === 'minimal'
    ? "px-8 py-4 bg-brand-gradient text-white rounded-full font-black uppercase tracking-widest text-sm shadow-lg hover:scale-105 transition-all neon-glow"
    : "px-12 py-6 bg-brand-gradient text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-3 premium-card";

  const bgClasses = variant === 'minimal'
    ? "bg-black/40 border border-white/5 rounded-2xl p-12"
    : "bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/5 rounded-[3rem] p-16 shadow-2xl relative overflow-hidden";

  return (
    <section className={`${baseClasses} ${variant === 'minimal' ? '' : 'border-t border-white/5'}`}>
      <div className={containerClasses}>
        <div className={bgClasses}>
          {variant !== 'minimal' && (
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
          )}
          
          <div className={`relative z-10 ${variant === 'blog' ? 'space-y-8' : 'space-y-10'}`}>
            {title && (
              <h2 className={titleClasses}>
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p className={subtitleClasses}>
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <CtaLink 
                href={finalPrimaryLink}
                className={`${buttonClasses} group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {variant === 'form' ? <Phone className="w-5 h-5 relative z-10" /> : <Zap className="w-5 h-5 relative z-10" />}
                <span className="relative z-10">{primaryText}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </CtaLink>
              
              {secondaryText && (
                <CtaLink 
                  href={finalSecondaryLink}
                  className="text-sm font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  {variant === 'form' ? <Calendar className="w-4 h-4" /> : null}
                  {secondaryText}
                </CtaLink>
              )}
            </div>

            {variant === 'blog' && (
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                  Limited to 3 new clients per month. Apply now to secure your spot.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
