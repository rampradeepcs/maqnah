import { light } from "@/lib/content-light";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";

export function Numbers() {
  const { numbers } = light;
  return (
    <section className="container-x border-t border-line py-24 md:py-36">
      <Reveal>
        <p className="label mb-14 md:mb-20">{numbers.label}</p>
      </Reveal>
      <div className="grid gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
        {numbers.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <Counter
              to={s.value}
              suffix={s.suffix}
              className="serif t-l-num block text-fg"
            />
            <p className="label mt-6 text-signal">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
