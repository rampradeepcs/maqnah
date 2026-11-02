import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { WaveGrid } from "../visuals/WaveGrid";
import { Icon } from "../ui/Icon";
import { HeadlineGraphic } from "../visuals/HeadlineGraphic";

/**
 * Small frosted tiles that float over the lens: detail, at low opacity.
 * Logical insets, so they follow the lens when the page mirrors (RTL).
 */
const GLASS = [
  { icon: "chart", className: "start-[6%] top-[14%]", delay: "0s" },
  { icon: "nodes", className: "end-[4%] top-[6%]", delay: "-2.4s" },
  { icon: "shield", className: "bottom-[14%] end-[12%]", delay: "-4.6s" },
] as const;

/**
 * The banner keeps the wall of cubes behind it and sets a detailed 3D lens on
 * top: data streams in from the copy's side and resolves into dashboards. A
 * frosted veil lets the copy sit over the wall without hiding its texture.
 * In RTL the veil, the lens and its details mirror with the layout.
 */
export function Hero({ t: hero }: { t: Dictionary["hero"] }) {
  const words = hero.headline.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-clip pt-28 md:pt-32"
    >
      {/* Backdrop: the cube wall, with a CSS grid beneath as the no-WebGL fallback */}
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0" />
      <WaveGrid className="pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(244,244,247,0.92)_0%,rgba(244,244,247,0.78)_55%,rgba(244,244,247,0.3)_100%)] lg:bg-[linear-gradient(100deg,rgba(244,244,247,0.95)_0%,rgba(244,244,247,0.8)_36%,rgba(244,244,247,0.18)_64%,rgba(244,244,247,0)_82%)] lg:rtl:bg-[linear-gradient(260deg,rgba(244,244,247,0.95)_0%,rgba(244,244,247,0.8)_36%,rgba(244,244,247,0.18)_64%,rgba(244,244,247,0)_82%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-void"
      />

      <div className="container-x relative grid flex-1 items-center gap-6 pb-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-4 lg:pb-16">
        <div className="relative z-10">
          <h1 className="display t-hero text-fg">
            {words.map((word, i) => {
              const icon = hero.headlineIcons[i];
              const delay = `${0.12 + i * 0.06}s`;
              return (
                <span key={i}>
                  {/* A word and its graphic never wrap apart */}
                  <span className={icon ? "whitespace-nowrap" : undefined}>
                    <span className="word-mask">
                      <span style={{ animationDelay: delay }}>{word}</span>
                    </span>
                    {icon && (
                      <>
                        {" "}
                        {/* Graphics fade up rather than rise out of a mask, so
                            their shadow and rotated corners are never clipped. */}
                        <span
                          aria-hidden
                          className="rise inline-block"
                          style={{ animationDelay: delay }}
                        >
                          <span
                            className={`inline-grid h-[0.8em] w-[0.8em] translate-y-[0.1em] place-items-center rounded-[0.24em] border border-line bg-white shadow-[0_10px_24px_-12px_rgba(19,20,27,0.4)] ${
                              icon === "ai" ? "rotate-6" : "-rotate-6"
                            }`}
                          >
                            <HeadlineGraphic name={icon} className="h-[0.62em] w-[0.62em]" />
                          </span>
                        </span>
                      </>
                    )}
                  </span>
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

          <div className="rise mt-9 hidden md:block" style={{ animationDelay: "0.75s" }}>
            <a href={hero.cta.href} className="btn btn-primary">
              {hero.cta.label}
              <Icon name="arrow-right" className="arrow h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* The lens: multiplied onto the wall so its white ground disappears */}
        <div className="relative lg:-me-10 xl:-me-20">
          <Image
            src={hero.visual.src}
            alt={hero.visual.alt}
            width={1600}
            height={1194}
            preload
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 100vw"
            className="hero-visual rise relative w-full rtl:-scale-x-100"
            style={{ animationDelay: "0.35s" }}
          />
          {GLASS.map((g) => (
            <span
              key={g.icon}
              aria-hidden
              className={`glass float absolute hidden h-14 w-14 place-items-center rounded-2xl text-signal shadow-[0_18px_40px_-22px_rgba(19,20,27,0.55)] sm:grid ${g.className}`}
              style={{ animationDelay: g.delay }}
            >
              <Icon name={g.icon} className="h-6 w-6" />
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: the call to action rides the bottom of the opening screen. */}
      <div className="container-x sticky bottom-4 z-20 pb-4 md:hidden">
        <div className="glass rounded-2xl p-2 shadow-[0_18px_40px_-22px_rgba(19,20,27,0.55)]">
          <a href={hero.cta.href} className="btn btn-primary w-full">
            {hero.cta.label}
            <Icon name="arrow-right" className="arrow h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
