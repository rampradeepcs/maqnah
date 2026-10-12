import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { MaskLines, Reveal } from "../ui/Reveal";

/**
 * Six sectors, three by two, each carried by regional, real-world imagery
 * with the name set over a soft scrim at the foot of the card.
 */
export function Industries({ t: industries }: { t: Dictionary["industries"] }) {
  return (
    <section id="industries" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="label eyebrow">{industries.tag}</p>
        </Reveal>
        <MaskLines
          as="h2"
          className="display t-h2 mt-5 max-w-[22ch] text-fg"
          lines={[industries.heading]}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.items.map((ind, i) => (
            <Reveal
              as="article"
              key={ind.name}
              delay={0.06 * (i % 3)}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface2"
            >
              <Image
                src={ind.image}
                alt={ind.alt}
                fill
                sizes="(min-width: 1216px) 350px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,7,0)_40%,rgba(4,10,7,0.35)_62%,rgba(4,10,7,0.82)_100%)]"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <h3 className="display t-h3 text-white">{ind.name}</h3>
                <p className="mt-2 max-w-[34ch] text-[14.5px] leading-relaxed text-white/80">
                  {ind.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
