import type { Metadata } from "next";
import SystemNav from "../sales/components/SystemNav";

export const metadata: Metadata = {
  title: "Prospecting — Local Business Lead Machine | Brandverse",
  description:
    "Brandverse's local business prospecting system: lead database, pipeline, email and call generators, proposals, landing pages, and ROI.",
  robots: { index: false, follow: false },
};

const NAV_ITEMS = [
  { href: "/prospecting", label: "Pipeline", icon: "building" },
  { href: "/prospecting/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/prospecting/email", label: "Emails", icon: "mail" },
  { href: "/prospecting/calls", label: "Cold Calls", icon: "phone" },
  { href: "/prospecting/proposals", label: "Proposals", icon: "file" },
  { href: "/prospecting/landing-pages", label: "Landing Pages", icon: "globe" },
  { href: "/prospecting/roi", label: "ROI", icon: "calc" },
];

export default function ProspectingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SystemNav
        brand="PROSPECT"
        subtitle="Find. Reach. Close. Local Businesses."
        accent="from-emerald-600 to-cyan-600"
        items={NAV_ITEMS}
        base="/prospecting"
      />
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-6">{children}</main>
    </div>
  );
}
