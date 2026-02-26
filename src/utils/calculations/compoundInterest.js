const frequencyMap = {
  annually: 1,
  semiAnnually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
}

export function calculateCompoundInterest(principal, monthlyContribution, annualRate, years, frequency = 'monthly') {
  const n = frequencyMap[frequency] || 12
  const r = annualRate / 100
  const data = []

  let balance = principal
  let totalContributions = principal

  for (let year = 0; year <= years; year++) {
    data.push({
      year,
      balance: Math.round(balance * 100) / 100,
      contributions: Math.round(totalContributions * 100) / 100,
    })

    if (year < years) {
      for (let period = 0; period < n; period++) {
        balance *= 1 + r / n
        const contributionsPerPeriod = monthlyContribution * (12 / n)
        balance += contributionsPerPeriod
        totalContributions += contributionsPerPeriod
      }
    }
  }

  const futureValue = Math.round(balance * 100) / 100
  const totalInterest = Math.round((futureValue - totalContributions) * 100) / 100

  return {
    futureValue,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterest,
    data,
  }
}
