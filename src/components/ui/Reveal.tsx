"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adds `.in` to the element once it enters the viewport (one-way).
 * Everything in the design system keys its entrance off that class, so a
 * single observer drives masks, staggers and rule-draws alike.
 */
export function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const once = options?.once ?? true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds of delay before the entrance runs. */
  delay?: number;
  as?: React.ElementType;
  threshold?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  threshold,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold });
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Line-by-line mask reveal for display typography. Each line clips a child
 * that slides up from below — the standard editorial headline entrance.
 */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  step = 0.09,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  step?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div ref={ref} className={`${inView ? "in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className={`mask-line ${lineClassName}`}>
          <span style={{ transitionDelay: `${delay + i * step}s` }}>{line}</span>
        </span>
      ))}
    </div>
  );
}
