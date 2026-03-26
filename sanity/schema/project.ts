import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "serviceType",
      type: "string",
      options: { list: ["mep", "fire-safety", "security", "hvac", "elv"] },
    }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "images", type: "array", of: [{ type: "image", options: { hotspot: true } }], validation: (r) => r.min(1) }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "completedAt", type: "date" }),
  ],
});
