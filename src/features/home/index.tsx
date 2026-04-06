import { Screen } from "@/components/ui/Screen";
import {
  CoreCapabilitiesSection,
  FeaturedProjectsSection,
  HeroSection,
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
    </Screen>
  );
}
