import { Seo } from "@/components/Seo";
import { BasicPage } from "@/features/common/BasicPage";

export function AboutScreen() {
  return (
    <>
      <Seo
        title="About us"
        description="Amaspace is a Nigerian building services company delivering MEP, fire safety, security, and project management with ISO 9001–aligned quality, safety leadership, and multidisciplinary expertise."
      />
      <BasicPage title="About Us" sub="Company overview, team, values, and journey." />
    </>
  );
}
