import { useState, useEffect } from 'react'
import logo from '../../assets/logo-rebozos-mary.svg'

export default function IntroScreen({ onDone }) {
  const [phase, setPhase] = useState('in') // 'in' → 'out'

  useEffect(() => {
    // Bloquea scroll durante el intro
    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => setPhase('out'), 1600)
    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
      onDone()
    }, 2400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [onDone])

  return (
    <div
      className={`
        fixed inset-0 z-[200] bg-negro flex flex-col items-center justify-center
        transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
        ${phase === 'out' ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(45deg,#da1e7a,#da1e7a_1px,transparent_1px,transparent_10px)]" />

      {/* Logo */}
      <div className="relative flex flex-col items-center gap-5 animate-scale-fade">
        <img
          src={logo}
          alt="Rebozos Mary"
          className="w-24 h-24 drop-shadow-[0_0_32px_rgba(218,30,122,0.4)]"
        />

        <div className="text-center animate-fade-up delay-300">
          <p className="font-playfair text-white text-3xl tracking-wide">Rebozos Mary</p>
          <p className="font-cormorant text-white/40 text-lg mt-1 tracking-[0.15em]">
            Artesanía mexicana auténtica
          </p>
        </div>

        {/* Línea decorativa animada */}
        <div className="animate-fade-up delay-500 flex items-center gap-3">
          <span className="block w-10 h-px bg-magenta/40" />
          <span className="text-magenta/60 text-xs font-dm uppercase tracking-[0.25em]">México</span>
          <span className="block w-10 h-px bg-magenta/40" />
        </div>
      </div>
    </div>
  )
}
