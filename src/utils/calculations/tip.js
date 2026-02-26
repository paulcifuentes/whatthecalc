export function calculateTip(billAmount, tipPercentage, numberOfPeople) {
  const bill = Number(billAmount) || 0
  const tipPct = Number(tipPercentage) || 0
  const people = Math.max(1, Math.floor(Number(numberOfPeople) || 1))

  const tipAmount = bill * (tipPct / 100)
  const totalAmount = bill + tipAmount
  const tipPerPerson = tipAmount / people
  const totalPerPerson = totalAmount / people

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    tipPerPerson: Math.round(tipPerPerson * 100) / 100,
    totalPerPerson: Math.round(totalPerPerson * 100) / 100,
  }
}
