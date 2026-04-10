import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_SITE_CONTACT } from "@/lib/contactDefaults";
import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsContactQuery, type SiteSettingsContact } from "@/lib/sanity/queries/siteSettings.queries";

export type SiteContact = {
  phoneDisplay: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
};

function mergeContact(raw: SiteSettingsContact | null | undefined): SiteContact {
  const d = DEFAULT_SITE_CONTACT;
  return {
    phoneDisplay: raw?.phone?.trim() || d.phoneDisplay,
    email: raw?.email?.trim() || d.email,
    addressLine1: raw?.addressLine1?.trim() || d.addressLine1,
    addressLine2: raw?.addressLine2?.trim() || d.addressLine2,
  };
}

export function useSiteContact(): SiteContact {
  const { data } = useQuery({
    queryKey: ["sanity", "siteSettings", "contact"],
    queryFn: () => sanityClient.fetch<SiteSettingsContact | null>(siteSettingsContactQuery),
    staleTime: 5 * 60 * 1000,
  });
  return useMemo(() => mergeContact(data), [data]);
}
