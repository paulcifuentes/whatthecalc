export function calculateAspectRatio(ratioW, ratioH, knownDimension, knownValue) {
  const rw = Number(ratioW) || 0
  const rh = Number(ratioH) || 0
  const value = Number(knownValue) || 0

  if (rw <= 0 || rh <= 0 || value <= 0) return null

  const decimalRatio = rw / rh

  if (knownDimension === 'width') {
    return {
      width: value,
      height: Math.round((value / decimalRatio) * 100) / 100,
      decimalRatio: Math.round(decimalRatio * 10000) / 10000,
    }
  }

  return {
    width: Math.round(value * decimalRatio * 100) / 100,
    height: value,
    decimalRatio: Math.round(decimalRatio * 10000) / 10000,
  }
}
