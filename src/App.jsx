import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DarkModeProvider } from './context/DarkModeContext'
import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'
import Landing from './pages/Landing'
import Tienda from './pages/Tienda'
import Producto from './pages/Producto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Cuenta from './pages/Cuenta'
import Dashboard from './pages/admin/Dashboard'
import AdminProductos from './pages/admin/Productos'
import AdminPedidos from './pages/admin/Pedidos'
import AdminClientes from './pages/admin/Clientes'
import AdminArtesanas from './pages/admin/Artesanas'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'tienda', element: <Tienda /> },
      { path: 'producto/:id', element: <Producto /> },
      { path: 'carrito', element: <Carrito /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'cuenta', element: <Cuenta /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'productos', element: <AdminProductos /> },
      { path: 'pedidos', element: <AdminPedidos /> },
      { path: 'clientes', element: <AdminClientes /> },
      { path: 'artesanas', element: <AdminArtesanas /> },
    ],
  },
])

export default function App() {
  return (
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  )
}
