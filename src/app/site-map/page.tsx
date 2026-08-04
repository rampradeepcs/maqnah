import type { Metadata } from "next";
import Link from "next/link";
import { categories, categoryCount } from "@/lib/catalog";
import { PageHero } from "@/components/Section";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Site Map",
  description:
    "All pages on nachitekneka.com — products, SpinLyfeX retrofits, services, company information and resources.",
};

const groups: { heading: string; links: { label: string; href: string; note?: string }[] }[] = [
  {
    heading: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "SpinLyfeX™ Retrofits", href: "/spinlyfex" },
      { label: "Industry Solutions", href: "/#solutions" },
      { label: "Onsite Technical Services", href: "/services" },
      { label: "Company", href: "/about" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Contact / Request a Quote", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Downloads", href: "/downloads" },
      { label: "Company Brochure (PDF)", href: asset("/brochure.pdf") },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <main>
      <PageHero
        eyebrow="Site Map"
        title={
          <>
            Everything, <span className="text-brand-gradient">one page</span>
          </>
        }
        intro="A complete overview of nachitekneka.com — jump straight to any page."
      />

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.heading}>
              <h2 className="font-display text-lg font-semibold text-fg">{g.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-display text-lg font-semibold text-fg">Parts catalog</h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {c.name}
                    <span className="ml-2 text-xs text-faint">{categoryCount(c)} parts</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
