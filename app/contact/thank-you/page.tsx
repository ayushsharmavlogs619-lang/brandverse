import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Message received — Brandverse",
  description: "Thanks for contacting Brandverse. We will reply shortly.",
};

export default function ContactThankYouPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">We got your message</h1>
        <p className="text-slate-400 leading-relaxed">
          Thanks for reaching out. Our team reads every inquiry and will reply to{" "}
          <span className="text-white font-semibold">ayush@brandverse.tech</span> thread or your form email
          as soon as possible—usually within one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/pricing/"
            className="inline-flex justify-center px-6 py-3 rounded-xl border border-white/15 text-white font-bold hover:bg-white/5 transition-colors"
          >
            View pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
