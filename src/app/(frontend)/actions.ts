'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getFilteredHeros(tagIds: (string | number)[]) {
  const payload = await getPayload({ config })

  try {
    // We use Payload's Local API here, which is much faster and safer than a REST URL
    const { docs } = await payload.find({
      collection: 'heroship',
      depth: 1,
      limit: 100,
      where: {
        tags: {
          in: tagIds,
        },
      },
    })

    return docs
  } catch (error) {
    console.error("🚨 Payload Local API Error:", error)
    return [] // Return empty array on error to prevent crashes
  }
}