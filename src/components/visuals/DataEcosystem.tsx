"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { dataFlow } from "@/lib/content";

const SIGNAL = "184,255,74";
const CYAN = "92,225,230";

type Port = { x: number; y: number; label: string; side: "in" | "out" };
type Layout = {
  ports: Port[];
  cx: number;
  cy: number;
  coreR: number;
  stacked: boolean;
};

/** Where every port sits, for a given box size. */
function computeLayout(w: number, h: number): Layout {
  const stacked = w < 820;
  const ins = dataFlow.inputs;
  const outs = dataFlow.outputs;

  if (stacked) {
    // Inputs across the top, outputs across the bottom.
    const topY = h * 0.11;
    const botY = h * 0.89;
    const cols = 3;
    const rows = Math.ceil(ins.length / cols);
    const ports: Port[] = ins.map((label, i) => ({
      label,
      side: "in",
      x: ((i % cols) + 0.5) * (w / cols),
      y: topY + Math.floor(i / cols) * (h * 0.075) - (rows - 1) * (h * 0.0375),
    }));
    outs.forEach((label, i) =>
      ports.push({
        label,
        side: "out",
        x: ((i % 2) + 0.5) * (w / 2),
        y: botY + Math.floor(i / 2) * (h * 0.075) - h * 0.0375,
      }),
    );
    return {
      ports,
      cx: w * 0.5,
      cy: h * 0.5,
      coreR: Math.min(w, h) * 0.1,
      stacked,
    };
  }

  const ports: Port[] = ins.map((label, i) => ({
    label,
    side: "in",
    x: w * 0.135,
    y: h * 0.1 + (i / (ins.length - 1)) * h * 0.8,
  }));
  outs.forEach((label, i) =>
    ports.push({
      label,
      side: "out",
      x: w * 0.875,
      y: h * 0.22 + (i / (outs.length - 1)) * h * 0.56,
    }),
  );
  return {
    ports,
    cx: w * 0.5,
    cy: h * 0.5,
    coreR: Math.min(w, h) * 0.085,
    stacked,
  };
}

/**
 * The enterprise data ecosystem: nine source systems converging on one
 * intelligence core, which emits four things a business can act on.
 *
 * Curves and packets are drawn on canvas; the labels are real DOM so they stay
 * crisp, selectable and readable by assistive technology.
 */
