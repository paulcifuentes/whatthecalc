export const commonTimezones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Asia/Dubai',
  'Australia/Sydney',
  'Pacific/Auckland',
  'America/Sao_Paulo',
  'America/Mexico_City',
]

export function convertTimezone(date, time, fromZone, toZone) {
  // Parse as local time
  const localDate = new Date(`${date}T${time}:00`)

  // Find offset between local timezone and fromZone
  const inFromZone = new Date(
    localDate.toLocaleString('en-US', { timeZone: fromZone })
  )
  const offset = localDate - inFromZone

  // Adjust so the date represents the correct UTC moment for "date/time in fromZone"
  const adjusted = new Date(localDate.getTime() + offset)

  // Format in target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: toZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(adjusted)
  const get = (type) => parts.find((p) => p.type === type)?.value || ''

  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    time: `${get('hour')}:${get('minute')}`,
  }
}
