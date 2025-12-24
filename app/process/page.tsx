
import { Phone, Calendar, DollarSign, Settings, Headphones, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function ProcessPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-6">
                        From Signup to Live <br />
                        <span className="text-blue-500">In 48 Hours</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        We know you're busy. That's why we handle 100% of the heavy lifting. You don't need to be technical. You just need to want to grow.
                    </p>
                </div>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/20 before:to-transparent">
                    {[
                        {
                            step: "01",
                            title: "Discovery & Strategy",
                            desc: "We start with a 30-minute deep dive into your business. We learn your pricing, your service area, your tone of voice, and exactly how you want your 'Gatekeeper' to behave.",
                            icon: Headphones,
                            action: "Total Time: 30 Mins"
                        },
                        {
                            step: "02",
                            title: "Knowledge Base Construction",
                            desc: "Our engineers build your AI's brain. We upload your FAQs, past call scripts, availability logic, and pricing sheets. We train it to handle curveballs and objections just like your best salesperson.",
                            icon: Settings,
                            action: "We Handle This"
                        },
                        {
                            step: "03",
                            title: "Voice Cloning & Testing",
                            desc: "We select a voice that matches your brand—warm and motherly, or authoritative and professional. We run 100+ test scenarios to ensure it handles interruptions, accents, and bad connections faultlessly.",
                            icon: PlayCircle,
                            action: "You Approve The Quality"
                        },
                        {
                            step: "04",
                            title: "The 'Silent Launch'",
                            desc: "We forward a test line to the AI. You and your team try to 'break' it. Once everyone is blown away by the accuracy, we toggle the switch on your main business line.",
                            icon: Phone,
                            action: "Risk-Free Trial"
                        },
                        {
                            step: "05",
                            title: "Autopilot Revenue",
                            desc: "Your phone stops ringing, but your calendar starts filling up. You receive text summaries of every booked job. You focus on fulfillment and growing the business.",
                            icon: DollarSign,
                            action: "Forever"
                        }
                    ].map((s, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#020617] bg-zinc-800 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <s.icon className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-3xl bg-[#0b1121] border border-white/5 hover:border-blue-500/50 transition-all hover:-translate-y-1 duration-300 shadow-xl">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-blue-500 font-black text-sm uppercase tracking-widest">Phase {s.step}</div>
                                    <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase">{s.action}</div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Requirements */}
                <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">What We Need From You</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">Your Price List</span>
                        <span className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">Service Area Zip Codes</span>
                        <span className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">Calendar Link</span>
                        <span className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">That's It.</span>
                    </div>
                    <div className="mt-12">
                        <Link href="/contact" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all shadow-lg hover:shadow-blue-500/25">
                            Start The Process
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
