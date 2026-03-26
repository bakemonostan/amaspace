import { createFileRoute } from "@tanstack/react-router";
import { SpecializationsScreen } from "@/features/specializations";

export const Route = createFileRoute("/specializations")({
  component: SpecializationsScreen,
});
