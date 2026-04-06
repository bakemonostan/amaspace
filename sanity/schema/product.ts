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
    defineField({
      name: "badgeLabel",
      type: "string",
      title: "Hero badge",
      description: 'Optional pill on the product image (e.g. "Industrial grade").',
    }),
    defineField({
      name: "keyFeatures",
      type: "array",
      title: "Key features (hero bullets)",
      of: [{ type: "string" }],
    }),
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
      name: "detailHighlightsSectionTitle",
      type: "string",
      title: "Highlights section title",
      initialValue: "Unmatched Technical Superiority",
    }),
    defineField({
      name: "detailHighlights",
      type: "array",
      title: "Technical highlights (3-column)",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              title: "Icon",
              options: {
                list: [
                  { title: "Radio / detection", value: "radio" },
                  { title: "Cloud / remote", value: "cloud" },
                  { title: "Shield / reliability", value: "shield" },
                  { title: "Zap / power", value: "zap" },
                  { title: "CPU / control", value: "cpu" },
                  { title: "Flame", value: "flame" },
                  { title: "Bell / alarm", value: "bell" },
                  { title: "Package", value: "package" },
                ],
                layout: "dropdown",
              },
              initialValue: "shield",
            }),
            defineField({ name: "title", type: "string", title: "Title", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", title: "Description", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: "specificationsIntro",
      type: "text",
      title: "Specifications intro",
      rows: 3,
      description: "Short copy above the technical specifications table.",
    }),
    defineField({
      name: "technicalLeadNote",
      type: "text",
      title: "Technical lead note",
      rows: 3,
      description: "Optional callout quote next to the specifications table.",
    }),
    defineField({
      name: "specifications",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "value", type: "string" }] }],
    }),
    defineField({
      name: "documents",
      type: "array",
      title: "Technical documents",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "subtitle",
              type: "string",
              description: "Optional line under the title (e.g. PDF · 2.4 MB). Filled from file if left empty.",
            }),
            defineField({
              name: "file",
              type: "file",
              options: { accept: "application/pdf" },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "relatedProducts",
      type: "array",
      title: "Related products",
      description: "Curated picks for “Similar products”. If empty, others from the same sub-category are suggested.",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "installationBookingUrl",
      type: "url",
      title: "Book installation URL",
      description: "External booking link. If empty, “Book installation” goes to Request a quote.",
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "datasheetUrl",
      type: "url",
      title: "Legacy datasheet URL",
      description: "Optional. Shown as a download card if no documents are uploaded.",
    }),
  ],
});
