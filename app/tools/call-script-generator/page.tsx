'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Copy, Check, ArrowRight, Mic } from 'lucide-react';

type ScriptType = {
    title: string;
    content: string;
};

type Scripts = {
    [key: string]: {
        [key: string]: ScriptType[];
    };
};

export default function ScriptGenerator() {
    const [industry, setIndustry] = useState('hvac');
    const [scenario, setScenario] = useState('missed_call');
    const [generatedScript, setGeneratedScript] = useState('');
    const [copied, setCopied] = useState(false);
    const [companyName, setCompanyName] = useState('Your Company Name');

    const scripts: Scripts = {
        hvac: {
            missed_call: [
                {
                    title: 'Immediate Callback (After Hours)',
                    content: `Hi, this is [AI_NAME] calling from ${companyName}. I saw we just missed a call from this number. Are you calling about a heating or cooling emergency?`
                },
                {
                    title: 'Busy Season Overflow',
                    content: `Thanks for calling ${companyName}. This is [AI_NAME], I'm helping the team while they're out on service calls. How can I help you today?`
                }
            ],
            scheduling: [
                {
                    title: 'Booking a Service Call',
                    content: `I can help with that. To get the right technician out to you, can you tell me what kind of system you have (gas, electric, etc.) and what issues you're experiencing?`
                }
            ],
            price: [
                {
                    title: 'Handling Price Questions',
                    content: `Our service call fee is $89, which includes a full diagnostic. If you decide to go ahead with the repair, we waive that fee completely. Would you like to check our availability for today?`
                }
            ]
        },
        dental: {
            missed_call: [
                {
                    title: 'New Patient Inquiry',
                    content: `Hi, thanks for calling ${companyName}. This is [AI_NAME]. I'm the digital assistant here. Are you looking to schedule an appointment or did you have a question about a procedure?`
                }
            ],
            scheduling: [
                {
                    title: 'Booking Hygiene Appointment',
                    content: `Great, I can help get you on the schedule. We have an opening this Thursday at 2 PM or next Tuesday at 10 AM. Do either of those work for you?`
                }
            ],
            price: [
                {
                    title: 'Insurance Inquiry',
                    content: `We work with most major insurance providers. If you have your card handy, I can note your provider, and our office manager will verify your exact coverage before your appointment.`
                }
            ]
        },
        general: {
            missed_call: [
                {
                    title: 'Universal Callback',
                    content: `Hello! This is [AI_NAME] with ${companyName}. Sorry we missed your call a moment ago. How can I assist you?`
                }
            ],
            scheduling: [
                {
                    title: 'General Appointment',
                    content: `I'd be happy to schedule that for you. What is the best phone number and email address to send the confirmation to?`
                }
            ],
            price: [
                {
                    title: 'General Pricing',
                    content: `We offer custom quotes based on your specific needs. I can ask you a few quick questions to give you a ballpark estimate right now, if you'd like?`
                }
            ]
        }
    };

    useEffect(() => {
        const selectedIndustry = scripts[industry] ? industry : 'general';
        const selectedScenario = scripts[selectedIndustry][scenario] ? scenario : 'missed_call';
        const script = scripts[selectedIndustry][selectedScenario][0].content;
        setGeneratedScript(script.replace('${companyName}', companyName));
    }, [industry, scenario, companyName]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-6">
                        <Mic className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-400">Free Script Generator</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        AI Call Script Generator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Generate battle-tested scripts for handling missed calls, objections, and appointments.
                    </p>
                </div>

                {/* Generator */}
                <div className="grid md:grid-cols-12 gap-8 mb-16">

                    {/* Controls */}
                    <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
                        <h2 className="text-lg font-semibold text-white mb-6">Configuration</h2>

                        <div className="space-y-6">
                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Industry */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Industry
                                </label>
                                <select
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="hvac" className="bg-[#0a0a0f]">HVAC / Plumbing</option>
                                    <option value="dental" className="bg-[#0a0a0f]">Dental / Medical</option>
                                    <option value="general" className="bg-[#0a0a0f]">General Service</option>
                                </select>
                            </div>

                            {/* Scenario */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Scenario
                                </label>
                                <div className="space-y-2">
                                    {[
                                        { id: 'missed_call', label: 'Missed Call Callback' },
                                        { id: 'scheduling', label: 'Scheduling Appointment' },
                                        { id: 'price', label: 'Handling Price/Objections' },
                                    ].map((sc) => (
                                        <button
                                            key={sc.id}
                                            onClick={() => setScenario(sc.id)}
                                            className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${scenario === sc.id
                                                    ? 'bg-blue-600 border-blue-500 text-white'
                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                                }`}
                                        >
                                            {sc.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="md:col-span-8">
                        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white">Generated Script</h2>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied!' : 'Copy Script'}
                                </button>
                            </div>

                            <div className="bg-black/40 border border-white/10 rounded-xl p-8 min-h-[300px] font-mono text-lg leading-relaxed text-slate-200 shadow-inner resize-none relative">
                                <div className="absolute top-4 left-4 flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-[8px]">●</div>
                                    <div className="text-xs text-red-400 font-sans tracking-widest uppercase">Recording</div>
                                </div>
                                <div className="mt-6 whitespace-pre-wrap">
                                    {generatedScript}
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Why this script works</h3>
                                        <p className="text-sm text-slate-400">
                                            This script uses <strong>active listening</strong> and <strong>immediate value proposition</strong>. By identifying the caller and the company immediately, trust is established. Converting the objection or inquiry into a question keeps the conversation moving forward.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Don't Want to Read Scripts?
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Brandverse AI works 24/7 and knows exactly what to say, tailored to your business. No scripts, no practice, just results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Hear a Demo <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
