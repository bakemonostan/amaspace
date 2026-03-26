export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    phone,
    email,
    address,
    heroHeadline,
    heroSubtext,
    stats,
    "certifications": certifications[] {
      name,
      "logo": logo.asset->url
    }
  }
`;