export function DataEcosystem({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const layoutRef = useRef<Layout | null>(null);

  const setBoth = useCallback((l: Layout) => {
    layoutRef.current = l;
    setLayout(l);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let running = true;
    let flash = 0;

    // Each packet is a position along one curve.
    const packets: { port: number; t: number; speed: number; cyan: boolean }[] =
      [];

    const resize = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const l = computeLayout(w, h);
      setBoth(l);

      packets.length = 0;
      l.ports.forEach((p, i) => {
        const n = p.side === "in" ? 3 : 4;
        for (let k = 0; k < n; k++) {
          packets.push({
            port: i,
            t: k / n + Math.random() * 0.12,
            speed: 0.0022 + Math.random() * 0.0026,
            cyan: p.side === "out" ? k % 2 === 0 : Math.random() < 0.16,
          });
        }
      });
    };

    /** Cubic bezier from a port to the core (or the reverse for outputs). */
    const curve = (p: Port, l: Layout) => {
      const from = p.side === "in" ? { x: p.x, y: p.y } : { x: l.cx, y: l.cy };
      const to = p.side === "in" ? { x: l.cx, y: l.cy } : { x: p.x, y: p.y };
      const dx = (to.x - from.x) * (l.stacked ? 0.12 : 0.55);
      const dy = (to.y - from.y) * (l.stacked ? 0.5 : 0.1);
      return {
        from,
        to,
        c1: { x: from.x + dx, y: from.y + (l.stacked ? dy : 0) },
        c2: { x: to.x - dx, y: to.y - (l.stacked ? dy : 0) },
      };
    };

    const at = (c: ReturnType<typeof curve>, s: number) => {
      const u = 1 - s;
      const x =
        u * u * u * c.from.x +
        3 * u * u * s * c.c1.x +
        3 * u * s * s * c.c2.x +
        s * s * s * c.to.x;
      const y =
        u * u * u * c.from.y +
        3 * u * u * s * c.c1.y +
        3 * u * s * s * c.c2.y +
        s * s * s * c.to.y;
      return { x, y };
    };

    const draw = () => {
      t += 16;
      const l = layoutRef.current;
      if (!l) return;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const curves = l.ports.map((p) => curve(p, l));

      // Static paths
      l.ports.forEach((p, i) => {
        const c = curves[i];
        ctx.beginPath();
        ctx.moveTo(c.from.x, c.from.y);
        ctx.bezierCurveTo(c.c1.x, c.c1.y, c.c2.x, c.c2.y, c.to.x, c.to.y);
        ctx.strokeStyle =
          p.side === "in"
            ? "rgba(255,255,255,.075)"
            : `rgba(${SIGNAL},.14)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Packets
      for (const pk of packets) {
        pk.t += pk.speed;
        if (pk.t > 1) {
          pk.t -= 1;
          if (l.ports[pk.port].side === "in") flash = 1;
        }
        const c = curves[pk.port];
        const pos = at(c, pk.t);
        const tail = at(c, Math.max(0, pk.t - 0.055));
        const colour = pk.cyan ? CYAN : SIGNAL;

        // Fade in and out at the ends of the run.
        const edge = Math.min(1, pk.t * 8, (1 - pk.t) * 6);

        const g = ctx.createLinearGradient(tail.x, tail.y, pos.x, pos.y);
        g.addColorStop(0, `rgba(${colour},0)`);
        g.addColorStop(1, `rgba(${colour},${0.65 * edge})`);
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colour},${0.95 * edge})`;
        ctx.fill();
      }

      // Core
      flash *= 0.94;
      const pulse = 1 + Math.sin(t * 0.0018) * 0.05 + flash * 0.1;
      const r = l.coreR * pulse;

      const halo = ctx.createRadialGradient(l.cx, l.cy, 0, l.cx, l.cy, r * 5);
      halo.addColorStop(0, `rgba(${SIGNAL},${0.17 + flash * 0.1})`);
      halo.addColorStop(0.45, `rgba(${SIGNAL},.045)`);
      halo.addColorStop(1, "rgba(184,255,74,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(l.cx, l.cy, r * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(l.cx, l.cy);
      ctx.rotate(t * 0.00016);
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(7,9,12,.85)";
      ctx.globalCompositeOperation = "source-over";
      ctx.fill();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `rgba(${SIGNAL},${0.75 + flash * 0.25})`;
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.restore();

      ctx.globalCompositeOperation = "source-over";
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      for (let i = 0; i < 40; i++) draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(
      ([e]) => {
        const was = running;
        running = e.isIntersecting;
        if (running && !was && !reduced) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [setBoth]);

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <canvas ref={canvas} className="block h-full w-full" aria-hidden />

      {layout && (
        <div className="absolute inset-0">
          {layout.ports.map((p) => (
            <span
              key={p.label}
              className="absolute flex items-center gap-1.5 whitespace-nowrap"
              style={{
                left: p.x,
                top: p.y,
                transform: layout.stacked
                  ? "translate(-50%, -50%)"
                  : p.side === "in"
                    ? "translate(-100%, -50%)"
                    : "translate(0, -50%)",
                paddingRight: !layout.stacked && p.side === "in" ? 14 : 0,
                paddingLeft: !layout.stacked && p.side === "out" ? 14 : 0,
              }}
            >
              {p.side === "out" && !layout.stacked && (
                <span className="h-1 w-1 rounded-full bg-signal shadow-[0_0_8px_#b8ff4a]" />
              )}
              <span
                className="mono text-[10px]"
                style={{ color: p.side === "in" ? "#97a1ae" : "#b8ff4a" }}
              >
                {p.label}
              </span>
              {p.side === "in" && !layout.stacked && (
                <span className="h-1 w-1 rounded-full bg-muted/50" />
              )}
            </span>
          ))}

          {/* Core label */}
          <span
            className="absolute flex flex-col items-center gap-1"
            style={{
              left: layout.cx,
              top: layout.cy,
              transform: `translate(-50%, ${Math.round(layout.coreR + 26)}px)`,
            }}
          >
            <span className="mono text-[10px] tracking-[0.28em] text-fg">
              {dataFlow.core}
            </span>
            <span className="mono flex items-center gap-1.5 text-[9px] text-signal">
              <span className="animate-pulse-dot h-1 w-1 rounded-full bg-signal" />
              Processing
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
