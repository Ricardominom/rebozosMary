import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import Button from '../components/ui/Button'

export default function Carrito() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const envio = items.length > 0 ? 150 : 0

  return (
    <div className="min-h-screen bg-hueso py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-playfair text-3xl text-negro mb-8">Mi carrito</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-5">
            <ShoppingBag size={64} className="text-negro/10" />
            <p className="font-cormorant text-2xl text-negro/40">Tu carrito está vacío.</p>
            <Link to="/tienda" className="btn-primary">Explorar tienda</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Items */}
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 border border-negro/5 shadow-warm rounded-sm">
                  <Link to={`/producto/${item.id}`}>
                    <img src={item.images?.[0]} alt={item.name} className="w-20 h-28 object-cover rounded-sm flex-shrink-0" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/producto/${item.id}`}>
                      <h3 className="font-playfair text-lg text-negro hover:text-magenta transition-colors leading-snug mb-1">{item.name}</h3>
                    </Link>
                    <p className="font-dm text-xs text-negro/40 mb-3">{item.region} · {item.material}</p>
                    <p className="font-dm font-medium text-magenta mb-3">${item.price.toLocaleString('es-MX')} MXN</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-negro/15 rounded-btn overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1.5 hover:bg-algodon transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 py-1.5 font-dm text-sm border-x border-negro/10">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1.5 hover:bg-algodon transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="ml-auto p-1.5 text-negro/30 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white p-6 border border-negro/5 shadow-warm rounded-sm h-fit sticky top-24">
              <h2 className="font-playfair text-xl text-negro mb-5">Resumen</h2>
              <div className="space-y-3 font-dm text-sm mb-5">
                <div className="flex justify-between text-negro/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                </div>
                <div className="flex justify-between text-negro/60">
                  <span>Envío estimado</span>
                  <span>${envio.toLocaleString('es-MX')} MXN</span>
                </div>
                <div className="border-t border-negro/5 pt-3 flex justify-between font-medium text-negro">
                  <span>Total</span>
                  <span>${(subtotal + envio).toLocaleString('es-MX')} MXN</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full block text-center">
                Proceder al pago
              </Link>
              <Link to="/tienda" className="btn-ghost w-full block text-center mt-2 text-sm">
                Seguir comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
