"use client";

import { useEffect, useState } from "react";
import { hero, stats } from "@/lib/content";
import { IntelligenceCore } from "../visuals/IntelligenceCore";
import { Counter } from "../ui/Counter";
import { Magnetic } from "../ui/Magnetic";

/** DATA → INSIGHT → DECISION → IMPACT, cycling as a live readout. */
function Pipeline() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % hero.pipeline.length),
      1250,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {hero.pipeline.map((stage, idx) => (
        <span key={stage} className="flex items-center gap-2">
          <span
            className="mono text-[10px] transition-all duration-500"
            style={{
              color: idx === i ? "#b8ff4a" : "#767f8c",
              textShadow: idx === i ? "0 0 18px rgba(184,255,74,.5)" : "none",
            }}
          >
            {stage}
          </span>
          {idx < hero.pipeline.length - 1 && (
            <span
              className="h-px w-4 transition-colors duration-500"
              style={{
                background: idx < i ? "#b8ff4a" : "rgba(255,255,255,.14)",
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

/** Labels that orbit the core, positioned as percentages of the hero box. */
const LABEL_POS = [
  { top: "18%", left: "6%" },
  { top: "30%", right: "9%" },
  { top: "52%", right: "4%" },
  { top: "70%", left: "12%" },
  { top: "13%", left: "46%" },
  { top: "77%", right: "22%" },
];

const FOCUS: [number, number] = [0.68, 0.44];

export function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 md:pt-28"
    >
      {/* Interactive core — full bleed, weighted toward the right on desktop */}
      <div className="pointer-events-none absolute inset-0">
        <IntelligenceCore
          className="absolute inset-0 h-full w-full"
          focus={FOCUS}
        />
      </div>

      {/* Ground shadow so type always sits on darkness */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 95% at 2% 58%, rgba(7,9,12,.97) 0%, rgba(7,9,12,.82) 30%, rgba(7,9,12,.28) 56%, rgba(7,9,12,0) 76%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "linear-gradient(to top, #07090c 4%, rgba(7,9,12,.75) 40%, transparent 100%)",
        }}
      />

      {/* Floating data labels */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {hero.floatingLabels.map((label, i) => (
          <span
            key={label}
            className="animate-drift absolute flex items-center gap-1.5"
            style={{
              ...LABEL_POS[i],
              animationDelay: `${i * 0.85}s`,
              animationDuration: `${6.5 + i * 0.7}s`,
              opacity: ready ? 1 : 0,
              transition: `opacity 1.2s ${0.9 + i * 0.12}s cubic-bezier(.16,1,.3,1)`,
            }}
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{
                background: i % 3 === 0 ? "#5ce1e6" : "#b8ff4a",
                boxShadow: `0 0 10px ${i % 3 === 0 ? "#5ce1e6" : "#b8ff4a"}`,
              }}
            />
            <span className="mono text-[9px] text-muted/70">{label}</span>
          </span>
        ))}
      </div>

      {/* ---- Headline block ---- */}
      <div className="container-x relative z-10 flex flex-1 items-center py-6 md:py-8">
        <div className="w-full">
          {/* Live system indicator */}
          <div
            className="mb-5 inline-flex flex-col gap-2 border-l border-signal/40 pl-4 md:mb-7"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(10px)",
              transition: "all .9s .25s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <span className="flex items-center gap-2">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_#b8ff4a]" />
              <span className="mono text-[10px] text-muted">
                {hero.systemLabel}
              </span>
              <span className="mono text-[10px] text-signal">/ Online</span>
            </span>
            <Pipeline />
          </div>

          <h1 className="display t-hero text-fg">
            {hero.headline.map((line, i) => (
              <span key={line} className="mask-line">
                <span
                  style={{
                    transform: ready ? "none" : "translateY(105%)",
                    transitionDelay: `${0.35 + i * 0.11}s`,
                  }}
                  className={i === 1 ? "text-signal-gradient" : undefined}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="lede mt-5 max-w-xl md:mt-7"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(14px)",
              transition: "all 1s .7s cubic-bezier(.16,1,.3,1)",
            }}
          >
            {hero.sub}
          </p>

          <div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(14px)",
              transition: "all 1s .85s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <Magnetic>
              <a
                href={hero.primaryCta.href}
                data-cursor="EXPLORE →"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-signal px-7 py-4 text-sm font-semibold text-void"
              >
                <span className="relative z-10">{hero.primaryCta.label}</span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-[#dfffa8] transition-transform duration-600 group-hover:scale-x-100"
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                />
              </a>
            </Magnetic>

            <a
              href={hero.secondaryCta.href}
              data-cursor="LET'S TALK →"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-line-strong px-7 py-4 text-sm font-medium text-fg transition-colors duration-300 hover:border-signal/60 hover:text-signal"
            >
              {hero.secondaryCta.label}
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ---- Stats strip ---- */}
      <div className="relative z-10 border-t border-line">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex items-baseline gap-3 border-line py-4 md:py-7 lg:border-r lg:last:border-r-0 [&:nth-child(odd)]:border-r [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
              style={{
                paddingLeft: i === 0 ? 0 : "1.25rem",
                opacity: ready ? 1 : 0,
                transition: `opacity 1s ${1 + i * 0.08}s cubic-bezier(.16,1,.3,1)`,
              }}
            >
              <Counter
                to={s.value}
                suffix={s.suffix}
                className="display text-[clamp(1.75rem,3.4vw,2.75rem)] text-fg"
              />
              <span className="mono text-[10px] text-faint">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
