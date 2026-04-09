import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

/** Builds a cropped URL for portfolio / featured cards (~16:10). */
export function projectCoverUrl(cover: unknown): string | null {
  if (cover == null || typeof cover !== "object") return null;
  try {
    return urlFor(cover as SanityImageSource).width(900).height(560).fit("crop").url();
  } catch {
    return null;
  }
}
