import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import tools from '../config/tools'
import SEO from '../components/seo/SEO'
import { ArrowRight } from 'lucide-react'

const cardColors = {
  percentage: 'from-teal-500/10 to-emerald-500/10 hover:from-teal-500/15 hover:to-emerald-500/15',
  bmi: 'from-rose-500/10 to-pink-500/10 hover:from-rose-500/15 hover:to-pink-500/15',
  calories: 'from-orange-500/10 to-amber-500/10 hover:from-orange-500/15 hover:to-amber-500/15',
  age: 'from-violet-500/10 to-purple-500/10 hover:from-violet-500/15 hover:to-purple-500/15',
  'compound-interest': 'from-emerald-500/10 to-green-500/10 hover:from-emerald-500/15 hover:to-green-500/15',
  gpa: 'from-blue-500/10 to-indigo-500/10 hover:from-blue-500/15 hover:to-indigo-500/15',
  tip: 'from-amber-500/10 to-yellow-500/10 hover:from-amber-500/15 hover:to-yellow-500/15',
  units: 'from-cyan-500/10 to-sky-500/10 hover:from-cyan-500/15 hover:to-sky-500/15',
  timezone: 'from-slate-500/10 to-gray-500/10 hover:from-slate-500/15 hover:to-gray-500/15',
  cooking: 'from-red-500/10 to-orange-500/10 hover:from-red-500/15 hover:to-orange-500/15',
}

const iconColors = {
  percentage: 'text-teal-600 bg-teal-100',
  bmi: 'text-rose-600 bg-rose-100',
  calories: 'text-orange-600 bg-orange-100',
  age: 'text-violet-600 bg-violet-100',
  'compound-interest': 'text-emerald-600 bg-emerald-100',
  gpa: 'text-blue-600 bg-blue-100',
  tip: 'text-amber-600 bg-amber-100',
  units: 'text-cyan-600 bg-cyan-100',
  timezone: 'text-slate-600 bg-slate-100',
  cooking: 'text-red-600 bg-red-100',
}

export default function HomePage() {
  const { lang } = useParams()
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={`${t('siteName')} — ${t('siteTagline')}`}
        description={t('siteTagline')}
      />

      <div className="space-y-10">
        <div className="text-center space-y-3 animate-fade-in-up">
          <h1 className="font-display text-4xl sm:text-5xl text-ink-900 leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-ink-400 text-lg max-w-md mx-auto">{t('home.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <Link
              key={tool.id}
              to={`/${lang}/${tool.path}`}
              className={`group relative bg-gradient-to-br ${cardColors[tool.id] || ''} bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 p-5 card-hover animate-fade-in-up`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconColors[tool.id] || 'text-teal-600 bg-teal-100'} transition-transform duration-200 group-hover:scale-110`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ink-900 group-hover:text-ink-900 transition-colors flex items-center gap-2">
                    <span>{t(`${tool.id}.name`, { ns: 'tools' })}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-ink-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </h3>
                  <p className="text-sm text-ink-400 mt-1 leading-relaxed">
                    {t(`${tool.id}.description`, { ns: 'tools' })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
