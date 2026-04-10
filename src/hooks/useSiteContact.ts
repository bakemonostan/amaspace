import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_SITE_CONTACT } from "@/lib/contactDefaults";
import { DEFAULT_HERO_TEXT, resolveHeroImageUrl } from "@/lib/homeHeroDefaults";
import { sanityClient } from "@/lib/sanity/client";
import {
  singletonPageQuery,
  type HomeHeroDoc,
  type SiteContactDoc,
  type SingletonPageData,
} from "@/lib/sanity/queries/siteSettings.queries";

export type SiteContact = {
  phoneDisplay: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
};

export type HeroSectionContent = {
  badge: string;
  headlineLead: string;
  headlineHighlight: string;
  subtext: string;
  imageUrl: string;
  imageAlt: string;
};

function mergeContact(raw: SiteContactDoc | null | undefined): SiteContact {
  const d = DEFAULT_SITE_CONTACT;
  return {
    phoneDisplay: raw?.phone?.trim() || d.phoneDisplay,
    email: raw?.email?.trim() || d.email,
    addressLine1: raw?.addressLine1?.trim() || d.addressLine1,
    addressLine2: raw?.addressLine2?.trim() || d.addressLine2,
  };
}

function mergeHero(raw: HomeHeroDoc | null | undefined): HeroSectionContent {
  const d = DEFAULT_HERO_TEXT;
  return {
    badge: raw?.eyebrow?.trim() || d.badge,
    headlineLead: raw?.titleLead?.trim() || d.headlineLead,
    headlineHighlight: raw?.titleHighlight?.trim() || d.headlineHighlight,
    subtext: raw?.intro?.trim() || d.subtext,
    imageUrl: resolveHeroImageUrl(raw?.image, raw?.placeholderImageUrl),
    imageAlt: raw?.imageAlt?.trim() || d.imageAlt,
  };
}

function useSingletonPageData() {
  return useQuery({
    queryKey: ["sanity", "singletons", "homePage"],
    queryFn: () => sanityClient.fetch<SingletonPageData>(singletonPageQuery),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSiteContact(): SiteContact {
  const { data } = useSingletonPageData();
  return useMemo(() => mergeContact(data?.contact), [data?.contact]);
}

export function useHeroSection(): HeroSectionContent {
  const { data } = useSingletonPageData();
  return useMemo(() => mergeHero(data?.hero), [data?.hero]);
}
