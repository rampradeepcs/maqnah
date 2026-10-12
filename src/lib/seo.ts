import type { Metadata } from "next";
import type { Dictionary } from "./i18n";
import { site } from "./site";

/** Both language versions, for hreflang alternates and the sitemap. */
export const languageAlternates = {
  en: "/",
  ar: "/ar",
  "x-default": "/",
} as const;

export function buildMetadata(dict: Dictionary): Metadata {
  const { meta, hero } = dict;
  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: "%s · Maqnah" },
    description: meta.description,
    authors: [{ name: site.name }],
    alternates: { canonical: meta.path, languages: languageAlternates },
    openGraph: {
      type: "website",
      url: meta.path,
      siteName: site.name,
      locale: meta.ogLocale,
      alternateLocale: dict.locale === "ar" ? ["en_US"] : ["ar_SA"],
      title: hero.headline,
      description: meta.description,
      images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: hero.headline,
      description: meta.description,
      images: [{ url: meta.ogImage, alt: meta.ogAlt }],
    },
    robots: { index: true, follow: true },
  };
}

export function buildJsonLd(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    slogan: dict.hero.headline,
    email: site.email,
    foundingLocation: site.location,
    areaServed: ["Saudi Arabia", "GCC"],
    description: dict.meta.description,
    knowsLanguage: ["en", "ar"],
    knowsAbout: [
      "Data Platforms",
      "Generative AI",
      "Agentic AI",
      "Predictive Analytics",
      "Decision Intelligence",
    ],
    address: { "@type": "PostalAddress", addressCountry: "SA" },
  };
}
