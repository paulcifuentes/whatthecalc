export default function ResultCard({ label, value, sublabel, color = 'blue', className = '' }) {
  const colorMap = {
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-200/60 text-blue-700',
    green: 'bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-200/60 text-emerald-700',
    yellow: 'bg-gradient-to-br from-amber-50 to-yellow-50/50 border-amber-200/60 text-amber-700',
    red: 'bg-gradient-to-br from-red-50 to-rose-50/50 border-red-200/60 text-red-700',
    orange: 'bg-gradient-to-br from-orange-50 to-amber-50/50 border-orange-200/60 text-orange-700',
    gray: 'bg-gradient-to-br from-slate-50 to-gray-50/50 border-slate-200/60 text-slate-700',
  }

  return (
    <div className={`rounded-2xl border p-4 animate-scale-in ${colorMap[color] || colorMap.blue} ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{label}</p>
      <p className="text-2xl font-bold mt-1.5 tracking-tight">{value}</p>
      {sublabel && <p className="text-xs mt-1.5 opacity-60 font-medium">{sublabel}</p>}
    </div>
  )
}
