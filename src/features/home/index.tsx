import { Screen } from "@/components/ui/Screen";
import {
  CoreCapabilitiesSection,
  FeaturedProjectsSection,
  HeroSection,
  OrangeCtaSection,
  SpecializedSolutionsSection,
  TrustStrip,
  TrustedBySection,
} from "@/features/home/home-sections";

export function HomeScreen() {
  return (
    <Screen>
      <HeroSection />
      <TrustStrip />
      <CoreCapabilitiesSection />
      <SpecializedSolutionsSection />
      <FeaturedProjectsSection />
      <TrustedBySection />
      <OrangeCtaSection />
    </Screen>
  );
}
