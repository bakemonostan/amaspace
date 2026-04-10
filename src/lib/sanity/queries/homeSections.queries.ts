import { sanityClient } from "@/lib/sanity/client";
import { featuredProjectsQuery, projectCardFields, type SanityProjectCard } from "@/lib/sanity/queries/projects.queries";

const pickedProjectProjection = `
  ${projectCardFields},
  "subtitle": select(defined(client) && defined(location) => client + " • " + location, description)
`;

export const homeSectionsQuery = `{
  "specialized": *[_type == "homeSpecializedSolutions"] | order(_updatedAt desc) [0] {
    sectionTitle,
    sectionIntro,
    solutions,
    imageLeft,
    imageRight,
    placeholderImageLeftUrl,
    placeholderImageRightUrl,
    imageLeftAlt,
    imageRightAlt
  },
  "featuredBlock": *[_type == "homeFeaturedProjects"] | order(_updatedAt desc) [0] {
    sectionTitle,
    sectionSubtitle,
    ctaLabel,
    ctaPath,
    "picked": projects[]-> {
      ${pickedProjectProjection}
    }
  }
}`;

export type SpecializedSolutionItemRaw = {
  _key?: string;
  key?: string | null;
  icon?: string | null;
  accent?: string | null;
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaPath?: string | null;
};

export type SpecializedRaw = {
  sectionTitle?: string | null;
  sectionIntro?: string | null;
  solutions?: SpecializedSolutionItemRaw[] | null;
  imageLeft?: unknown;
  imageRight?: unknown;
  placeholderImageLeftUrl?: string | null;
  placeholderImageRightUrl?: string | null;
  imageLeftAlt?: string | null;
  imageRightAlt?: string | null;
} | null;

export type FeaturedBlockRaw = {
  sectionTitle?: string | null;
  sectionSubtitle?: string | null;
  ctaLabel?: string | null;
  ctaPath?: string | null;
  picked?: SanityProjectCard[] | null;
} | null;

export type HomeSectionsPayload = {
  specialized: SpecializedRaw;
  featuredBlock: FeaturedBlockRaw;
};

export async function fetchHomePageSections(): Promise<{
  specialized: SpecializedRaw;
  featuredBlock: FeaturedBlockRaw;
  featuredProjects: SanityProjectCard[];
}> {
  const payload = await sanityClient.fetch<HomeSectionsPayload>(homeSectionsQuery);
  const picked = (payload.featuredBlock?.picked ?? []).filter(Boolean) as SanityProjectCard[];
  const featuredProjects =
    picked.length > 0 ? picked : await sanityClient.fetch<SanityProjectCard[]>(featuredProjectsQuery);
  return {
    specialized: payload.specialized,
    featuredBlock: payload.featuredBlock,
    featuredProjects,
  };
}
