import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout parent for `/services` and `/services/:serviceSlug`.
 * Child routes must render via <Outlet /> — without it, detail pages never mount.
 */
export const Route = createFileRoute("/services")({
  component: () => <Outlet />,
});
