import { Seo } from "@/components/Seo";
import { BasicPage } from "@/features/common/BasicPage";
import { useSiteContact } from "@/hooks/useSiteContact";

export function ContactScreen() {
  const { email, phoneDisplay } = useSiteContact();
  return (
    <>
      <Seo
        title="Contact"
        description={`Contact Amaspace in Lagos for MEP, fire safety, security systems, and project consultations—email ${email} or call ${phoneDisplay}.`}
      />
      <BasicPage title="Contact Us" sub="Reach out for project consultation and support." />
    </>
  );
}
