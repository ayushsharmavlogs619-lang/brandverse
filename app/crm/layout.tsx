import type { Metadata } from "next";
import CrmNav from "./components/CrmNav";

export const metadata: Metadata = {
  title: "CRM — Creator Outreach Engine | Brandverse",
  description:
    "Brandverse's internal creator outreach engine: pipeline tracking, follow-ups, and deal management for creator clients.",
  robots: { index: false, follow: false },
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <CrmNav />
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-6">{children}</main>
    </div>
  );
}
