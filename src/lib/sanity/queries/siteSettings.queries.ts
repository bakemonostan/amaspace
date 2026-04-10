/** Contact + hero are separate document types (see desk structure). */
export const singletonPageQuery = `{
  "contact": *[_type == "siteContact"] | order(_updatedAt desc) [0]{ phone, email, addressLine1, addressLine2 },
  "hero": *[_type == "homeHero"] | order(_updatedAt desc) [0]{ eyebrow, titleLead, titleHighlight, intro, image, placeholderImageUrl, imageAlt }
}`;

/** @deprecated Use singletonPageQuery */
export const siteSettingsQuery = singletonPageQuery;
export const siteSettingsContactQuery = singletonPageQuery;

export type SiteContactDoc = {
  phone?: string | null;
  email?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
};

export type HomeHeroDoc = {
  eyebrow?: string | null;
  titleLead?: string | null;
  titleHighlight?: string | null;
  intro?: string | null;
  image?: unknown;
  placeholderImageUrl?: string | null;
  imageAlt?: string | null;
};

export type SingletonPageData = {
  contact: SiteContactDoc | null;
  hero: HomeHeroDoc | null;
};

export type SiteSettingsContact = SiteContactDoc;
