"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { industries } from "@/lib/content";
import { useScrollProgress } from "../ui/scroll";
import { MaskLines, Reveal } from "../ui/Reveal";

function Panel({ item, i }: { item: (typeof industries)[number]; i: number }) {
  return (
    <article
      className="relative flex min-h-[620px] w-[86vw] shrink-0 flex-col justify-end overflow-hidden border border-line sm:w-[62vw] md:h-full md:min-h-0 lg:w-[38vw] xl:w-[32vw]"
      data-cursor={item.name.toUpperCase()}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 62vw, 38vw"
        className="object-cover"
        loading={i < 2 ? "eager" : "lazy"}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #07090c 8%, rgba(7,9,12,.95) 42%, rgba(7,9,12,.55) 70%, rgba(7,9,12,.62) 100%)",
        }}
      />

      <span className="display pointer-events-none absolute right-4 top-2 text-[clamp(4rem,9vw,7rem)] leading-none text-fg/8">
        {item.num}
      </span>

      <div className="relative p-6 md:p-8">
        <p className="mono mb-3 text-[10px] text-signal">
          {item.num} / Industry
        </p>
        <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.02]">
          {item.name}
        </h3>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
          {item.lede}
        </p>

        <div className="mt-6 grid gap-5 border-t border-line pt-5 sm:grid-cols-2">
          <div>
            <p className="tag mb-2.5">AI use cases</p>
            <ul className="space-y-1.5">
              {item.useCases.map((u) => (
                <li key={u} className="flex items-start gap-2 text-[13px] text-fg/85">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="tag mb-2.5">Data opportunities</p>
            <ul className="space-y-1.5">
              {item.dataOps.map((d) => (
                <li key={d} className="text-[13px] text-muted">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-5 border-t border-line pt-4 text-[13px] text-signal">
          {item.outcome}
        </p>
      </div>
    </article>
  );
}

/**
 * Industries as a horizontal run. On desktop the run is driven by vertical
 * scroll through a pinned section; on touch it falls back to a native swipe,
 * which is what fingers expect.
 */
export function Industries() {
  const { ref, progress } = useScrollProgress<HTMLElement>("pin");
  const [pinned, setPinned] = useState(false);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const track = document.getElementById("industry-track");
    if (!track) return;
    const measure = () =>
      setShift(Math.max(0, track.scrollWidth - window.innerWidth + 96));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  return (
    <section
      id="industries"
      ref={ref}
      className="relative border-t border-line"
      style={pinned ? { height: `${industries.length * 62 + 100}vh` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-16"
            : "py-20 md:py-28"
        }
      >
        <div className="container-x mb-8 md:mb-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="tag mb-5">08 / Industries</p>
              <MaskLines
                className="display t-h3 max-w-2xl md:text-[clamp(1.8rem,3.4vw,3rem)]"
                lines={["Intelligence that understands", "your industry."]}
              />
            </div>
            <Reveal delay={0.12}>
              <p className="mono text-[10px] text-faint">
                {pinned ? "Scroll to advance" : "Swipe to explore"} ·{" "}
                {industries.length} sectors
              </p>
            </Reveal>
          </div>
        </div>

        <div
          className={
            pinned
              ? "w-full overflow-hidden"
              : "no-bar w-full overflow-x-auto overscroll-x-contain"
          }
        >
          <div
            id="industry-track"
            className="flex gap-4 px-5 md:h-[68vh] md:gap-5 md:px-10 lg:h-[66vh] xl:px-16"
            style={
              pinned
                ? {
                    transform: `translate3d(${-progress * shift}px,0,0)`,
                    willChange: "transform",
                  }
                : undefined
            }
          >
            {industries.map((item, i) => (
              <Panel key={item.num} item={item} i={i} />
            ))}
            <span className="w-1 shrink-0" aria-hidden />
          </div>
        </div>

        {/* Progress rail */}
        {pinned && (
          <div className="container-x mt-8">
            <div className="h-px w-full bg-line">
              <div
                className="h-px bg-signal"
                style={{
                  width: `${Math.max(4, progress * 100)}%`,
                  boxShadow: "0 0 8px rgba(184,255,74,.6)",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
