import Image from "next/image";
import type { ClientLogoId, Dictionary } from "@/lib/i18n";
import { MaskLines, Reveal } from "../ui/Reveal";

/**
 * Each logo file in public/brand/clients, at its own pixel size, and the
 * height it is drawn at. Qiddiya is the official artwork, cropped tight;
 * the others are simple marks drawn for this page (Qudrat National's stands
 * in until the official file arrives) with a little padding of their own,
 * so they are drawn taller to match it optically.
 */
const LOGOS: Record<ClientLogoId, { width: number; height: number; className: string }> = {
  qiddiya: { width: 480, height: 119, className: "h-[34px]" },
  qudrat: { width: 448, height: 144, className: "h-11" },
  elite: { width: 427, height: 144, className: "h-11" },
  inzkar: { width: 542, height: 144, className: "h-11" },
  zizi: { width: 371, height: 144, className: "h-11" },
};

/**
 * Social proof, quiet and centred: a greyscale row of client logos, each
 * coming up to full strength on hover.
 */
export function Clients({ t: clients }: { t: Dictionary["clients"] }) {
  return (
    <section id="clients" className="bg-surface py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="label eyebrow">{clients.tag}</p>
          </Reveal>
          <MaskLines as="h2" className="display t-h2 mt-5 text-fg" lines={[clients.heading]} />
        </div>

        <Reveal className="mt-14">
          <ul className="flex flex-wrap justify-center gap-3">
            {clients.logos.map(({ id, name }) => {
              const logo = LOGOS[id];
              return (
                <li
                  key={id}
                  className="flex h-24 basis-[calc(50%-6px)] items-center justify-center rounded-2xl border border-line bg-void/60 px-5 sm:basis-[calc(33.333%-8px)] lg:basis-[calc(20%-9.6px)]"
                >
                  <Image
                    src={`/brand/clients/${id}.png`}
                    alt={name}
                    width={logo.width}
                    height={logo.height}
                    unoptimized
                    className={`w-auto max-w-full object-contain opacity-70 grayscale transition-opacity duration-300 hover:opacity-100 ${logo.className}`}
                  />
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
