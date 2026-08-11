import Link from "next/link";
import { Logo } from "./Logo";
import { company } from "@/lib/data";
import { categories } from "@/lib/catalog";

const explore = [
  { label: "Products", href: "/products" },
  { label: "SpinLyfeX", href: "/spinlyfex" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Downloads", href: "/downloads" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="container-x pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-fg">
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {company.brandLine}. OEM-level spare parts, SpinLyfeX™ retrofits and onsite
              technical services for spinning mills worldwide.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted">
              <span className="h-2 w-2 rounded-full bg-brand" />
              {company.cert}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-fg">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {explore.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm text-muted transition-colors hover:text-brand">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-fg">Parts catalog</h4>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-faint md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <p>
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
            <p>
              Designed and Built by{" "}
              <a
                href="https://borncreative.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-brand"
              >
                Born Creative
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-brand">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="hover:text-brand">
              {company.email}
            </a>
            <Link href="/privacy-policy" className="hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-brand">
              Terms &amp; Conditions
            </Link>
            <Link href="/site-map" className="hover:text-brand">
              Site Map
            </Link>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="h-display bg-gradient-to-b from-[color-mix(in_oklab,var(--fg)_9%,transparent)] to-transparent bg-clip-text text-center text-[22vw] font-bold leading-[0.8] text-transparent">
          NACHI
        </div>
      </div>
    </footer>
  );
}
