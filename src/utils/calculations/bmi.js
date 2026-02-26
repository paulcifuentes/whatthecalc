export function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100
  if (heightM <= 0) return null
  return weightKg / (heightM * heightM)
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return 'underweight'
  if (bmi < 25) return 'normal'
  if (bmi < 30) return 'overweight'
  return 'obese'
}

export function getBMICategoryColor(category) {
  const colors = {
    underweight: 'yellow',
    normal: 'green',
    overweight: 'orange',
    obese: 'red',
  }
  return colors[category] || 'gray'
}

export function imperialToMetric(feet, inches, pounds) {
  const totalInches = (Number(feet) || 0) * 12 + (Number(inches) || 0)
  const cm = totalInches * 2.54
  const kg = (Number(pounds) || 0) * 0.453592
  return { cm, kg }
}
