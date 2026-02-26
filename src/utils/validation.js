export function isPositiveNumber(value) {
  const num = Number(value)
  return value !== '' && !isNaN(num) && num > 0
}

export function isNonNegativeNumber(value) {
  const num = Number(value)
  return value !== '' && !isNaN(num) && num >= 0
}

export function isValidNumber(value) {
  return value !== '' && !isNaN(Number(value))
}
