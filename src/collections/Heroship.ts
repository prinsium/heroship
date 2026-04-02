import type { CollectionConfig } from 'payload'

export const Heroship: CollectionConfig = {
  slug: 'heroship',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'link', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
  ],
}