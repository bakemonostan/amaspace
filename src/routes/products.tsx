import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout for `/products`, `/products/:categorySlug`, and `/products/:categorySlug/:productSlug`.
 * Child routes render through <Outlet /> — without it, category and product pages never mount.
 */
export const Route = createFileRoute("/products")({
  component: () => <Outlet />,
});
