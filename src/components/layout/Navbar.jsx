import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, User, Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '../../store/cartStore'
import { useDarkMode } from '../../context/DarkModeContext'
import logo from '../../assets/logo-rebozos-mary.svg'

const links = [
  { to: '/tienda', label: 'Tienda' },
  { to: '/nosotros', label: 'Artesanas' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items, toggleCart } = useCartStore()
  const { dark, toggle } = useDarkMode()
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-hueso/90 dark:bg-negro/95 backdrop-blur-sm border-b border-negro/5 dark:border-white/5 transition-colors duration-300 animate-fade-down">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Rebozos Mary" className="w-10 h-10" />
          <span className="font-playfair text-xl text-negro dark:text-white leading-none transition-colors">
            Rebozos <span className="text-magenta">Mary</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-dm text-sm transition-colors ${isActive ? 'text-magenta' : 'text-negro/70 dark:text-white/60 hover:text-negro dark:hover:text-white'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="p-2 text-negro/50 dark:text-white/50 hover:text-magenta dark:hover:text-magenta transition-colors"
            aria-label="Cambiar modo"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link to="/cuenta" className="p-2 text-negro/60 dark:text-white/60 hover:text-negro dark:hover:text-white transition-colors">
            <User size={20} />
          </Link>
          <button
            onClick={toggleCart}
            className="relative p-2 text-negro/60 dark:text-white/60 hover:text-negro dark:hover:text-white transition-colors"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] text-[10px] bg-magenta text-white rounded-full flex items-center justify-center font-dm font-medium leading-none px-1 py-px">
                {count}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-negro/60 dark:text-white/60 hover:text-negro dark:hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-negro/5 dark:border-white/5 bg-hueso dark:bg-negro px-4 py-4 space-y-3 transition-colors">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block font-dm text-sm py-1.5 transition-colors ${isActive ? 'text-magenta' : 'text-negro/70 dark:text-white/60'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
