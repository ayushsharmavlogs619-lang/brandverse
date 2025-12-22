import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brandverse — AI Voice Agents for SMBs",
  description: "Brandverse provides 24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.",
  metadataBase: new URL('https://brandverse.tech'),
  openGraph: {
    title: 'Brandverse — AI Voice Agents for SMBs',
    description: '24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.',
    url: 'https://brandverse.tech',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
