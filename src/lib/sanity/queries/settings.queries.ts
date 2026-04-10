/** Stats / certifications on the legacy `siteSettings` document (see desk structure). */
export const siteSettingsMiscQuery = `
  *[_type == "siteSettings"] | order(_updatedAt desc) [0] {
    stats,
    "certifications": certifications[] {
      name,
      "logo": logo.asset->url
    }
  }
`;
