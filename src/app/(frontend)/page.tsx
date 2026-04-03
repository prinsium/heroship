
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs: heros } = await payload.find({ collection: 'heroship', depth: 1, limit: 100, })

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 p-6 md:p-12 lg:p-16">
      {/* Header Area */}
      <header className="max-w-[1600px] mx-auto mb-16">
        <h1 className="text-xl font-medium text-white mb-1">Vault</h1>
        <p className="text-zinc-500 text-sm">Curated hero sections and landing page inspiration.</p>
      </header>

      {/* The Responsive Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {heros.map((hero) => (
          <div key={hero.id} className="group flex flex-col gap-1 p-2 rounded-lg bg-zinc-900">
            {/* Image Container with Osmo-style rounding and border */}
            <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-zinc-900 border border-white/[0.08] transition-all duration-500">
              <Image 
                src={`/captures/${hero.id}.png`} 
                alt={hero.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                unoptimized
              />
            </div>

            {/* Content Section: Refined Typography */}


            <div className="flex items-start flex-row justify-between">
              
              <a href={hero.link} target="_blank" rel="noopener noreferrer" className='w-full group'>
                <div className="bg-[#18181B] border-[0.1px] border-gray-700 w-full px-1 rounded-md group-hover:bg-[#101828] transition-colors duration-300">
                <h5 className="text-[14px] text-white group-hover:text-[#05DF72]">{hero.link}</h5>
              </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}