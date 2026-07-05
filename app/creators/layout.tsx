import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Brandverse Creators — Premium Operations & Operational Support",
  description: "Brandverse is the trusted operations partner for professional creators. We handle inbox organization, fan communication, scheduling, and custom workflows so you can focus on creating.",
  metadataBase: new URL("https://creators.brandverse.tech"),
  keywords: [
    "Creator Operations",
    "OnlyFans Management Support",
    "YouTube Creator Support",
    "Inbox Organization",
    "Fan Communications",
    "Creator Assistant",
    "Business Systems for Creators",
    "Content Entrepreneur Operations",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://creators.brandverse.tech",
    title: "Brandverse Creators — Premium Operations Partner for Creators",
    description: "Reclaim your creative freedom. Professional operations support, inbox management, and scalable business workflows for top content creators.",
    siteName: "Brandverse",
    images: [
      {
        url: "https://brandverse.tech/favicon.ico",
        width: 512,
        height: 512,
        alt: "Brandverse Operations Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandverse Creators — Premium Operations Partner",
    description: "Inbox organization, fan workflow design, and operational excellence for content entrepreneurs.",
    images: ["https://brandverse.tech/favicon.ico"],
  },
};

export default function CreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Brandverse Creators",
    "alternateName": "Brandverse Creator Operations",
    "description": "Trusted operations and workflow organization partner for digital creators and content entrepreneurs.",
    "url": "https://creators.brandverse.tech",
    "logo": "https://brandverse.tech/favicon.ico",
    "sameAs": [
      "https://twitter.com/brandverse_tech",
      "https://linkedin.com/company/brandverse-tech"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Support & Operations Strategy",
      "email": "ayush@brandverse.tech",
      "availableLanguage": ["English"]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Creator Operations Support",
    "serviceType": "Operational Management and Fan Communication Workflows",
    "provider": {
      "@type": "Organization",
      "name": "Brandverse"
    },
    "description": "Professional inbox triage, fan interaction systems, automated workflows, and calendar management for online creator businesses.",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Creator Support Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Inbox & Communication Management",
            "description": "High-responsiveness filter systems for email, DM, and fan networks."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Operational Workflow Systems",
            "description": "Standard Operating Procedures (SOPs) and admin automation."
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="creators-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, serviceSchema]),
        }}
      />
      {children}
    </>
  );
}
