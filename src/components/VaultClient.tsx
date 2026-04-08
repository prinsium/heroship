'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Navbar from './Navbar'
import { getFilteredHeros } from '@/app/(frontend)/actions' 

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
  initialHasNextPage: boolean;
  availableTags: Tag[];
}

export default function VaultClient({ initialHeros, initialHasNextPage, availableTags }: VaultClientProps) {
  // 1. Grid State
  const [heros, setHeros] = useState<Hero[]>(initialHeros)
  const [isLoading, setIsLoading] = useState(false) // For full resets (applying filters)
  
  // 2. Pagination State
  const [currentTags, setCurrentTags] = useState<(string | number)[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasNextPage)
  const [isLoadingMore, setIsLoadingMore] = useState(false) // For background fetching page 2, 3, etc.

  // 3. The scroll observer target
  const observerTarget = useRef<HTMLDivElement>(null)

  // -- FILTER ACTION (Resets everything to page 1) --
  const handleApplyFilters = async (selectedTagIds: (string | number)[]) => {
    setIsLoading(true)
    setCurrentTags(selectedTagIds)
    setPage(1) // Reset back to page 1

    try {
      const result = await getFilteredHeros(selectedTagIds, 1, 12)
      if (result && result.docs) {
        setHeros(result.docs as Hero[])
        setHasMore(result.hasNextPage)
      } else {
        setHeros([])
        setHasMore(false)
      }
    } catch (error) {
      console.error("🚨 Filter Error:", error)
      setHeros([])
    } finally {
      setIsLoading(false)
    }
  }

  // -- PAGINATION ACTION (Appends Page 2, 3, 4 to existing array) --
  const loadMoreHeros = async () => {
    if (isLoadingMore || !hasMore) return
    setIsLoadingMore(true)
    
    const nextPage = page + 1
    
    try {
      const result = await getFilteredHeros(currentTags, nextPage, 12)
      if (result && result.docs && result.docs.length > 0) {
        // Append new heroes to the existing ones
        setHeros(prev => [...prev, ...(result.docs as Hero[])])
        setHasMore(result.hasNextPage)
        setPage(nextPage)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("🚨 Load More Error:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  // -- INTERSECTION OBSERVER LOGIC --
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the target is visible, and we aren't currently loading something, grab more!
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          loadMoreHeros()
        }
      },
      { rootMargin: '200px' } // Triggers slightly before the user hits the exact bottom
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current)
    }
  }, [hasMore, isLoading, isLoadingMore, currentTags, page])

  return (
    <>
      <Navbar availableTags={availableTags} onApplyFilters={handleApplyFilters} />

      <header 
        className={`max-w-[1600px] mx-auto mb-16 transition-all duration-300 ease-out ${
          currentTags.length > 0 ? 'pt-10' : 'pt-0'
        }`}> 
       </header>

      <div className="max-w-[1600px] mx-auto pb-20"> {/* Added pb-20 for breathing room at bottom */}
        {/* Full Screen Loading (When applying filters) */}
        {isLoading ? (
          <div className="text-zinc-500 py-20 text-center">Filtering vault...</div>
        ) : (!heros || heros.length === 0) ? (
          <div className="text-zinc-500 py-20 text-center">No heroes found for these tags.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {heros.map((hero) => (
              <div key={hero.id} className="group flex flex-col gap-1 p-2 rounded-lg bg-zinc-900">
                <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-zinc-900 border border-white/[0.08] transition-all duration-500">
                  <Image 
                    src={`/captures/${hero.id}.webp`} 
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
            ))}
          </div>
        )}

        {/* The Infinite Scroll Trigger & Loader */}
        {!isLoading && hasMore && (
          <div ref={observerTarget} className="flex justify-center items-center py-12">
             {isLoadingMore ? (
               <div className="text-zinc-500 text-sm flex items-center gap-2">
                 <span className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></span>
                 Loading more heroes...
               </div>
             ) : (
               <div className="h-8"></div> // Invisible spacer to trigger the observer
             )}
          </div>
        )}
      </div>
    </>
  )
}
