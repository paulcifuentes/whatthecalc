import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import NumberInput from '../../components/ui/NumberInput'
import SelectInput from '../../components/ui/SelectInput'
import ResultCard from '../../components/ui/ResultCard'
import { convertCooking, volumeUnits, weightUnits, isVolumeUnit, isWeightUnit } from '../../utils/conversions/cooking'
import { formatNumber } from '../../utils/formatting'

export default function CookingPage() {
  const { t } = useTranslation('cooking')
  const location = useLocation()

  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('cup')
  const [toUnit, setToUnit] = useState('ml')

  useEffect(() => {
    const p = location.state?.prefill
    if (!p) return
    if (p.value != null) setValue(p.value)
    if (p.fromUnit) setFromUnit(p.fromUnit)
    if (p.toUnit) setToUnit(p.toUnit)
    window.history.replaceState({}, '')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const volumeOpts = volumeUnits.map((u) => ({ value: u, label: t(`units.${u}`) }))
  const weightOpts = weightUnits.map((u) => ({ value: u, label: t(`units.${u}`) }))

  const allOptions = [
    { label: t('categories.volume'), options: volumeOpts },
    { label: t('categories.weight'), options: weightOpts },
  ]

  const flatOptions = [...volumeOpts, ...weightOpts]

  const canConvert =
    (isVolumeUnit(fromUnit) && isVolumeUnit(toUnit)) ||
    (isWeightUnit(fromUnit) && isWeightUnit(toUnit))

  const result = value !== '' && canConvert
    ? convertCooking(Number(value), fromUnit, toUnit)
    : null

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="space-y-4">
          <NumberInput
            label={t('value')}
            id="cookValue"
            value={value}
            onChange={setValue}
            min={0}
            placeholder="1"
          />
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label={t('from')}
              id="cookFrom"
              value={fromUnit}
              onChange={setFromUnit}
              options={flatOptions}
            />
            <SelectInput
              label={t('to')}
              id="cookTo"
              value={toUnit}
              onChange={setToUnit}
              options={flatOptions}
            />
          </div>
        </div>
      </Card>

      {result !== null && (
        <ResultCard
          label={t('result')}
          value={formatNumber(result, 4)}
          sublabel={`${value} ${t(`units.${fromUnit}`)} = ${formatNumber(result, 4)} ${t(`units.${toUnit}`)}`}
          color="green"
        />
      )}

      {value !== '' && !canConvert && (
        <div className="text-center text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          Cannot convert between volume and weight units directly.
        </div>
      )}
    </ToolPageWrapper>
  )
}
