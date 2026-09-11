"use client";

import { useState } from "react";
import { insights } from "@/lib/content";
import { MaskLines, Reveal } from "../ui/Reveal";

/**
 * Perspectives, set as an editorial index. Purely typographic — the argument
 * is the artwork here, and a row of stock thumbnails would only weaken it.
 */
export function Insights() {
  const [hot, setHot] = useState<number | null>(null);

  return (
    <section id="insights" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tag mb-6">13 / Insights</p>
            <MaskLines
              className="display t-h2 max-w-2xl"
              lines={["Thinking beyond", "today's technology."]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="mono text-[10px] text-faint">
              {insights.length} perspectives
            </p>
          </Reveal>
        </div>

        <ul className="border-t border-line" onMouseLeave={() => setHot(null)}>
          {insights.map((post, i) => {
            const on = hot === i;
            const dim = hot !== null && !on;
            return (
              <Reveal
                as="li"
                key={post.title}
                delay={i * 0.04}
                className="border-b border-line"
              >
                <div
                  onMouseEnter={() => setHot(i)}
                  className="group grid items-baseline gap-x-8 gap-y-2 py-7 md:grid-cols-[130px_1fr_auto] md:py-9"
                  style={{
                    opacity: dim ? 0.42 : 1,
                    transition: "opacity .45s cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <p
                    className="mono text-[10px] transition-colors duration-400"
                    style={{ color: on ? "#b8ff4a" : "#5d6672" }}
                  >
                    {post.topic}
                  </p>

                  <div>
                    <h3
                      className="display text-[clamp(1.3rem,3vw,2.4rem)] leading-[1.08]"
                      style={{
                        transform: on ? "translateX(8px)" : "none",
                        transition: "transform .6s cubic-bezier(.16,1,.3,1)",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="max-w-xl overflow-hidden text-[14px] leading-relaxed text-muted"
                      style={{
                        maxHeight: on ? 70 : 0,
                        opacity: on ? 1 : 0,
                        marginTop: on ? 10 : 0,
                        transition:
                          "max-height .6s cubic-bezier(.16,1,.3,1), opacity .4s, margin .6s",
                      }}
                    >
                      {post.lede}
                    </p>
                  </div>

                  <span
                    className="mono hidden text-[10px] text-faint md:block"
                    style={{
                      color: on ? "#b8ff4a" : undefined,
                      transition: "color .4s",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
