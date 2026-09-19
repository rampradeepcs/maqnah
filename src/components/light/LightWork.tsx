import Image from "next/image";
import { light } from "@/lib/content-light";
import { MaskLines, Reveal } from "../ui/Reveal";

/**
 * Case studies as ledger rows: a square visual, a title and one line, and
 * a single large figure — the same rhythm as the numbers section, so the
 * page reads as one system rather than a sequence of card styles.
 */
export function LightWork() {
  const { work } = light;
  return (
    <section id="work" className="container-x border-t border-line py-24 md:py-36">
      <MaskLines className="serif t-l-h2 text-fg" lines={work.heading} />

      <div className="mt-12 divide-y divide-line border-b border-line md:mt-20">
        {work.items.map((w, i) => (
          <Reveal
            as="article"
            key={w.num}
            delay={i * 0.05}
            threshold={0.15}
            className="grid items-center gap-8 py-12 md:grid-cols-[160px_1fr_auto] md:gap-14 md:py-16 lg:grid-cols-[200px_1fr_auto]"
          >
            <div
              className="relative aspect-square w-40 overflow-hidden md:w-full"
              data-cursor="VIEW CASE"
            >
              <Image
                src={w.image}
                alt={w.alt}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>

            <div>
              <p className="label mb-4 text-signal">{w.industry}</p>
              <h3 className="serif t-l-h3 max-w-xl text-fg">{w.title}</h3>
              <p className="t-l-body mt-4 max-w-md text-muted">{w.line}</p>
            </div>

            <div className="md:min-w-[220px] md:text-right lg:min-w-[300px]">
              <p className="serif t-l-num text-fg">{w.metric.value}</p>
              <p className="label mt-4 text-signal">{w.metric.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
