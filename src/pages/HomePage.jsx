import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import tools from '../config/tools'
import SEO from '../components/seo/SEO'
import { Search, Mic, ArrowRight, Sparkles } from 'lucide-react'
import { parseQuery, parseQueryForTool } from '../utils/queryParser'

const POPULAR_IDS = ['percentage', 'bmi', 'tip', 'units', 'calories']

const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null

export default function HomePage() {
  const { lang } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)
  const inputRef = useRef(null)

  const hasSpeech = !!SpeechRecognition

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  function toggleListening() {
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript
      setQuery(text)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return []

    return tools
      .map((tool) => {
        const name = t(`${tool.id}.name`, { ns: 'tools' }).toLowerCase()
        const desc = t(`${tool.id}.description`, { ns: 'tools' }).toLowerCase()
        const keywordMatch = tool.keywords?.some((kw) => kw.includes(q) || q.includes(kw))

        let score = 0
        if (name.includes(q)) score += 3
        if (keywordMatch) score += 2
        if (desc.includes(q)) score += 1

        return { tool, score }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.tool)
  }, [query, t])

  const parsedQuery = useMemo(() => parseQuery(query), [query])

  function handleToolClick(e, tool) {
    const prefill = parseQueryForTool(query, tool.id)
    if (prefill) {
      e.preventDefault()
      navigate(`/${lang}/${tool.path}`, { state: { prefill } })
    }
  }

  const showResults = query.trim().length > 0

  return (
    <>
      <SEO
        title={`${t('siteName')} — ${t('siteTagline')}`}
        description={t('siteTagline')}
      />

      <div className="flex flex-col items-center pt-8 sm:pt-16 pb-12 px-4">
        {/* Hero */}
        <div className="text-center space-y-3 animate-fade-in-up mb-8 sm:mb-10">
          <h1 className="font-display text-4xl sm:text-5xl text-ink-900 leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-ink-400 text-lg max-w-md mx-auto">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Search input */}
        <div className="w-full max-w-lg animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={listening ? t('home.listening') : query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('home.placeholder')}
              className="w-full pl-12 pr-14 py-4 rounded-2xl bg-cream-50 border border-cream-200 text-ink-900 placeholder:text-ink-300 focus-ring text-lg"
              readOnly={listening}
              autoFocus
            />
            {hasSpeech && (
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  listening
                    ? 'bg-rose text-white mic-pulse'
                    : 'text-ink-400 hover:text-ink-600 hover:bg-cream-200'
                }`}
                aria-label={listening ? 'Stop listening' : 'Voice search'}
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results or popular pills */}
        <div className="w-full max-w-lg mt-6">
          {showResults ? (
            filtered.length > 0 ? (
              <div className="space-y-2 animate-fade-in-up">
                {filtered.map((tool) => {
                  const hasPrefill = parsedQuery?.toolId === tool.id
                  return (
                    <Link
                      key={tool.id}
                      to={`/${lang}/${tool.path}`}
                      onClick={(e) => handleToolClick(e, tool)}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200 card-hover"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-coral bg-coral-50 shrink-0 transition-transform duration-200 group-hover:scale-110">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-ink-900 flex items-center gap-2">
                          <span>{t(`${tool.id}.name`, { ns: 'tools' })}</span>
                          {hasPrefill && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sunset-glow text-sunset text-xs font-semibold">
                              <Sparkles className="w-3 h-3" />
                              {t('home.valuesDetected')}
                            </span>
                          )}
                          <ArrowRight className="w-3.5 h-3.5 text-ink-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </h3>
                        <p className="text-sm text-ink-400 mt-0.5 leading-relaxed truncate">
                          {t(`${tool.id}.description`, { ns: 'tools' })}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-ink-400 py-6 animate-fade-in-up">
                {t('home.noResults')}
              </p>
            )
          ) : (
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <p className="text-sm text-ink-400 text-center mb-3">
                {t('home.popular')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR_IDS.map((id) => {
                  const tool = tools.find((t) => t.id === id)
                  if (!tool) return null
                  return (
                    <Link
                      key={id}
                      to={`/${lang}/${tool.path}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-50 border border-cream-200 text-sm font-medium text-ink-700 hover:bg-cream-200 hover:border-cream-200 transition-colors"
                    >
                      <tool.icon className="w-4 h-4 text-coral" />
                      {t(`${id}.name`, { ns: 'tools' })}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
