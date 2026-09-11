"use client";

import { useEffect, useState } from "react";
import { useInView } from "./Reveal";
import { REDUCED_MOTION, useMediaQuery } from "./useMediaQuery";

/** Count-up that runs once, when the number scrolls into view. */
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
  const [value, setValue] = useState(0);
  const reduced = useMediaQuery(REDUCED_MOTION);

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

  return (
    <span ref={ref} className={className}>
      {reduced ? to : value}
      {suffix}
    </span>
  );
}
