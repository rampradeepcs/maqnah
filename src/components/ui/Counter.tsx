"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useInView } from "./Reveal";
import { REDUCED_MOTION, useMediaQuery } from "./useMediaQuery";

const noop = () => () => {};

/**
 * Count-up that runs once, when the number scrolls into view.
 *
 * The server HTML (and anyone without JavaScript) carries the real figure;
 * only after hydration, with motion allowed, does it reset to zero and
 * count up. Screen readers always get the final value, and the digits sit
 * in a fixed-width box so the suffix doesn't jump while counting.
 */
export function Counter({
  to,
  suffix = "",
  duration = 1600,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({
    threshold: 0.25,
    rootMargin: "0px",
  });
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo — fast arrival, long settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  // Until the count-up can run, render the figure once as plain text.
  // dir="ltr" keeps "55%" in that order inside right-to-left text.
  if (!hydrated || reduced) {
    return (
      <span ref={ref} dir="ltr" className={`inline-block ${className}`}>
        {to}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} dir="ltr" className={`inline-block ${className}`}>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span aria-hidden>
        {/* An invisible copy of the final figure sizes the box, so the
            digits sit flush with their labels and the suffix never moves. */}
        <span className="inline-grid text-right">
          <span className="invisible [grid-area:1/1]">{to}</span>
          <span className="[grid-area:1/1]">{value}</span>
        </span>
        {suffix}
      </span>
    </span>
  );
}
