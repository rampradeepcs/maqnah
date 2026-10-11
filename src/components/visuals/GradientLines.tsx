"use client";

import { useId } from "react";
import { useInView } from "../ui/Reveal";

const LINES = 9;
const GAP = 12;

/**
 * A bundle of stepped traces — horizontal, a 45° climb, horizontal again —
 * stroked in a mint-to-green gradient that fades out at the far end. They
 * draw themselves in once, when the bundle scrolls into view.
 */
export function GradientLines({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  // useId output can hold characters that break url(#…) references.
  const id = `gl${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div ref={ref} aria-hidden className={className}>
      <svg
        viewBox="0 0 900 360"
        fill="none"
        className={`draw h-auto w-full ${inView ? "in" : ""}`}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a6d6b8" stopOpacity="0.2" />
            <stop offset="28%" stopColor="#2f9f5f" stopOpacity="0.9" />
            <stop offset="62%" stopColor="#006c35" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#006c35" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: LINES }, (_, i) => {
          const y1 = 300 - i * GAP;
          const x1 = 150 + i * 5;
          const rise = 170;
          return (
            <path
              key={i}
              d={`M0 ${y1} H${x1} L${x1 + rise} ${y1 - rise} H900`}
              pathLength={1}
              stroke={`url(#${id})`}
              strokeWidth={1.5}
              style={{ transitionDelay: `${i * 0.07}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
}
