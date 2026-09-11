import { site, nav } from "@/lib/content";
import { LogoMark } from "../ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-void">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-x relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <LogoMark className="h-5 w-auto text-signal" />
            <p className="display mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] text-fg">
              {site.statement}
            </p>
            <p className="mono mt-5 text-[10px] text-faint">
              {site.positioning}
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <p className="tag mb-5">Navigate</p>
            <ul className="space-y-2.5">
              {[...nav, { label: "Contact", href: "#contact" }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    <span className="h-px w-0 bg-signal transition-all duration-400 group-hover:w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="tag mb-5">Connect</p>
            <ul className="space-y-2.5 text-sm">
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
                  className="group inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-fg"
                >
                  LinkedIn
                  <span className="text-[11px] transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[10px] text-faint">
            © {year} {site.name}
          </p>
          <p className="mono flex items-center gap-2 text-[10px] text-faint">
            <span className="animate-pulse-dot h-1 w-1 rounded-full bg-signal" />
            Intelligence system online
          </p>
        </div>
      </div>
    </footer>
  );
}
