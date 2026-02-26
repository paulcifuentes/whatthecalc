export default function NumberInput({ label, value, onChange, min, max, step = 'any', placeholder, id, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 focus-ring hover:border-ink-300 transition-colors"
      />
    </div>
  )
}
