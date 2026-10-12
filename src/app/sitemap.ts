import type { MetadataRoute } from "next";
import { languageAlternates } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const absolute = (path: string) => new URL(path, site.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: absolute(languageAlternates.en),
    ar: absolute(languageAlternates.ar),
  };
  return (["/", "/ar"] as const).map((path) => ({
    url: absolute(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.9,
    lastModified: new Date(),
    alternates: { languages },
  }));
}
