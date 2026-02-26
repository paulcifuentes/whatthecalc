import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { lang } = useParams()
  const { t } = useTranslation('common')

  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-xl border-b border-cream-200 sticky top-0 z-40">
      <NavLink to={`/${lang}`} end>
        <span className="font-display text-lg text-ink-900">{t('siteName')}</span>
      </NavLink>

      <LanguageSwitcher />
    </header>
  )
}
