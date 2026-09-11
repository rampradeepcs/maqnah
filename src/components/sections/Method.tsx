"use client";

import { method } from "@/lib/content";
import { useScrollProgress } from "../ui/scroll";
import { MaskLines, Reveal } from "../ui/Reveal";

/**
 * The Maqnah method as a continuously turning system. The ring rotates with
 * scroll, and whichever step reaches the top marker is the one described in
 * the centre — so the method literally cycles.
 */
export function Method() {
  const { ref, progress } = useScrollProgress<HTMLElement>("pin");
  const n = method.length;
  // The wheel turns backwards so the list reads forwards as you scroll.
  const turn = -progress * 360;
  const active = ((Math.round(progress * n) % n) + n) % n;

  return (
    <section ref={ref} className="relative h-[260vh] border-t border-line">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="tag mb-6">12 / The Maqnah method</p>
            <MaskLines
              className="display t-h2 max-w-lg"
              lines={["Six moves,", "one loop."]}
            />
            <Reveal delay={0.15}>
              <p className="lede mt-6 max-w-md">
                It does not end at launch. Optimise feeds discover, and the next
                cycle starts from a smarter place than the last one.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-3">
              {method.map((m, i) => {
                const on = i === active;
                return (
                  <li key={m.step} className="flex items-baseline gap-4">
                    <span
                      className="mono w-6 shrink-0 text-[10px] transition-colors duration-500"
                      style={{ color: on ? "#b8ff4a" : "#767f8c" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="display text-[clamp(1.1rem,1.9vw,1.5rem)] transition-colors duration-500"
                      style={{ color: on ? "#f4f7f9" : "rgba(244,247,249,.32)" }}
                    >
                      {m.step}
                    </span>
                    <span
                      className="text-[13px] text-muted transition-opacity duration-500"
                      style={{ opacity: on ? 1 : 0 }}
                    >
                      {m.desc}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ---- The wheel ---- */}
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            {/* Static rings */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,.07)" />
              <circle
                cx="100"
                cy="100"
                r="74"
                fill="none"
                stroke="rgba(184,255,74,.18)"
                strokeDasharray="2 6"
              />
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="rgba(184,255,74,.85)"
                strokeWidth="1.2"
                strokeDasharray={`${progress * 578} 578`}
                transform="rotate(-90 100 100)"
                style={{ filter: "drop-shadow(0 0 5px rgba(184,255,74,.45))" }}
              />
            </svg>

            {/* Steps, placed on the ring */}
            <div className="absolute inset-0">
              {method.map((m, i) => {
                const rad = ((i / n) * 360 + turn - 90) * (Math.PI / 180);
                const R = 0.385; // fraction of the box
                const on = i === active;
                return (
                  <span
                    key={m.step}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5"
                    style={{
                      left: `${50 + Math.cos(rad) * R * 100}%`,
                      top: `${50 + Math.sin(rad) * R * 100}%`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                      style={{
                        background: on ? "#b8ff4a" : "rgba(255,255,255,.28)",
                        boxShadow: on ? "0 0 14px 2px #b8ff4a" : "none",
                      }}
                    />
                    {/* The list already names every step, so on narrow
                        screens the ring keeps only its markers. */}
                    <span
                      className="mono hidden whitespace-nowrap text-[10px] transition-colors duration-500 sm:inline"
                      style={{ color: on ? "#f4f7f9" : "#767f8c" }}
                    >
                      {m.step}
                    </span>
                  </span>
                );
              })}
            </div>

            {/* Top marker — whatever sits here is the current move */}
            <span
              aria-hidden
              className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-signal"
              style={{ boxShadow: "0 0 8px rgba(184,255,74,.8)" }}
            />

            {/* Hub */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="mono mb-2 text-[9px] text-faint">
                Step {String(active + 1).padStart(2, "0")} / 06
              </p>
              <p className="display text-[clamp(1.6rem,3.4vw,2.4rem)] text-signal">
                {method[active].step}
              </p>
              <p className="mt-2 max-w-[180px] text-[13px] leading-snug text-muted">
                {method[active].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
