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

  const shown = !hydrated || reduced ? to : value;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span aria-hidden>
        <span
          className="inline-block text-right"
          style={{ minWidth: `${String(to).length}ch` }}
        >
          {shown}
        </span>
        {suffix}
      </span>
    </span>
  );
}
