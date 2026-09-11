"use client";

import { bigIdea } from "@/lib/content";
import { useScrollProgress } from "../ui/scroll";

/**
 * The statement that replaces a conventional "About us".
 * Words illuminate one at a time as the section is scrolled through, so the
 * sentence assembles itself in front of the reader.
 */
export function BigIdea() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>("pin");

  /* Flatten to [line][word] with a running index so lighting is monotonic. */
  let running = 0;
  const laid = bigIdea.lines.map((line) =>
    line.split(" ").map((w) => ({ w, i: running++ })),
  );
  const total = running;
  const highlight = bigIdea.highlight as readonly string[];

  // The sentence finishes lighting at 70% so the ladder has room to resolve.
  const lit = progress / 0.7;
  const ladderStep = Math.min(
    bigIdea.ladder.length - 1,
    Math.floor(Math.max(0, (progress - 0.28) / 0.18)),
  );

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(60% 50% at 50% 50%, rgba(184,255,74,${0.05 * Math.sin(progress * Math.PI)}) 0%, transparent 70%)`,
          }}
        />

        <div className="container-x grid w-full gap-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
          <div>
            <p className="tag mb-8">02 / The big idea</p>
            <p className="display text-[clamp(2.1rem,6.2vw,5.5rem)] leading-[1.02]">
              {laid.map((line, li) => (
                <span key={li} className="block">
                  {line.map(({ w, i }) => {
                    const on = lit > (i + 1) / total;
                    const strong = highlight.includes(w);
                    return (
                      <span
                        key={i}
                        className="inline-block"
                        style={{
                          color: on
                            ? strong
                              ? "#b8ff4a"
                              : "#f4f7f9"
                            : "rgba(244,247,249,.14)",
                          textShadow:
                            on && strong
                              ? "0 0 40px rgba(184,255,74,.4)"
                              : "none",
                          transition:
                            "color .5s cubic-bezier(.16,1,.3,1), text-shadow .5s",
                          marginRight: "0.24em",
                        }}
                      >
                        {w}
                      </span>
                    );
                  })}
                </span>
              ))}
            </p>
          </div>

          {/* The ladder — data climbing into growth */}
          <ol className="flex gap-6 lg:block lg:gap-0">
            {bigIdea.ladder.map((rung, i) => {
              const on = i <= ladderStep;
              return (
                <li key={rung} className="relative lg:pb-10 lg:last:pb-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500"
                      style={{
                        background: on ? "#b8ff4a" : "rgba(255,255,255,.18)",
                        boxShadow: on ? "0 0 14px #b8ff4a" : "none",
                      }}
                    />
                    <span
                      className="mono text-[11px] transition-colors duration-500"
                      style={{ color: on ? "#f4f7f9" : "#767f8c" }}
                    >
                      {rung}
                    </span>
                  </div>
                  {i < bigIdea.ladder.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[2.5px] top-4 hidden h-8 w-px origin-top transition-transform duration-700 lg:block"
                      style={{
                        background: "#b8ff4a",
                        transform: on ? "scaleY(1)" : "scaleY(0)",
                      }}
                    />
                  )}
                  {i < bigIdea.ladder.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[2.5px] top-4 hidden h-8 w-px bg-line lg:block"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
