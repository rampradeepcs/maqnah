"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { Logo } from "./ui/Logo";
import { Magnetic } from "./ui/Magnetic";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active-section indicator: the section occupying the upper third wins. */
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[120] transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(7,9,12,.72)" : "transparent",
          backdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,.08)" : "transparent"}`,
        }}
      >
        <div
          className="container-x flex items-center justify-between transition-all duration-500"
          style={{ height: scrolled ? 66 : 84 }}
        >
          <a
            href="#top"
            aria-label="Maqnah — home"
            data-cursor="TOP"
            className="shrink-0"
          >
            <Logo />
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative px-3.5 py-2 text-[13px] font-medium tracking-[-0.005em] transition-colors duration-300"
                  style={{ color: isActive ? "#f4f7f9" : "#97a1ae" }}
                >
                  <span className="relative z-10 group-hover:text-fg">
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-3 bottom-1 h-px origin-left bg-signal transition-transform duration-500"
                    style={{
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="inline-block">
              <a
                href="#contact"
                data-cursor="LET'S TALK →"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-line-strong px-4 py-2 text-[12px] font-semibold text-fg transition-colors duration-300 hover:border-signal sm:px-5 sm:py-2.5 sm:text-[13px]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 group-hover:scale-y-100"
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-void">
                  Let&rsquo;s talk
                </span>
                <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-signal transition-colors duration-300 group-hover:bg-void" />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line-strong lg:hidden"
            >
              <span
                className="block h-px w-4 bg-fg transition-transform duration-300"
                style={{ transform: open ? "translateY(3px) rotate(45deg)" : "" }}
              />
              <span
                className="block h-px w-4 bg-fg transition-transform duration-300"
                style={{
                  transform: open ? "translateY(-3px) rotate(-45deg)" : "",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet overlay */}
      <div
        className="fixed inset-0 z-[115] bg-void/97 backdrop-blur-xl lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .45s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div className="hairline-grid absolute inset-0 opacity-50" />
        <nav
          className="container-x relative flex h-full flex-col justify-center gap-1 pt-16"
          aria-label="Mobile"
        >
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display group flex items-baseline gap-4 border-b border-line py-4 text-[clamp(1.75rem,8vw,2.75rem)] text-fg"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(18px)",
                transition: `opacity .6s ${0.06 * i + 0.1}s cubic-bezier(.16,1,.3,1), transform .6s ${0.06 * i + 0.1}s cubic-bezier(.16,1,.3,1)`,
              }}
            >
              <span className="mono text-[10px] text-faint">
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-4 text-sm font-semibold text-void"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity .6s .55s cubic-bezier(.16,1,.3,1)",
            }}
          >
            Let&rsquo;s talk →
          </a>
        </nav>
      </div>
    </>
  );
}
