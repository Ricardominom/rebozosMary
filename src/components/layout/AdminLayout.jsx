import { Outlet, NavLink, Navigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, Scissors, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import logo from '../../assets/logo-rebozos-mary.svg'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/productos', label: 'Productos', icon: Package },
  { to: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { to: '/admin/clientes', label: 'Clientes', icon: Users },
  { to: '/admin/artesanas', label: 'Artesanas', icon: Scissors },
]

export default function AdminLayout() {
  const { user, signOut, isAdmin } = useAuthStore()

  // En desarrollo mostramos el admin sin auth; en prod descomentar la guard
  // if (!user || !isAdmin(user)) return <Navigate to="/cuenta" replace />

  return (
    <div className="min-h-screen flex bg-algodon font-dm">
      {/* Sidebar */}
      <aside className="w-56 bg-negro flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
          <img src={logo} alt="" className="w-8 h-8" />
          <div>
            <p className="font-playfair text-white text-sm leading-none">Rebozos Mary</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-dm mt-0.5">Admin</p>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                  isActive ? 'bg-magenta text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-4">
          <button
            onClick={signOut}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-sm text-sm text-white/30 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
