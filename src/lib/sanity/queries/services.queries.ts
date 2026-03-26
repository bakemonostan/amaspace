export const allServicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    tagline,
    icon,
    shortDescription,
    featured,
    "image": image.asset->url
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tagline,
    icon,
    shortDescription,
    fullDescription,
    highlights,
    "image": image.asset->url
  }
`;
