import { light } from "@/lib/content-light";
import { MaskLines, Reveal } from "../ui/Reveal";

const TONES = ["mist", "mint", "sage", "sand", "mint", "mist"] as const;

export function LightIndustries() {
  const { industries } = light;
  return (
    <section className="container-x border-t border-line py-24 md:py-36">
      <MaskLines className="serif t-l-h2 text-fg" lines={industries.heading} />

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
        {industries.items.map((ind, i) => (
          <Reveal
            as="li"
            key={ind.name}
            delay={i * 0.06}
            className={`tile-${TONES[i]} flex min-h-[220px] flex-col justify-between p-7 md:min-h-[260px] md:p-9`}
          >
            <p className="label text-signal">{String(i + 1).padStart(2, "0")}</p>
            <div>
              <h3 className="serif text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.02] text-fg">
                {ind.name}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted md:text-[17px]">
                {ind.outcome}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
