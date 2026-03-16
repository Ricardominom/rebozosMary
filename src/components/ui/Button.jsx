export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-dm font-medium rounded-btn transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-magenta text-white border border-magenta hover:bg-magenta-deep hover:border-magenta-deep',
    ghost: 'bg-transparent text-negro border border-negro/20 hover:border-negro/50',
    outline: 'bg-transparent text-magenta border border-magenta hover:bg-magenta hover:text-white',
    danger: 'bg-red-600 text-white border border-red-600 hover:bg-red-700',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
