import { useEffect } from "react";
import { getOrganizationJsonLd } from "@/lib/seo/config";

const SCRIPT_ID = "amaspace-organization-jsonld";

/**
 * Injects Organization schema.org JSON-LD once (corporate profile–aligned).
 */
export function OrganizationJsonLd() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(getOrganizationJsonLd());
    document.head.appendChild(script);
  }, []);

  return null;
}
