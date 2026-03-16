import { Link } from 'react-router-dom'
import Badge from './Badge'

export default function ArtisanCard({ artisan }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white border border-negro/5 shadow-warm rounded-sm">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-magenta-light">
        <img src={artisan.photo_url} alt={artisan.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-playfair text-xl text-negro mb-1">{artisan.name}</h3>
      <div className="mb-3">
        <Badge>{artisan.region}</Badge>
      </div>
      <p className="font-cormorant text-negro/70 text-base leading-relaxed line-clamp-3">{artisan.story}</p>
    </div>
  )
}
