import Image from "next/image";
import { light } from "@/lib/content-light";
import { Reveal } from "../ui/Reveal";
import { Hi } from "./Keyword";

export function LightFounder() {
  const { founder } = light;
  return (
    <section className="container-x border-t border-line py-24 md:py-36">
      <Reveal className="max-w-5xl">
        <p className="serif text-[clamp(1.9rem,4.4vw,4.25rem)] leading-[1.1] text-fg">
          <Hi>{`“${founder.quote}”`}</Hi>
        </p>
        <figcaption className="mt-10 flex items-center gap-4 md:mt-14">
          <span className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={founder.avatar}
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </span>
          <span>
            <span className="block text-[16px] font-medium text-fg">
              {founder.name}
            </span>
            <span className="label mt-1 block">{founder.role}</span>
          </span>
        </figcaption>
      </Reveal>
    </section>
  );
}
