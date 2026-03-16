import { useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { artisans as initialArtisans } from '../../data/seed'
import AdminTable from '../../components/ui/AdminTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const empty = { id: '', name: '', region: '', photo_url: '', story: '', active: true }

export default function AdminArtesanas() {
  const [artisans, setArtisans] = useState(initialArtisans)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)

  const openCreate = () => { setForm(empty); setModal('create') }
  const openEdit = (a) => { setForm({ ...a }); setModal(a) }
  const closeModal = () => setModal(null)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const save = () => {
    if (modal === 'create') {
      setArtisans((prev) => [...prev, { ...form, id: `art-${Date.now()}` }])
    } else {
      setArtisans((prev) => prev.map((a) => (a.id === form.id ? form : a)))
    }
    closeModal()
  }

  const remove = (id) => setArtisans((prev) => prev.filter((a) => a.id !== id))

  const columns = [
    {
      key: 'photo_url',
      label: '',
      render: (url, row) => (
        <img src={url} alt={row.name} className="w-10 h-10 rounded-full object-cover" />
      ),
    },
    { key: 'name', label: 'Nombre' },
    { key: 'region', label: 'Región', render: (v) => <Badge>{v}</Badge> },
    { key: 'story', label: 'Historia', render: (v) => <span className="text-negro/40 text-xs line-clamp-1 max-w-xs">{v}</span> },
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
          <h1 className="font-playfair text-2xl text-negro">Artesanas</h1>
          <p className="font-dm text-sm text-negro/40 mt-1">{artisans.length} artesanas registradas</p>
        </div>
        <Button onClick={openCreate} size="sm" className="flex items-center gap-1.5">
          <Plus size={15} /> Nueva artesana
        </Button>
      </div>

      <AdminTable columns={columns} data={artisans} />

      {modal && (
        <div className="fixed inset-0 bg-negro/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-warm-md w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-negro/5">
              <h2 className="font-playfair text-xl text-negro">
                {modal === 'create' ? 'Nueva artesana' : 'Editar artesana'}
              </h2>
              <button onClick={closeModal} className="text-negro/40 hover:text-negro"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                ['Nombre completo', 'name'],
                ['Región', 'region'],
                ['URL de foto', 'photo_url'],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">{label}</label>
                  <input
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className="w-full border border-negro/10 rounded-btn px-3 py-2 font-dm text-sm focus:outline-none focus:border-magenta"
                  />
                </div>
              ))}
              <div>
                <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">Historia</label>
                <textarea
                  value={form.story}
                  onChange={(e) => set('story', e.target.value)}
                  rows={4}
                  className="w-full border border-negro/10 rounded-btn px-3 py-2 font-dm text-sm focus:outline-none focus:border-magenta resize-none"
                />
              </div>
              {form.photo_url && (
                <img src={form.photo_url} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-magenta-light" />
              )}
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
