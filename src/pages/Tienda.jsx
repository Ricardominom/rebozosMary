import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ui/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'
import { products as allProducts } from '../data/seed'

const regions = [...new Set(allProducts.map((p) => p.region))]
const materials = [...new Set(allProducts.map((p) => p.material))]

export default function Tienda() {
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    region: searchParams.get('region') || '',
    material: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest',
  })

  const { products } = useProducts(filters)

  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }))
  const clearFilters = () => setFilters({ region: '', material: '', minPrice: '', maxPrice: '', sort: 'newest' })
  const hasFilters = filters.region || filters.material || filters.minPrice || filters.maxPrice

  return (
    <div className="min-h-screen bg-hueso">
      {/* Header */}
      <div className="bg-algodon border-b border-negro/5 px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            overline="Tienda"
            title="Colección completa"
            subtitle={`${products.length} piezas disponibles`}
            align="left"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-2 font-dm text-sm text-negro/70 hover:text-negro transition-colors md:hidden"
          >
            <SlidersHorizontal size={16} />
            Filtros {hasFilters && <span className="text-magenta">•</span>}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <label className="font-dm text-xs text-negro/50 uppercase tracking-wider">Ordenar:</label>
            <select
              value={filters.sort}
              onChange={(e) => set('sort', e.target.value)}
              className="font-dm text-sm border border-negro/10 rounded-btn px-3 py-1.5 bg-white focus:outline-none focus:border-magenta"
            >
              <option value="newest">Más recientes</option>
              <option value="price_asc">Precio: menor a mayor</option>
              <option value="price_desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`
            ${sidebarOpen ? 'block' : 'hidden'} md:block
            w-full md:w-56 flex-shrink-0
          `}>
            <div className="sticky top-24 space-y-6">
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-xs font-dm text-magenta hover:text-magenta-deep"
                >
                  <X size={12} /> Limpiar filtros
                </button>
              )}

              {/* Región */}
              <div>
                <h3 className="text-xs font-dm uppercase tracking-[0.15em] text-negro/50 mb-3">Región</h3>
                <div className="space-y-2">
                  {regions.map((r) => (
                    <label key={r} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="region"
                        checked={filters.region === r}
                        onChange={() => set('region', filters.region === r ? '' : r)}
                        className="accent-magenta"
                      />
                      <span className="font-dm text-sm text-negro/70">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <h3 className="text-xs font-dm uppercase tracking-[0.15em] text-negro/50 mb-3">Material</h3>
                <div className="space-y-2">
                  {materials.map((m) => (
                    <label key={m} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="material"
                        checked={filters.material === m}
                        onChange={() => set('material', filters.material === m ? '' : m)}
                        className="accent-magenta"
                      />
                      <span className="font-dm text-sm text-negro/70">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Precio */}
              <div>
                <h3 className="text-xs font-dm uppercase tracking-[0.15em] text-negro/50 mb-3">Precio (MXN)</h3>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={filters.minPrice}
                    onChange={(e) => set('minPrice', e.target.value ? Number(e.target.value) : '')}
                    className="w-full border border-negro/10 rounded-btn px-2 py-1.5 text-sm font-dm focus:outline-none focus:border-magenta"
                  />
                  <span className="text-negro/30 text-sm">–</span>
                  <input
                    type="number"
                    placeholder="Máx"
                    value={filters.maxPrice}
                    onChange={(e) => set('maxPrice', e.target.value ? Number(e.target.value) : '')}
                    className="w-full border border-negro/10 rounded-btn px-2 py-1.5 text-sm font-dm focus:outline-none focus:border-magenta"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-cormorant text-xl text-negro/40">No hay productos con estos filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
