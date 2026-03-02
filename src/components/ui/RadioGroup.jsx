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
                ? 'border-transparent bg-sunset-50 text-sunset font-semibold'
                : 'border-cream-200 bg-cream-200/70 text-ink-600 hover:bg-cream-200'
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
