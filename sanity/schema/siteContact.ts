import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteContact",
  title: "Site contact",
  type: "document",
  preview: {
    select: { email: "email" },
    prepare({ email }) {
      return {
        title: "Site contact",
        subtitle: email ? String(email) : "Phone, email, address",
      };
    },
  },
  fields: [
    defineField({
      name: "phone",
      type: "string",
      title: "Phone (display)",
      description: "Shown on the site, e.g. +234 807 981 3950",
    }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "addressLine1", type: "string", title: "Address line 1" }),
    defineField({ name: "addressLine2", type: "string", title: "Address line 2" }),
  ],
});
