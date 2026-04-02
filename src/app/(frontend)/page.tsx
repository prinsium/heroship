// import { headers as getHeaders } from 'next/headers.js'
// import Image from 'next/image'
// import { getPayload } from 'payload'
// import React from 'react'
// import { fileURLToPath } from 'url'

// import config from '@/payload.config'
// import './styles.css'

// export default async function HomePage() {
//   const headers = await getHeaders()
//   const payloadConfig = await config
//   const payload = await getPayload({ config: payloadConfig })
//   const { user } = await payload.auth({ headers })

//   const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

//   return (
//     <div className="home">
//       <div className="content">
//         <picture>
//           <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
//           <Image
//             alt="Payload Logo"
//             height={65}
//             src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
//             width={65}
//           />
//         </picture>
//         {!user && <h1>Welcome to your new project.</h1>}
//         {user && <h1>Welcome back, {user.email}</h1>}
//         <div className="links">
//           <a
//             className="admin"
//             href={payloadConfig.routes.admin}
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             Go to admin panel
//           </a>
//           <a
//             className="docs"
//             href="https://payloadcms.com/docs"
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             Documentation
//           </a>
//         </div>
//       </div>
//       <div className="footer">
//         <p>Update this page by editing</p>
//         <a className="codeLink" href={fileURL}>
//           <code>app/(frontend)/page.tsx</code>
//         </a>
//       </div>
//     </div>
//   )
// }


import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })
  
  // Fetch all your Heroship entries
  const { docs: heros } = await payload.find({
    collection: 'heroship',
  })

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">Heroship</h1>
          <p className="text-zinc-500 text-lg">My curated vault of high-impact hero sections.</p>
        </div>
        <div className="text-zinc-600 text-sm font-mono">
          {heros.length} CURATIONS
        </div>
      </header>

      {/* The Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {heros.map((hero) => (
          <div key={hero.id} className="group relative bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-500 transition-all duration-300">
            {/* 16:10 Image Container */}
            <div className="aspect-[16/10] relative overflow-hidden bg-zinc-900">
              <Image 
                src={`/captures/${hero.id}.png`} 
                alt={hero.name}
                height={1000}
                width={1600}
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                unoptimized // Use this because the files are added at runtime via GitHub
              />
            </div>

            {/* Content Area */}
            <div className="p-5 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-zinc-200">{hero.name}</h2>
                <div className="flex gap-2 mt-1">
                   {/* This assumes you might want to display tags later */}
                   <span className="text-[10px] uppercase tracking-widest text-zinc-500">Resource</span>
                </div>
              </div>
              <a 
                href={hero.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {heros.length === 0 && (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
          <p className="text-zinc-500">No heroships found. Add some in the admin panel!</p>
        </div>
      )}
    </main>
  )
}