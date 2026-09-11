"use client";

import { useRef } from "react";

/**
 * Pulls its child a few pixels toward the cursor while hovered.
 * Used only on primary actions — the gesture should feel rare.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className = "inline-block",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`will-change-transform ${className}`}
      style={{ transition: "transform .45s cubic-bezier(.16,1,.3,1)" }}
    >
      {children}
    </span>
  );
}
