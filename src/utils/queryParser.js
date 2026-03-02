const COOKING_ALIASES = {
  teaspoon: 'tsp', teaspoons: 'tsp', tsp: 'tsp',
  tablespoon: 'tbsp', tablespoons: 'tbsp', tbsp: 'tbsp',
  cup: 'cup', cups: 'cup',
  milliliter: 'ml', milliliters: 'ml', ml: 'ml',
  liter: 'l', liters: 'l', l: 'l',
  'fluid ounce': 'floz', 'fluid ounces': 'floz', floz: 'floz',
  gram: 'g', grams: 'g', g: 'g',
  ounce: 'oz', ounces: 'oz', oz: 'oz',
  kilogram: 'kg', kilograms: 'kg', kgs: 'kg', kg: 'kg',
  pound: 'lb', pounds: 'lb', lbs: 'lb', lb: 'lb',
}

const COOKING_UNITS = new Set(['tsp', 'tbsp', 'cup', 'ml', 'l', 'floz', 'g', 'oz', 'kg', 'lb'])

const UNIT_ALIASES = {
  // Length
  mile: 'mi', miles: 'mi', mi: 'mi',
  kilometer: 'km', kilometers: 'km', km: 'km',
  foot: 'ft', feet: 'ft', ft: 'ft',
  inch: 'in', inches: 'in', in: 'in',
  meter: 'm', meters: 'm', m: 'm',
  centimeter: 'cm', centimeters: 'cm', cm: 'cm',
  yard: 'yd', yards: 'yd', yd: 'yd',
  millimeter: 'mm', millimeters: 'mm', mm: 'mm',
  // Weight
  pound: 'lb', pounds: 'lb', lbs: 'lb', lb: 'lb',
  kilogram: 'kg', kilograms: 'kg', kgs: 'kg', kg: 'kg',
  ounce: 'oz', ounces: 'oz', oz: 'oz',
  gram: 'g', grams: 'g', g: 'g',
  ton: 't', tons: 't', t: 't',
  milligram: 'mg', milligrams: 'mg', mg: 'mg',
  // Volume
  gallon: 'gal', gallons: 'gal', gal: 'gal',
  quart: 'qt', quarts: 'qt', qt: 'qt',
  pint: 'pt', pints: 'pt', pt: 'pt',
  cup: 'cup', cups: 'cup',
  liter: 'l', liters: 'l', l: 'l',
  milliliter: 'ml', milliliters: 'ml', ml: 'ml',
  'fluid ounce': 'floz', 'fluid ounces': 'floz', floz: 'floz',
  // Temperature
  fahrenheit: 'f', celsius: 'c', kelvin: 'k',
  f: 'f', c: 'c', k: 'k',
}

const UNIT_TO_TAB = {
  mm: 'length', cm: 'length', m: 'length', km: 'length',
  in: 'length', ft: 'length', yd: 'length', mi: 'length',
  mg: 'weight', g: 'weight', kg: 'weight', oz: 'weight',
  lb: 'weight', t: 'weight',
  ml: 'volume', l: 'volume', gal: 'volume', qt: 'volume',
  pt: 'volume', cup: 'volume', floz: 'volume',
  f: 'temperature', c: 'temperature', k: 'temperature',
}

function parsePercentage(q) {
  // "what is 15% of 200" / "15 percent of 200" / "15% of 200"
  let m = q.match(/(\d+(?:\.\d+)?)\s*(?:%|percent)\s*(?:of)\s*(\d+(?:\.\d+)?)/)
  if (m) return { toolId: 'percentage', params: { pct1: m[1], val1: m[2] } }

  // "20 is what percent of 80"
  m = q.match(/(\d+(?:\.\d+)?)\s*is\s*what\s*(?:%|percent(?:age)?)\s*(?:of)\s*(\d+(?:\.\d+)?)/)
  if (m) return { toolId: 'percentage', params: { val2: m[1], total2: m[2] } }

  // "change from 50 to 75" / "percent change from 50 to 75"
  m = q.match(/(?:change|difference)\s*(?:from)?\s*(\d+(?:\.\d+)?)\s*to\s*(\d+(?:\.\d+)?)/)
  if (m) return { toolId: 'percentage', params: { from3: m[1], to3: m[2] } }

  return null
}

