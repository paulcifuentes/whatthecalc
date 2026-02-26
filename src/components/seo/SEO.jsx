import { Helmet } from 'react-helmet-async'
import { useParams, useLocation } from 'react-router-dom'
import { supportedLanguages } from '../../i18n'

const BASE_URL = 'https://whatthe.calc'

export default function SEO({ title, description }) {
  const { lang } = useParams()
  const location = useLocation()
  const pathWithoutLang = location.pathname.replace(`/${lang}`, '') || '/'

  const ogLocaleMap = {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    zh: 'zh_CN',
    ja: 'ja_JP',
  }

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={ogLocaleMap[lang] || 'en_US'} />
      {supportedLanguages.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${BASE_URL}/${l}${pathWithoutLang}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${pathWithoutLang}`}
      />
    </Helmet>
  )
}
