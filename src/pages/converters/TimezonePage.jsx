import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import SelectInput from '../../components/ui/SelectInput'
import ResultCard from '../../components/ui/ResultCard'
import { convertTimezone, commonTimezones } from '../../utils/conversions/timezone'

const now = new Date()
const todayStr = now.toISOString().split('T')[0]
const timeStr = now.toTimeString().slice(0, 5)

export default function TimezonePage() {
  const { t } = useTranslation('timezone')

  const [date, setDate] = useState(todayStr)
  const [time, setTime] = useState(timeStr)
  const [fromZone, setFromZone] = useState('America/New_York')
  const [toZone, setToZone] = useState('Europe/London')

  const zoneOptions = commonTimezones.map((tz) => ({
    value: tz,
    label: t(`commonZones.${tz}`),
  }))

  let result = null
  if (date && time) {
    try {
      result = convertTimezone(date, time, fromZone, toZone)
    } catch {
      result = null
    }
  }

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tzDate" className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">{t('date')}</label>
              <input
                id="tzDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-sm text-ink-900 focus-ring hover:border-ink-300 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="tzTime" className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">{t('time')}</label>
              <input
                id="tzTime"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-sm text-ink-900 focus-ring hover:border-ink-300 transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label={t('fromZone')}
              id="fromZone"
              value={fromZone}
              onChange={setFromZone}
              options={zoneOptions}
            />
            <SelectInput
              label={t('toZone')}
              id="toZone"
              value={toZone}
              onChange={setToZone}
              options={zoneOptions}
            />
          </div>
        </div>
      </Card>

      {result && (
        <ResultCard
          label={t('convertedTime')}
          value={result.time}
          sublabel={result.date}
          color="green"
        />
      )}
    </ToolPageWrapper>
  )
}
