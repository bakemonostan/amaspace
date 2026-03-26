import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Product Name", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "productCode", type: "string", title: "Product Code" }),
    defineField({
      name: "category",
      type: "reference",
      title: "Sub Category",
      to: [{ type: "productCategory" }],
      options: {
        filter: 'categoryType == "sub" && isActive == true',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "specialization", type: "reference", to: [{ type: "specialization" }] }),
    defineField({ name: "shortDescription", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "fullDescription", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "productImage",
      title: "Product Image (Main)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "productImages",
      title: "Product Images (Gallery)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "specifications",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "value", type: "string" }] }],
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "datasheetUrl", type: "url" }),
  ],
});
