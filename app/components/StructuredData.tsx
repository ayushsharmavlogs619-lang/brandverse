import Script from 'next/script';

export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Brandverse",
        "alternateName": "Brandverse.tech",
        "description": "AI Voice Automation Agency providing 24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.",
        "url": "https://brandverse-silk.vercel.app",
        "logo": "https://brandverse-silk.vercel.app/favicon.ico",
        "sameAs": [
            "https://twitter.com/brandverse",
            "https://linkedin.com/company/brandverse",
            "https://facebook.com/brandverse"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales",
            "email": "hello@brandverse.tech",
            "availableLanguage": ["English"]
        },
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "40.7128",
                "longitude": "-74.0060"
            }
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Brandverse - AI Voice Agents for SMBs",
        "url": "https://brandverse-silk.vercel.app",
        "description": "24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.",
        "publisher": {
            "@type": "Organization",
            "name": "Brandverse"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "AI Voice Automation",
        "provider": {
            "@type": "Organization",
            "name": "Brandverse"
        },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AI Voice Agent Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI Voice Agent Setup",
                        "description": "Custom AI voice agents for lead capture and appointment booking"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI Invoicing Bot",
                        "description": "Automated invoicing and payment collection system"
                    }
                }
            ]
        }
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Brandverse",
        "image": "https://brandverse-silk.vercel.app/favicon.ico",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.7128,
            "longitude": -74.0060
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        }
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify([organizationSchema, websiteSchema, serviceSchema, localBusinessSchema])
            }}
        />
    );
}
