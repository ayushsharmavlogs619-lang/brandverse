import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";
import StructuredData from "./components/StructuredData";
import PushNotificationBanner from "./components/PushNotificationBanner";
import LeadPopup from "./components/LeadPopup";
import ErrorBoundary from "./components/ErrorBoundary";
import ReadingProgress from "./components/ui/ReadingProgress";
import { config } from "../lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#020617',
};

export const metadata: Metadata = {
  title: "Brandverse — AI Voice Agents for SMBs | 24/7 Lead Capture & Automation",
  description: "Brandverse provides 24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses. Stop losing calls to voicemail.",
  metadataBase: new URL('https://brandverse.tech'),
  applicationName: 'Brandverse',
  keywords: ['AI Voice Agents', 'AI Automation', 'Lead Generation', 'Voice AI', 'Business Automation', 'AI Phone Agent', 'Conversational AI', 'SMB Solutions', '24/7 Call Answering', 'Appointment Booking', 'AI Receptionist', 'CRM Integration'],
  authors: [{ name: 'Brandverse' }],
  creator: 'Brandverse',
  publisher: 'Brandverse',
  alternates: {
    canonical: 'https://brandverse.tech',
  },
  manifest: 'https://brandverse.tech/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/social-preview.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brandverse.tech',
    title: 'Brandverse — AI Voice Agents for SMBs | 24/7 Lead Capture',
    description: '24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses. Stop losing calls to voicemail.',
    siteName: 'Brandverse',
    images: [
      {
        url: 'https://brandverse.tech/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Brandverse social preview — AI Voice Agents for SMBs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandverse — AI Voice Agents for SMBs',
    description: '24/7 AI voice agents that capture leads, book appointments, and drive revenue.',
    images: ['https://brandverse.tech/social-preview.png'],
    creator: '@brandverse_tech',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  ...(config.googleSiteVerification
    ? {
        verification: {
          google: config.googleSiteVerification,
        },
      }
    : {}),
};

const linkedInPartnerId = config.linkedInPartnerId;

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
        <ReadingProgress />
        <StructuredData />
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

        {config.cookiebotId && (
          <Script
            id="cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={config.cookiebotId}
            data-blockingmode="auto"
            strategy="beforeInteractive"
          />
        )}

        <ErrorBoundary fallback={null}>
          <Analytics />
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <Navbar />
        </ErrorBoundary>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <Footer />
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <PushNotificationBanner />
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <LeadPopup delay={30000} enableExitIntent={true} />
        </ErrorBoundary>
      </body>
    </html>
  );
}