"use client";

import { useState } from "react";
import { light } from "@/lib/content-light";
import { MaskLines, Reveal } from "../ui/Reveal";

/** Bar heights as a share of the chart — a staircase, not data. */
const HEIGHTS = [0.18, 0.32, 0.46, 0.6, 0.78, 1];

/**
 * The six-stage engine drawn as an ascending staircase. Five bars sit in
 * light grey; the active one carries the grainy green gradient. Hovering a
 * bar swaps the large figure on the left — the composition of a forecast
 * chart, with no invented numbers in it.
 */
export function LightEngine() {
  const { engine } = light;
  const last = engine.steps.length - 1;
  const [active, setActive] = useState(last);
  const step = engine.steps[active];

  return (
    <section className="container-x border-t border-line py-24 md:py-36">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.55fr] lg:gap-24">
        <div>
          <Reveal>
            <span className="pill">{engine.label}</span>
          </Reveal>
          <MaskLines
            className="serif t-l-h2 mt-8 text-fg"
            lines={engine.heading}
          />
          <Reveal delay={0.15}>
            <p className="t-l-body mt-7 max-w-md text-muted">{engine.line}</p>
          </Reveal>

          <div key={active} className="animate-fade-swap mt-14 md:mt-20">
            <p className="serif t-l-num text-grad-ksa">
              {String(active + 1).padStart(2, "0")}
            </p>
            <p className="serif mt-6 text-[clamp(1.6rem,2.6vw,2.4rem)] text-fg">
              {step.key}
            </p>
            <p className="t-l-body mt-2 max-w-sm text-muted">{step.outcome}</p>
          </div>
        </div>

        <Reveal threshold={0.15} className="self-end">
          <div
            className="grid grid-cols-6 gap-2 md:gap-3"
            onMouseLeave={() => setActive(last)}
          >
            {engine.steps.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.key}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className="group flex flex-col justify-end text-left"
                >
                  <div className="mb-4 min-h-[3.5rem] md:min-h-[5.5rem]">
                    <p
                      className="serif hidden text-[clamp(1.1rem,2vw,1.9rem)] leading-tight transition-colors duration-400 sm:block"
                      style={{ color: on ? "var(--color-fg)" : "var(--color-faint)" }}
                    >
                      {s.key}
                    </p>
                    <p
                      className="mt-1.5 hidden text-[13px] leading-snug text-muted transition-opacity duration-400 lg:block"
                      style={{ opacity: on ? 1 : 0.55 }}
                    >
                      {s.outcome}
                    </p>
                  </div>
                  <div className="relative h-[280px] md:h-[400px] lg:h-[460px]">
                    <div
                      className={`absolute inset-x-0 bottom-0 ${on ? "grad-ksa noise" : "bg-surface2"}`}
                      style={{
                        height: `${HEIGHTS[i] * 100}%`,
                        transition:
                          "background .5s cubic-bezier(.16,1,.3,1), height .6s cubic-bezier(.16,1,.3,1)",
                      }}
                    >
                      <span
                        className="absolute bottom-3 left-2.5 text-[12px] md:left-4 md:bottom-4"
                        style={{ color: on ? "#ffffff" : "var(--color-muted)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
