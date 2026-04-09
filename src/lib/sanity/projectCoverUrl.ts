import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

/** Neutral construction / building stock image when Sanity has no cover yet. */
export const PROJECT_CARD_PLACEHOLDER_SRC =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80";

/** Builds a cropped URL for portfolio / featured cards (~16:10). */
export function projectCoverUrl(cover: unknown): string | null {
  if (cover == null || typeof cover !== "object") return null;
  try {
    return urlFor(cover as SanityImageSource).width(900).height(560).fit("crop").url();
  } catch {
    return null;
  }
}

export function projectCardImageSrc(cover: unknown): string {
  return projectCoverUrl(cover) ?? PROJECT_CARD_PLACEHOLDER_SRC;
}
