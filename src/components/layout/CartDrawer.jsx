import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import Button from '../ui/Button'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore()
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeCart])

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-negro/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-hueso z-50 shadow-warm-md flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-negro/5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-magenta" />
            <h2 className="font-playfair text-lg text-negro">Mi carrito</h2>
            {items.length > 0 && (
              <span className="text-xs font-dm text-negro/40">({items.reduce((s, i) => s + i.quantity, 0)} piezas)</span>
            )}
          </div>
          <button onClick={closeCart} className="p-1.5 text-negro/40 hover:text-negro transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-negro/15" />
              <p className="font-cormorant text-lg text-negro/40">Tu carrito está vacío</p>
              <Button variant="outline" size="sm" onClick={closeCart}>
                <Link to="/tienda">Explorar tienda</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-white border border-negro/5 rounded-sm">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-playfair text-sm text-negro leading-snug mb-1 truncate">{item.name}</h3>
                  <p className="text-xs font-dm text-negro/50 mb-2">{item.region}</p>
                  <p className="font-dm font-medium text-magenta text-sm">
                    ${item.price.toLocaleString('es-MX')} MXN
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 border border-negro/15 rounded-sm flex items-center justify-center hover:border-magenta hover:text-magenta transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="font-dm text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 border border-negro/15 rounded-sm flex items-center justify-center hover:border-magenta hover:text-magenta transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto p-1 text-negro/30 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-negro/5 space-y-4">
            <div className="flex justify-between items-center font-dm">
              <span className="text-sm text-negro/60">Subtotal</span>
              <span className="font-medium text-negro">${total.toLocaleString('es-MX')} MXN</span>
            </div>
            <p className="text-xs text-negro/40 font-dm">Envío calculado en el checkout</p>
            <div className="space-y-2">
              <Link to="/carrito" onClick={closeCart} className="btn-ghost text-center w-full block text-sm">
                Ver carrito
              </Link>
              <Link to="/checkout" onClick={closeCart} className="btn-primary text-center w-full block text-sm">
                Proceder al pago
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
