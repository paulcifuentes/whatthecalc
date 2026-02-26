export function calculateBMR(gender, weightKg, heightCm, age) {
  if (gender === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161
}

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
}

export function calculateTDEE(bmr, activityLevel) {
  return bmr * (activityMultipliers[activityLevel] || 1.2)
}

export function getCalorieGoals(tdee) {
  return {
    maintenance: Math.round(tdee),
    mildLoss: Math.round(tdee - 250),
    weightLoss: Math.round(tdee - 500),
    mildGain: Math.round(tdee + 250),
    weightGain: Math.round(tdee + 500),
  }
}
