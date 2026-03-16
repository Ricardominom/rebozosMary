import { TrendingUp, Package, Users, AlertCircle } from 'lucide-react'
import { products } from '../../data/seed'
import AdminTable from '../../components/ui/AdminTable'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge'

const mockOrders = [
  { id: 'ORD-001', customer: 'Valentina Ríos', product: 'Rebozo Floral Tenancingo', total: 2800, status: 'entregado', date: '2024-03-10' },
  { id: 'ORD-002', customer: 'Carmen Delgado', product: 'Rebozo de Seda Santa María', total: 4500, status: 'enviado', date: '2024-03-12' },
  { id: 'ORD-003', customer: 'Sofía Alvarado', product: 'Rebozo Zapoteco Natural', total: 1900, status: 'procesando', date: '2024-03-14' },
  { id: 'ORD-004', customer: 'Lucía Martínez', product: 'Rebozo de Lana Guerrerense', total: 2200, status: 'pendiente', date: '2024-03-15' },
]

const stats = [
  { label: 'Ventas del mes', value: '$42,600 MXN', icon: TrendingUp, color: 'text-magenta bg-magenta-light' },
  { label: 'Pedidos pendientes', value: '4', icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
  { label: 'Clientes nuevos', value: '12', icon: Users, color: 'text-blue-600 bg-blue-50' },
  { label: 'Más vendido', value: 'Floral Tenancingo', icon: Package, color: 'text-dorado bg-dorado/10' },
]

const columns = [
  { key: 'id', label: 'Pedido' },
  { key: 'customer', label: 'Cliente' },
  { key: 'product', label: 'Producto' },
  { key: 'total', label: 'Total', render: (v) => `$${v.toLocaleString('es-MX')}` },
  { key: 'status', label: 'Estado', render: (v) => <OrderStatusBadge status={v} /> },
  { key: 'date', label: 'Fecha' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-2xl text-negro">Dashboard</h1>
        <p className="font-dm text-sm text-negro/40 mt-1">Resumen general del negocio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white p-5 rounded-sm border border-negro/5 shadow-warm">
              <div className={`w-9 h-9 rounded-sm flex items-center justify-center mb-3 ${s.color}`}>
                <Icon size={18} />
              </div>
              <p className="font-playfair text-xl text-negro leading-none mb-1">{s.value}</p>
              <p className="font-dm text-xs text-negro/40 uppercase tracking-wider">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="font-playfair text-lg text-negro mb-4">Pedidos recientes</h2>
        <AdminTable columns={columns} data={mockOrders} />
      </div>

      {/* Low stock */}
      <div>
        <h2 className="font-playfair text-lg text-negro mb-4">Stock bajo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {products.filter((p) => p.stock <= 2).map((p) => (
            <div key={p.id} className="flex items-center gap-3 bg-white p-3 rounded-sm border border-negro/5 shadow-warm">
              <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded-sm flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-dm text-sm text-negro truncate">{p.name}</p>
                <p className="font-dm text-xs text-amber-600">{p.stock} en stock</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
