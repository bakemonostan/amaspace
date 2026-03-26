# Amaspace — Sanity CMS Setup & API

> Sanity v3 as headless CMS.
> Studio either embedded at `/studio` (same repo) or deployed separately.
> All data fetched via TanStack Query using GROQ queries.

---

## Setup

```bash
# In project root or a /sanity subfolder
npm create sanity@latest -- --project-id your-id --dataset production --template clean

# Or add to existing Vite project:
npm install @sanity/client @sanity/image-url @portabletext/react
npm install --save-dev sanity
```

**Sanity config (`sanity/sanity.config.ts`):**
```ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'

export default defineConfig({
  name: 'amaspace',
  title: 'Amaspace CMS',
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

---

## Schema Types

### `sanity/schema/index.ts`
```ts
import product from './product'
import productCategory from './productCategory'
import project from './project'
import service from './service'
import specialization from './specialization'
import teamMember from './teamMember'
import siteSettings from './siteSettings'

export const schemaTypes = [
  product,
  productCategory,
  project,
  service,
  specialization,
  teamMember,
  siteSettings,
]
```

---

### `sanity/schema/productCategory.ts`
```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
    defineField({ name: 'icon', type: 'string', title: 'Lucide Icon Name', description: 'e.g. "ShieldCheck", "Flame", "Cpu"' }),
    defineField({ name: 'color', type: 'string', title: 'Accent color', options: { list: ['default', 'fire', 'orange'] } }),
  ],
  preview: { select: { title: 'title' } },
})
```

---

### `sanity/schema/product.ts`
```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Product Name', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'productCode', type: 'string', title: 'Product Code', description: 'e.g. FC726-ZZ' }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      title: 'Category',
      validation: r => r.required(),
    }),
    defineField({
      name: 'specialization',
      type: 'reference',
      to: [{ type: 'specialization' }],
      title: 'Specialization (optional)',
      description: 'Which service area this product belongs to'
    }),
    defineField({ name: 'shortDescription', type: 'text', title: 'Short Description', rows: 3, validation: r => r.required() }),
    defineField({
      name: 'fullDescription',
      type: 'array',
      title: 'Full Description',
      of: [{ type: 'block' }],   // Sanity PortableText / rich text
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'specifications',
      type: 'array',
      title: 'Specifications',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Spec Label' },
          { name: 'value', type: 'string', title: 'Spec Value' },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured on homepage?', initialValue: false }),
    defineField({ name: 'datasheetUrl', type: 'url', title: 'Datasheet URL (PDF link)' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'productCode', media: 'images.0' },
  },
  orderings: [
    { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
})
```

---

### `sanity/schema/project.ts`
```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Project Name', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'client', type: 'string', title: 'Client Name' }),
    defineField({ name: 'location', type: 'string', title: 'Location', description: 'e.g. Victoria Island, Lagos' }),
    defineField({
      name: 'serviceType',
      type: 'string',
      title: 'Primary Service Type',
      options: {
        list: [
          { title: 'MEP', value: 'mep' },
          { title: 'Fire Safety', value: 'fire-safety' },
          { title: 'Security Systems', value: 'security' },
          { title: 'HVAC', value: 'hvac' },
          { title: 'Extra Low Voltage', value: 'elv' },
        ]
      },
    }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Services Delivered',
      of: [{ type: 'string' }],
      description: 'e.g. ["MEP Installation", "Fire Alarm System", "CCTV"]'
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Project Images',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: r => r.min(1),
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured on homepage?', initialValue: false }),
    defineField({ name: 'description', type: 'text', title: 'Project Description', rows: 4 }),
    defineField({
      name: 'completedAt',
      type: 'date',
      title: 'Completion Date',
      options: { dateFormat: 'YYYY-MM' },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'images.0' },
  },
  orderings: [
    { title: 'Newest First', name: 'completedDesc', by: [{ field: 'completedAt', direction: 'desc' }] },
  ],
})
```

---

### `sanity/schema/service.ts`
```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'tagline', type: 'string', title: 'Short tagline (card subtitle)' }),
    defineField({ name: 'icon', type: 'string', title: 'Lucide Icon Name' }),
    defineField({ name: 'shortDescription', type: 'text', rows: 3 }),
    defineField({ name: 'fullDescription', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'highlights',
      type: 'array',
      title: 'Key highlights / what\'s included',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', type: 'number', title: 'Display order' }),
  ],
  preview: { select: { title: 'title', subtitle: 'tagline' } },
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
```

---

### `sanity/schema/specialization.ts`
```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'specialization',
  title: 'Specialization',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'icon', type: 'string', title: 'Lucide Icon Name' }),
    defineField({ name: 'shortDescription', type: 'text', rows: 2 }),
    defineField({ name: 'fullDescription', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Theme accent',
      options: { list: ['default', 'fire', 'orange', 'blue'] },
      initialValue: 'default',
    }),
    defineField({ name: 'order', type: 'number' }),
  ],
  preview: { select: { title: 'title', subtitle: 'shortDescription' } },
})
```

---

### `sanity/schema/teamMember.ts`
```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title', type: 'string', title: 'Job Title', validation: r => r.required() }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', type: 'text', rows: 5 }),
    defineField({ name: 'order', type: 'number', title: 'Display order' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
})
```

---

### `sanity/schema/siteSettings.ts`
```ts
import { defineType, defineField } from 'sanity'

