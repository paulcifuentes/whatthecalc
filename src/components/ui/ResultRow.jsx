export default function ResultRow({ label, value, className = '' }) {
  return (
    <div className={`flex items-center justify-between py-3 ${className}`}>
      <span className="text-sm text-ink-400">{label}</span>
      <span className="text-sm font-bold text-ink-900 tabular-nums">{value}</span>
    </div>
  )
}
