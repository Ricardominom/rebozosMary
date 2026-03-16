import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import Button from '../components/ui/Button'

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">{label}</label>
      <input
        className="w-full border border-negro/10 rounded-btn px-3 py-2.5 font-dm text-sm focus:outline-none focus:border-magenta transition-colors bg-white"
        {...props}
      />
    </div>
  )
}

export default function Checkout() {
  const { items, clearCart } = useCartStore()
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const envio = items.length > 0 ? 150 : 0
  const [step, setStep] = useState('form')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', zip: '' })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const field = (k) => ({ value: form[k], onChange: (e) => set(k, e.target.value), required: true })

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep('payment')
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-hueso flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-magenta-light rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-magenta text-2xl">✓</span>
          </div>
          <h1 className="font-playfair text-3xl text-negro mb-3">¡Pedido confirmado!</h1>
          <p className="font-cormorant text-lg text-negro/60 mb-8">
            Recibirás un correo con los detalles de tu pedido y número de guía en cuanto sea enviado.
          </p>
          <Link to="/tienda" className="btn-primary">Seguir comprando</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-hueso py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-playfair text-3xl text-negro mb-8">Checkout</h1>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3">
            {step === 'form' ? (
              <form onSubmit={handleSubmit} className="bg-white p-6 border border-negro/5 shadow-warm rounded-sm space-y-5">
                <h2 className="font-playfair text-xl text-negro mb-2">Datos de envío</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Field label="Nombre completo" placeholder="María González" {...field('name')} />
                  </div>
                  <Field label="Email" type="email" placeholder="tu@correo.com" {...field('email')} />
                  <Field label="Teléfono" type="tel" placeholder="+52 55 1234 5678" {...field('phone')} />
                  <div className="col-span-2">
                    <Field label="Dirección" placeholder="Calle, número, colonia" {...field('address')} />
                  </div>
                  <Field label="Ciudad" placeholder="Ciudad de México" {...field('city')} />
                  <Field label="Estado" placeholder="CDMX" {...field('state')} />
                  <Field label="C.P." placeholder="06600" {...field('zip')} />
                </div>
                <Button type="submit" size="lg" className="w-full">Continuar al pago</Button>
              </form>
            ) : (
              <div className="bg-white p-6 border border-negro/5 shadow-warm rounded-sm">
                <h2 className="font-playfair text-xl text-negro mb-5">Pago seguro</h2>
                <div className="flex items-center gap-2 text-xs font-dm text-negro/40 mb-5">
                  <Lock size={12} />
                  <span>Conexión encriptada SSL — tus datos están seguros</span>
                </div>

                {/* Stripe placeholder */}
                <div className="space-y-4">
                  <div className="border border-negro/10 rounded-btn px-3 py-3 bg-algodon/50">
                    <p className="font-dm text-xs text-negro/40 mb-1">Número de tarjeta</p>
                    <p className="font-dm text-sm text-negro/30">•••• •••• •••• ••••</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-negro/10 rounded-btn px-3 py-3 bg-algodon/50">
                      <p className="font-dm text-xs text-negro/40 mb-1">Vencimiento</p>
                      <p className="font-dm text-sm text-negro/30">MM / AA</p>
                    </div>
                    <div className="border border-negro/10 rounded-btn px-3 py-3 bg-algodon/50">
                      <p className="font-dm text-xs text-negro/40 mb-1">CVC</p>
                      <p className="font-dm text-sm text-negro/30">•••</p>
                    </div>
                  </div>
                  <p className="font-dm text-xs text-negro/40 text-center">
                    Integración de Stripe Elements — requiere clave pública configurada en .env
                  </p>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => { clearCart(); setStep('success') }}
                  >
                    Pagar ${(subtotal + envio).toLocaleString('es-MX')} MXN
                  </Button>
                  <button onClick={() => setStep('form')} className="w-full text-xs font-dm text-negro/40 hover:text-negro transition-colors">
                    ← Volver a datos de envío
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="md:col-span-2">
            <div className="bg-white p-5 border border-negro/5 shadow-warm rounded-sm sticky top-24">
              <h2 className="font-playfair text-lg text-negro mb-4">Tu pedido</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="relative">
                      <img src={item.images?.[0]} alt={item.name} className="w-12 h-16 object-cover rounded-sm flex-shrink-0" />
                      <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-negro text-white text-[10px] rounded-full flex items-center justify-center font-dm">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-dm text-xs text-negro leading-snug truncate">{item.name}</p>
                      <p className="font-dm text-xs text-negro/40">{item.region}</p>
                    </div>
                    <p className="font-dm text-xs font-medium text-negro flex-shrink-0">${(item.price * item.quantity).toLocaleString('es-MX')}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-negro/5 pt-3 space-y-2 font-dm text-sm">
                <div className="flex justify-between text-negro/50">
                  <span>Subtotal</span><span>${subtotal.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between text-negro/50">
                  <span>Envío</span><span>${envio.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between font-medium text-negro pt-1">
                  <span>Total</span><span>${(subtotal + envio).toLocaleString('es-MX')} MXN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
