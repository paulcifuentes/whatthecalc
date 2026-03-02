import SEO from '../seo/SEO'

export default function ToolPageWrapper({ title, description, children }) {
  return (
    <>
      <SEO title={`${title} — WhatTheCalc`} description={description} />
      <div className="space-y-5">
        <div className="animate-fade-in-up">
          <h2 className="font-display text-[26px] sm:text-[28px] text-ink-900">{title}</h2>
        </div>
        {children}
      </div>
    </>
  )
}
