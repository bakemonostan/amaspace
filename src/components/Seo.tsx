import { useRouterState } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { applySeoMeta, type SeoMetaInput } from "@/lib/seo/applySeoMeta";

export type SeoProps = Omit<SeoMetaInput, "pathname"> & { pathname?: string };

/**
 * Sets title, description, canonical, Open Graph, and Twitter tags on each route.
 */
export function Seo(props: SeoProps) {
  const routePath = useRouterState({ select: (s) => s.location.pathname });

  useLayoutEffect(() => {
    applySeoMeta({
      title: props.title,
      description: props.description,
      isHome: props.isHome,
      ogImage: props.ogImage,
      noindex: props.noindex,
      pathname: props.pathname ?? routePath,
    });
  }, [
    props.title,
    props.description,
    props.pathname,
    routePath,
    props.isHome,
    props.ogImage,
    props.noindex,
  ]);

  return null;
}
