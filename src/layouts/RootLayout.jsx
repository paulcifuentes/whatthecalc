import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import MobileNav from '../components/layout/MobileNav'

export default function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-cream-100 bg-dotgrid">
      <Sidebar />
      <Header />
      <MobileNav />

      <main className="lg:ml-[260px] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