// Singleton — only one document of this type exists
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],   // prevent creating duplicates
  fields: [
    defineField({ name: 'phone', type: 'string', title: 'Phone Number' }),
    defineField({ name: 'email', type: 'string', title: 'Email Address' }),
    defineField({ name: 'address', type: 'text', title: 'Primary Address', rows: 2 }),
    defineField({ name: 'heroHeadline', type: 'string', title: 'Hero Headline' }),
    defineField({ name: 'heroSubtext', type: 'text', title: 'Hero Subtext', rows: 2 }),
    defineField({
      name: 'stats',
      type: 'array',
      title: 'Stats (homepage counter row)',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', type: 'string', title: 'Value (e.g. "10+")' },
          { name: 'label', type: 'string', title: 'Label (e.g. "Projects Completed")' },
        ],
      }],
    }),
    defineField({
      name: 'certifications',
      type: 'array',
      title: 'Certifications / Partner logos',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'logo', type: 'image' },
        ],
      }],
    }),
  ],
})
```

---

## GROQ Queries (`src/lib/sanity/queries/`)

### `products.queries.ts`
```ts
import { groq } from '@sanity/client'

// Fragment reused across queries
const productFields = groq`
  _id,
  title,
  "slug": slug.current,
  productCode,
  shortDescription,
  featured,
  "image": images[0].asset->url,
  "category": category->{ title, "slug": slug.current, icon, color }
`

export const allProductsQuery = groq`
  *[_type == "product"] | order(title asc) {
    ${productFields}
  }
`

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $categorySlug] | order(title asc) {
    ${productFields}
  }
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true][0...6] {
    ${productFields}
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug && category->slug.current == $categorySlug][0] {
    _id,
    title,
    "slug": slug.current,
    productCode,
    shortDescription,
    fullDescription,
    specifications,
    datasheetUrl,
    "images": images[].asset->url,
    "category": category->{ title, "slug": slug.current, icon },
    "related": *[_type == "product" && category._ref == ^.category._ref && slug.current != $slug][0...3] {
      ${productFields}
    }
  }
`

export const allProductCategoriesQuery = groq`
  *[_type == "productCategory"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    color,
    "count": count(*[_type == "product" && references(^._id)])
  }
`

export const productCategoryBySlugQuery = groq`
  *[_type == "productCategory" && slug.current == $categorySlug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    icon
  }
`
```

### `projects.queries.ts`
```ts
import { groq } from '@sanity/client'

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  client,
  location,
  serviceType,
  services,
  description,
  completedAt,
  featured,
  "image": images[0].asset->{ url, metadata { dimensions } }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(completedAt desc) {
    ${projectFields}
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true][0...3] | order(completedAt desc) {
    ${projectFields}
  }
`

