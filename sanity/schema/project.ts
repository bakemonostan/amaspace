import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      title: "Portfolio category",
      description: "Shown on cards (e.g. Commercial, Retail, Industrial).",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "In progress", value: "ongoing" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
    }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "serviceType",
      type: "string",
      options: { list: ["mep", "fire-safety", "security", "hvac", "elv"] },
    }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Main photo on the portfolio card. If empty, the first gallery image is used.",
    }),
    defineField({
      name: "coverAlt",
      title: "Cover image alt text",
      type: "string",
      description: "Short description for accessibility (e.g. high-rise facade at dusk).",
    }),
    defineField({
      name: "images",
      title: "Gallery images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Optional extra photos. First image is used as cover when Cover image is empty.",
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      title: "Summary",
      description: "Short text on portfolio cards.",
    }),
    defineField({ name: "completedAt", type: "date" }),
    defineField({
      name: "sortOrder",
      type: "number",
      title: "Sort order",
      description: "Lower numbers appear first on the portfolio page.",
      initialValue: 100,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((doc) => {
      const d = doc as { coverImage?: unknown; images?: unknown[] } | undefined;
      if (!d?.coverImage && (!d?.images || d.images.length === 0)) {
        return "Add a cover image or at least one gallery image.";
      }
      return true;
    }),
});
