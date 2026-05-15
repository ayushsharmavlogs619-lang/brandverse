import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies — Brandverse',
  description: 'Real results from real businesses using Brandverse AI voice agents. See how we helped companies increase bookings and reduce costs.',
};

export default function CaseStudies() {
  const caseStudies = [
    {
      title: 'Brightsmile Dental',
      category: 'Healthcare',
      description: 'Increased new patient bookings by 40% and reduced no-shows by 60% with AI appointment reminders.',
      results: ['40% more bookings', '60% fewer no-shows', '24/7 availability'],
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Elite Climate Control',
      category: 'HVAC',
      description: 'Captured 70% more after-hours emergency calls and increased revenue by $15,000/month.',
      results: ['70% more emergency calls', '$15K/month revenue increase', 'Zero missed calls'],
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Apex Property Group',
      category: 'Real Estate',
      description: 'Reduced lead response time from 4 hours to 30 seconds, doubling conversion rates.',
      results: ['30-second response time', '2x conversion rate', '200% more qualified leads'],
      image: '/api/placeholder/400/300'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            BRANDVERSE.TECH
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-200">
            <Link href="/features" className="hover:text-blue-400 transition-colors">Features</Link>
            <Link href="/process" className="hover:text-blue-400 transition-colors">Process</Link>
            <Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">Intelligence (Blog)</Link>
            <Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
          </div>
          <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
            Book Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Real Results, Real Businesses
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            See how companies across industries are using Brandverse AI voice agents to increase revenue, 
            reduce costs, and provide 24/7 customer service without hiring more staff.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all">
                <div className="text-sm text-blue-400 font-medium mb-2">{study.category}</div>
                <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
                <p className="text-slate-300 mb-6">{study.description}</p>
                <div className="space-y-2 mb-6">
                  {study.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">{result}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Read Full Case Study
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join dozens of businesses already using Brandverse to transform their customer service and boost revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20">
              Start Your Success Story
            </Link>
            <Link href="/demos/voice" className="px-8 py-4 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white rounded-full font-semibold transition-all">
              Try Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>ayush@brandverse.tech</p>
                <p>+91 88510 05278</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/features" className="block text-slate-300 hover:text-blue-400 transition-colors">Solutions</Link>
                <Link href="/blog" className="block text-slate-300 hover:text-blue-400 transition-colors">Intelligence (Blog)</Link>
                <Link href="/case-studies" className="block text-slate-300 hover:text-blue-400 transition-colors">Case Studies</Link>
                <Link href="/about" className="block text-slate-300 hover:text-blue-400 transition-colors">About Us</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block text-slate-300 hover:text-blue-400 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-slate-300 hover:text-blue-400 transition-colors">Terms & Conditions</Link>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-slate-400 pt-8 border-t border-white/10">
            © 2025 Brandverse AI.
          </div>
        </div>
      </footer>
    </div>
  );
}
