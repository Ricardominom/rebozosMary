import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, MapPin } from 'lucide-react'
import { useProduct } from '../hooks/useProducts'
import { useCartStore } from '../store/cartStore'
import { artisans, products } from '../data/seed'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProductCard from '../components/ui/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'

export default function Producto() {
  const { id } = useParams()
  const { product, error } = useProduct(id)
  const [activeImg, setActiveImg] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCartStore()

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-cormorant text-2xl text-negro/40 mb-4">Producto no encontrado.</p>
          <Link to="/tienda" className="btn-outline">Volver a la tienda</Link>
        </div>
      </div>
    )
  }

  const artisan = artisans.find((a) => a.id === product.artisan_id)
  const related = products.filter((p) => p.id !== product.id && (p.region === product.region || p.material === product.material)).slice(0, 3)

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-hueso">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Back */}
        <Link to="/tienda" className="flex items-center gap-1.5 text-sm font-dm text-negro/50 hover:text-negro mb-8 transition-colors">
          <ArrowLeft size={16} /> Volver a la tienda
        </Link>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-algodon">
              <img
                src={product.images[activeImg] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-20 rounded-sm overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-magenta' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <Badge>{product.region}</Badge>
              <Badge variant="dorado">{product.material}</Badge>
            </div>

            <h1 className="font-playfair text-3xl md:text-4xl text-negro leading-tight">{product.name}</h1>

            <p className="font-playfair text-3xl text-magenta">
              ${product.price.toLocaleString('es-MX')} <span className="text-base font-dm font-normal text-negro/40">MXN</span>
            </p>

            <p className="font-cormorant text-lg text-negro/70 leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-dm text-sm text-negro/60">Cantidad</span>
              <div className="flex items-center border border-negro/15 rounded-btn overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-algodon transition-colors font-dm"
                >
                  −
                </button>
                <span className="px-4 py-2 font-dm text-sm border-x border-negro/10">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 hover:bg-algodon transition-colors font-dm"
                >
                  +
                </button>
              </div>
              <span className="font-dm text-xs text-negro/40">{product.stock} disponibles</span>
            </div>

            <Button
              onClick={handleAdd}
              disabled={product.stock === 0}
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              {added ? '¡Añadido!' : product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
            </Button>

            <div className="flex items-center gap-2 text-xs font-dm text-negro/40 pt-1">
              <MapPin size={12} />
              <span>Hecho en {product.region}</span>
            </div>
          </div>
        </div>

        {/* Artisan section */}
        {artisan && (
          <section className="bg-negro rounded-sm p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center mb-20">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-magenta">
                <img src={artisan.photo_url} alt={artisan.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-dm uppercase tracking-[0.15em] text-magenta mb-1">La artesana</p>
                <h3 className="font-playfair text-xl text-white">{artisan.name}</h3>
                <p className="font-dm text-sm text-white/40">{artisan.region}</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="font-cormorant text-xl text-white/70 leading-relaxed">{artisan.story}</p>
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section>
            <div className="mb-8">
              <SectionHeader overline="También te puede gustar" title="Piezas relacionadas" align="left" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
