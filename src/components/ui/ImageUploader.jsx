import { useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, X } from 'lucide-react'

export default function ImageUploader({ value = [], onChange, bucket = 'products', maxFiles = 5 }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = async (files) => {
    setUploading(true)
    const urls = [...value]
    for (const file of files) {
      if (urls.length >= maxFiles) break
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from(bucket).upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from(bucket).getPublicUrl(path)
        urls.push(data.publicUrl)
      }
    }
    onChange(urls)
    setUploading(false)
  }

  const remove = (url) => onChange(value.filter((u) => u !== url))

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {value.map((url) => (
          <div key={url} className="relative w-24 h-24 rounded-sm overflow-hidden border border-negro/10">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute top-1 right-1 bg-negro/60 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-negro"
            >
              <X size={10} />
            </button>
          </div>
        ))}
        {value.length < maxFiles && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-24 h-24 border border-dashed border-magenta/40 rounded-sm flex flex-col items-center justify-center gap-1 text-magenta/60 hover:border-magenta hover:text-magenta transition-colors disabled:opacity-50"
          >
            <Upload size={20} />
            <span className="text-xs font-dm">{uploading ? 'Subiendo...' : 'Agregar'}</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(Array.from(e.target.files))}
      />
    </div>
  )
}
