import AdminTable from '../../components/ui/AdminTable'

const mockClients = [
  { id: 'c-1', name: 'Valentina Ríos', email: 'vale@mail.com', orders: 3, total: 8400, city: 'CDMX', joined: '2024-01-10' },
  { id: 'c-2', name: 'Carmen Delgado', email: 'carmen@mail.com', orders: 1, total: 4500, city: 'Monterrey', joined: '2024-02-05' },
  { id: 'c-3', name: 'Sofía Alvarado', email: 'sofia@mail.com', orders: 2, total: 3800, city: 'Guadalajara', joined: '2024-02-20' },
  { id: 'c-4', name: 'Lucía Martínez', email: 'lucia@mail.com', orders: 1, total: 4400, city: 'CDMX', joined: '2024-03-01' },
]

const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'city', label: 'Ciudad' },
  { key: 'orders', label: 'Pedidos' },
  { key: 'total', label: 'Total compras', render: (v) => `$${v.toLocaleString('es-MX')} MXN` },
  { key: 'joined', label: 'Registro' },
]

export default function AdminClientes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl text-negro">Clientes</h1>
        <p className="font-dm text-sm text-negro/40 mt-1">{mockClients.length} clientes registrados</p>
      </div>
      <AdminTable columns={columns} data={mockClients} />
    </div>
  )
}
