"use client";

import { useEffect, useRef, useState } from "react";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./useMediaQuery";

/**
 * Custom cursor: a small signal dot that expands into a labelled ring over
 * interactive regions. Any element can set the label via `data-cursor="…"`.
 * Only mounts on precise pointers — touch devices keep their own affordances.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const fine = useMediaQuery(FINE_POINTER);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("has-custom-cursor");

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], a, button, input, textarea, select, [role='button']",
      ) as HTMLElement | null;

      if (!el) {
        setActive(false);
        setLabel(null);
        return;
      }
      setActive(true);
      setLabel(el.dataset.cursor ?? null);
    };

    const loop = () => {
      // The dot tracks exactly; the ring lags for weight.
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[190] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .25s" }}
    >
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-signal"
        style={{
          boxShadow: "0 0 12px 2px color-mix(in srgb, var(--color-signal) 60%, transparent)",
          opacity: active && label ? 0 : 1,
          transition: "opacity .2s",
        }}
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-signal/60 backdrop-blur-[2px]"
        style={{
          width: label ? "auto" : active ? 44 : 26,
          height: label ? 44 : active ? 44 : 26,
          paddingInline: label ? 18 : 0,
          background: label
            ? "color-mix(in srgb, var(--color-signal) 92%, transparent)"
            : active
              ? "color-mix(in srgb, var(--color-signal) 9%, transparent)"
              : "transparent",
          borderColor: label ? "transparent" : "color-mix(in srgb, var(--color-signal) 50%, transparent)",
          transition:
            "width .35s cubic-bezier(.16,1,.3,1), height .35s cubic-bezier(.16,1,.3,1), background .3s, padding .35s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {label && (
          <span className="mono whitespace-nowrap text-[10px] font-semibold text-void">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
