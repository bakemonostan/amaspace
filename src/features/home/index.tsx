import { Seo } from "@/components/Seo";
import { Screen } from "@/components/ui/Screen";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo/config";
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
      <Seo title={DEFAULT_TITLE} description={DEFAULT_DESCRIPTION} isHome />
      <HeroSection />
      <TrustStrip />
      <CoreCapabilitiesSection />
      <SpecializedSolutionsSection />
      <FeaturedProjectsSection />
      <TrustedBySection />
    </Screen>
  );
}
