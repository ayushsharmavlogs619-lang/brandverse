import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";

export const metadata = {
  title: "Guide request received — Brandverse",
  description: "Thank you for requesting the Brandverse AI automation guide.",
};

export default function LeadMagnetThankYouPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/30">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">You&apos;re in</h1>
        <p className="text-slate-400 leading-relaxed flex items-start justify-center gap-2 text-left max-w-md mx-auto">
          <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <span>
            Check the inbox for the email you submitted. You will receive a confirmation from our form provider,
            and we will follow up from <span className="text-white font-semibold">ayush@brandverse.tech</span>{" "}
            with next steps for your download.
          </span>
        </p>
        <p className="text-sm text-slate-500">
          If nothing arrives in a few minutes, check spam/junk, then email us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/contact/"
            className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
          >
            Book a call
          </Link>
          <Link href="/" className="inline-flex justify-center px-6 py-3 rounded-xl border border-white/15 text-white font-bold hover:bg-white/5 transition-colors">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
