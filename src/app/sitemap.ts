import type { MetadataRoute } from "next";
import { categories } from "@/lib/catalog";

const SITE = "https://www.nachitekneka.com";

export const dynamic = "force-static";

/** XML sitemap for search engines (served at /sitemap.xml). */
export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
    "/products",
    "/spinlyfex",
    "/services",
    "/about",
    "/careers",
    "/downloads",
    "/contact",
    "/site-map",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${SITE}/products/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const productPages = categories.flatMap((c) =>
    c.products.map((p) => ({
      url: `${SITE}/products/${c.slug}/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  return [...statics, ...categoryPages, ...productPages];
}
