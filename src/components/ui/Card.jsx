export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm shadow-black/[0.03] p-5 sm:p-6 animate-scale-in ${className}`}>
      {title && (
        <h3 className="text-sm font-bold text-ink-900 uppercase tracking-wide mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
