import { useEffect } from 'react'
import { useParams, Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../i18n'

export default function LanguageWrapper() {
  const { lang } = useParams()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (supportedLanguages.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  if (!supportedLanguages.includes(lang)) {
    return <Navigate to="/en/" replace />
  }

  return <Outlet />
}
