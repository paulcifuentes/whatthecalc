const volumeToMl = {
  tsp: 4.92892,
  tbsp: 14.7868,
  cup: 236.588,
  ml: 1,
  l: 1000,
  floz: 29.5735,
}

const weightToGrams = {
  g: 1,
  oz: 28.3495,
  kg: 1000,
  lb: 453.592,
}

export const volumeUnits = Object.keys(volumeToMl)
export const weightUnits = Object.keys(weightToGrams)
export const allUnits = [...volumeUnits, ...weightUnits]

export function isVolumeUnit(unit) {
  return unit in volumeToMl
}

export function isWeightUnit(unit) {
  return unit in weightToGrams
}

export function convertCooking(value, from, to) {
  const fromIsVolume = isVolumeUnit(from)
  const toIsVolume = isVolumeUnit(to)
  const fromIsWeight = isWeightUnit(from)
  const toIsWeight = isWeightUnit(to)

  if (fromIsVolume && toIsVolume) {
    return (value * volumeToMl[from]) / volumeToMl[to]
  }
  if (fromIsWeight && toIsWeight) {
    return (value * weightToGrams[from]) / weightToGrams[to]
  }
  return null
}
