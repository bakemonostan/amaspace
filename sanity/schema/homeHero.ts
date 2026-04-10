import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeHero",
  title: "Home hero",
  type: "document",
  preview: {
    prepare() {
      return { title: "Home hero", subtitle: "Homepage top section" };
    },
  },
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description: "Small pill above the headline, e.g. Engineering excellence",
    }),
    defineField({
      name: "titleLead",
      type: "string",
      title: "Title (before highlight)",
      description: "Main headline before the orange word(s).",
    }),
    defineField({
      name: "titleHighlight",
      type: "string",
      title: "Title highlight (orange)",
      description: "Orange segment, e.g. reliability.",
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 4,
      title: "Intro paragraph",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Main image",
      options: { hotspot: true },
      description: "If empty, the placeholder URL below is used.",
    }),
    defineField({
      name: "placeholderImageUrl",
      type: "url",
      title: "Placeholder image URL",
      description: "Used when no main image is uploaded (defaults on the site match the current hero photo).",
    }),
    defineField({
      name: "imageAlt",
      type: "string",
      title: "Image alt text",
    }),
  ],
});