function parseTip(q) {
  // "20% tip on $85" / "20 percent tip on 85"
  let m = q.match(/(\d+(?:\.\d+)?)\s*(?:%|percent)\s*tip\s*(?:on)?\s*\$?\s*(\d+(?:\.\d+)?)/)
  if (m) return { toolId: 'tip', params: { bill: m[2], customTip: m[1] } }

  // "tip on $50" / "tip 50" / "tip on 50"
  m = q.match(/tip\s*(?:on|for)?\s*\$?\s*(\d+(?:\.\d+)?)/)
  if (m) return { toolId: 'tip', params: { bill: m[1] } }

  // "split $120 bill 4 ways" / "split 120 4 ways"
  m = q.match(/split\s*\$?\s*(\d+(?:\.\d+)?)\s*(?:bill)?\s*(\d+)\s*ways?/)
  if (m) return { toolId: 'tip', params: { bill: m[1], people: m[2] } }

  return null
}

function parseBmi(q) {
  // "bmi 180cm 75kg" / "bmi 180 cm 75 kg"
  let m = q.match(/bmi\s*(\d+(?:\.\d+)?)\s*cm\s*(\d+(?:\.\d+)?)\s*kg/)
  if (m) return { toolId: 'bmi', params: { system: 'metric', heightCm: m[1], weightKg: m[2] } }

  // "bmi 75kg 180cm" (reversed order)
  m = q.match(/bmi\s*(\d+(?:\.\d+)?)\s*kg\s*(\d+(?:\.\d+)?)\s*cm/)
  if (m) return { toolId: 'bmi', params: { system: 'metric', heightCm: m[2], weightKg: m[1] } }

  // "bmi 5'10 170lbs" / "bmi 5'10" 170 lbs" / "bmi 5 10 170lbs"
  m = q.match(/bmi\s*(\d+)\s*[''′]\s*(\d+)\s*"?\s*(\d+(?:\.\d+)?)\s*(?:lbs?|pounds?)/)
  if (m) return { toolId: 'bmi', params: { system: 'imperial', feet: m[1], inches: m[2], pounds: m[3] } }

  // "bmi 5ft 10in 170lbs"
  m = q.match(/bmi\s*(\d+)\s*(?:ft|feet|foot)\s*(\d+)\s*(?:in|inches?)\s*(\d+(?:\.\d+)?)\s*(?:lbs?|pounds?)/)
  if (m) return { toolId: 'bmi', params: { system: 'imperial', feet: m[1], inches: m[2], pounds: m[3] } }

  return null
}

function resolveCookingUnit(word) {
  return COOKING_ALIASES[word] || null
}

function resolveUnit(word) {
  return UNIT_ALIASES[word] || null
}

function parseCooking(q) {
  // "3 cups to ml" / "convert 3 tablespoons to ml"
  const m = q.match(/(?:convert\s+)?(\d+(?:\.\d+)?)\s+([\w\s]+?)\s+(?:to|in|into)\s+([\w\s]+)/)
  if (!m) return null

  const value = m[1]
  const fromRaw = m[2].trim().toLowerCase()
  const toRaw = m[3].trim().toLowerCase()

  const fromKey = resolveCookingUnit(fromRaw)
  const toKey = resolveCookingUnit(toRaw)

  if (fromKey && toKey && COOKING_UNITS.has(fromKey) && COOKING_UNITS.has(toKey)) {
    return { toolId: 'cooking', params: { value, fromUnit: fromKey, toUnit: toKey } }
  }

  return null
}

function parseUnits(q) {
  // "convert 5 miles to km" / "5 miles to km" / "100 fahrenheit to celsius"
  const m = q.match(/(?:convert\s+)?(\d+(?:\.\d+)?)\s+([\w\s]+?)\s+(?:to|in|into)\s+([\w\s]+)/)
  if (!m) return null

  const value = m[1]
  const fromRaw = m[2].trim().toLowerCase()
  const toRaw = m[3].trim().toLowerCase()

  const fromKey = resolveUnit(fromRaw)
  const toKey = resolveUnit(toRaw)

  if (!fromKey || !toKey) return null

  const fromTab = UNIT_TO_TAB[fromKey]
  const toTab = UNIT_TO_TAB[toKey]

  if (!fromTab || !toTab || fromTab !== toTab) return null

  return { toolId: 'units', params: { tab: fromTab, value, fromUnit: fromKey, toUnit: toKey } }
}

export function parseQuery(query) {
  if (!query || typeof query !== 'string') return null
  const q = query.toLowerCase().trim()
  if (!q) return null

  return parsePercentage(q)
    || parseTip(q)
    || parseBmi(q)
    || parseCooking(q)
    || parseUnits(q)
    || null
}

export function parseQueryForTool(query, toolId) {
  const result = parseQuery(query)
  if (result && result.toolId === toolId) return result.params
  return null
}
