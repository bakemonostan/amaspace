import {defineField, defineType} from 'sanity'

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
    defineField({name: 'fullDescription', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'images', type: 'array', of: [{type: 'image', options: {hotspot: true}}]}),
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
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({name: 'datasheetUrl', type: 'url'}),
  ],
})

export const schemaTypes = [productCategory, product]
