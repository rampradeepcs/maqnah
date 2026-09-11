"use client";

import { useEffect, useRef } from "react";

type Particle = {
  a: number; // angle around the core
  r: number; // distance from the core
  va: number; // angular velocity
  vr: number; // inward velocity
  size: number;
  hue: 0 | 1; // 0 = signal lime, 1 = cyan
  bright: number;
  px: number; // previous position, for streaks
  py: number;
};

const SIGNAL = "184,255,74";
/** Slight vertical squash gives the stream a sense of plane and perspective. */
const SQUASH = 0.74;
const CYAN = "92,225,230";

/**
 * The Intelligence Core — thousands of data particles spiralling into a
 * central node, drawn on a single 2D canvas.
 *
 * The cursor bends trajectories rather than simply repelling them: near the
 * pointer, particles gain angular velocity and lose inward velocity, so the
 * stream visibly swirls around wherever attention is. The core answers by
 * tilting toward the pointer and brightening.
 */
export function IntelligenceCore({
  className = "",
  density = 1,
  calm = false,
  focus = [0.5, 0.5],
}: {
  className?: string;
  /** Multiplier on particle count; scaled down again on small screens. */
  density?: number;
  /** Slower, wider, less contrasty — for the closing CTA. */
  calm?: boolean;
  /** Where the core sits, as a fraction of the box. */
  focus?: [number, number];
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let coreR = 0;
    let outerR = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let t = 0;
    let running = true;

    // Pointer, in canvas space. `strength` fades the influence in and out.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };

    const spawn = (p?: Particle): Particle => {
      const a = Math.random() * Math.PI * 2;
      const r = outerR * (0.55 + Math.random() * 0.75);
      const n: Particle = {
        a,
        r,
        va: (0.0011 + Math.random() * 0.0032) * (Math.random() < 0.5 ? 1 : -1),
        vr: (1.1 + Math.random() * 2.6) * (calm ? 0.5 : 1),
        size: 0.5 + Math.random() * 1.15,
        hue: Math.random() < 0.14 ? 1 : 0,
        bright: 0.25 + Math.random() * 0.75,
        px: 0,
        py: 0,
      };
      if (p) Object.assign(p, n);
      const target = p ?? n;
      target.px = cx + Math.cos(target.a) * target.r;
      target.py = cy + Math.sin(target.a) * target.r * SQUASH;
      return target;
    };

    const resize = () => {
      const rect = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = w * focus[0];
      cy = h * focus[1];
      const base = Math.min(w, h);
      coreR = base * (calm ? 0.1 : 0.125);
      outerR = Math.hypot(w, h) * 0.62;

      // Particle budget scales with area, capped for low-power devices.
      const area = w * h;
      const count = Math.round(
        Math.min(1100, Math.max(140, (area / 1700) * density)),
      );
      particles = Array.from({ length: count }, () => spawn());
      pointer.x = pointer.tx = cx;
      pointer.y = pointer.ty = cy;
    };

    const drawCore = () => {
      // Tilt the core a few pixels toward the pointer.
      const ox = (pointer.x - cx) * 0.035 * pointer.strength;
      const oy = (pointer.y - cy) * 0.035 * pointer.strength;
      const pulse = 1 + Math.sin(t * 0.0016) * 0.045;
      const rr = coreR * pulse;

      const hot = 0.82 + pointer.strength * 0.18;

      ctx.save();
      ctx.translate(cx + ox, cy + oy);

      // --- Bloom: three stacked falloffs read as real light, not a disc ---
      for (const [radius, alpha] of [
        [rr * 7.5, calm ? 0.05 : 0.075],
        [rr * 3.2, calm ? 0.09 : 0.14],
        [rr * 1.35, calm ? 0.16 : 0.26],
      ] as const) {
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        g.addColorStop(0, `rgba(${SIGNAL},${alpha * hot})`);
        g.addColorStop(0.5, `rgba(${SIGNAL},${alpha * 0.28 * hot})`);
        g.addColorStop(1, "rgba(184,255,74,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Aperture: segmented arcs, counter-rotating --------------------
      const arcs = [
        { k: 1.0, speed: 0.00026, seg: 7, gap: 0.36, w: 1.4, a: 0.85 },
        { k: 1.42, speed: -0.00017, seg: 4, gap: 0.72, w: 1, a: 0.42 },
        { k: 1.92, speed: 0.0001, seg: 13, gap: 0.42, w: 0.75, a: 0.2 },
      ];
      for (const ring of arcs) {
        ctx.save();
        ctx.rotate(t * ring.speed);
        ctx.lineWidth = ring.w;
        ctx.strokeStyle = `rgba(${SIGNAL},${ring.a * hot})`;
        const span = (Math.PI * 2) / ring.seg;
        for (let i = 0; i < ring.seg; i++) {
          ctx.beginPath();
          ctx.ellipse(
            0,
            0,
            rr * ring.k,
            rr * ring.k * (0.9 + SQUASH * 0.1),
            0,
            i * span,
            i * span + span * (1 - ring.gap),
          );
          ctx.stroke();
        }
        ctx.restore();
      }

      // --- Tick ring: the technical detail that sells "instrument" -------
      ctx.save();
      ctx.rotate(-t * 0.00008);
      for (let i = 0; i < 60; i++) {
        const ang = (i / 60) * Math.PI * 2;
        const long = i % 5 === 0;
        const r0 = rr * 2.5;
        const r1 = rr * (long ? 2.72 : 2.62);
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * r0, Math.sin(ang) * r0);
        ctx.lineTo(Math.cos(ang) * r1, Math.sin(ang) * r1);
        ctx.strokeStyle = `rgba(${SIGNAL},${long ? 0.24 : 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // --- Core body: a hard-edged faceted solid ------------------------
      const spin = t * 0.00019;
      ctx.save();
      ctx.rotate(spin);
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const ang = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(ang) * rr * 0.56;
        const y = Math.sin(ang) * rr * 0.56;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${SIGNAL},${0.1 * hot})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${SIGNAL},${0.9 * hot})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Internal facets
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(ang) * rr * 0.56, Math.sin(ang) * rr * 0.56);
        ctx.strokeStyle = `rgba(${SIGNAL},${0.22 * hot})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      ctx.restore();

      // --- Hot centre ---------------------------------------------------
      const centre = ctx.createRadialGradient(0, 0, 0, 0, 0, rr * 0.34);
      centre.addColorStop(0, `rgba(245,255,225,${hot})`);
      centre.addColorStop(0.35, `rgba(${SIGNAL},${0.75 * hot})`);
      centre.addColorStop(1, "rgba(184,255,74,0)");
      ctx.fillStyle = centre;
      ctx.beginPath();
      ctx.arc(0, 0, rr * 0.34, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const step = () => {
      t += 16;

      // Ease the pointer and its influence.
      pointer.x += (pointer.tx - pointer.x) * 0.09;
      pointer.y += (pointer.ty - pointer.y) * 0.09;
      pointer.strength += (pointer.target - pointer.strength) * 0.05;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const influence = Math.min(w, h) * 0.42;

      for (const p of particles) {
        const x = cx + Math.cos(p.a) * p.r;
        const y = cy + Math.sin(p.a) * p.r * SQUASH;

        // Pointer field: swirl and stall, rather than a blunt push.
        if (pointer.strength > 0.01) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < influence) {
            const f = (1 - d / influence) ** 2 * pointer.strength;
            p.a += f * 0.05 * Math.sign(p.va || 1);
            p.r += f * 5.2; // held out of the core while attention is near
          }
        }

        p.a += p.va;
        p.r -= p.vr * (1 + (1 - p.r / outerR) * 1.7);

        if (p.r < coreR * 0.55) spawn(p);

        const nx = cx + Math.cos(p.a) * p.r;
        const ny = cy + Math.sin(p.a) * p.r * SQUASH;

        // Fade in from the rim, flare on approach to the core.
        const near = 1 - Math.min(1, (p.r - coreR) / (outerR * 0.55));
        const rim = Math.min(1, (outerR - p.r) / (outerR * 0.35));
        const alpha = p.bright * rim * (0.25 + near * 0.9);

        const colour = p.hue === 1 ? CYAN : SIGNAL;

        // Streak along the direction of travel.
        ctx.beginPath();
        ctx.moveTo(p.px || nx, p.py || ny);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = `rgba(${colour},${alpha * 0.55})`;
        ctx.lineWidth = p.size * 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(nx, ny, p.size * (0.7 + near * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colour},${alpha})`;
        ctx.fill();

        // The last stretch into the core is drawn as a connection.
        if (near > 0.82) {
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(cx, cy);
          ctx.strokeStyle = `rgba(${colour},${(near - 0.82) * 0.42})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        p.px = nx;
        p.py = ny;
      }

      drawCore();

      // A soft light that follows the cursor.
      if (pointer.strength > 0.01) {
        const g = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          influence * 0.5,
        );
        g.addColorStop(0, `rgba(${SIGNAL},${0.07 * pointer.strength})`);
        g.addColorStop(1, "rgba(184,255,74,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.globalCompositeOperation = "source-over";
      if (running && !reduced) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      pointer.target = 1;
    };
    const onLeave = () => {
      pointer.target = 0;
    };

    resize();
    if (reduced) {
      // One static frame keeps the composition without any motion.
      for (let i = 0; i < 90; i++) step();
    } else {
      raf = requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    // Stop burning frames when the core scrolls away.
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasRunning = running;
        running = entry.isIntersecting;
        if (running && !wasRunning && !reduced) raf = requestAnimationFrame(step);
      },
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [density, calm, focus]);

  return (
    <div ref={wrap} className={`relative ${className}`} aria-hidden>
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
