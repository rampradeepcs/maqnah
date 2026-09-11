"use client";

import { useState } from "react";
import { principles } from "@/lib/content";
import { Reveal, MaskLines } from "../ui/Reveal";

/**
 * Four operating principles. Hovering one pushes it forward and dims the
 * others — the section behaves like a single argument with a focus, rather
 * than four equal cards.
 */
export function WhyMaqnah() {
  const [hot, setHot] = useState<number | null>(null);

  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 md:mb-20">
          <p className="tag mb-6">11 / Why Maqnah</p>
          <MaskLines
            className="display t-h2 max-w-3xl"
            lines={["Why organizations", "choose Maqnah."]}
          />
        </div>

        <div
          className="grid gap-px bg-line md:grid-cols-2"
          onMouseLeave={() => setHot(null)}
        >
          {principles.map((p, i) => {
            const dim = hot !== null && hot !== i;
            return (
              <Reveal
                as="article"
                key={p.num}
                delay={i * 0.07}
                className="relative bg-void p-7 transition-opacity duration-500 md:p-12"
              >
                <div
                  onMouseEnter={() => setHot(i)}
                  style={{
                    opacity: dim ? 0.38 : 1,
                    transition: "opacity .5s cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span
                      className="display text-[clamp(2.5rem,5vw,4rem)] leading-none transition-colors duration-500"
                      style={{
                        color: hot === i ? "#b8ff4a" : "rgba(244,247,249,.12)",
                      }}
                    >
                      {p.num}
                    </span>
                    <span
                      aria-hidden
                      className="mt-3 h-px flex-1 origin-right bg-line"
                      style={{
                        transform: hot === i ? "scaleX(1)" : "scaleX(.35)",
                        background: hot === i ? "#b8ff4a" : undefined,
                        transition: "all .7s cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                  </div>

                  <h3 className="display mt-6 text-[clamp(1.4rem,2.6vw,2.1rem)] leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg/80">
                    {p.desc}
                  </p>
                  <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted">
                    {p.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
