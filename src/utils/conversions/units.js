const lengthToMeters = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
}

const weightToGrams = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
  t: 1000000,
}

const volumeToMl = {
  ml: 1,
  l: 1000,
  gal: 3785.41,
  qt: 946.353,
  pt: 473.176,
  cup: 236.588,
  floz: 29.5735,
}

export function convertLength(value, from, to) {
  return (value * lengthToMeters[from]) / lengthToMeters[to]
}

export function convertWeight(value, from, to) {
  return (value * weightToGrams[from]) / weightToGrams[to]
}

export function convertVolume(value, from, to) {
  return (value * volumeToMl[from]) / volumeToMl[to]
}

export function convertTemperature(value, from, to) {
  let celsius
  if (from === 'c') celsius = value
  else if (from === 'f') celsius = (value - 32) * (5 / 9)
  else celsius = value - 273.15

  if (to === 'c') return celsius
  if (to === 'f') return celsius * (9 / 5) + 32
  return celsius + 273.15
}

export const lengthUnits = Object.keys(lengthToMeters)
export const weightUnits = Object.keys(weightToGrams)
export const volumeUnits = Object.keys(volumeToMl)
export const temperatureUnits = ['c', 'f', 'k']
