import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import IntroScreen from './IntroScreen'

export default function Layout() {
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem('rm-visited')
  )

  const handleIntroDone = () => {
    sessionStorage.setItem('rm-visited', '1')
    setShowIntro(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showIntro && <IntroScreen onDone={handleIntroDone} />}
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
