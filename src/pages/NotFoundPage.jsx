import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  const { lang } = useParams()
  const { t } = useTranslation()

  return (
    <div className="text-center py-24 space-y-5 animate-fade-in-up">
      <div className="font-display text-8xl text-ink-300/30 select-none">404</div>
      <h2 className="text-xl font-semibold text-ink-900">
        {t('notFound.title')}
      </h2>
      <p className="text-ink-400">{t('notFound.description')}</p>
      <Link
        to={`/${lang || 'en'}`}
        className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-gradient-to-r from-teal-accent to-teal-light text-white rounded-xl hover:shadow-lg hover:shadow-teal-accent/25 transition-all font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('notFound.backHome')}
      </Link>
    </div>
  )
}
