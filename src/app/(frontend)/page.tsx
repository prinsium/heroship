// import { getPayload } from 'payload'
// import config from '@/payload.config'
// import Image from 'next/image'
// import React from 'react'

// export default async function HomePage() {
//   const payload = await getPayload({ config })
//   const { docs: heros } = await payload.find({ collection: 'heroship' })

//   return (
//     <main className="min-h-screen bg-[#050505] text-zinc-100 p-6 md:p-12 lg:p-16">
//       {/* Header Area */}
//       <header className="max-w-[1600px] mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div>
//           <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Vault</h1>
//           <p className="text-zinc-500 font-medium">Curated hero sections and landing page inspiration.</p>
//         </div>
//       </header>

//       {/* The Responsive Grid */}
//       <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
//         {heros.map((hero) => (
//           <div key={hero.id} className="group flex flex-col">
//             {/* 16:10 Image Container */}
//             <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-zinc-900 border border-zinc-800/50 group-hover:border-zinc-600 transition-all duration-500">
//               <Image 
//                 src={`/captures/${hero.id}.png`} 
//                 alt={hero.name}
//                 height={1000}
//                 width={1600}
//                 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
//                 className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
//                 unoptimized
//               />
//               {/* Hover Overlay */}
//               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//             </div>

//             {/* Content Section */}
//             <div className="mt-2 flex items-center justify-between px-1">
//               <div>
//                 <h3 className="text-sm font-semibold text-zinc-200">{hero.name}</h3>
//                 <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
//                   {new URL(hero.link).hostname.replace('www.', '')}
//                 </p>
//               </div>
              
//               <a 
//                 href={hero.link} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:bg-white hover:text-black hover:border-white transition-all"
//               >
//                 <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   )
// }

import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs: heros } = await payload.find({ collection: 'heroship' })

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