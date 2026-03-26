import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "shortDescription", type: "text", rows: 3 }),
    defineField({ name: "fullDescription", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: true }),
    defineField({ name: "order", type: "number" }),
  ],
});
