import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeFeaturedProjects",
  title: "Home — Featured projects",
  type: "document",
  preview: {
    prepare() {
      return { title: "Featured projects", subtitle: "Homepage section" };
    },
  },
  fields: [
    defineField({ name: "sectionTitle", type: "string", title: "Section title" }),
    defineField({ name: "sectionSubtitle", type: "text", rows: 3, title: "Section subtitle" }),
    defineField({ name: "ctaLabel", type: "string", title: "Button label" }),
    defineField({
      name: "ctaPath",
      type: "string",
      title: "Button path",
      description: "e.g. /projects",
      initialValue: "/projects",
    }),
    defineField({
      name: "projects",
      type: "array",
      title: "Projects to show (max 3)",
      description: "Pick from existing projects. If empty, the site uses projects marked “featured”.",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
