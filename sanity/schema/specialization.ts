import { defineField, defineType } from "sanity";

export default defineType({
  name: "specialization",
  title: "Specialization",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "shortDescription", type: "text", rows: 2 }),
    defineField({ name: "fullDescription", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "color", type: "string", options: { list: ["default", "fire", "orange", "blue"] }, initialValue: "default" }),
    defineField({ name: "order", type: "number" }),
  ],
});
