import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Heart, Shield, Leaf } from 'lucide-react'
import { products, testimonials } from '../data/seed'
import ProductCard from '../components/ui/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import logo from '../assets/logo-rebozos-mary.svg'

/* ──────────────── HERO ──────────────── */
function Hero() {
  return (
    <section className="bg-hueso dark:bg-[#0d0108] min-h-[85vh] flex items-center transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Text — entra desde la izquierda */}
        <div className="flex flex-col gap-6">
          <span className="overline animate-fade-right delay-0">Artesanía mexicana auténtica</span>
          <h1 className="font-playfair text-4xl md:text-6xl text-negro dark:text-white leading-tight transition-colors animate-fade-right delay-100">
            Rebozos que{' '}
            <em className="text-magenta not-italic">cuentan historias</em>
          </h1>
          <p className="font-cormorant text-xl text-negro/65 dark:text-white/55 leading-relaxed max-w-lg transition-colors animate-fade-right delay-200">
            Cada pieza es tejida a mano por artesanas de México. Comprando aquí apoyas directamente a quienes preservan esta tradición centenaria.
          </p>
          <div className="flex flex-wrap gap-3 pt-2 animate-fade-right delay-300">
            <Link to="/tienda" className="btn-primary flex items-center gap-2">
              Explorar colección <ArrowRight size={16} />
            </Link>
            <Link to="/nosotros" className="btn-ghost dark:border-white/20 dark:text-white dark:hover:border-white/50">
              Conocer artesanas
            </Link>
          </div>
        </div>

        {/* Imagen — entra desde la derecha */}
        <div className="relative flex items-center justify-center animate-fade-left delay-200">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden shadow-warm-md">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80"
              alt="Rebozo artesanal"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-negro/30 to-transparent" />
          </div>
          {/* Badge flotante */}
          <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white dark:bg-[#1a0a12] rounded-sm shadow-warm-md p-4 flex items-center gap-3 border border-negro/5 dark:border-white/10 transition-colors animate-fade-up delay-500">
            <img src={logo} alt="" className="w-10 h-10" />
            <div>
              <p className="font-dm text-xs text-negro/50 dark:text-white/40 uppercase tracking-wider transition-colors">Comercio</p>
              <p className="font-playfair text-negro dark:text-white text-sm font-bold transition-colors">100% Justo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────── STATS BAR ──────────────── */
const stats = [
  { value: '2,400+', label: 'Piezas vendidas' },
  { value: '18', label: 'Artesanas activas' },
  { value: '100%', label: 'Comercio justo' },
  { value: '8', label: 'Regiones de México' },
]

function StatsBar() {
  return (
    <section className="bg-negro dark:bg-magenta-deep py-12 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} from="up" delay={i * 100} className="text-center">
            <p className="font-playfair text-3xl md:text-4xl text-magenta dark:text-white mb-1 transition-colors">{s.value}</p>
            <p className="font-dm text-xs uppercase tracking-[0.15em] text-white/40 dark:text-white/60 transition-colors">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ──────────────── FEATURED COLLECTION ──────────────── */
function FeaturedCollection() {
  const featured = products.slice(0, 3)
  return (
    <section className="py-20 px-4 md:px-8 bg-algodon dark:bg-[#130710] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <Reveal from="right">
            <SectionHeader
              overline="Colección destacada"
              title="Piezas seleccionadas"
              subtitle="Cada rebozo es único. Una vez agotado, no se repite."
              align="left"
            />
          </Reveal>
          <Reveal from="left" delay={150}>
            <Link to="/tienda" className="btn-outline whitespace-nowrap">Ver todo</Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.id} from="up" delay={i * 120}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────── STORY SECTION ──────────────── */
function StorySection() {
  return (
    <section className="bg-negro dark:bg-[#0a0006] py-20 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Reveal from="right" className="flex flex-col gap-6">
          <SectionHeader
            overline="Nuestra historia"
            title="Preservando un arte milenario"
            subtitle="El rebozo es más que una prenda. Es identidad, historia y sustento de miles de familias mexicanas."
            align="left"
            light
          />
          <p className="font-cormorant text-lg text-white/60 leading-relaxed">
            Trabajamos directamente con artesanas de regiones como Tenancingo, Santa María del Río y Mitla, garantizando un pago justo y condiciones dignas. Cada pieza viene con un certificado que incluye la historia de la artesana que la creó.
          </p>
          <Link to="/nosotros" className="btn-outline text-white border-white/30 hover:bg-white hover:text-negro w-fit">
            Conocer más
          </Link>
        </Reveal>

        <Reveal from="left" delay={150} className="relative">
          <div className="grid grid-cols-2 gap-3">
            <img
              src="https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&q=80"
              alt="Artesana tejiendo"
              className="aspect-[3/4] object-cover rounded-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
            <div className="flex flex-col gap-3">
              <img
                src="https://images.unsplash.com/photo-1590739293931-a5b92b098a92?w=400&q=80"
                alt="Detalle de rebozo"
                className="aspect-square object-cover rounded-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="bg-magenta/10 border border-magenta/20 rounded-sm p-4 text-center">
                <p className="font-playfair text-3xl text-magenta">40+</p>
                <p className="font-dm text-xs text-white/50 uppercase tracking-wider">años de tradición</p>
              </div>
            </div>
          </div>
          <div className="absolute -z-0 inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#da1e7a,#da1e7a_1px,transparent_1px,transparent_8px)] pointer-events-none rounded-sm" />
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────── PROCESS SECTION ──────────────── */
const steps = [
  { num: '01', icon: Leaf, title: 'Materia prima natural', desc: 'Seda, algodón y lana seleccionados de productores locales con prácticas sostenibles.' },
  { num: '02', icon: Heart, title: 'Teñido artesanal', desc: 'Tintes naturales extraídos de plantas, flores e insectos regionales siguiendo recetas ancestrales.' },
  { num: '03', icon: Shield, title: 'Tejido a mano', desc: 'En telar de pedal o de cintura, cada pieza puede tomar de semanas a meses en completarse.' },
  { num: '04', icon: MapPin, title: 'Certificado de origen', desc: 'Cada rebozo incluye la historia de su artesana y la región de origen verificada.' },
]

function ProcessSection() {
  return (
    <section className="bg-algodon dark:bg-[#0f0309] py-20 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionHeader
            overline="Nuestro proceso"
            title="Del telar a tus manos"
            subtitle="Cuatro pasos que garantizan la autenticidad y calidad de cada pieza."
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.num} from="up" delay={i * 100}>
                <div className="bg-white dark:bg-[#1a0a12] p-6 rounded-sm border border-negro/5 dark:border-white/5 shadow-warm transition-colors duration-300 h-full hover:-translate-y-1 hover:shadow-warm-md transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="font-playfair text-3xl text-magenta/20 leading-none font-bold">{step.num}</span>
                    <Icon size={20} className="text-magenta mt-1 flex-shrink-0" />
                  </div>
                  <h3 className="font-playfair text-lg text-negro dark:text-white mb-2 transition-colors">{step.title}</h3>
                  <p className="font-cormorant text-negro/60 dark:text-white/50 text-base leading-relaxed transition-colors">{step.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ──────────────── TESTIMONIALS ──────────────── */
function Testimonials() {
  return (
    <section className="py-20 px-4 md:px-8 bg-hueso dark:bg-[#0d0108] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionHeader
            overline="Lo que dicen"
            title="Clientes que aman sus rebozos"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} from="up" delay={i * 130}>
              <div className="bg-white dark:bg-[#1a0a12] p-6 border border-negro/5 dark:border-white/5 shadow-warm rounded-sm relative transition-colors duration-300 hover:shadow-warm-md hover:-translate-y-1 transition-all h-full">
                <span className="font-playfair text-6xl text-magenta/15 dark:text-magenta/25 absolute top-3 left-4 leading-none select-none">"</span>
                <p className="font-cormorant text-lg text-negro/75 dark:text-white/70 leading-relaxed mb-5 pt-4 relative z-10 transition-colors">{t.text}</p>
                <div className="border-t border-negro/5 dark:border-white/5 pt-4">
                  <p className="font-dm font-medium text-negro dark:text-white text-sm transition-colors">{t.name}</p>
                  <p className="font-dm text-xs text-negro/40 dark:text-white/30 transition-colors">{t.location} · {t.product}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────── NEWSLETTER ──────────────── */
function Newsletter() {
  return (
    <section className="bg-magenta dark:bg-magenta-deep py-16 px-4 md:px-8 transition-colors duration-300">
      <Reveal className="max-w-xl mx-auto text-center">
        <span className="text-xs font-dm uppercase tracking-[0.2em] text-white/60 block mb-3">Newsletter</span>
        <h2 className="font-playfair text-3xl text-white mb-3">Novedades y piezas exclusivas</h2>
        <p className="font-cormorant text-xl text-white/70 mb-8">Sé el primero en conocer nuevas colecciones y artesanas.</p>
        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por suscribirte!') }}
        >
          <input
            type="email"
            placeholder="tu@correo.com"
            required
            className="flex-1 px-4 py-3 rounded-btn bg-white/10 border border-white/20 text-white placeholder-white/40 font-dm text-sm focus:outline-none focus:border-white/60 transition-colors"
          />
          <button type="submit" className="px-6 py-3 bg-negro text-white font-dm font-medium text-sm rounded-btn hover:bg-negro/80 transition-colors whitespace-nowrap">
            Suscribirse
          </button>
        </form>
      </Reveal>
    </section>
  )
}

/* ──────────────── PAGE ──────────────── */
export default function Landing() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedCollection />
      <StorySection />
      <ProcessSection />
      <Testimonials />
      <Newsletter />
    </>
  )
}
