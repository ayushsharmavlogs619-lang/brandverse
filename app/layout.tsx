import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
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
  title: "Brandverse — The Operational Engine for Absolute ROI",
  description: "Deploy 24/7 AI Voice Agents and Chatbots that capture leads and automate operations on autopilot. We don't build sites; we build high-performance revenue infrastructure.",
  metadataBase: new URL('https://brandverse.tech'),
  keywords: ['AI Voice Agents', 'AI Answering Service', 'Operational Automation', 'Lead Capture AI', 'ROI Engine', 'Autonomous Business Systems', 'Brandverse'],
  authors: [{ name: 'Brandverse' }],
  creator: 'Brandverse',
  publisher: 'Brandverse',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brandverse.tech',
    title: 'Brandverse — The Operational Engine for Absolute ROI',
    description: 'Autonomous AI Voice Agents and Chatbots that capture leads 24/7. High-performance infrastructure for modern businesses.',
    siteName: 'Brandverse',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brandverse - Operational ROI Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandverse — AI Voice Agents & Absolute ROI',
    description: 'Deploy autonomous AI agents that answer every call and capture every lead. We build the systems that build your business.',
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
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
