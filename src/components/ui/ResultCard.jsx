export default function ResultCard({ label, value, sublabel, color = 'blue', className = '' }) {
  const colorMap = {
    blue: 'bg-coral-50 border-coral-light/30 text-rose',
    green: 'bg-sunset-50 border-sunset-glow/50 text-sunset',
    yellow: 'bg-amber-50 border-amber/20 text-amber',
    red: 'bg-rose-50 border-rose-light/30 text-rose',
    orange: 'bg-amber-50 border-amber/20 text-amber',
    violet: 'bg-violet-50 border-violet/20 text-violet',
    gray: 'bg-cream-200/50 border-cream-200 text-ink-500',
  }

  return (
    <div className={`rounded-2xl border p-4 animate-scale-in ${colorMap[color] || colorMap.blue} ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{label}</p>
      <p className="text-2xl font-bold mt-1.5 tracking-tight">{value}</p>
      {sublabel && <p className="text-xs mt-1.5 opacity-60 font-medium">{sublabel}</p>}
    </div>
  )
}
