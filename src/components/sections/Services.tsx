import Image from "next/image";
import { services } from "@/lib/content";
import { Icon } from "../ui/Icon";
import { MaskLines, Reveal } from "../ui/Reveal";
import { PillarArt } from "../visuals/PillarArt";

/**
 * Three pillars, built from data foundations up to AI in daily operations.
 * A collage strip runs edge to edge after the copy — a pit crew in sync,
 * the "end to end" idea in one image — before the cards.
 */
export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="label eyebrow">{services.tag}</p>
          </Reveal>
          <MaskLines as="h2" className="display t-h2 mt-5 text-fg" lines={[services.heading]} />
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-[58ch] text-muted">{services.lead}</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="relative mt-14 h-[120px] overflow-hidden sm:h-[140px] md:mt-16 md:h-[160px]">
        <Image
          src={services.strip.src}
          alt={services.strip.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Reveal>

      <div className="container-x mt-14 grid gap-5 md:mt-16 lg:grid-cols-3">
        {services.pillars.map((p, i) => (
          <Reveal
            as="article"
            key={p.title}
            delay={0.08 * i}
            className="group flex flex-col gap-7 rounded-3xl border border-line bg-surface p-6 md:p-7"
          >
            <div className="relative overflow-hidden rounded-2xl bg-void">
              <PillarArt
                variant={p.icon}
                className="aspect-[16/10] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-xl bg-signal text-white">
                <Icon name={p.icon} className="h-[22px] w-[22px]" />
              </span>
            </div>

            <div className="border-b border-line pb-6">
              <h3 className="display t-h3 text-fg">{p.title}</h3>
              <p className="mt-1 text-[14px] text-muted">{p.sub}</p>
            </div>

            <ul className="flex flex-col gap-5">
              {p.items.map((s) => (
                <li key={s.title} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                  <div>
                    <h4 className="text-[15.5px] font-semibold text-fg">{s.title}</h4>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
