export default function SectionHeader({ overline, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {overline && (
        <span className={`text-xs font-dm font-medium uppercase tracking-[0.2em] ${light ? 'text-magenta-light' : 'text-magenta'}`}>
          {overline}
        </span>
      )}
      <h2 className={`font-playfair text-3xl md:text-4xl leading-tight transition-colors ${light ? 'text-white' : 'text-negro dark:text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-cormorant text-lg leading-relaxed max-w-xl transition-colors ${light ? 'text-white/70' : 'text-negro/60 dark:text-white/50'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
