import { Link } from 'react-router-dom'
import logo from '../../assets/logo-rebozos-mary.svg'

export default function Footer() {
  return (
    <footer className="bg-negro text-white/70 font-dm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Rebozos Mary" className="w-9 h-9" />
            <span className="font-playfair text-white text-lg">Rebozos Mary</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Arte textil mexicano hecho con amor, tradición y comercio justo.
          </p>
        </div>

        {/* Tienda */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-magenta mb-4">Tienda</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tienda" className="hover:text-white transition-colors">Todos los rebozos</Link></li>
            <li><Link to="/tienda?region=Tenancingo" className="hover:text-white transition-colors">Tenancingo</Link></li>
            <li><Link to="/tienda?region=Santa+María+del+Río" className="hover:text-white transition-colors">Santa María del Río</Link></li>
            <li><Link to="/tienda?region=Mitla" className="hover:text-white transition-colors">Oaxaca</Link></li>
          </ul>
        </div>

        {/* Información */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-magenta mb-4">Información</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/nosotros" className="hover:text-white transition-colors">Las artesanas</Link></li>
            <li><Link to="/proceso" className="hover:text-white transition-colors">Nuestro proceso</Link></li>
            <li><Link to="/envios" className="hover:text-white transition-colors">Envíos y devoluciones</Link></li>
            <li><Link to="/cuidados" className="hover:text-white transition-colors">Cuidado del rebozo</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-magenta mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:hola@rebozosmary.mx" className="hover:text-white transition-colors">hola@rebozosmary.mx</a></li>
            <li><a href="https://wa.me/521234567890" className="hover:text-white transition-colors">WhatsApp</a></li>
            <li><a href="https://instagram.com" className="hover:text-white transition-colors">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/30">
        <p>© {new Date().getFullYear()} Rebozos Mary. Todos los derechos reservados.</p>
        <p>Hecho con amor en México</p>
      </div>
    </footer>
  )
}
