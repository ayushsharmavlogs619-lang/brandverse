import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demos — Brandverse AI Voice Agents | Try Live Demos",
  description: "Experience Brandverse AI voice agents in real-time. Try our ultra-low latency voice agent that qualifies leads, handles objections, and books appointments.",
};

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
