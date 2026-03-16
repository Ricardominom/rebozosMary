import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import Badge from './Badge'
import Button from './Button'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product)
    openCart()
  }

  return (
    <Link to={`/producto/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-sm bg-algodon border border-negro/5 shadow-warm hover:shadow-warm-md transition-shadow duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-negro/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <Button onClick={handleAdd} size="sm" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Añadir al carrito
            </Button>
          </div>
          {product.stock <= 2 && product.stock > 0 && (
            <div className="absolute top-3 left-3">
              <Badge variant="dorado">Últimas {product.stock}</Badge>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-3 left-3">
              <Badge variant="dark">Agotado</Badge>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge>{product.region}</Badge>
            <Badge variant="dorado">{product.material}</Badge>
          </div>
          <h3 className="font-playfair text-lg text-negro leading-snug mb-1">{product.name}</h3>
          <p className="font-dm text-magenta font-medium">
            ${product.price.toLocaleString('es-MX')} MXN
          </p>
        </div>
      </div>
    </Link>
  )
}
