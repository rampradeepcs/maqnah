import Link from "next/link";
import { site } from "@/lib/content";
import { light } from "@/lib/content-light";
import { LogoMark } from "../ui/Logo";

export function LightFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-24">
        <div>
          <LogoMark className="h-6 w-auto text-signal" />
          <p className="serif mt-7 max-w-md text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.05] text-fg">
            {site.statement}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="label mb-5">Navigate</p>
          <ul className="space-y-3">
            {light.hero.nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-[16px] text-muted transition-colors duration-300 hover:text-fg"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label mb-5">Connect</p>
          <ul className="space-y-3 text-[16px]">
            <li className="text-muted">{site.location}</li>
            <li>
              <a
                href={`mailto:${site.email}`}
                data-cursor="EMAIL"
                className="text-fg underline decoration-signal/40 underline-offset-4 transition-colors duration-300 hover:decoration-signal"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors duration-300 hover:text-fg"
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {year} {site.name}
        </p>
        <Link
          href="/"
          className="label transition-colors duration-300 hover:text-fg"
        >
          View the dark version →
        </Link>
      </div>
    </footer>
  );
}
