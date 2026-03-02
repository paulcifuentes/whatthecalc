import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { X, Sparkles } from 'lucide-react'
import { calculators, converters } from '../../config/tools'

export default function MobileMenu({ isOpen, onClose }) {
  const { lang } = useParams()
  const { t } = useTranslation('tools')

  if (!isOpen) return null

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
      isActive
        ? 'bg-sunset-light/15 text-sunset-glow font-semibold'
        : 'text-ink-400 hover:text-cream-100 hover:bg-white/5'
    }`

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-ink-900 to-ink-800 shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-sunset to-sunset-light rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ink-900" />
            </div>
            <span className="font-display text-lg text-cream-50">WhatTheCalc</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-500 hover:text-cream-100 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-5">
          <div>
            <h3 className="text-[10px] font-bold text-ink-500 uppercase tracking-[0.15em] mb-2 px-4">
              {t('calculators', { ns: 'common', defaultValue: 'Calculators' })}
            </h3>
            <ul className="space-y-0.5">
              {calculators.map((tool) => (
                <li key={tool.id}>
                  <NavLink to={`/${lang}/${tool.path}`} className={linkClass} onClick={onClose}>
                    <tool.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t(`${tool.id}.name`)}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/6 pt-5">
            <h3 className="text-[10px] font-bold text-ink-500 uppercase tracking-[0.15em] mb-2 px-4">
              {t('converters', { ns: 'common', defaultValue: 'Converters' })}
            </h3>
            <ul className="space-y-0.5">
              {converters.map((tool) => (
                <li key={tool.id}>
                  <NavLink to={`/${lang}/${tool.path}`} className={linkClass} onClick={onClose}>
                    <tool.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t(`${tool.id}.name`)}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}
