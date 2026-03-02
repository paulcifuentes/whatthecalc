export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }) {
  const variants = {
    primary: 'bg-sunset-50 text-sunset hover:bg-sunset-glow',
    secondary: 'bg-cream-200/70 text-ink-600 hover:bg-cream-200',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}
