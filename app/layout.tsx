import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";
import StructuredData from "./components/StructuredData";
import PushEnrollment from "./components/PushEnrollment";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ... existing metadata ...
  title: "Brandverse — AI Voice Agents for SMBs",
  description: "Brandverse provides 24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.",
  metadataBase: new URL('https://brandverse-silk.vercel.app'),
  keywords: ['AI Voice Agents', 'AI Automation', 'Lead Generation', 'Voice AI', 'Business Automation', 'AI Phone Agent', 'Conversational AI', 'SMB Solutions'],
  authors: [{ name: 'Brandverse' }],
  creator: 'Brandverse',
  publisher: 'Brandverse',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brandverse-silk.vercel.app',
    title: 'Brandverse — AI Voice Agents for SMBs',
    description: '24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.',
    siteName: 'Brandverse',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brandverse - AI Voice Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandverse — AI Voice Agents for SMBs',
    description: '24/7 AI voice agents that capture leads, book appointments, and drive revenue.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Cookiebot CMP - MUST LOAD FIRST for GDPR compliance */}
        <Script
          id="cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={process.env.NEXT_PUBLIC_COOKIEBOT_ID}
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        <PushEnrollment />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
