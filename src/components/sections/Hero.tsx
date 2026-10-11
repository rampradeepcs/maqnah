import Image from "next/image";
import { hero } from "@/lib/content";
import { WaveGrid } from "../visuals/WaveGrid";
import { Icon } from "../ui/Icon";

/** Headline words followed by a tiny icon tile — the brief's two title icons. */
const TITLE_ICONS: Record<string, "layers" | "spark"> = {
  Engineering: "layers",
  intelligence: "spark",
};

/** Small frosted tiles that float over the lens: detail, at low opacity. */
const GLASS = [
  { icon: "chart", className: "left-[6%] top-[14%]", delay: "0s" },
  { icon: "nodes", className: "right-[4%] top-[6%]", delay: "-2.4s" },
  { icon: "shield", className: "bottom-[14%] right-[12%]", delay: "-4.6s" },
] as const;

/**
 * The banner keeps the wall of cubes behind it and sets a detailed 3D lens on
 * top: data streams in from the left and resolves into dashboards. A frosted
 * veil lets the copy sit over the wall without hiding its texture.
 */
export function Hero() {
  const words = hero.headline.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32"
    >
      {/* Backdrop: the cube wall, with a CSS grid beneath as the no-WebGL fallback */}
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0" />
      <WaveGrid className="pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(243,244,241,0.92)_0%,rgba(243,244,241,0.78)_55%,rgba(243,244,241,0.3)_100%)] lg:bg-[linear-gradient(100deg,rgba(243,244,241,0.95)_0%,rgba(243,244,241,0.8)_36%,rgba(243,244,241,0.18)_64%,rgba(243,244,241,0)_82%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-void"
      />

      <div className="container-x relative grid flex-1 items-center gap-6 pb-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-4 lg:pb-16">
        <div className="relative z-10">
          <p className="rise" style={{ animationDelay: "0.05s" }}>
            <span className="pill-outline border-line-strong bg-white/60 text-fg backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              <span className="label text-fg/80">{hero.tag}</span>
            </span>
          </p>

          <h1 className="display t-hero mt-7 text-fg">
            {words.map((word, i) => {
              const icon = TITLE_ICONS[word];
              const delay = `${0.12 + i * 0.06}s`;
              return (
                <span key={i}>
                  <span className="word-mask">
                    <span style={{ animationDelay: delay }}>{word}</span>
                  </span>
                  {icon && (
                    <>
                      {" "}
                      <span className="word-mask" aria-hidden>
                        <span style={{ animationDelay: delay }}>
                          <span
                            className={`inline-grid h-[0.8em] w-[0.8em] translate-y-[0.1em] place-items-center rounded-[0.24em] border border-line bg-white text-signal shadow-[0_10px_24px_-12px_rgba(0,77,38,0.5)] ${
                              icon === "spark" ? "rotate-6" : "-rotate-6"
                            }`}
                          >
                            <Icon name={icon} className="h-[0.48em] w-[0.48em]" strokeWidth={1.8} />
                          </span>
                        </span>
                      </span>
                    </>
                  )}
                  {i < words.length - 1 && " "}
                </span>
              );
            })}
          </h1>

          <p
            className="lede rise mt-7 max-w-[46ch] text-muted"
            style={{ animationDelay: "0.6s" }}
          >
            {hero.lead}
          </p>

          <div
            className="rise mt-9 hidden flex-wrap gap-3 md:flex"
            style={{ animationDelay: "0.75s" }}
          >
            <a href={hero.ctas[0].href} data-cursor="LET'S TALK" className="btn btn-primary">
              {hero.ctas[0].label}
              <Icon name="arrow-right" className="arrow h-4 w-4" strokeWidth={2} />
            </a>
            <a href={hero.ctas[1].href} data-cursor="VIEW" className="btn btn-ghost">
              {hero.ctas[1].label}
            </a>
          </div>
        </div>

        {/* The lens: multiplied onto the wall so its white ground disappears */}
        <div className="relative lg:-mr-10 xl:-mr-20">
          <Image
            src={hero.visual.src}
            alt={hero.visual.alt}
            width={1600}
            height={1194}
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="hero-visual rise relative w-full"
            style={{ animationDelay: "0.35s" }}
          />
          {GLASS.map((g) => (
            <span
              key={g.icon}
              aria-hidden
              className={`glass float absolute hidden h-14 w-14 place-items-center rounded-2xl text-signal shadow-[0_18px_40px_-22px_rgba(16,21,18,0.55)] sm:grid ${g.className}`}
              style={{ animationDelay: g.delay }}
            >
              <Icon name={g.icon} className="h-6 w-6" />
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: the calls to action ride the bottom of the opening screen */}
      <div className="container-x sticky bottom-4 z-20 pb-4 md:hidden">
        <div className="glass flex gap-2 rounded-2xl p-2 shadow-[0_18px_40px_-22px_rgba(16,21,18,0.55)]">
          <a href={hero.ctas[0].href} className="btn btn-dark flex-1">
            {hero.ctas[0].label}
          </a>
          <a href={hero.ctas[1].href} className="btn btn-ghost px-4">
            {hero.ctas[1].label}
            <Icon name="arrow-down" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
