import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";

export default defineConfig({
  name: "amaspace",
  title: "Amaspace CMS",
  projectId: "ple8hlx0",
  dataset: "production",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
});
