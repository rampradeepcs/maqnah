import { light } from "@/lib/content-light";
import { WaveGrid } from "./WaveGrid";
import { LogoMark } from "../ui/Logo";
import { Clock } from "./Clock";
import { Hi } from "./Keyword";

/**
 * The hero is the navigation. A very large wordmark, two thin columns of
 * links, the local time — then one statement in the middle of a great deal
 * of air. Behind it, a wall of cubes ripples wherever the cursor has been.
 */
export function LightHero() {
  const { hero } = light;
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Backdrop: the wave grid, with a CSS grid beneath as the no-WebGL fallback */}
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0" />
      <WaveGrid className="pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-void))",
        }}
      />

      {/* Top row — wordmark, links, clock */}
      <div className="container-x relative grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-7 pt-6 sm:grid-cols-[1.35fr_1fr_1fr_auto] md:pt-8">
        <a
          href="#top"
          aria-label="Maqnah"
          className="flex items-center gap-3 md:gap-4"
        >
          <LogoMark className="h-8 w-auto text-signal sm:h-10 md:h-[3.4rem]" />
          <span className="display text-[clamp(2.2rem,5.6vw,5.4rem)] leading-none tracking-[-0.04em] text-fg">
            Maqnah
          </span>
        </a>

        <ul className="order-3 flex flex-col gap-1.5 sm:order-none">
          {hero.nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="text-[15px] text-muted transition-colors duration-300 hover:text-fg md:text-[17px]"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="order-4 flex flex-col gap-1.5 sm:order-none">
          {hero.social.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                target={n.href.startsWith("http") ? "_blank" : undefined}
                rel={n.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[15px] text-muted transition-colors duration-300 hover:text-fg md:text-[17px]"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <Clock className="justify-self-end text-[14px] text-muted md:text-[16px]" />
      </div>

      {/* The statement */}
      <div className="container-x relative flex flex-1 items-center py-16 md:py-20">
        <p className="t-l-hero max-w-[24ch] md:ml-[36%] lg:ml-[38%]">
          <span className="text-fg">
            <Hi>{hero.statement}</Hi>
          </span>{" "}
          <span className="text-muted">
            <Hi>{hero.rest}</Hi>
          </span>
        </p>
      </div>

      {/* Bottom row */}
      <div className="container-x relative flex flex-col gap-4 pb-7 text-[15px] sm:flex-row sm:items-center sm:justify-between md:pb-9 md:text-[16px]">
        <span className="text-fg">{hero.based}</span>
        <a
          href={hero.ctas[0].href}
          data-cursor="VIEW"
          className="group inline-flex items-center gap-2 text-fg"
        >
          {hero.ctas[0].label}
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </a>
        <a
          href={hero.ctas[1].href}
          data-cursor="LET'S TALK"
          className="group inline-flex items-center gap-2 text-fg"
        >
          {hero.ctas[1].label}
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
