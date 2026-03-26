import { createFileRoute } from "@tanstack/react-router";
import { AboutScreen } from "@/features/about";

export const Route = createFileRoute("/about")({
  component: AboutScreen,
});
