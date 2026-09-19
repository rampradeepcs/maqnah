import { light } from "@/lib/content-light";
import { MaskLines, Reveal } from "../ui/Reveal";
import { Hi } from "./Keyword";

export function LightSolutions() {
  const { solutions } = light;
  return (
    <section className="container-x border-t border-line py-24 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <MaskLines className="serif t-l-h2 text-fg" lines={solutions.heading} />

        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:pt-4">
          {solutions.items.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.05}>
              <p className="label mb-2.5">{s.group}</p>
              <p className="display text-[clamp(1.25rem,1.7vw,1.6rem)] font-semibold leading-tight tracking-[-0.02em] text-fg">
                <Hi>{s.name}</Hi>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
