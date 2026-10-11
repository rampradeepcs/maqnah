import type { Metadata } from "next";
import { hero, site } from "./content";

export const DESCRIPTION = hero.lead;

const TITLE = `Maqnah — ${hero.tag}`;

/** Describes public/img/og.jpg: the lock-up, tag and headline beside the lens. */
const OG_ALT = `Maqnah: ${hero.headline} Beside it, ${hero.visual.alt.charAt(0).toLowerCase()}${hero.visual.alt.slice(1)}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: "%s · Maqnah",
  },
  description: DESCRIPTION,
  keywords: [
    "AI consulting Saudi Arabia",
    "data and AI GCC",
    "AI-native data platforms",
    "agentic AI",
    "Arabic LLM",
    "generative AI consulting",
    "predictive analytics",
    "data governance PDPL",
    "decision intelligence",
    "Maqnah",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: hero.headline,
    description: DESCRIPTION,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: hero.headline,
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
  slogan: hero.headline,
  email: site.email,
  foundingLocation: site.location,
  areaServed: ["Saudi Arabia", "GCC"],
  description: DESCRIPTION,
  knowsAbout: [
    "Data Platforms",
    "Generative AI",
    "Agentic AI",
    "Predictive Analytics",
    "Decision Intelligence",
  ],
  address: { "@type": "PostalAddress", addressCountry: "SA" },
};
