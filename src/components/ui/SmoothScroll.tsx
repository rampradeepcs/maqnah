"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling — the spine of the scroll-driven storytelling.
 * Disabled entirely under prefers-reduced-motion so native scrolling wins.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      // Let scrollable children (the form's textarea) scroll themselves.
      allowNestedScroll: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      // Leave modified clicks (new tab etc.) and handled events alone.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as
        | HTMLAnchorElement
        | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      // Lenis honours html's scroll-padding-top (--nav-offset), which clears
      // the fixed navigation bar, so no extra offset is needed here.
      const target = el as HTMLElement;
      lenis.scrollTo(target, { duration: 1.4 });
      history.replaceState(null, "", id);
      // Move keyboard focus with the scroll, as a native jump would, so the
      // skip link and in-page links work for keyboard and screen-reader users.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
