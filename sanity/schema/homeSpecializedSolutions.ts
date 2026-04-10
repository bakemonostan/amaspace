import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "homeSpecializedSolutions",
  title: "Home — Specialized solutions",
  type: "document",
  preview: {
    prepare() {
      return { title: "Specialized solutions", subtitle: "Homepage section" };
    },
  },
  fields: [
    defineField({ name: "sectionTitle", type: "string", title: "Section title" }),
    defineField({ name: "sectionIntro", type: "text", rows: 3, title: "Intro paragraph" }),
    defineField({
      name: "solutions",
      type: "array",
      title: "Solution rows",
      of: [
        defineArrayMember({
          type: "object",
          name: "specializedSolutionItem",
          fields: [
            defineField({
              name: "key",
              type: "string",
              title: "Row id",
              description: "Short id for the active tab (e.g. fire, bms). Unique per row.",
            }),
            defineField({
              name: "icon",
              type: "string",
              title: "Icon",
              options: {
                list: [
                  { title: "Flame", value: "flame" },
                  { title: "None (spacer)", value: "none" },
                  { title: "Wind", value: "wind" },
                  { title: "Zap", value: "zap" },
                ],
                layout: "dropdown",
              },
              initialValue: "none",
            }),
            defineField({
              name: "accent",
              type: "string",
              title: "Accent",
              options: {
                list: [
                  { title: "Fire (red border & CTA)", value: "fire" },
                  { title: "Blue / navy", value: "blue" },
                ],
                layout: "radio",
              },
              initialValue: "blue",
            }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 4 }),
            defineField({ name: "ctaLabel", type: "string", title: "CTA label" }),
            defineField({
              name: "ctaPath",
              type: "string",
              title: "CTA path",
              description: "e.g. /services/fire-safety-systems or /services",
            }),
          ],
          preview: {
            select: { title: "title", key: "key" },
            prepare({ title, key }) {
              return { title: title || "Solution", subtitle: key };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "imageLeft",
      type: "image",
      title: "Left column image",
      options: { hotspot: true },
    }),
    defineField({
      name: "placeholderImageLeftUrl",
      type: "url",
      title: "Left placeholder image URL",
    }),
    defineField({ name: "imageLeftAlt", type: "string", title: "Left image alt" }),
    defineField({
      name: "imageRight",
      type: "image",
      title: "Right column image",
      options: { hotspot: true },
    }),
    defineField({
      name: "placeholderImageRightUrl",
      type: "url",
      title: "Right placeholder image URL",
    }),
    defineField({ name: "imageRightAlt", type: "string", title: "Right image alt" }),
  ],
});
