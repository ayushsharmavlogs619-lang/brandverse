import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "War Room — Brandverse | Tactical AI Command Center",
  description: "Brandverse War Room is your tactical AI command center. Unlimited AI-powered business analysis and strategy support.",
};

export default function WorkroomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
