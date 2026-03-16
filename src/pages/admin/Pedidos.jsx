import { useState } from 'react'
import { X } from 'lucide-react'
import AdminTable from '../../components/ui/AdminTable'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge'
import Button from '../../components/ui/Button'

const mockOrders = [
  { id: 'ORD-001', customer: 'Valentina Ríos', email: 'vale@mail.com', product: 'Rebozo Floral Tenancingo', qty: 1, total: 2800, status: 'entregado', tracking: 'MX123456789', date: '2024-03-10', address: 'Insurgentes Sur 1234, CDMX' },
  { id: 'ORD-002', customer: 'Carmen Delgado', email: 'carmen@mail.com', product: 'Rebozo de Seda Santa María', qty: 1, total: 4500, status: 'enviado', tracking: 'MX987654321', date: '2024-03-12', address: 'Av. Constitución 555, Monterrey' },
  { id: 'ORD-003', customer: 'Sofía Alvarado', email: 'sofia@mail.com', product: 'Rebozo Zapoteco Natural', qty: 1, total: 1900, status: 'procesando', tracking: '', date: '2024-03-14', address: 'López Cotilla 123, Guadalajara' },
  { id: 'ORD-004', customer: 'Lucía Martínez', email: 'lucia@mail.com', product: 'Rebozo de Lana Guerrerense', qty: 2, total: 4400, status: 'pendiente', tracking: '', date: '2024-03-15', address: 'Reforma 789, CDMX' },
]

const statuses = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado']

export default function AdminPedidos() {
  const [orders, setOrders] = useState(mockOrders)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const displayed = filter ? orders.filter((o) => o.status === filter) : orders

  const updateOrder = (id, patch) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)))

  const columns = [
    { key: 'id', label: 'Pedido' },
    { key: 'customer', label: 'Cliente' },
    { key: 'product', label: 'Producto' },
    { key: 'qty', label: 'Cant.' },
    { key: 'total', label: 'Total', render: (v) => `$${v.toLocaleString('es-MX')}` },
    { key: 'status', label: 'Estado', render: (v) => <OrderStatusBadge status={v} /> },
    { key: 'date', label: 'Fecha' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl text-negro">Pedidos</h1>
        <p className="font-dm text-sm text-negro/40 mt-1">{orders.length} pedidos totales</p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('')}
          className={`px-3 py-1 text-xs font-dm rounded-btn border transition-colors ${!filter ? 'bg-magenta text-white border-magenta' : 'border-negro/15 text-negro/60 hover:border-negro/40'}`}
        >
          Todos
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s === filter ? '' : s)}
            className={`px-3 py-1 text-xs font-dm rounded-btn border capitalize transition-colors ${filter === s ? 'bg-magenta text-white border-magenta' : 'border-negro/15 text-negro/60 hover:border-negro/40'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <AdminTable columns={columns} data={displayed} onRowClick={setSelected} />

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-negro/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-warm-md w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-negro/5">
              <h2 className="font-playfair text-xl text-negro">Pedido {selected.id}</h2>
              <button onClick={() => setSelected(null)} className="text-negro/40 hover:text-negro"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm font-dm">
                <div><p className="text-negro/40 text-xs uppercase tracking-wider mb-1">Cliente</p><p>{selected.customer}</p></div>
                <div><p className="text-negro/40 text-xs uppercase tracking-wider mb-1">Email</p><p>{selected.email}</p></div>
                <div><p className="text-negro/40 text-xs uppercase tracking-wider mb-1">Producto</p><p>{selected.product}</p></div>
                <div><p className="text-negro/40 text-xs uppercase tracking-wider mb-1">Total</p><p className="text-magenta font-medium">${selected.total.toLocaleString('es-MX')} MXN</p></div>
                <div className="col-span-2"><p className="text-negro/40 text-xs uppercase tracking-wider mb-1">Dirección</p><p>{selected.address}</p></div>
              </div>

              <div>
                <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">Estado</label>
                <select
                  value={selected.status}
                  onChange={(e) => { updateOrder(selected.id, { status: e.target.value }); setSelected((s) => ({ ...s, status: e.target.value })) }}
                  className="w-full border border-negro/10 rounded-btn px-3 py-2 font-dm text-sm focus:outline-none focus:border-magenta"
                >
                  {statuses.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">Número de guía</label>
                <input
                  type="text"
                  value={selected.tracking}
                  onChange={(e) => { updateOrder(selected.id, { tracking: e.target.value }); setSelected((s) => ({ ...s, tracking: e.target.value })) }}
                  placeholder="MX123456789"
                  className="w-full border border-negro/10 rounded-btn px-3 py-2 font-dm text-sm focus:outline-none focus:border-magenta"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-negro/5 flex justify-end">
              <Button onClick={() => setSelected(null)}>Guardar y cerrar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
