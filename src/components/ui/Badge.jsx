export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-magenta-light text-magenta',
    dorado: 'bg-dorado/10 text-dorado',
    dark: 'bg-negro/10 text-negro',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
  }

  return (
    <span className={`inline-block text-xs font-dm font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-btn ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
