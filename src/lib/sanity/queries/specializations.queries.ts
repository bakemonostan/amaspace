export const allSpecializationsQuery = `
  *[_type == "specialization"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    icon,
    shortDescription,
    color
  }
`;

export const specializationBySlugQuery = `
  *[_type == "specialization" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    icon,
    shortDescription,
    fullDescription,
    color,
    "image": image.asset->url
  }
`;
