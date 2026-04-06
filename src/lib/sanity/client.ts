import { createClient } from "@sanity/client";

const projectId =
  (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined)?.trim() || "ple8hlx0";
const dataset =
  (import.meta.env.VITE_SANITY_DATASET as string | undefined)?.trim() || "production";
const apiVersion =
  (import.meta.env.VITE_SANITY_API_VERSION as string | undefined)?.trim() || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
