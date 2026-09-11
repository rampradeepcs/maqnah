"use client";

import { useState } from "react";
import { engine } from "@/lib/content";
import { Reveal, MaskLines } from "../ui/Reveal";

/**
 * The methodology as a horizontal instrument: six stages on a live rail,
 * with a data stream running through it. Selecting a stage opens its detail
 * below — description, what it looks like in practice, and what it buys.
 */
export function Engine() {
  const [active, setActive] = useState(0);
  const step = engine.steps[active];
  const pct = (active / (engine.steps.length - 1)) * 100;

  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-50" />

      <div className="container-x relative">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tag mb-6">04 / Intelligence engine</p>
            <MaskLines className="display t-h2" lines={[engine.heading]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede max-w-md md:text-right">{engine.lede}</p>
          </Reveal>
        </div>

        {/* ---- Rail ---- */}
        <Reveal className="relative">
          {/* Track */}
          <div className="absolute inset-x-0 top-[11px] hidden h-px bg-line md:block" />
          <svg
            className="absolute inset-x-0 top-[11px] hidden h-px w-full overflow-visible md:block"
            aria-hidden
          >
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="#b8ff4a"
              strokeWidth="1"
              strokeDasharray="3 9"
              className="animate-dash-flow"
              opacity="0.45"
            />
          </svg>
          {/* Filled portion */}
          <div
            className="absolute left-0 top-[11px] hidden h-px bg-signal md:block"
            style={{
              width: `${pct}%`,
              transition: "width .7s cubic-bezier(.16,1,.3,1)",
              boxShadow: "0 0 10px rgba(184,255,74,.7)",
            }}
          />

          <ol className="relative grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:flex md:justify-between">
            {engine.steps.map((s, i) => {
              const on = i === active;
              const passed = i <= active;
              return (
                <li key={s.key} className="md:flex-1">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={on}
                    className="group flex w-full flex-col items-start gap-3 text-left md:items-center md:text-center"
                  >
                    <span
                      className="relative block h-[7px] w-[7px] rounded-full transition-all duration-500"
                      style={{
                        marginTop: 8,
                        background: passed ? "#b8ff4a" : "rgba(255,255,255,.2)",
                        boxShadow: on ? "0 0 16px 2px #b8ff4a" : "none",
                        transform: on ? "scale(1.5)" : "scale(1)",
                      }}
                    />
                    <span className="flex flex-col gap-1 md:items-center">
                      <span
                        className="mono text-[10px] transition-colors duration-400"
                        style={{ color: on ? "#b8ff4a" : "#5d6672" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="display text-[15px] tracking-[-0.01em] transition-colors duration-400 md:text-[17px]"
                        style={{ color: on ? "#f4f7f9" : "#97a1ae" }}
                      >
                        {s.key}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* ---- Detail ---- */}
        <div className="panel mt-12 overflow-hidden md:mt-16">
          <div
            key={active}
            className="grid gap-8 p-7 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:p-12"
            style={{ animation: "fade-swap .6s cubic-bezier(.16,1,.3,1)" }}
          >
            <div>
              <p className="tag mb-4">Stage {String(active + 1).padStart(2, "0")}</p>
              <p className="display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.12] text-fg">
                {step.desc}
              </p>
            </div>
            <div>
              <p className="tag mb-3">In practice</p>
              <p className="text-[15px] leading-relaxed text-muted">
                {step.example}
              </p>
            </div>
            <div>
              <p className="tag mb-3">What it buys</p>
              <p className="text-[15px] leading-relaxed text-signal">
                {step.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes fade-swap{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
