"use client";

import { consulting } from "@/lib/content";
import { useScrollProgress } from "../ui/scroll";

/**
 * The consulting argument, staged as a transformation: five business problems
 * on the left convert, one by one as the section scrolls, into the outcomes on
 * the right. The conversion is the point — so it happens in front of you.
 */
export function Consulting() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>("pin");
  const rows = consulting.problem.items.length;

  return (
    <section id="consulting" ref={ref} className="relative h-[300vh] border-t border-line">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2"
          style={{
            background: `radial-gradient(70% 60% at 80% 50%, rgba(184,255,74,${0.07 * progress}) 0%, transparent 72%)`,
          }}
        />

        <div className="container-x relative w-full">
          <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="tag mb-4">06 / AI consulting</p>
              <h2 className="display t-h2 leading-[0.98]">
                <span className="block text-fg">{consulting.heading[0]}</span>
                <span className="block text-signal">{consulting.heading[1]}</span>
              </h2>
            </div>
            <p className="lede max-w-sm md:text-right">{consulting.lede}</p>
          </div>

          {/* Column headers */}
          <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10">
            <p className="tag">{consulting.problem.label}</p>
            <span className="w-10" />
            <p
              className="tag text-right transition-colors duration-500"
              style={{ color: progress > 0.1 ? "#b8ff4a" : undefined }}
            >
              {consulting.outcome.label}
            </p>
          </div>

          <ul className="border-t border-line">
            {consulting.problem.items.map((problem, i) => {
              // Each row converts across its own slice of the scroll.
              const start = 0.12 + i * 0.14;
              const done = Math.min(1, Math.max(0, (progress - start) / 0.14));
              const outcome = consulting.outcome.items[i];
              return (
                <li
                  key={problem}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line py-3.5 md:gap-10 md:py-4"
                >
                  {/* Problem */}
                  <span className="relative inline-block justify-self-start">
                    <span
                      className="display text-[clamp(1rem,2.3vw,1.85rem)] transition-colors duration-500"
                      style={{
                        color: `rgba(244,247,249,${0.85 - done * 0.62})`,
                      }}
                    >
                      {problem}
                    </span>
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-px origin-left bg-muted/60"
                      style={{
                        width: "100%",
                        transform: `scaleX(${done})`,
                        transition: "transform .5s cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                  </span>

                  {/* Connector */}
                  <span className="relative flex h-px w-10 items-center md:w-16">
                    <span className="absolute inset-0 bg-line" />
                    <span
                      className="absolute inset-y-0 left-0 origin-left bg-signal"
                      style={{
                        width: "100%",
                        transform: `scaleX(${done})`,
                        transition: "transform .5s cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                    <span
                      className="absolute -right-1 text-[11px] text-signal transition-opacity duration-500"
                      style={{ opacity: done }}
                    >
                      ▸
                    </span>
                  </span>

                  {/* Outcome */}
                  <span
                    className="display justify-self-end text-right text-[clamp(1rem,2.3vw,1.85rem)]"
                    style={{
                      color: done > 0.5 ? "#b8ff4a" : "rgba(244,247,249,.16)",
                      transform: `translateX(${(1 - done) * 14}px)`,
                      textShadow:
                        done > 0.5 ? "0 0 30px rgba(184,255,74,.35)" : "none",
                      transition:
                        "color .5s, transform .6s cubic-bezier(.16,1,.3,1), text-shadow .5s",
                    }}
                  >
                    {outcome}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mono mt-6 text-[10px] text-faint">
            {Math.round(
              Math.min(1, Math.max(0, (progress - 0.12) / (rows * 0.14))) * 100,
            )}
            % converted
          </p>
        </div>
      </div>
    </section>
  );
}
