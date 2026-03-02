import { useCallback, useEffect, useRef } from 'react'
import { NavLink, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import tools from '../../config/tools'

export default function MobileNav() {
  const { lang } = useParams()
  const { t } = useTranslation('tools')
  const location = useLocation()
  const scrollRef = useRef(null)
  const activeRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    const active = activeRef.current
    if (!container || !active) return
    // Defer to next frame so layout measurements are accurate
    requestAnimationFrame(() => {
      const scrollLeft = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    })
  }, [location.pathname])

  return (
    <nav className="lg:hidden sticky top-[53px] z-30 bg-white/80 backdrop-blur-xl border-b border-cream-200">
      <div ref={scrollRef} className="flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar">
        {tools.map((tool) => {
          const isActive = location.pathname === `/${lang}/${tool.path}`
          return (
            <NavLink
              key={tool.id}
              to={`/${lang}/${tool.path}`}
              ref={isActive ? activeRef : undefined}
              className={
                `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'bg-sunset-50 text-sunset shadow-sm'
                    : 'bg-cream-200/70 text-ink-500 hover:bg-cream-200 hover:text-ink-700'
                }`
              }
            >
              <tool.icon className="w-3.5 h-3.5" />
              {t(`${tool.id}.name`)}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
