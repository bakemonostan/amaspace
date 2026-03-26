const projectFields = `
  _id,
  title,
  "slug": slug.current,
  client,
  location,
  serviceType,
  services,
  description,
  completedAt,
  featured,
  "image": images[0].asset->{ url, metadata { dimensions } }
`;

export const allProjectsQuery = `
  *[_type == "project"] | order(completedAt desc) {
    ${projectFields}
  }
`;

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true][0...3] | order(completedAt desc) {
    ${projectFields}
  }
`;
