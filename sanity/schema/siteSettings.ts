import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "address", type: "text", rows: 2 }),
    defineField({ name: "heroHeadline", type: "string" }),
    defineField({ name: "heroSubtext", type: "text", rows: 2 }),
    defineField({
      name: "stats",
      type: "array",
      of: [{ type: "object", fields: [{ name: "value", type: "string" }, { name: "label", type: "string" }] }],
    }),
    defineField({
      name: "certifications",
      type: "array",
      of: [{ type: "object", fields: [{ name: "name", type: "string" }, { name: "logo", type: "image" }] }],
    }),
  ],
});
