"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * Progress of an element through the viewport, 0 → 1.
 *
 * `mode: "pin"` measures a tall section that contains a sticky child: 0 when
 * its top reaches the top of the viewport, 1 when its bottom does.
 * `mode: "pass"` measures any element crossing the viewport: 0 as it enters
 * from below, 1 as it leaves above.
 */
export function useScrollProgress<T extends HTMLElement>(
  mode: "pin" | "pass" = "pin",
) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (mode === "pin") {
        const total = r.height - vh;
        setProgress(total > 0 ? clamp(-r.top / total) : r.top < 0 ? 1 : 0);
      } else {
        setProgress(clamp((vh - r.top) / (vh + r.height)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode]);

  return { ref, progress };
}
