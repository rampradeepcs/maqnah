import Image from "next/image";
import { work } from "@/lib/content";
import { Icon } from "../ui/Icon";
import { MaskLines, Reveal } from "../ui/Reveal";

/**
 * The showcase: no detail pages, no client names. Each card is a soft 3D
 * render with the story in a white panel set into its lower half.
 */
export function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="label eyebrow">{work.tag}</p>
        </Reveal>
        <MaskLines
          className="display t-h2 mt-5 max-w-[24ch] text-fg"
          lines={[work.heading]}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.items.map((c, i) => (
            <Reveal
              as="article"
              key={c.title}
              delay={0.06 * (i % 3)}
              className="group flex flex-col overflow-hidden rounded-3xl bg-[#d2d4d9]"
            >
              {/* The render keeps its own 4:3 frame; its empty lower band
                  is where the white panel overlaps. */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="relative mx-3 -mt-[21%] mb-3 flex-1 rounded-2xl bg-white p-5 shadow-[0_24px_50px_-30px_rgba(16,21,18,0.45)] transition-transform duration-700 ease-out group-hover:-translate-y-1 md:p-6">
                <span className="chip">{c.chip}</span>
                <h3 className="display mt-4 text-[1.3rem] leading-[1.22] tracking-[-0.015em] text-fg">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-start gap-5 rounded-3xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <p className="display t-h3 text-fg">{work.cta.line}</p>
          <a href={work.cta.href} data-cursor="LET'S TALK" className="btn btn-dark">
            {work.cta.label}
            <Icon name="arrow-right" className="arrow h-4 w-4" strokeWidth={2} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
