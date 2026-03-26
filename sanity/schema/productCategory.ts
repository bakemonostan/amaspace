import { defineField, defineType } from "sanity";

export default defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", title: "Description", rows: 3 }),
    defineField({ name: "icon", type: "string", title: "Lucide Icon Name" }),
    defineField({ name: "color", type: "string", title: "Accent color", options: { list: ["default", "fire", "orange"] } }),
    defineField({
      name: "categoryType",
      type: "string",
      title: "Category Type",
      options: {
        list: [
          { title: "Major Category", value: "major" },
          { title: "Sub Category", value: "sub" },
        ],
      },
      initialValue: "sub",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "parentCategory",
      type: "reference",
      title: "Parent Major Category",
      to: [{ type: "productCategory" }],
      hidden: ({ document }) => document?.categoryType !== "sub",
      validation: (r) =>
        r.custom((value, context) => {
          const isSub = context.document?.categoryType === "sub";
          if (isSub && !value) return "Sub categories must select a parent major category";
          return true;
        }),
    }),
    defineField({ name: "order", type: "number", title: "Display Order", initialValue: 100 }),
    defineField({ name: "isActive", type: "boolean", title: "Active", initialValue: true }),
  ],
  preview: {
    select: {
      title: "title",
      type: "categoryType",
      parentTitle: "parentCategory.title",
    },
    prepare({ title, type, parentTitle }) {
      const subtitle = type === "major" ? "Major Category" : `Sub Category${parentTitle ? ` - ${parentTitle}` : ""}`;
      return { title, subtitle };
    },
  },
});
