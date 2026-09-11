"use client";

import { useState } from "react";
import { solutions } from "@/lib/content";
import { Reveal, MaskLines } from "../ui/Reveal";

/** Hand-placed so the graph reads as a constellation, not a grid. */
const POS: [number, number][] = [
  [0.46, 0.09], // AI Strategy
  [0.79, 0.22], // Generative AI
  [0.18, 0.25], // Predictive Analytics
  [0.08, 0.59], // Data Platforms
  [0.29, 0.85], // Business Intelligence
  [0.64, 0.5], // AI Agents
  [0.89, 0.67], // Intelligent Automation
  [0.38, 0.49], // Digital Products
  [0.67, 0.9], // Enterprise Modernization
];

export function Solutions() {
  const [hot, setHot] = useState<number | null>(null);

  const related = (i: number) =>
    hot === null
      ? true
      : hot === i || (solutions[hot].links as readonly number[]).includes(i);

  const edges = solutions.flatMap((s, i) =>
    (s.links as readonly number[])
      .filter((j) => j > i)
      .map((j) => ({ a: i, b: j })),
  );

  return (
    <section id="solutions" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tag mb-6">07 / Solutions</p>
            <MaskLines
              className="display t-h2 max-w-xl"
              lines={["Nothing here works", "on its own."]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="lede max-w-md md:text-right">
              Hover any capability to see what it depends on and what it
              unlocks. That web is the reason engagements compound.
            </p>
          </Reveal>
        </div>

        <Reveal threshold={0.08}>
          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-[560px] sm:aspect-square sm:max-w-[720px] lg:aspect-[16/10] lg:max-w-[1000px]"
            onMouseLeave={() => setHot(null)}
          >
            {/* Edges */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {edges.map(({ a, b }) => {
                const on = hot !== null && (hot === a || hot === b);
                const dim = hot !== null && !on;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={POS[a][0] * 100}
                    y1={POS[a][1] * 100}
                    x2={POS[b][0] * 100}
                    y2={POS[b][1] * 100}
                    stroke={on ? "#b8ff4a" : "#ffffff"}
                    strokeWidth={on ? 1.6 : 1}
                    vectorEffect="non-scaling-stroke"
                    opacity={dim ? 0.05 : on ? 0.9 : 0.2}
                    style={{ transition: "all .45s cubic-bezier(.16,1,.3,1)" }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {solutions.map((s, i) => {
              const on = related(i);
              const isHot = hot === i;
              return (
                <button
                  key={s.name}
                  type="button"
                  onMouseEnter={() => setHot(i)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
                  style={{
                    left: `${POS[i][0] * 100}%`,
                    top: `${POS[i][1] * 100}%`,
                    opacity: on ? 1 : 0.24,
                    transition: "opacity .45s cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: isHot ? 13 : 8,
                      height: isHot ? 13 : 8,
                      background: isHot
                        ? "#b8ff4a"
                        : on
                          ? "rgba(184,255,74,.7)"
                          : "rgba(255,255,255,.3)",
                      boxShadow: isHot
                        ? "0 0 22px 4px rgba(184,255,74,.6)"
                        : "none",
                      transition: "all .4s cubic-bezier(.34,1.56,.64,1)",
                    }}
                  />
                  <span className="flex flex-col items-center gap-0.5">
                    <span
                      className="display whitespace-nowrap text-[12px] leading-tight sm:text-[14px] md:text-[17px]"
                      style={{ color: isHot ? "#b8ff4a" : "#f4f7f9" }}
                    >
                      {s.name}
                    </span>
                    <span
                      className="mono text-[8px] sm:text-[9px]"
                      style={{
                        color: "#767f8c",
                        opacity: isHot ? 1 : 0.6,
                        transition: "opacity .4s",
                      }}
                    >
                      {s.group}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
