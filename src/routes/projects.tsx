import { createFileRoute } from "@tanstack/react-router";
import { ProjectsScreen } from "@/features/projects";

export const Route = createFileRoute("/projects")({
  component: ProjectsScreen,
});
