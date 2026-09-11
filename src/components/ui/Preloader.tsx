"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
import { REDUCED_MOTION, useMediaQuery } from "./useMediaQuery";

const BOOT = [
  "initialising intelligence core",
  "linking data streams",
  "calibrating signal",
  "system online",
];

/**
 * Boot sequence. Deliberately short — it exists to set the tone of a live
 * system, not to make anyone wait. Skipped entirely under reduced-motion.
 */
export function Preloader() {
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [line, setLine] = useState(0);
  const reduced = useMediaQuery(REDUCED_MOTION);

  useEffect(() => {
    if (reduced) return;
    document.documentElement.style.overflow = "hidden";

    const steps = BOOT.map((_, i) =>
      setTimeout(() => setLine(i), 220 + i * 300),
    );
    const out = setTimeout(() => setLeaving(true), 1550);
    const end = setTimeout(() => {
      setGone(true);
      document.documentElement.style.overflow = "";
    }, 2250);

    return () => {
      steps.forEach(clearTimeout);
      clearTimeout(out);
      clearTimeout(end);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  if (gone || reduced) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-void"
      style={{
        opacity: leaving ? 0 : 1,
        transition: "opacity .7s cubic-bezier(.16,1,.3,1)",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative flex flex-col items-center gap-7">
        <LogoMark className="h-9 w-auto text-signal" animate />
        <div className="h-px w-56 overflow-hidden bg-line">
          <div
            className="h-full bg-signal"
            style={{
              transformOrigin: "left",
              animation: "boot-bar 1.5s cubic-bezier(.5,0,.2,1) forwards",
            }}
          />
        </div>
        <p className="mono h-4 text-[10px] text-faint">{BOOT[line]}</p>
      </div>

      <p className="mono absolute bottom-8 text-[10px] text-faint/60">
        Maqnah Intelligence System
      </p>
    </div>
  );
}
