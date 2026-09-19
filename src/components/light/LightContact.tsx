import { site } from "@/lib/content";
import { light } from "@/lib/content-light";
import { Reveal } from "../ui/Reveal";
import { ContactForm } from "../sections/ContactForm";
import { Hi } from "./Keyword";

export function LightContact() {
  const { contact } = light;
  return (
    <section id="contact" className="border-t border-line">
      <div className="container-x grid gap-14 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-24 md:py-36">
        <div>
          <Reveal>
            <h2 className="serif t-l-h1 text-grad-ksa">{contact.heading}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-l-body mt-8 max-w-md text-muted">
              <Hi>{contact.line}</Hi>
            </p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="EMAIL"
              className="mt-10 inline-block text-[clamp(1.1rem,1.6vw,1.4rem)] text-fg underline decoration-signal/40 underline-offset-8 transition-colors duration-300 hover:decoration-signal"
            >
              {site.email}
            </a>
            <p className="label mt-8">{site.location}</p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
