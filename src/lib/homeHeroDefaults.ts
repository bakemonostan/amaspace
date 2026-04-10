import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

/** Same Unsplash URL as the original hard-coded home hero. */
export const HERO_PLACEHOLDER_IMAGE_URL =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80";

export const DEFAULT_HERO_TEXT = {
  badge: "Engineering excellence",
  headlineLead: "Building services engineered for",
  headlineHighlight: "reliability.",
  subtext:
    "Amaspace is a fast-growing Nigerian building services firm—delivering mechanical, electrical, plumbing, fire safety, and security solutions with cutting-edge technology, strict quality standards, and a proven track record on commercial and industrial projects.",
  imageAlt: "Construction site with workers and building infrastructure",
} as const;

/**
 * Uses the uploaded hero image when set; otherwise the Studio placeholder URL;
 * otherwise the built-in URL above (current site look).
 */
export function resolveHeroImageUrl(
  heroImage: unknown,
  placeholderUrlFromCms: string | null | undefined,
): string {
  if (heroImage != null && typeof heroImage === "object") {
    try {
      return urlFor(heroImage as SanityImageSource).width(900).height(1125).fit("crop").url();
    } catch {
      /* use placeholders */
    }
  }
  const fromCms = placeholderUrlFromCms?.trim();
  if (fromCms) return fromCms;
  return HERO_PLACEHOLDER_IMAGE_URL;
}
