export const siteSettingsContactQuery = `
  *[_type == "siteSettings"] | order(_updatedAt desc) [0]{
    phone,
    email,
    addressLine1,
    addressLine2
  }
`;

export type SiteSettingsContact = {
  phone?: string | null;
  email?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
};
