'use client'
import React from 'react'
import { useFormFields } from '@payloadcms/ui'

const ScreenshotPreview: React.FC = () => {
  // This hook lets us grab the ID of the current entry
  const id = useFormFields(([fields]) => fields.id?.value)

  if (!id) return <p className="text-sm text-zinc-500">Save to generate preview...</p>

  return (
    <div style={{ marginTop: '20px' }}>
      <label className="field-label" style={{ marginBottom: '10px', display: 'block' }}>
        Auto-Generated Screenshot
      </label>
      <div 
        style={{ 
          width: '100%', 
          aspectRatio: '16/10', 
          backgroundColor: '#1a1a1a', 
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #333',
          position: 'relative'
        }}
      >
        <img 
          src={`/captures/${id}.png`} 
          alt="Screenshot preview"
          style={{ width: '100%', height: '100%', objectCover: 'cover' }}
          // If the image hasn't been captured yet, show a loading state
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1 }}>
          <p className="text-xs text-zinc-500">Capturing in progress (Check GitHub Actions)...</p>
        </div>
      </div>
    </div>
  )
}

export default ScreenshotPreview