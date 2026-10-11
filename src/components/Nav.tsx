"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { Logo } from "./ui/Logo";
import { Icon } from "./ui/Icon";

/**
 * Simple navigation: the lock-up on the left, every section in one pill
 * group, and a single dark call to action. The bar frosts once the page
 * scrolls so it stays legible over any section.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu closes on Escape, and when the viewport outgrows it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] pt-3">
      <div className="container-x">
        <div
          className={`flex h-16 items-center gap-4 rounded-2xl border pl-4 pr-2.5 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-5 ${
            solid
              ? "border-line bg-white/85 shadow-[0_14px_40px_-26px_rgba(16,21,18,0.45)] backdrop-blur-xl"
              : "border-white/60 bg-white/50 backdrop-blur-md"
          }`}
        >
          <a href="#top" aria-label="Maqnah, back to top" className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="Main" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-line bg-void/80 p-1">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block rounded-full px-4 py-2 text-[14.5px] text-muted transition-colors duration-300 hover:bg-white hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
            <span
              lang="ar"
              dir="rtl"
              className="hidden rounded-lg border border-line px-2.5 py-1 text-[13px] text-muted sm:inline-block"
            >
              {nav.language}
            </span>
            <a
              href={nav.cta.href}
              data-cursor="LET'S TALK"
              className="btn btn-dark hidden px-5 py-2.5 text-[14px] sm:inline-flex"
            >
              {nav.cta.label}
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-xl text-fg transition-colors hover:bg-void lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="mt-2 rounded-2xl border border-line bg-white/95 p-2 shadow-[0_24px_60px_-30px_rgba(16,21,18,0.5)] backdrop-blur-xl lg:hidden"
        >
          <ul>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block rounded-xl px-4 py-3 text-[1.35rem] text-fg transition-colors hover:bg-void"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-1 flex items-center justify-between gap-3 border-t border-line px-2 pb-1 pt-3">
            <span
              lang="ar"
              dir="rtl"
              className="rounded-lg border border-line px-2.5 py-1 text-[13px] text-muted"
            >
              {nav.language}
            </span>
            <a
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="btn btn-dark px-5 py-2.5 text-[14px]"
            >
              {nav.cta.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
