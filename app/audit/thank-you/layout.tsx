import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit request received — Brandverse",
  robots: { index: false, follow: false },
};

export default function AuditThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
