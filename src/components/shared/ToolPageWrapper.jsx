import SEO from '../seo/SEO'

export default function ToolPageWrapper({ title, description, children }) {
  return (
    <>
      <SEO title={`${title} — WhatTheCalc`} description={description} />
      <div className="space-y-5">
        <div className="animate-fade-in-up">
          <h1 className="font-display text-3xl sm:text-4xl text-ink-900">{title}</h1>
        </div>
        {children}
      </div>
    </>
  )
}
