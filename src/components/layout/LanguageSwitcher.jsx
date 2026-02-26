import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { supportedLanguages, languageNames } from '../../i18n'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher({ variant = 'light' }) {
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    const newLang = e.target.value
    const pathWithoutLang = location.pathname.replace(`/${lang}`, '') || '/'
    navigate(`/${newLang}${pathWithoutLang}`)
  }

  const isDark = variant === 'dark'

  return (
    <div className="flex items-center gap-2">
      <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-ink-500' : 'text-ink-400'}`} />
      <select
        value={lang}
        onChange={handleChange}
        className={`text-sm border rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer transition-colors ${
          isDark
            ? 'bg-white/5 text-ink-300 border-white/10 hover:border-white/20 focus:border-teal-accent'
            : 'bg-cream-50 text-ink-700 border-cream-200 hover:border-ink-300 focus:border-teal-accent'
        }`}
        aria-label="Language"
      >
        {supportedLanguages.map((l) => (
          <option key={l} value={l}>
            {languageNames[l]}
          </option>
        ))}
      </select>
    </div>
  )
}
