'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Navbar from './Navbar'
import { getFilteredHeros } from '@/app/(frontend)/actions' // <-- NEW: Import Server Action

export interface Hero {
  id: string | number;
  link: string;
  name?: string;
  tags?: any[] | null; 
}

export interface Tag {
  id: string | number;
  title: string;
}

interface VaultClientProps {
  initialHeros: Hero[];
  availableTags: Tag[];
}

export default function VaultClient({ initialHeros, availableTags }: VaultClientProps) {
  const [heros, setHeros] = useState<Hero[]>(initialHeros)
  const [isLoading, setIsLoading] = useState(false)

  const fetchFilteredHeros = async (selectedTagIds: (string | number)[]) => {
    // If no filters are selected, reset to the initial payload data
    if (selectedTagIds.length === 0) {
      setHeros(initialHeros)
      return
    }

    setIsLoading(true)
    try {
      // NEW: Call the Server Action directly! No fetch URLs, no REST API syntax errors.
      const docs = await getFilteredHeros(selectedTagIds)
      
      if (docs) {
        setHeros(docs as Hero[])
      } else {
        setHeros([])
      }
      
    } catch (error) {
      console.error("🚨 Server Action Error:", error)
      setHeros([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar availableTags={availableTags} onApplyFilters={fetchFilteredHeros} />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full text-zinc-500 py-10 text-center">Filtering vault...</div>
        ) : (!heros || heros.length === 0) ? (
          <div className="col-span-full text-zinc-500 py-10 text-center">No heroes found for these tags.</div>
        ) : (
          heros.map((hero) => (
            <div key={hero.id} className="group flex flex-col gap-1 p-2 rounded-lg bg-zinc-900">
              <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-zinc-900 border border-white/[0.08] transition-all duration-500">
                <Image 
                  src={`/captures/${hero.id}.png`} 
                  alt={hero.link || 'Hero image'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                  unoptimized
                />
              </div>

              <div className="flex items-start flex-row justify-between mt-1">
                <a href={hero.link} target="_blank" rel="noopener noreferrer" className='w-full group/link'>
                  <div className="bg-[#18181B] border-[0.1px] border-gray-700 w-full px-2 py-1 rounded-md group-hover/link:bg-[#101828] transition-colors duration-300 overflow-hidden">
                    <h5 className="text-[13px] text-zinc-300 group-hover/link:text-[#05DF72] truncate transition-colors duration-300">
                      {hero.link}
                    </h5>
                  </div>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}