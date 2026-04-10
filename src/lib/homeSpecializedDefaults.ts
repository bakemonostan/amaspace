import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";
import type { FeaturedBlockRaw, SpecializedRaw } from "@/lib/sanity/queries/homeSections.queries";

export const SPECIALIZED_PLACEHOLDER_LEFT =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80";
export const SPECIALIZED_PLACEHOLDER_RIGHT =
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80";

export const DEFAULT_SPECIALIZED_COPY = {
  sectionTitle: "Specialized solutions",
  sectionIntro:
    "Critical infrastructure demands specialists. From fire life safety to intelligent building controls, we align systems with codes, operations, and your long-term asset strategy.",
  imageLeftAlt: "Commercial construction and building envelope work",
  imageRightAlt: "Engineer reviewing technical drawings and plans",
} as const;

export type MergedSpecSolution = {
  key: string;
  icon: string;
  accent: "fire" | "blue";
  title: string;
  desc: string;
  cta: string;
  ctaPath: string;
};

export type MergedSpecializedSection = {
  sectionTitle: string;
  sectionIntro: string;
  solutions: MergedSpecSolution[];
  imageLeftUrl: string;
  imageRightUrl: string;
  imageLeftAlt: string;
  imageRightAlt: string;
};

const DEFAULT_SOLUTIONS: MergedSpecSolution[] = [
  {
    key: "fire",
    icon: "flame",
    accent: "fire",
    title: "Fire safety systems",
    desc: "Fire alarm & smoke detection, VESDA, foam, water mist, gas suppression, sprinklers, hydrants, hose reels, and portable extinguishers—designed, installed, tested, and maintained.",
    cta: "Explore fire safety expertise",
    ctaPath: "/services/fire-safety-systems",
  },
  {
    key: "bms",
    icon: "none",
    accent: "blue",
    title: "Building management systems (BMS)",
    desc: "Extra-low voltage integration including BMS, access control, CCTV, fire detection, and UPS—compliant, dependable, and fully coordinated.",
    cta: "View our services",
    ctaPath: "/services",
  },
];

function resolveColumnImage(
  image: unknown,
  placeholderFromCms: string | null | undefined,
  fallbackUrl: string,
): string {
  if (image != null && typeof image === "object") {
    try {
      return urlFor(image as SanityImageSource).width(600).height(800).fit("crop").url();
    } catch {
      /* fall through */
    }
  }
  const p = placeholderFromCms?.trim();
  if (p) return p;
  return fallbackUrl;
}

export function mergeSpecializedSection(raw: SpecializedRaw): MergedSpecializedSection {
  const d = DEFAULT_SPECIALIZED_COPY;
  const rawList = raw?.solutions;
  const solutions: MergedSpecSolution[] =
    rawList && rawList.length > 0
      ? rawList
          .filter((s) => s?.key && s.title)
          .map((s) => ({
            key: String(s.key).trim(),
            icon: (s.icon || "none").trim(),
            accent: s.accent === "fire" ? "fire" : "blue",
            title: String(s.title).trim(),
            desc: (s.description ?? "").trim(),
            cta: (s.ctaLabel ?? "Learn more").trim(),
            ctaPath: (s.ctaPath ?? "/services").trim(),
          }))
      : DEFAULT_SOLUTIONS;

  return {
    sectionTitle: raw?.sectionTitle?.trim() || d.sectionTitle,
    sectionIntro: raw?.sectionIntro?.trim() || d.sectionIntro,
    solutions,
    imageLeftUrl: resolveColumnImage(raw?.imageLeft, raw?.placeholderImageLeftUrl, SPECIALIZED_PLACEHOLDER_LEFT),
    imageRightUrl: resolveColumnImage(raw?.imageRight, raw?.placeholderImageRightUrl, SPECIALIZED_PLACEHOLDER_RIGHT),
    imageLeftAlt: raw?.imageLeftAlt?.trim() || d.imageLeftAlt,
    imageRightAlt: raw?.imageRightAlt?.trim() || d.imageRightAlt,
  };
}

export const DEFAULT_FEATURED_SECTION = {
  sectionTitle: "Featured projects",
  sectionSubtitle:
    "A selection of completed and ongoing engineering and installation work drawn from our corporate portfolio.",
  ctaLabel: "View full portfolio",
  ctaPath: "/projects",
} as const;

export function mergeFeaturedSectionMeta(block: FeaturedBlockRaw | null | undefined) {
  const d = DEFAULT_FEATURED_SECTION;
  return {
    sectionTitle: block?.sectionTitle?.trim() || d.sectionTitle,
    sectionSubtitle: block?.sectionSubtitle?.trim() || d.sectionSubtitle,
    ctaLabel: block?.ctaLabel?.trim() || d.ctaLabel,
    ctaPath: block?.ctaPath?.trim() || d.ctaPath,
  };
}
