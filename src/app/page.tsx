import { Hero } from "@/components/sections/Hero";
import { Agentic } from "@/components/sections/Agentic";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Work } from "@/components/sections/Work";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Agentic />
      <About />
      <Services />
      <Industries />
      <Work />
      <Clients />
      <Contact />
    </>
  );
}
