import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Brandverse OnlyFans Operations — Premium Chatting & Operational Support",
  description: "Brandverse is the trusted operations partner for professional OnlyFans creators. We manage subscriber chatting, vault organization, PPV scheduling, and daily workflows securely so you can focus on content creation.",
  metadataBase: new URL("https://onlyfans.brandverse.tech"),
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
    url: "https://onlyfans.brandverse.tech",
    title: "Brandverse OnlyFans Operations — Premium Support for Professional Creators",
    description: "Reclaim your freedom. 24/7 subscriber communication support, PPV workflow systems, and vault organization for top OnlyFans creators.",
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
    description: "24/7 subscriber communication support, PPV workflow systems, and vault organization.",
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
    "description": "Trusted operations and subscriber communication support partner for OnlyFans creators.",
    "url": "https://onlyfans.brandverse.tech",
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
            "name": "24/7 Chatting & Inbox Management",
            "description": "Professional subscriber chatting and filter systems."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vault & PPV Organization",
            "description": "Meticulous folder structuring and release schedules."
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
