export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return '—'
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}

export function formatCurrency(num, currency = 'USD') {
  if (num === null || num === undefined || isNaN(num)) return '—'
  return Number(num).toLocaleString(undefined, {
    style: 'currency',
    currency,
  })
}

export function formatPercent(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return '—'
  return Number(num).toFixed(decimals) + '%'
}
