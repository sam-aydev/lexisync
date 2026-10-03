import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // --- Core Content ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(70), // Keep SEO titles optimal
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }, // Allows editors to crop images safely
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }], // Sanity's Portable Text
    }),
    
    // --- SEO & Meta Group ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by Google.'),
        }),
        defineField({
          name: 'openGraphImage',
          title: 'Social Share Image (Open Graph)',
          type: 'image',
          description: 'Image displayed when sharing on Twitter/LinkedIn (Recommended: 1200x630px).',
        }),
        defineField({
          name: 'keywords',
          title: 'Target Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ]
    }),
  ],
})