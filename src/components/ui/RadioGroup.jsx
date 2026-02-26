export default function RadioGroup({ label, name, value, onChange, options, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <span className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">{label}</span>
      )}
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm cursor-pointer transition-all duration-200 ${
              value === opt.value
                ? 'border-teal-accent bg-teal-50 text-teal-accent font-semibold shadow-sm shadow-teal-accent/10'
                : 'border-cream-200 bg-cream-50 text-ink-600 hover:border-ink-300'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  )
}
