import { about } from "@/lib/content";
import { Icon } from "../ui/Icon";
import { MaskLines, Reveal } from "../ui/Reveal";
import { GradientLines } from "../visuals/GradientLines";

/**
 * The trust section. Track record and vision on the left; what Maqnah
 * brings on the right, each strength marked by a line icon in a soft circle.
 * On wide screens a bundle of gradient traces enters from the right edge and
 * climbs into the space under the strengths (hidden on narrow screens, where
 * it would cross the copy).
 */
export function About() {
  const [lead, rest] = about.heading.split(". ");

  return (
    <section id="about" className="relative overflow-hidden">
      <GradientLines className="pointer-events-none absolute bottom-6 right-0 hidden w-[58%] max-w-[980px] -scale-x-100 lg:block" />

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
                `${lead}.`,
                <span key="rest" className="text-faint">
                  {rest}
                </span>,
              ]}
            />
          </div>

          {about.blocks.map((b, i) => (
            <Reveal key={b.title} delay={0.06 * i}>
              <div className="border-l-2 border-signal pl-5">
                <h3 className="label eyebrow">{b.title}</h3>
                <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-muted">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="slot relative aspect-[16/10] rounded-3xl bg-surface">
              <div className="flex flex-col items-center gap-3 px-6">
                <Icon name="camera" className="h-8 w-8" />
                <p className="label">{about.photo.label}</p>
                <p className="text-[13.5px]">{about.photo.note}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:pt-24">
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
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-mint text-signal">
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
