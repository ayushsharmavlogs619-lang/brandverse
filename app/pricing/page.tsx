
import { Check, HelpCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Invest In Growth, Not Overhead</h1>
          <p className="text-xl text-slate-400">
            A full-time receptionist costs ~$45,000/year. Brandverse costs less than a coffee a day.
            <span className="text-blue-400 font-bold"> No contracts. Cancel anytime.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start relative">
          {/* Starter */}
          <div className="p-10 rounded-3xl bg-[#0b1121] border border-white/10 text-center hover:border-blue-500/30 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-white">Starter</h3>
            <div className="text-sm text-slate-500 font-medium mb-6">Perfect for Solopreneurs</div>
            <div className="text-5xl font-black mb-2 text-white">$497<span className="text-lg text-slate-500 font-normal">/mo</span></div>
            <div className="text-xs text-slate-500 mb-8 uppercase tracking-widest font-semibold">Risk Free Guarantee</div>
            <ul className="text-slate-400 space-y-4 mb-10 text-left text-sm">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 24/7 Call Answering</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Basic Appointment Booking</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> SMS Summaries</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 500 AI Minutes / mo</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> English Support</li>
            </ul>
            <Link href="/contact" className="block w-full py-4 text-center rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-white">Start With Basic</Link>
          </div>

          {/* Growth */}
          <div className="p-12 rounded-[2.5rem] bg-indigo-600 border border-indigo-400 relative shadow-2xl shadow-indigo-500/30 -translate-y-6 z-10">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white text-indigo-700 px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-indigo-200">Best ROI</div>
            <h3 className="text-3xl font-bold mb-2 text-white">Growth</h3>
            <div className="text-sm text-indigo-200 font-medium mb-6">For Established Teams</div>
            <div className="text-6xl font-black mb-2 text-white">$997<span className="text-lg text-indigo-200 font-normal">/mo</span></div>
            <div className="text-xs text-indigo-200 mb-8 uppercase tracking-widest font-semibold">No Setup Fees This Week</div>
            <ul className="text-white space-y-5 mb-12 text-left">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> <strong>Everything in Starter</strong></li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> <strong>Full CRM Integration</strong> (2-way)</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> Custom Voice Cloning</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> Unlimited Minutes</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> Multilingual (ES/FR)</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-200" /> Priority Support Line</li>
            </ul>
            <Link href="/contact" className="block w-full py-5 text-center rounded-2xl bg-white text-indigo-700 font-black text-lg hover:bg-slate-100 transition-all shadow-xl">Get Growth Plan</Link>
          </div>

          {/* Enterprise */}
          <div className="p-10 rounded-3xl bg-[#0b1121] border border-white/10 text-center hover:border-blue-500/30 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
            <div className="text-sm text-slate-500 font-medium mb-6">Franchises & Multi-Location</div>
            <div className="text-5xl font-black mb-2 text-white">Custom</div>
            <div className="text-xs text-slate-500 mb-8 uppercase tracking-widest font-semibold">White Glove Service</div>
            <ul className="text-slate-400 space-y-4 mb-10 text-left text-sm">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Multi-location Routing Logic</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Dedicated Account Manager</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Custom API Development</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> White Label Portal</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> SLA Guarantees</li>
            </ul>
            <Link href="/contact" className="block w-full py-4 text-center rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-white">Contact Sales</Link>
          </div>
        </div>

        {/* Guarantee Block */}
        <div className="mt-20 max-w-4xl mx-auto p-8 border border-emerald-500/30 bg-emerald-500/5 rounded-3xl flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-emerald-500/10 rounded-full shrink-0">
            <ShieldCheck className="w-12 h-12 text-emerald-500" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Our 30-Day Happiness Guarantee</h3>
            <p className="text-slate-400">We are so confident that Brandverse will increase your booking rate that if you don't generate at least 3x your monthly ROI in the first 30 days, we'll refund your subscription in full. No questions asked.</p>
          </div>
        </div>

        {/* Mini FAQ */}
        <div className="mt-20 max-w-2xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            Have questions about enterprise billing? <a href="/faq" className="text-blue-400 underline">Read our billing FAQ</a> or chat with us.
          </p>
        </div>
      </div>
    </div>
  );
}
