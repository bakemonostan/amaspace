/** Used when Sanity has no site settings yet or fields are empty. */
export const DEFAULT_SITE_CONTACT = {
  phoneDisplay: "+234 807 981 3950",
  email: "amaspaceproject@yahoo.com",
  addressLine1: "No. S2 Premier 1 Estate",
  addressLine2: "Lekki-Epe Express, Lagos",
} as const;

export function mailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}

/** Build tel: href from a display phone string (spaces allowed). */
export function telHref(phoneDisplay: string): string {
  const digits = phoneDisplay.replace(/\D/g, "");
  return digits ? `tel:+${digits.replace(/^\+/, "")}` : "tel:";
}

/** E.164-style for JSON-LD (leading +). */
export function phoneToE164(phoneDisplay: string): string {
  const digits = phoneDisplay.replace(/\D/g, "");
  return digits ? `+${digits}` : "";
}
