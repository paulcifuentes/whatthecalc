export function whatIsXPercentOfY(x, y) {
  return (x / 100) * y
}

export function xIsWhatPercentOfY(x, y) {
  if (y === 0) return 0
  return (x / y) * 100
}

export function percentageChange(from, to) {
  if (from === 0) return 0
  return ((to - from) / Math.abs(from)) * 100
}
