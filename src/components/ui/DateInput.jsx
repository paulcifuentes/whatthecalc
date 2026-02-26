export default function DateInput({ label, value, onChange, id, max, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={max}
        className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-sm text-ink-900 focus-ring hover:border-ink-300 transition-colors"
      />
    </div>
  )
}
