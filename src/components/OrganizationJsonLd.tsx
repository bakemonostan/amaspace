import { useEffect } from "react";
import { useSiteContact } from "@/hooks/useSiteContact";
import { getOrganizationJsonLd } from "@/lib/seo/config";

const SCRIPT_ID = "amaspace-organization-jsonld";

/**
 * Injects Organization schema.org JSON-LD (contact from Sanity when available).
 */
export function OrganizationJsonLd() {
  const contact = useSiteContact();

  useEffect(() => {
    let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = SCRIPT_ID;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(getOrganizationJsonLd(contact));
  }, [contact]);

  return null;
}
