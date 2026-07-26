export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Brandverse",
        "alternateName": "Brandverse.tech",
        "description": "AI Voice Automation Agency providing 24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.",
        "url": "https://brandverse.tech",
        "logo": "https://brandverse.tech/favicon.ico",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "sameAs": [
            "https://twitter.com/brandverse",
            "https://linkedin.com/company/brandverse",
            "https://facebook.com/brandverse"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales",
            "email": "ayush@brandverse.tech",
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
        "url": "https://brandverse.tech",
        "description": "24/7 AI voice agents that capture leads, book appointments, and drive revenue for local businesses.",
        "publisher": {
            "@type": "Organization",
            "name": "Brandverse"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://brandverse.tech/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    const searchActionSchema = {
        "@context": "https://schema.org",
        "@type": "SearchAction",
        "target": "https://brandverse.tech/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
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
        "image": "https://brandverse.tech/favicon.ico",
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
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Will my customers know it's AI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "They might suspect it because it's polite and efficient, but the voice quality is indistinguishable from a human. Most clients think they're talking to a very sharp receptionist."
                }
            },
            {
                "@type": "Question",
                "name": "How long does setup take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kickoff to go-live is typically 48-72 hours. We build your infrastructure, test it, and hand you the keys."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to change my phone number?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. We simply forward your missed calls to the AI agent, or port your main line. Zero disruption to your existing business cards or listings."
                }
            },
            {
                "@type": "Question",
                "name": "What if the AI messes up?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our agents are programmed with Safe Handoff protocols. If a caller gets frustrated or asks something complex, the AI instantly forwards to your personal cell or an emergency backup line."
                }
            }
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brandverse.tech" },
            { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://brandverse.tech/features" },
            { "@type": "ListItem", "position": 3, "name": "Pricing", "item": "https://brandverse.tech/pricing" },
            { "@type": "ListItem", "position": 4, "name": "FAQ", "item": "https://brandverse.tech/faq" },
            { "@type": "ListItem", "position": 5, "name": "Blog", "item": "https://brandverse.tech/blog" },
            { "@type": "ListItem", "position": 6, "name": "Services", "item": "https://brandverse.tech/services" }
        ]
    };

    return (
        <script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify([organizationSchema, websiteSchema, searchActionSchema, serviceSchema, localBusinessSchema, faqSchema, breadcrumbSchema])
            }}
        />
    );
}
