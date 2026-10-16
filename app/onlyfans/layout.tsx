import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Brandverse OnlyFans Operations — Premium Chatting & Operational Support",
  description: "Brandverse offers subscriber communication and creator-operations support. Scope, access, and reporting are agreed before work begins.",
  metadataBase: new URL("https://brandverse.pages.dev/onlyfans/"),
  keywords: [
    "OnlyFans Operations",
    "OnlyFans Chatting Support",
    "PPV Scheduling",
    "OnlyFans Manager Support",
    "Vault Organization",
    "Subscriber Management",
    "Creator Operations",
    "OnlyFans Assistant",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brandverse.pages.dev/onlyfans/",
    title: "Brandverse OnlyFans Operations — Premium Support for Professional Creators",
    description: "Subscriber communication and creator-operations support for OnlyFans creators.",
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
    title: "Brandverse OnlyFans Operations — Premium Support",
    description: "Subscriber communication and creator-operations support.",
    images: ["https://brandverse.tech/favicon.ico"],
  },
};

export default function OnlyFansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Brandverse OnlyFans Operations",
    "alternateName": "Brandverse OnlyFans Support",
    "description": "Subscriber communication and creator-operations support for OnlyFans creators.",
    "url": "https://brandverse.pages.dev/onlyfans/",
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
    "name": "OnlyFans Creator Operations",
    "serviceType": "Subscriber Communication and Vault Operations Management",
    "provider": {
      "@type": "Organization",
      "name": "Brandverse"
    },
    "description": "Professional subscriber interaction, PPV scheduling, vault organization, and custom workflows for OnlyFans creator businesses.",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "OnlyFans Support Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chatting & Inbox Management",
            "description": "Subscriber chatting and inbox workflows agreed with the creator."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vault & PPV Organization",
            "description": "Vault organization and release planning agreed with the creator."
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="onlyfans-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, serviceSchema]),
        }}
      />
      {children}
    </>
  );
}
