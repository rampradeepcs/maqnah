"use client";

import { useEffect, useState } from "react";
import { Logo } from "../ui/Logo";
import { light } from "@/lib/content-light";

/**
 * The hero carries the real navigation. This slim bar only appears once
 * the hero has scrolled away, so there is always a way back to "Talk to us".
 */
export function LightNav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100]"
      style={{
        transform: shown ? "none" : "translateY(-120%)",
        opacity: shown ? 1 : 0,
        transition:
          "transform .6s cubic-bezier(.16,1,.3,1), opacity .4s cubic-bezier(.16,1,.3,1)",
      }}
      aria-hidden={!shown}
    >
      <div className="container-x">
        <div className="glass mt-4 flex items-center justify-between rounded-full py-2.5 pl-5 pr-2.5">
          <a href="#top" aria-label="Back to top">
            <Logo />
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {light.hero.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[14px] text-muted transition-colors duration-300 hover:text-fg"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            data-cursor="LET'S TALK →"
            className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-signal-dim"
          >
            Talk to us <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
