import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import VaultClient, { Hero, Tag } from '@/components/VaultClient' 

export default async function HomePage() {
  const payload = await getPayload({ config })
  
  // 1. Fetch initial heroes (LIMIT TO 12)
  const result = await payload.find({ 
    collection: 'heroship', 
    depth: 1, 
    limit: 12, 
    page: 1,
  })

  const { docs: tags } = await payload.find({
    collection: 'tags',
    limit: 100,
  })

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 p-6 mt-16 md:mt-12 lg:mt-6 md:p-12 lg:p-16">

      {/* Pass the initial data AND the pagination state to the Client Component */}
      <VaultClient 
        initialHeros={result.docs as unknown as Hero[]} 
        initialHasNextPage={result.hasNextPage}
        availableTags={tags as unknown as Tag[]} 
      />
    </main>
  )
}