import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      type: "string",
      title: "Phone (display)",
      description: "Shown on the site, e.g. +234 807 981 3950",
    }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({
      name: "addressLine1",
      type: "string",
      title: "Address line 1",
    }),
    defineField({
      name: "addressLine2",
      type: "string",
      title: "Address line 2",
    }),
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
