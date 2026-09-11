"use client";

import { finalCta, site } from "@/lib/content";
import { IntelligenceCore } from "../visuals/IntelligenceCore";
import { Magnetic } from "../ui/Magnetic";
import { MaskLines, Reveal } from "../ui/Reveal";
import { ContactForm } from "./ContactForm";

const FOCUS: [number, number] = [0.5, 0.56];

export function FinalCta() {
  return (
    <>
      <section
        id="contact"
        className="relative flex min-h-[92svh] items-center overflow-hidden border-t border-line"
      >
        <div className="pointer-events-none absolute inset-0">
          <IntelligenceCore
            className="absolute inset-0 h-full w-full"
            density={1}
            calm
            focus={FOCUS}
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 46% at 50% 34%, rgba(7,9,12,.9) 0%, rgba(7,9,12,.62) 55%, rgba(7,9,12,.1) 88%), linear-gradient(to bottom, rgba(7,9,12,.55) 0%, transparent 30%, transparent 70%, rgba(7,9,12,.7) 100%)",
          }}
        />

        <div className="container-x relative py-24 text-center md:py-32">
          <Reveal>
            <p className="tag mb-8">15 / Start here</p>
          </Reveal>

          <MaskLines
            className="display t-h1 mx-auto max-w-5xl"
            lineClassName="text-center"
            lines={[
              finalCta.heading[0],
              <span key="b" className="text-signal-gradient">
                {finalCta.heading[1]}
              </span>,
            ]}
          />

          <Reveal delay={0.25}>
            <p className="lede mx-auto mt-8 max-w-xl">{finalCta.lede}</p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Magnetic>
                <a
                  href={finalCta.primary.href}
                  data-cursor="LET'S TALK →"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-semibold text-void"
                >
                  <span className="relative z-10">{finalCta.primary.label}</span>
                  <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-[#dfffa8] transition-transform duration-600 group-hover:scale-x-100"
                    style={{
                      transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                </a>
              </Magnetic>
              <a
                href={finalCta.secondary.href}
                className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong px-8 py-4 text-sm font-medium text-fg transition-colors duration-300 hover:border-signal/60 hover:text-signal"
              >
                {finalCta.secondary.label}
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Connect ---- */}
      <section
        id="contact-form"
        className="relative border-t border-line py-20 md:py-28"
      >
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div>
            <p className="tag mb-6">Connect with Maqnah</p>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.05]">
              Tell us your goals — we&rsquo;ll show you how Maqnah can help you
              achieve them.
            </h2>

            <dl className="mt-10 space-y-6 border-t border-line pt-8">
              <div>
                <dt className="tag mb-2">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    data-cursor="EMAIL"
                    className="text-[15px] text-fg underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="tag mb-2">Based in</dt>
                <dd className="text-[15px] text-muted">{site.location}</dd>
              </div>
              <div>
                <dt className="tag mb-2">Typical first step</dt>
                <dd className="text-[15px] text-muted">
                  A 45-minute working session on where your data already is, and
                  what it could be deciding for you.
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
