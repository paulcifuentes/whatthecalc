import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { calculators, converters } from '../../config/tools'
import LanguageSwitcher from './LanguageSwitcher'

export default function Sidebar() {
  const { lang } = useParams()
  const { t } = useTranslation('tools')
  const { t: tc } = useTranslation('common')

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
      isActive
        ? 'bg-sunset-light/15 text-sunset-glow font-semibold'
        : 'text-ink-400 hover:text-cream-100 hover:bg-white/5'
    }`

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen bg-gradient-to-b from-ink-900 to-ink-800 fixed left-0 top-0 z-30">
      <div className="p-5 border-b border-white/8">
        <NavLink to={`/${lang}`} end>
          <span className="font-display text-xl text-cream-50 leading-tight">{tc('siteName')}</span>
        </NavLink>
      </div>

      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-5 space-y-6">
        <div>
          <h3 className="text-[10px] font-bold text-ink-500 uppercase tracking-[0.15em] mb-2.5 px-3">
            {t('calculators', { ns: 'common', defaultValue: 'Calculators' })}
          </h3>
          <ul className="space-y-0.5">
            {calculators.map((tool) => (
              <li key={tool.id}>
                <NavLink to={`/${lang}/${tool.path}`} className={linkClass}>
                  <tool.icon className="w-[16px] h-[16px] shrink-0" />
                  <span className="truncate">{t(`${tool.id}.name`)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/6 pt-5">
          <h3 className="text-[10px] font-bold text-ink-500 uppercase tracking-[0.15em] mb-2.5 px-3">
            {t('converters', { ns: 'common', defaultValue: 'Converters' })}
          </h3>
          <ul className="space-y-0.5">
            {converters.map((tool) => (
              <li key={tool.id}>
                <NavLink to={`/${lang}/${tool.path}`} className={linkClass}>
                  <tool.icon className="w-[16px] h-[16px] shrink-0" />
                  <span className="truncate">{t(`${tool.id}.name`)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-white/8">
        <LanguageSwitcher variant="dark" />
      </div>
    </aside>
  )
}
