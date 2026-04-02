// import type { CollectionConfig } from 'payload'

// export const Heroship: CollectionConfig = {
//   slug: 'heroship',
//   admin: { useAsTitle: 'name' },
//   access: { read: () => true },
//   fields: [
//     { name: 'name', type: 'text', required: true },
//     { name: 'link', type: 'text', required: true },
//     { name: 'image', type: 'upload', relationTo: 'media', required: true },
//     { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
//   ],
// }
import type { CollectionConfig } from 'payload'

export const Heroship: CollectionConfig = {
  slug: 'heroship',
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // We only trigger GitHub if we are CREATING a new entry with a link
        if (operation === 'create' && doc.link) {
          const githubToken = process.env.GITHUB_TOKEN
          const githubRepo = process.env.GITHUB_REPO // e.g. "yourname/hello"

          try {
            await fetch(`https://api.github.com/repos/${githubRepo}/dispatches`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${githubToken}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'User-Agent': 'Payload-CMS',
              },
              body: JSON.stringify({
                event_type: 'capture-hero',
                client_payload: {
                  url: doc.link,
                  id: doc.id,
                },
              }),
            })
            console.log('🚀 GitHub Dispatch Sent!')
          } catch (err) {
            console.error('❌ Failed to trigger GitHub:', err)
          }
        }
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'link', type: 'text', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
  ],
}