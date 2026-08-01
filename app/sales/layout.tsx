import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import SystemNav from "./components/SystemNav";

export const metadata: Metadata = {
  title: "Sales System — Proposals, ROI, Contracts | Brandverse",
  description:
    "Brandverse's internal sales system: proposal generator, ROI calculator, objection library, demo scripts, contracts, pricing, discovery notes, and follow-up scheduler.",
  robots: { index: false, follow: false },
};

const NAV_ITEMS = [
  { href: "/sales", label: "Hub", icon: "dashboard" },
  { href: "/sales/proposals", label: "Proposals", icon: "file" },
  { href: "/sales/roi", label: "ROI", icon: "calc" },
  { href: "/sales/objections", label: "Objections", icon: "messages" },
  { href: "/sales/demo-scripts", label: "Demo Scripts", icon: "phone" },
  { href: "/sales/contracts", label: "Contracts", icon: "scroll" },
  { href: "/sales/pricing", label: "Pricing", icon: "calc" },
  { href: "/sales/discovery", label: "Discovery", icon: "note" },
  { href: "/sales/followups", label: "Follow-ups", icon: "clock" },
];

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SystemNav
        brand="SALES"
        subtitle="Close Deals. Recover Revenue."
        accent="from-blue-600 to-purple-600"
        items={NAV_ITEMS}
        base="/sales"
      />
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest mb-4">
          <Sparkles className="w-3 h-3" /> Internal sales suite — data stays in this browser
        </div>
        {children}
      </main>
    </div>
  );
}
