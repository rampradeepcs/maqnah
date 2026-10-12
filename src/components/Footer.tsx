import type { Dictionary } from "@/lib/i18n";
import { Logo } from "./ui/Logo";
import { Icon } from "./ui/Icon";

/**
 * Simple and solid: the brand green as a plain ground, the lock-up reversed
 * out, every section one click away, thin line icons for social, and the
 * standard copyright and policy row underneath.
 */
export function Footer({ dict }: { dict: Dictionary }) {
  const { footer, nav, ui } = dict;
  return (
    <footer className="bg-signal text-white">
      <div className="container-x">
        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <a href="#top" aria-label={ui.backToTop} className="self-start">
            <Logo tone="white" />
          </a>
          <nav aria-label={ui.footerNav}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[15px] text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/20 py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-[13.5px] text-white/80">{footer.copyright}</p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <ul className="flex gap-6 text-[13.5px] text-white/80">
              {footer.legal.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className="flex gap-3">
              {footer.social.map((s) => {
                const tile =
                  "grid h-10 w-10 place-items-center rounded-xl border border-white/30 text-white";
                return (
                  <li key={s.icon}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`${tile} transition-colors duration-300 hover:bg-white hover:text-signal`}
                      >
                        <Icon name={s.icon} className="h-5 w-5" />
                      </a>
                    ) : (
                      <span
                        role="img"
                        aria-label={`${s.label} ${ui.linkToCome}`}
                        className={`${tile} opacity-60`}
                      >
                        <Icon name={s.icon} className="h-5 w-5" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
