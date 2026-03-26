import { createFileRoute } from "@tanstack/react-router";
import { ServicesScreen } from "@/features/services";

export const Route = createFileRoute("/services")({
  component: ServicesScreen,
});
