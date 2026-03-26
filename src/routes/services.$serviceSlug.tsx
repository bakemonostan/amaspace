import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailScreen } from "@/features/services";

export const Route = createFileRoute("/services/$serviceSlug")({
  component: ServiceDetailScreen,
});
