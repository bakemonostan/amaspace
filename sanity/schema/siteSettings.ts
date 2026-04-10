import { defineField, defineType } from "sanity";

/**
 * Optional extras (stats strip, certification logos). Contact and home hero live in their own document types.
 */
export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  preview: {
    prepare() {
      return {
        title: "Site settings",
        subtitle: "Stats, certifications",
      };
    },
  },
  fields: [
    defineField({
      name: "stats",
      type: "array",
      title: "Stats",
      of: [{ type: "object", fields: [{ name: "value", type: "string" }, { name: "label", type: "string" }] }],
    }),
    defineField({
      name: "certifications",
      type: "array",
      title: "Certifications",
      of: [{ type: "object", fields: [{ name: "name", type: "string" }, { name: "logo", type: "image" }] }],
    }),
  ],
});
