import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  SITE_LEGAL_NAME,
  SITE_LOCALE,
  SITE_NAME,
} from "@/lib/seo/config";

export type SeoMetaInput = {
  /** Shown in <title> before the site suffix (except when isHome). */
  title: string;
  description?: string;
  /** Path including leading slash; defaults to current route from Seo component. */
  pathname?: string;
  /** When true, <title> is exactly `title` (full homepage title). */
  isHome?: boolean;
  ogImage?: string;
  noindex?: boolean;
};

function ensureMeta(attr: "name" | "property", key: string, content: string) {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function ensureLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      el.setAttribute(k, v);
    }
  }
}

function removeMeta(attr: "name" | "property", key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

/**
 * Updates document title and standard meta / Open Graph / Twitter tags for SPA navigation.
 */
export function applySeoMeta(input: SeoMetaInput & { pathname: string }): void {
  const description = (input.description ?? DEFAULT_DESCRIPTION).trim();
  const fullTitle = input.isHome ? input.title : `${input.title} | ${SITE_NAME}`;
  document.title = fullTitle;

  ensureMeta("name", "description", description);
  ensureMeta("name", "keywords", DEFAULT_KEYWORDS);
  ensureMeta("name", "author", SITE_LEGAL_NAME);
  ensureMeta("name", "robots", input.noindex ? "noindex, nofollow" : "index, follow");

  const path = input.pathname.startsWith("/") ? input.pathname : `/${input.pathname}`;
  const url = absoluteUrl(path);
  if (url.startsWith("http")) {
    ensureLink("canonical", url);
  }

  ensureMeta("property", "og:site_name", SITE_NAME);
  ensureMeta("property", "og:title", fullTitle);
  ensureMeta("property", "og:description", description);
  ensureMeta("property", "og:type", "website");
  ensureMeta("property", "og:locale", SITE_LOCALE.replace("_", "-"));
  if (url.startsWith("http")) {
    ensureMeta("property", "og:url", url);
  }

  const resolvedOg =
    input.ogImage?.startsWith("http") ? input.ogImage : absoluteUrl("/amaspace-logo-full.jpeg");

  if (resolvedOg.startsWith("http")) {
    ensureMeta("property", "og:image", resolvedOg);
    ensureMeta("property", "og:image:alt", `${SITE_NAME} — ${SITE_LEGAL_NAME}`);
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:image", resolvedOg);
  } else {
    removeMeta("property", "og:image");
    removeMeta("property", "og:image:alt");
    removeMeta("name", "twitter:image");
    ensureMeta("name", "twitter:card", "summary");
  }

  ensureMeta("name", "twitter:title", fullTitle);
  ensureMeta("name", "twitter:description", description);
}
