"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icons } from "./Icons";
import { categories, categoryCount } from "@/lib/catalog";

const links = [
  { label: "Products", href: "/products", dropdown: true },
  { label: "SpinLyfeX", href: "/spinlyfex" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const pathname = usePathname();

  /* The dropdown renders outside the glass pill (backdrop-filters don't nest),
     anchored to the Products trigger. A short close delay bridges the gap. */
  const prodRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [prodPos, setProdPos] = useState({ x: 0, y: 76 });

  const openProd = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const r = prodRef.current?.getBoundingClientRect();
    if (r) setProdPos({ x: r.left + r.width / 2, y: r.bottom });
    setProdOpen(true);
  };
  const scheduleCloseProd = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProdOpen(false), 140);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProdOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/products" ? pathname.startsWith("/products") : pathname === href;

  const linkBase = "text-muted hover:bg-surface2 hover:text-fg";
  const activeCls = "text-brand";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-all duration-500 ${scrolled ? "mt-3" : "mt-0"}`}>
        <div
          className={`container-x flex h-16 items-center justify-between rounded-full !max-w-6xl transition-all duration-500 ${
            scrolled ? "glass-strong shadow-card" : ""
          }`}
          style={scrolled ? { paddingInline: "1.25rem" } : undefined}
        >
          <Link href="/" className="text-fg" aria-label="Nachi Tekneka home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((item) =>
              item.dropdown ? (
                <div
                  key={item.href}
                  ref={prodRef}
                  className="relative"
                  onMouseEnter={openProd}
                  onMouseLeave={scheduleCloseProd}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href) ? activeCls : linkBase
                    }`}
                  >
                    {item.label}
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) ? activeCls : linkBase
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden h-10 items-center gap-1.5 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04] sm:inline-flex"
            >
              Get a quote
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Products dropdown — sibling of the glass pill so its backdrop blur
          samples the page content (backdrop-filters don't nest). */}
      <div
        className={`fixed w-[30rem] -translate-x-1/2 pt-3 transition-all duration-300 ${
          prodOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        style={{ left: prodPos.x, top: prodPos.y }}
        onMouseEnter={openProd}
        onMouseLeave={scheduleCloseProd}
      >
        <div className="glass-strong grid grid-cols-2 gap-1 rounded-2xl p-2 shadow-card">
          {categories.map((c) => {
            const Icon = Icons[c.icon];
            return (
              <Link
                key={c.id}
                href={`/products/${c.slug}`}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface2"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-fg">
                    {c.name}
                  </span>
                  <span className="block text-xs text-faint">
                    {categoryCount(c)} parts
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-0 z-40 origin-top bg-bg/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-x flex h-full flex-col justify-center gap-1 overflow-y-auto py-24">
          {[{ label: "Home", href: "/" }, ...links].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between border-b border-line py-4 text-3xl font-semibold text-fg transition-colors hover:text-brand"
              style={{
                transitionDelay: open ? `${i * 40}ms` : "0ms",
                transform: open ? "none" : "translateY(12px)",
                opacity: open ? 1 : 0,
              }}
            >
              <span className="font-display">{item.label}</span>
              <Icons.arrow className="h-6 w-6 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-14 flex-1 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white"
            >
              Get a quote
            </Link>
          </div>
          <p className="mt-8 text-center text-sm text-faint">
            Built by{" "}
            <a
              href="https://borncreative.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted hover:text-brand"
            >
              Born Creative
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
