export function calculateAge(dob, asOf) {
  const birth = new Date(dob)
  const now = new Date(asOf)

  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months

  return { years, months, days, totalDays, totalWeeks, totalMonths }
}

export function daysUntilNextBirthday(dob, asOf) {
  const birth = new Date(dob)
  const now = new Date(asOf)

  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBirthday <= now) {
    nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate())
  }

  return Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24))
}
