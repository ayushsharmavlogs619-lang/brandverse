import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";
import StructuredData from "./components/StructuredData";
import PushNotificationBanner from "./components/PushNotificationBanner";

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
  metadataBase: new URL('https://brandverse.tech'),
  keywords: ['AI Voice Agents', 'AI Automation', 'Lead Generation', 'Voice AI', 'Business Automation', 'AI Phone Agent', 'Conversational AI', 'SMB Solutions'],
  authors: [{ name: 'Brandverse' }],
  creator: 'Brandverse',
  publisher: 'Brandverse',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brandverse.tech',
    title: 'Brandverse — AI Voice Agents for SMBs',
    description: '24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.',
    siteName: 'Brandverse',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

const linkedInPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GA4 / Meta: see client component Analytics.tsx (uses NEXT_PUBLIC_GA_MEASUREMENT_ID, etc.) */}

        {linkedInPartnerId ? (
          <>
            <Script id="linkedin-insight" strategy="afterInteractive">
              {`
            _linkedin_partner_id = ${JSON.stringify(linkedInPartnerId)};
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
            </Script>
            <Script
              src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
              strategy="afterInteractive"
            />
            <Script id="linkedin-partner" strategy="afterInteractive">
              {`
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
            </Script>
          </>
        ) : null}

        {/* Cookiebot CMP - MUST LOAD FIRST for GDPR compliance */}
        {process.env.NEXT_PUBLIC_COOKIEBOT_ID && (
          <Script
            id="cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={process.env.NEXT_PUBLIC_COOKIEBOT_ID}
            data-blockingmode="auto"
            strategy="beforeInteractive"
          />
        )}
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <Navbar />
        {children}
        <Footer />
        <PushNotificationBanner />
      </body>
    </html>
  );
}
