import { LightHero } from "@/components/light/LightHero";
import { Numbers } from "@/components/light/Numbers";
import { LightCapabilities } from "@/components/light/LightCapabilities";
import { LightEngine } from "@/components/light/LightEngine";
import { LightSolutions } from "@/components/light/LightSolutions";
import { LightIndustries } from "@/components/light/LightIndustries";
import { LightWork } from "@/components/light/LightWork";
import { LightFounder } from "@/components/light/LightFounder";
import { LightContact } from "@/components/light/LightContact";

export default function LightHome() {
  return (
    <>
      <LightHero />
      <Numbers />
      <LightCapabilities />
      <LightEngine />
      <LightSolutions />
      <LightIndustries />
      <LightWork />
      <LightFounder />
      <LightContact />
    </>
  );
}
