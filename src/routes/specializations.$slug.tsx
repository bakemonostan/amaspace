import { createFileRoute } from "@tanstack/react-router";
import { SpecializationDetailScreen } from "@/features/specializations";

export const Route = createFileRoute("/specializations/$slug")({
  component: SpecializationDetailScreen,
});
