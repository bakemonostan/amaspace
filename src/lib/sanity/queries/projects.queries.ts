export const projectCardFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  tags,
  status,
  description,
  client,
  location,
  completedAt,
  featured,
  sortOrder,
  coverAlt,
  "cover": coalesce(coverImage, images[0])
`;

export const allProjectsQuery = `
  *[_type == "project"] | order(coalesce(sortOrder, 100) asc, coalesce(completedAt, _createdAt) desc) {
    ${projectCardFields}
  }
`;

/** Home page: up to 3 projects marked featured in Studio. */
export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(coalesce(sortOrder, 100) asc, coalesce(completedAt, _createdAt) desc) [0...3] {
    ${projectCardFields},
    "subtitle": select(
      defined(client) && defined(location) => client + " • " + location,
      description
    )
  }
`;

export type SanityProjectCard = {
  _id: string;
  title: string;
  slug: string;
  category?: string | null;
  tags?: string[] | null;
  status?: "completed" | "ongoing" | null;
  description?: string | null;
  client?: string | null;
  location?: string | null;
  completedAt?: string | null;
  featured?: boolean | null;
  sortOrder?: number | null;
  coverAlt?: string | null;
  cover?: unknown;
  /** Present on featured-home query only. */
  subtitle?: string | null;
};
