export default function TabGroup({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`flex gap-1 bg-cream-200/70 p-1 rounded-2xl ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === tab.value
              ? 'bg-white text-ink-900 shadow-sm shadow-black/[0.04]'
              : 'text-ink-400 hover:text-ink-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
