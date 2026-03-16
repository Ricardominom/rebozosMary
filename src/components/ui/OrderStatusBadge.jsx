import Badge from './Badge'

const statusMap = {
  pendiente: { label: 'Pendiente', variant: 'warning' },
  procesando: { label: 'Procesando', variant: 'default' },
  enviado: { label: 'Enviado', variant: 'dorado' },
  entregado: { label: 'Entregado', variant: 'success' },
  cancelado: { label: 'Cancelado', variant: 'danger' },
}

export default function OrderStatusBadge({ status }) {
  const config = statusMap[status] ?? { label: status, variant: 'dark' }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
