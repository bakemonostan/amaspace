import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout for `/products/:categorySlug` and `/products/:categorySlug/:productSlug`.
 * Category landing uses `products.$categorySlug.index.tsx`; detail is a child route.
 */
export const Route = createFileRoute("/products/$categorySlug")({
  component: () => <Outlet />,
});
