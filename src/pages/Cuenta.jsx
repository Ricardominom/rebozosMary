import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, LogOut, User, Package } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import Button from '../components/ui/Button'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-8 border border-negro/5 shadow-warm rounded-sm">
      <h2 className="font-playfair text-2xl text-negro mb-6">Iniciar sesión</h2>
      {error && <p className="text-sm font-dm text-red-600 mb-4 bg-red-50 px-3 py-2 rounded-btn">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border border-negro/10 rounded-btn px-3 py-2.5 font-dm text-sm focus:outline-none focus:border-magenta" />
        </div>
        <div>
          <label className="block font-dm text-xs uppercase tracking-[0.12em] text-negro/50 mb-1.5">Contraseña</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border border-negro/10 rounded-btn px-3 py-2.5 font-dm text-sm focus:outline-none focus:border-magenta" />
        </div>
        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}

export default function Cuenta() {
  const { user, signOut } = useAuthStore()

  if (!user) {
    return (
      <div className="min-h-screen bg-hueso py-16 px-4">
        <div className="text-center mb-10">
          <span className="overline">Mi cuenta</span>
          <h1 className="font-playfair text-3xl text-negro mt-2">Bienvenida</h1>
        </div>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-hueso py-12 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-playfair text-3xl text-negro">Mi cuenta</h1>
          <button onClick={signOut} className="flex items-center gap-1.5 text-sm font-dm text-negro/50 hover:text-negro transition-colors">
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>

        <div className="bg-white p-6 border border-negro/5 shadow-warm rounded-sm mb-5">
          <div className="flex items-center gap-3 mb-1">
            <User size={18} className="text-magenta" />
            <h2 className="font-playfair text-xl text-negro">Perfil</h2>
          </div>
          <p className="font-dm text-sm text-negro/60">{user.email}</p>
        </div>

        <div className="bg-white p-6 border border-negro/5 shadow-warm rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <Package size={18} className="text-magenta" />
            <h2 className="font-playfair text-xl text-negro">Mis pedidos</h2>
          </div>
          <p className="font-cormorant text-lg text-negro/40">
            Aún no tienes pedidos. ¡Explora nuestra tienda!
          </p>
        </div>
      </div>
    </div>
  )
}
