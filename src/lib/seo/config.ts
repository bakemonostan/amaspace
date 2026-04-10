import type { SiteContact } from "@/hooks/useSiteContact";
import { DEFAULT_SITE_CONTACT, phoneToE164 } from "@/lib/contactDefaults";

/**
 * Site-wide SEO copy aligned with Amaspace Corporate Profile (Nigeria, MEP, fire safety, ISO 9001).
 * Update VITE_SITE_URL in .env for accurate canonical & Open Graph URLs in production.
 */
export const SITE_NAME = "Amaspace";
export const SITE_LEGAL_NAME = "Amaspace Building Service Company";

export const DEFAULT_TITLE = `${SITE_NAME} | MEP, fire safety & building services in Nigeria`;

export const DEFAULT_DESCRIPTION =
  "Amaspace delivers electrical, mechanical, plumbing, fire safety, security, and project management for buildings and infrastructure across Nigeria—ISO 9001–aligned quality, seasoned engineers, and safe delivery on site.";

export const DEFAULT_KEYWORDS =
  "Amaspace, building services Nigeria, MEP Lagos, fire safety systems, electrical engineering Nigeria, HVAC Nigeria, plumbing commercial buildings, security systems, ELV, project management, ISO 9001, Lekki engineering";

export const SITE_LOCALE = "en_NG";

/** Fallbacks only; prefer `useSiteContact()` in UI. */
export const CONTACT = {
  phoneDisplay: DEFAULT_SITE_CONTACT.phoneDisplay,
  phoneE164: phoneToE164(DEFAULT_SITE_CONTACT.phoneDisplay),
  email: DEFAULT_SITE_CONTACT.email,
  streetAddress: DEFAULT_SITE_CONTACT.addressLine1,
  addressLocality: "Lagos",
  addressRegion: "Lagos State",
  addressCountry: "NG",
} as const;

export function siteOrigin(): string {
  const fromEnv = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

export function absoluteUrl(path: string): string {
  const base = siteOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}

/** Organization structured data for JSON-LD (aligned with corporate profile). */
export function getOrganizationJsonLd(contact?: SiteContact): Record<string, unknown> {
  const url = siteOrigin();
  const c = contact ?? {
    phoneDisplay: DEFAULT_SITE_CONTACT.phoneDisplay,
    email: DEFAULT_SITE_CONTACT.email,
    addressLine1: DEFAULT_SITE_CONTACT.addressLine1,
    addressLine2: DEFAULT_SITE_CONTACT.addressLine2,
  };
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_LEGAL_NAME,
    alternateName: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    email: c.email,
    telephone: phoneToE164(c.phoneDisplay),
    address: {
      "@type": "PostalAddress",
      streetAddress: [c.addressLine1, c.addressLine2].filter(Boolean).join(", "),
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    areaServed: { "@type": "Country", name: "Nigeria" },
    knowsAbout: [
      "MEP engineering",
      "Fire safety and life safety systems",
      "Electrical and mechanical building services",
      "Security, CCTV, and access control",
      "Project and construction management",
    ],
  };
  if (url) {
    org.url = url;
    org.logo = absoluteUrl("/amaspace-logo-icon.jpeg");
  }
  return org;
}
