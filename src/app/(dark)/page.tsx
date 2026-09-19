import { Hero } from "@/components/sections/Hero";
import { BigIdea } from "@/components/sections/BigIdea";
import { Capabilities } from "@/components/sections/Capabilities";
import { Engine } from "@/components/sections/Engine";
import { DataFlow } from "@/components/sections/DataFlow";
import { Consulting } from "@/components/sections/Consulting";
import { Solutions } from "@/components/sections/Solutions";
import { Industries } from "@/components/sections/Industries";
import { Work } from "@/components/sections/Work";
import { Impact } from "@/components/sections/Impact";
import { WhyMaqnah } from "@/components/sections/WhyMaqnah";
import { Method } from "@/components/sections/Method";
import { Insights } from "@/components/sections/Insights";
import { Founder } from "@/components/sections/Founder";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <BigIdea />
      <Capabilities />
      <Engine />
      <DataFlow />
      <Consulting />
      <Solutions />
      <Industries />
      <Work />
      <Impact />
      <WhyMaqnah />
      <Method />
      <Insights />
      <Founder />
      <FinalCta />
    </>
  );
}
