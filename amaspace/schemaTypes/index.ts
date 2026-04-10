import {defineField, defineType} from 'sanity'
// Single source of truth: shared schemas in repo `sanity/schema/`.
import project from '../../sanity/schema/project'
import siteSettings from '../../sanity/schema/siteSettings'

const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryType',
      type: 'string',
      options: {
        list: [
          {title: 'Major Category', value: 'major'},
          {title: 'Sub Category', value: 'sub'},
        ],
      },
      initialValue: 'sub',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentCategory',
      type: 'reference',
      to: [{type: 'productCategory'}],
      hidden: ({document}) => document?.categoryType !== 'sub',
    }),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'icon', type: 'string'}),
    defineField({name: 'color', type: 'string', options: {list: ['default', 'fire', 'orange']}}),
    defineField({name: 'order', type: 'number', initialValue: 100}),
    defineField({name: 'isActive', type: 'boolean', initialValue: true}),
  ],
})

const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'productCode', type: 'string'}),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Sub Category',
      to: [{type: 'productCategory'}],
      options: {filter: 'categoryType == "sub" && isActive == true'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'shortDescription', type: 'text', rows: 3}),
    defineField({
      name: 'badgeLabel',
      type: 'string',
      title: 'Hero badge',
      description: 'Optional pill on the product image (e.g. Industrial grade).',
    }),
    defineField({
      name: 'keyFeatures',
      type: 'array',
      title: 'Key features (hero bullets)',
      of: [{type: 'string'}],
    }),
    defineField({name: 'fullDescription', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'productImage',
      title: 'Product Image (Main)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'productImages',
      title: 'Product Images (Gallery)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'detailHighlightsSectionTitle',
      type: 'string',
      title: 'Highlights section title',
      initialValue: 'Unmatched Technical Superiority',
    }),
    defineField({
      name: 'detailHighlights',
      type: 'array',
      title: 'Technical highlights (3-column)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Radio / detection', value: 'radio'},
                  {title: 'Cloud / remote', value: 'cloud'},
                  {title: 'Shield / reliability', value: 'shield'},
                  {title: 'Zap / power', value: 'zap'},
                  {title: 'CPU / control', value: 'cpu'},
                  {title: 'Flame', value: 'flame'},
                  {title: 'Bell / alarm', value: 'bell'},
                  {title: 'Package', value: 'package'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'shield',
            }),
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text', rows: 3}),
          ],
        },
      ],
    }),
    defineField({name: 'specificationsIntro', type: 'text', rows: 3, title: 'Specifications intro'}),
    defineField({name: 'technicalLeadNote', type: 'text', rows: 3, title: 'Technical lead note'}),
    defineField({
      name: 'specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'value', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'documents',
      type: 'array',
      title: 'Technical documents',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'subtitle', type: 'string'}),
            defineField({name: 'file', type: 'file', options: {accept: 'application/pdf'}}),
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedProducts',
      type: 'array',
      title: 'Related products',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
    defineField({name: 'installationBookingUrl', type: 'url', title: 'Book installation URL'}),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({name: 'datasheetUrl', type: 'url', title: 'Legacy datasheet URL'}),
  ],
})

export const schemaTypes = [productCategory, product, project, siteSettings]
