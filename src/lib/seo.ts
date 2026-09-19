import type { Metadata } from "next";
import { site } from "./content";

export const DESCRIPTION =
  "Maqnah is an AI, data and digital transformation consulting partner. We turn enterprise data into intelligence — strategy, machine learning, automation and platforms built for real business impact.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Maqnah — Turn Data Into Intelligence",
    template: "%s · Maqnah",
  },
  description: DESCRIPTION,
  keywords: [
    "AI consulting Saudi Arabia",
    "data intelligence",
    "enterprise AI strategy",
    "predictive analytics",
    "generative AI consulting",
    "intelligent automation",
    "digital transformation",
    "data engineering",
    "AI agents",
    "Maqnah",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Maqnah — Turn Data Into Intelligence",
    description: DESCRIPTION,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: DESCRIPTION }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maqnah — Turn Data Into Intelligence",
    description: DESCRIPTION,
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  slogan: "Turning complexity into intelligence.",
  email: site.email,
  foundingLocation: site.location,
  areaServed: "Worldwide",
  description: DESCRIPTION,
  knowsAbout: [
    "Artificial Intelligence",
    "Data Engineering",
    "Predictive Analytics",
    "Intelligent Automation",
    "Digital Transformation",
  ],
  address: { "@type": "PostalAddress", addressCountry: "SA" },
};
