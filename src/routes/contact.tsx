import { createFileRoute } from "@tanstack/react-router";
import { ContactScreen } from "@/features/contact";

export const Route = createFileRoute("/contact")({
  component: ContactScreen,
});
