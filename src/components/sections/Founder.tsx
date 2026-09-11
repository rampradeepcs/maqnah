import Image from "next/image";
import { founder } from "@/lib/content";
import { Reveal } from "../ui/Reveal";

/**
 * The human line in the argument. Kept deliberately quiet — a single quote,
 * generous space, and the smallest possible amount of chrome around it.
 */
export function Founder() {
  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 42%, rgba(184,255,74,.055) 0%, transparent 70%)",
        }}
      />

      <div className="container-tight relative">
        <Reveal className="text-center">
          <p className="tag mb-10">14 / The people behind it</p>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="text-center">
            <span
              aria-hidden
              className="display block text-[5rem] leading-[0.5] text-signal/30 md:text-[7rem]"
            >
              &ldquo;
            </span>
            <p className="display mx-auto mt-6 max-w-3xl text-balance text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.16] text-fg">
              {founder.quote}
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.22}>
          <figcaption className="mt-12 flex items-center justify-center gap-4">
            <span className="relative h-12 w-12 overflow-hidden rounded-full border border-line-strong">
              <Image
                src={founder.avatar}
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-left">
              <span className="block text-[15px] font-medium text-fg">
                {founder.name}
              </span>
              <span className="mono block text-[10px] text-faint">
                {founder.role}
              </span>
            </span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
