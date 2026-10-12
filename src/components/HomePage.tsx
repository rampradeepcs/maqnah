import type { Dictionary } from "@/lib/i18n";
import { Hero } from "./sections/Hero";
import { Agentic } from "./sections/Agentic";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { Industries } from "./sections/Industries";
import { Work } from "./sections/Work";
import { Clients } from "./sections/Clients";
import { Contact } from "./sections/Contact";

/** The one-page site, in whichever language the dictionary carries. */
export function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <Hero t={dict.hero} ui={dict.ui} />
      <Agentic t={dict.agentic} />
      <About t={dict.about} />
      <Services t={dict.services} />
      <Industries t={dict.industries} />
      <Work t={dict.work} ui={dict.ui} />
      <Clients t={dict.clients} ui={dict.ui} />
      <Contact dict={dict} />
    </>
  );
}
