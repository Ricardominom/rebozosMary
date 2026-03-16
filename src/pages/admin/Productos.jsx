import { useState } from 'react'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react'
import { products as initialProducts, artisans } from '../../data/seed'
import AdminTable from '../../components/ui/AdminTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ImageUploader from '../../components/ui/ImageUploader'

const empty = { id: '', name: '', description: '', price: '', region: '', material: '', artisan_id: '', images: [], stock: '', active: true }

export default function AdminProductos() {
  const [products, setProducts] = useState(initialProducts)
  const [modal, setModal] = useState(null) // null | 'create' | product obj
  const [form, setForm] = useState(empty)

  const openCreate = () => { setForm(empty); setModal('create') }
  const openEdit = (p) => { setForm({ ...p }); setModal(p) }
  const closeModal = () => setModal(null)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const save = () => {
    if (modal === 'create') {
      setProducts((prev) => [...prev, { ...form, id: `prod-${Date.now()}`, created_at: new Date().toISOString() }])
    } else {
      setProducts((prev) => prev.map((p) => (p.id === form.id ? form : p)))
    }
    closeModal()
  }

  const remove = (id) => setProducts((prev) => prev.filter((p) => p.id !== id))
  const toggle = (id) => setProducts((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p))

  const columns = [
    {
      key: 'images',
      label: '',
      render: (imgs) => (
        <img src={imgs?.[0]} alt="" className="w-10 h-12 object-cover rounded-sm" />
      ),
    },
    { key: 'name', label: 'Nombre' },
    { key: 'region', label: 'Región', render: (v) => <Badge>{v}</Badge> },
    { key: 'material', label: 'Material', render: (v) => <Badge variant="dorado">{v}</Badge> },
    { key: 'price', label: 'Precio', render: (v) => `$${Number(v).toLocaleString('es-MX')}` },
    { key: 'stock', label: 'Stock' },
    {
      key: 'active',
      label: 'Activo',
      render: (v, row) => (
        <button onClick={() => toggle(row.id)} className={`transition-colors ${v ? 'text-magenta' : 'text-negro/30'}`}>
          {v ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
        </button>
      ),
    },
    {
      key: 'id',
      label: '',
      render: (_, row) => (
        <div className="flex gap-1.5">
          <button onClick={() => openEdit(row)} className="p-1.5 text-negro/40 hover:text-magenta transition-colors">
            <Pencil size={14} />
          </button>
          <button onClick={() => remove(row.id)} className="p-1.5 text-negro/40 hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl text-negro">Productos</h1>
          <p className="font-dm text-sm text-negro/40 mt-1">{products.length} piezas en catálogo</p>
        </div>
        <Button onClick={openCreate} size="sm" className="flex items-center gap-1.5">
          <Plus size={15} /> Nuevo producto
        </Button>
      </div>

      <AdminTable columns={columns} data={products} />

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-negro/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-warm-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-negro/5">
              <h2 className="font-playfair text-xl text-negro">
                {modal === 'create' ? 'Nuevo producto' : 'Editar producto'}
              </h2>
              <button onClick={closeModal} className="text-negro/40 hover:text-negro transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                ['Nombre', 'name', 'text'],
                ['Región', 'region', 'text'],
                ['Material', 'material', 'text'],
                ['Precio (MXN)', 'price', 'number'],
                ['Stock', 'stock', 'number'],
              ].map(([label, key, type]) => (
                <div key={key}>
                  <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => set(key, type === 'number' ? Number(e.target.value) : e.target.value)}
                    className="w-full border border-negro/10 rounded-btn px-3 py-2 font-dm text-sm focus:outline-none focus:border-magenta"
                  />
                </div>
              ))}
              <div>
                <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">Artesana</label>
                <select
                  value={form.artisan_id}
                  onChange={(e) => set('artisan_id', e.target.value)}
                  className="w-full border border-negro/10 rounded-btn px-3 py-2 font-dm text-sm focus:outline-none focus:border-magenta"
                >
                  <option value="">— Seleccionar —</option>
                  {artisans.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={4}
                  className="w-full border border-negro/10 rounded-btn px-3 py-2 font-dm text-sm focus:outline-none focus:border-magenta resize-none"
                />
              </div>
              <div>
                <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">Imágenes</label>
                <ImageUploader value={form.images} onChange={(imgs) => set('images', imgs)} />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-negro/5 flex justify-end gap-3">
              <Button variant="ghost" onClick={closeModal}>Cancelar</Button>
              <Button onClick={save}>Guardar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
