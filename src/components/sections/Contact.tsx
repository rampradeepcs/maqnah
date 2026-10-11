import Image from "next/image";
import { contact } from "@/lib/content";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { ContactForm } from "./ContactForm";

/**
 * Two panels side by side over a night sky: a frosted invitation on the
 * left, the booking form on a white card on the right.
 */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-night text-white">
      <Image
        src="/img/contact-universe.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[70%_60%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,7,0.7)_0%,rgba(4,10,7,0.25)_55%,rgba(4,10,7,0)_100%)]"
      />

      <div className="container-x relative grid items-stretch gap-5 py-24 md:py-32 lg:grid-cols-2">
        <Reveal className="glass-night flex flex-col gap-7 rounded-3xl p-7 md:p-11">
          <span className="pill-outline self-start border-mint-strong/60 text-white">
            {contact.pill}
          </span>
          <h2 className="display t-h2 text-white">{contact.heading}</h2>
          <hr className="border-0 border-t border-dashed border-white/25" />
          <p className="text-[16.5px] font-medium leading-relaxed text-white/90">
            {contact.body}
          </p>
          <div>
            <h3 className="text-[16px] font-semibold">{contact.listHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {contact.list.map((item) => (
                <li key={item} className="flex gap-3 text-[15.5px] text-white/85">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-mint-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {contact.cards.map((c) => (
              <div key={c.label} className="rounded-2xl bg-white/[0.07] px-5 py-4">
                <span className="label block text-white/60">{c.label}</span>
                <strong className="mt-1.5 block text-[15.5px] font-semibold [overflow-wrap:anywhere]">
                  {c.value}
                </strong>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl bg-white p-7 text-fg md:p-11">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-mint text-signal">
              <Icon name="phone" className="h-6 w-6" />
            </span>
            <h3 className="display t-h2 text-[clamp(1.75rem,2.6vw,2.25rem)] text-fg">
              {contact.form.heading}
            </h3>
          </div>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
