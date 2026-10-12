import type { Dictionary } from "@/lib/i18n";
import { Icon } from "../ui/Icon";
import { MaskLines, Reveal } from "../ui/Reveal";

/**
 * Social proof, quiet and centred: a greyscale strip of client logos, then
 * the testimonials in one ruled grid. Logo and portrait slots stay marked
 * until real, approved assets replace them.
 */
export function Clients({ t: clients, ui }: { t: Dictionary["clients"]; ui: Dictionary["ui"] }) {
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
          <ul className="grid grid-cols-2 gap-3 grayscale sm:grid-cols-3 lg:grid-cols-6">
            {clients.logos.map((label, i) => (
              <li
                key={i}
                className="slot h-14 rounded-xl text-[11px] font-medium uppercase tracking-[0.14em]"
              >
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16 overflow-hidden rounded-3xl border border-line">
          <div className="grid divide-y divide-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {clients.testimonials.map((t, i) => (
              <figure
                key={i}
                className="flex flex-col items-center gap-6 bg-surface p-8 text-center md:p-10"
              >
                <span
                  role="img"
                  aria-label={ui.clientPhotoToCome}
                  className="slot h-16 w-16 rounded-full"
                >
                  <Icon name="user" className="h-6 w-6" />
                </span>
                <blockquote className="text-[16px] leading-[1.7] text-fg">
                  {ui.quotes[0]}
                  {t.quote}
                  {ui.quotes[1]}
                </blockquote>
                <figcaption className="mt-auto">
                  <span className="block text-[15px] font-semibold text-fg">{t.name}</span>
                  <span className="mt-1 block text-[13.5px] text-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