export const projectsByServiceTypeQuery = groq`
  *[_type == "project" && serviceType == $serviceType] | order(completedAt desc) {
    ${projectFields}
  }
`
```

### `services.queries.ts`
```ts
import { groq } from '@sanity/client'

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    tagline,
    icon,
    shortDescription,
    featured,
    "image": image.asset->url
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tagline,
    icon,
    shortDescription,
    fullDescription,
    highlights,
    "image": image.asset->url
  }
`
```

### `specializations.queries.ts`
```ts
import { groq } from '@sanity/client'

export const allSpecializationsQuery = groq`
  *[_type == "specialization"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    icon,
    shortDescription,
    color
  }
`

export const specializationBySlugQuery = groq`
  *[_type == "specialization" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    icon,
    shortDescription,
    fullDescription,
    color,
    "image": image.asset->url,
    "relatedProducts": *[_type == "product" && specialization._ref == ^._id][0...6] {
      _id, title, "slug": slug.current, productCode, shortDescription,
      "image": images[0].asset->url,
      "category": category->{ title, "slug": slug.current }
    }
  }
`
```

### `settings.queries.ts`
```ts
import { groq } from '@sanity/client'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    phone,
    email,
    address,
    heroHeadline,
    heroSubtext,
    stats,
    "certifications": certifications[] {
      name,
      "logo": logo.asset->url
    }
  }
`
```

---

## Sanity Client (`src/lib/sanity/client.ts`)

```ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId:  import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:    import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? '2024-01-01',
  useCdn:     true,   // CDN ok — this is a public read-only site
})
```

## Image URL Helper (`src/lib/sanity/image.ts`)

```ts
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Usage:
// urlFor(product.image).width(800).height(600).auto('format').url()
// urlFor(project.image).width(600).height(450).fit('crop').url()
```

---

## Initial Content to Enter (Seed Data)

### Product Categories (3)
```
1. slug: control-panels-detectors
   title: Control Panels & Detectors
   icon: Cpu
   
2. slug: extinguishing-suppression
   title: Extinguishing & Suppression Systems
   icon: Flame
   
3. slug: cylinders-accessories
   title: Cylinders & Accessories
   icon: Gauge
```

### Products to Enter (30 total — see WEEKEND-BUILD-PLAN.md)

### Specializations (6)
```
1. fire-safety        Fire Safety Systems    icon: ShieldAlert   color: fire
2. hvac               HVAC & Mechanical      icon: Wind          color: default
3. electrical-mep     Electrical & MEP       icon: Zap           color: default
4. access-control     Access Control         icon: Lock          color: default
5. cctv-surveillance  CCTV & Surveillance    icon: Camera        color: default
6. extra-low-voltage  Extra Low Voltage      icon: Plug          color: default
```

### Services (3)
```
1. mepf-contracting    MEPF Contracting        order: 1
2. products-supply     Products & Supply       order: 2
3. maintenance         Maintenance Services    order: 3
```

### Projects (10 — from corporate profile PDF):
```
1.  title: Cornerstone Towers MEP Installation
    client: Cornerstone Towers
    location: Victoria Island, Lagos
    serviceType: mep
    featured: true

2.  title: Everty-one Limited Security Systems
    client: Everty-one Limited
    location: Victoria Island, Lagos
    serviceType: security

3.  title: Gateway Mall Fire & Security
    client: Gateway Mall
    location: Abuja
    serviceType: fire-safety
    featured: true

4.  title: Shoprite Cold Room Smoke Detection
    client: Shoprite
    location: Nigeria
    serviceType: fire-safety

5.  title: Black Bell Mall MEP
    client: Black Bell Mall
    location: Ikota
    serviceType: mep
    featured: true

6.  title: Miskay Fashion Store MEP
    client: Miskay
    location: Lekki, Lagos
    serviceType: mep

7.  title: Precise Lighting HQ MEP
    client: Precise Lighting
    location: Lagos
    serviceType: mep

8.  title: Blu Atlantic Hotel MEP
    client: Blu Atlantic Hotel
    location: Lagos
    serviceType: mep

9.  title: 120 Apartment Complex ELV
    client: Confidential
    location: Lekki, Lagos
    serviceType: elv

10. title: Miskay Fashion House Ghana
    client: Miskay
    location: Accra, Ghana
    serviceType: mep
```
