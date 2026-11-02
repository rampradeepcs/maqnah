import type { Dictionary } from "@/lib/i18n";
import { Icon } from "../ui/Icon";
import { MaskLines, Reveal } from "../ui/Reveal";
import { GradientLines } from "../visuals/GradientLines";

/**
 * The trust section. Track record and vision on the left; what Maqnah
 * brings on the right: three strengths, each marked by a line icon in a soft
 * circle, set to end level with the left column. On wide screens a bundle of
 * gradient traces enters from the end edge into the space above the
 * strengths (hidden on narrow screens, where it would cross the copy).
 */
export function About({ t: about }: { t: Dictionary["about"] }) {
  const [lead, rest] = about.heading;

  return (
    <section id="about" className="relative overflow-hidden">
      <GradientLines className="pointer-events-none absolute end-0 top-24 hidden w-[44%] max-w-[760px] ltr:-scale-x-100 lg:block" />

      <div className="container-x relative grid gap-16 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-9">
          <div>
            <Reveal>
              <p className="label eyebrow">{about.tag}</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display t-h2 mt-5 text-fg"
              lines={[
                lead,
                <span key="rest" className="text-faint">
                  {rest}
                </span>,
              ]}
            />
          </div>

          {about.blocks.map((b, i) => (
            <Reveal key={b.title} delay={0.06 * i}>
              <div className="border-s-2 border-signal ps-5">
                <h3 className="label eyebrow">{b.title}</h3>
                <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-muted">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="lg:self-end">
          <Reveal>
            <h3 className="display t-h3 border-b border-line pb-5 text-fg">
              {about.strengthsHeading}
            </h3>
          </Reveal>
          <ul>
            {about.strengths.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={0.05 * i}
                className="flex gap-5 border-b border-line py-6"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-tint text-signal">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <div className="pt-1">
                  <h4 className="text-[16.5px] font-semibold text-fg">{s.title}</h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
