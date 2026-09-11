"use client";

import Image from "next/image";
import { useState } from "react";
import { capabilities } from "@/lib/content";
import { Reveal, MaskLines } from "../ui/Reveal";

/**
 * Four capabilities as full-bleed editorial rows rather than a card grid.
 * Hovering a row opens it: the visual bleeds in behind, the number swells and
 * the underlying services surface. Only one is ever open, so the section reads
 * as an index rather than a wall.
 */
export function Capabilities() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="capabilities" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tag mb-6">03 / What Maqnah does</p>
            <MaskLines
              className="display t-h2 max-w-2xl"
              lines={["From raw data to", "real-world impact."]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="lede max-w-sm md:text-right">
              Four disciplines, one system. Most engagements start in one and
              end up touching all four.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-line">
        {capabilities.map((cap, i) => {
          const isOpen = open === i;
          return (
            <article
              key={cap.num}
              onMouseEnter={() => setOpen(i)}
              onFocusCapture={() => setOpen(i)}
              data-cursor="EXPLORE"
              className="group relative overflow-hidden border-b border-line"
            >
              {/* Visual bleeds in from the right while the row is open */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transition: "opacity .9s cubic-bezier(.16,1,.3,1)",
                }}
              >
                <Image
                  src={cap.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  style={{
                    transform: isOpen ? "scale(1)" : "scale(1.08)",
                    transition: "transform 1.4s cubic-bezier(.16,1,.3,1)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #07090c 0%, rgba(7,9,12,.97) 26%, rgba(7,9,12,.86) 48%, rgba(7,9,12,.52) 76%, rgba(7,9,12,.7) 100%)",
                  }}
                />
              </div>

              <div className="container-x relative">
                <div
                  className="grid items-start gap-x-10 gap-y-5 lg:grid-cols-[auto_1.1fr_1fr]"
                  style={{
                    paddingBlock: isOpen ? "clamp(2.5rem, 4vw, 4rem)" : "2rem",
                    transition: "padding .7s cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  {/* Number */}
                  <span
                    className="mono block text-[11px] transition-colors duration-500"
                    style={{ color: isOpen ? "#b8ff4a" : "#5d6672" }}
                  >
                    {cap.num}
                  </span>

                  {/* Title */}
                  <h3
                    className="display text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.0]"
                    style={{
                      color: isOpen ? "#f4f7f9" : "rgba(244,247,249,.62)",
                      transform: isOpen ? "translateX(6px)" : "none",
                      transition:
                        "color .6s, transform .7s cubic-bezier(.16,1,.3,1)",
                    }}
                  >
                    {cap.title}
                  </h3>

                  {/* Lede + services */}
                  <div>
                    <p className="max-w-md text-[15px] leading-relaxed text-muted">
                      {cap.lede}
                    </p>
                    <div
                      className="overflow-hidden"
                      style={{
                        maxHeight: isOpen ? 220 : 0,
                        opacity: isOpen ? 1 : 0,
                        transition:
                          "max-height .8s cubic-bezier(.16,1,.3,1), opacity .6s .1s",
                      }}
                    >
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {cap.items.map((item, k) => (
                          <li
                            key={item}
                            className="rounded-full border border-line-strong px-3 py-1.5 text-[12px] text-fg/85"
                            style={{
                              transform: isOpen ? "none" : "translateY(8px)",
                              opacity: isOpen ? 1 : 0,
                              transition: `all .6s ${0.12 + k * 0.045}s cubic-bezier(.16,1,.3,1)`,
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active rule */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal"
                style={{
                  transform: isOpen ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 1s cubic-bezier(.16,1,.3,1)",
                }}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
