import { useInView } from '../../hooks/useInView'

/**
 * Envuelve children con animación de entrada al hacer scroll.
 * @param {string} from  — 'up' | 'left' | 'right' | 'scale'  (default: 'up')
 * @param {number} delay — ms de delay (0, 100, 200, 300, 400, 500, 600)
 * @param {string} as    — elemento HTML a renderizar (default: 'div')
 */
export default function Reveal({ children, from = 'up', delay = 0, as: Tag = 'div', className = '', ...props }) {
  const { ref, visible } = useInView()

  const fromClass = {
    up: '',
    left: 'from-left',
    right: 'from-right',
    scale: 'scale',
  }[from] ?? ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${fromClass} ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...props}
    >
      {children}
    </Tag>
  )
}
