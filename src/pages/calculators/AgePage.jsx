import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import DateInput from '../../components/ui/DateInput'
import ResultCard from '../../components/ui/ResultCard'
import ResultRow from '../../components/ui/ResultRow'
import { calculateAge, daysUntilNextBirthday } from '../../utils/calculations/age'
import { formatNumber } from '../../utils/formatting'

const today = new Date().toISOString().split('T')[0]

export default function AgePage() {
  const { t } = useTranslation('age')
  const [dob, setDob] = useState('')
  const [asOf, setAsOf] = useState(today)

  const hasResult = dob && asOf && dob < asOf
  const result = hasResult ? calculateAge(dob, asOf) : null
  const daysUntil = hasResult ? daysUntilNextBirthday(dob, asOf) : null

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="grid grid-cols-2 gap-4">
          <DateInput
            label={t('dateOfBirth')}
            id="dob"
            value={dob}
            onChange={setDob}
            max={asOf}
          />
          <DateInput
            label={t('calculateAsOf')}
            id="asOf"
            value={asOf}
            onChange={setAsOf}
          />
        </div>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <ResultCard
              label={t('years')}
              value={result.years}
              color="blue"
            />
            <ResultCard
              label={t('months')}
              value={result.months}
              color="blue"
            />
            <ResultCard
              label={t('days')}
              value={result.days}
              color="blue"
            />
          </div>

          <Card>
            <ResultCard
              label={t('nextBirthday')}
              value={daysUntil}
              sublabel={t('daysUntil')}
              color="green"
              className="mb-4"
            />
            <div className="divide-y divide-cream-200">
              <ResultRow label={t('totalDays')} value={formatNumber(result.totalDays, 0)} />
              <ResultRow label={t('totalWeeks')} value={formatNumber(result.totalWeeks, 0)} />
              <ResultRow label={t('totalMonths')} value={formatNumber(result.totalMonths, 0)} />
            </div>
          </Card>
        </>
      )}
    </ToolPageWrapper>
  )
}
