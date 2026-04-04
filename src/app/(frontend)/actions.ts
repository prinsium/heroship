'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getFilteredHeros(tagIds: (string | number)[], page: number = 1, limit: number = 12) {
  const payload = await getPayload({ config })

  try {
    // Build the query object dynamically
    const query: any = {
      collection: 'heroship',
      depth: 1,
      limit: limit,
      page: page,
    }

    // Only add the tags filter if the user actually selected some
    if (tagIds.length > 0) {
      query.where = {
        tags: {
          in: tagIds,
        },
      }
    }

    const result = await payload.find(query)

    // Return the documents AND the pagination info
    return {
      docs: result.docs,
      hasNextPage: result.hasNextPage, 
    }
  } catch (error) {
    console.error("🚨 Payload Local API Error:", error)
    return { docs: [], hasNextPage: false }
  }
}