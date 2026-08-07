import Link from 'next/link';

export const metadata = {
  title: 'Portfolio — Brandverse',
  description: 'How Brandverse AI agents are deployed across industries — example playbooks showing the challenge, solution, and outcome structure.',
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-24 pb-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-6">Portfolio & Deployment Playbooks</h1>
        <p className="text-slate-400 mb-4">How Brandverse AI agents are scoped and deployed across industries. These are representative examples of the deployment pattern — challenges we solve, solutions we build, and the outcomes the playbook targets.</p>
        <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-10">Illustrative examples — not claims about specific clients.</p>

        <div className="space-y-8">
          {/* Playbook 1: HVAC */}
          <article className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
              <div>
                <div className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-2">HVAC & Plumbing</div>
                <h3 className="text-3xl font-bold text-white">After-Hours Overflow Playbook</h3>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">24/7</div>
                  <div className="text-xs text-slate-500 uppercase">Coverage</div>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">0</div>
                  <div className="text-xs text-slate-500 uppercase">Voicemail Drops</div>
                </div>
              </div>
            </div>

            <p className="text-slate-400 mb-6 text-lg">
              Typical scenario: an HVAC company missing ~15 calls a week during after-hours and weekends — high-value emergency repair jobs going to competitors who pick up the phone.
            </p>

            <div className="grid md:grid-cols-3 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5">
              <div>
                <strong className="block text-white mb-1">Challenge</strong>
                <span className="text-slate-500 text-sm"> 24/7 staffing is expensive (~$12k/mo), but voicemail doesn't convert emergency callers.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Solution</strong>
                <span className="text-slate-500 text-sm">Deploy a Brandverse AI agent to handle overflow and after-hours calls, triaging emergencies and booking routine work into the calendar.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Outcome</strong>
                <span className="text-slate-500 text-sm">Every after-hours call answered in under 5 seconds, emergencies dispatched to the on-call tech, and a call summary in the owner's inbox the next morning.</span>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Link href="/blog/case-study-elite-climate/" className="text-blue-400 hover:underline font-semibold text-sm">Read the playbook →</Link>
            </div>
          </article>

          {/* Playbook 2: Real Estate */}
          <article className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
              <div>
                <div className="text-purple-400 font-bold text-sm tracking-wider uppercase mb-2">Real Estate</div>
                <h3 className="text-3xl font-bold text-white">Lead Qualification Playbook</h3>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-500 uppercase">Intake Capture</div>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">~3</div>
                  <div className="text-xs text-slate-500 uppercase">Qualifying Qs</div>
                </div>
              </div>
            </div>

            <p className="text-slate-400 mb-6 text-lg">
              Typical scenario: agents overwhelmed by inbound inquiries from Zillow and listing ads, spending hours qualifying low-intent leads instead of closing deals.
            </p>

            <div className="grid md:grid-cols-3 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5">
              <div>
                <strong className="block text-white mb-1">Challenge</strong>
                <span className="text-slate-500 text-sm">Agents wasting hours per week on cold, unqualified leads.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Solution</strong>
                <span className="text-slate-500 text-sm">The AI pre-screens every caller — budget, timeline, and pre-approval status — before transferring to an agent with full context.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Outcome</strong>
                <span className="text-slate-500 text-sm">Agents only take qualified calls, and every intake is logged with structured notes in the CRM.</span>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Link href="/blog/case-study-apex-property/" className="text-blue-400 hover:underline font-semibold text-sm">Read the playbook →</Link>
            </div>
          </article>

          {/* Playbook 3: Dental */}
          <article className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
              <div>
                <div className="text-green-400 font-bold text-sm tracking-wider uppercase mb-2">Medical & Dental</div>
                <h3 className="text-3xl font-bold text-white">Overflow & No-Show Recovery Playbook</h3>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">3</div>
                  <div className="text-xs text-slate-500 uppercase">Ring Overflow</div>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-2xl font-black text-white">24/7</div>
                  <div className="text-xs text-slate-500 uppercase">Booking Line</div>
                </div>
              </div>
            </div>

            <p className="text-slate-400 mb-6 text-lg">
              Typical scenario: front desk staff missing calls during busy lunch hours and patient check-ins — new patient inquiries going to voicemail and never calling back.
            </p>

            <div className="grid md:grid-cols-3 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5">
              <div>
                <strong className="block text-white mb-1">Challenge</strong>
                <span className="text-slate-500 text-sm">High missed-call rate during operational hours; no-shows leave gaps in the schedule.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Solution</strong>
                <span className="text-slate-500 text-sm">An overflow agent that picks up only when the front desk is busy (after 3 rings), books appointments, and sends SMS reminders.</span>
              </div>
              <div>
                <strong className="block text-white mb-1">Outcome</strong>
                <span className="text-slate-500 text-sm">No new patient call goes unanswered, reminders cut no-shows, and the front desk keeps working uninterrupted.</span>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Link href="/blog/case-study-brightsmile-dental" className="text-blue-400 hover:underline font-semibold text-sm">Read the playbook →</Link>
            </div>
          </article>
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-block px-10 py-4 bg-blue-600 rounded-2xl font-black text-white">See This Playbook For Your Business</Link>
        </div>
      </main>
    </div>
  );
}
