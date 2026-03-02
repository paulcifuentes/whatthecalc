import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import NumberInput from '../../components/ui/NumberInput'
import RadioGroup from '../../components/ui/RadioGroup'
import ResultCard from '../../components/ui/ResultCard'
import { calculateBMI, getBMICategory, getBMICategoryColor, imperialToMetric } from '../../utils/calculations/bmi'
import { formatNumber } from '../../utils/formatting'

export default function BmiPage() {
  const { t } = useTranslation('bmi')
  const location = useLocation()

  const [system, setSystem] = useState('metric')
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [pounds, setPounds] = useState('')

  useEffect(() => {
    const p = location.state?.prefill
    if (!p) return
    if (p.system) setSystem(p.system)
    if (p.heightCm != null) setHeightCm(p.heightCm)
    if (p.weightKg != null) setWeightKg(p.weightKg)
    if (p.feet != null) setFeet(p.feet)
    if (p.inches != null) setInches(p.inches)
    if (p.pounds != null) setPounds(p.pounds)
    window.history.replaceState({}, '')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let bmi = null
  if (system === 'metric' && heightCm && weightKg) {
    bmi = calculateBMI(Number(weightKg), Number(heightCm))
  } else if (system === 'imperial' && (feet || inches) && pounds) {
    const { cm, kg } = imperialToMetric(feet, inches, pounds)
    bmi = calculateBMI(kg, cm)
  }

  const category = bmi ? getBMICategory(bmi) : null
  const color = category ? getBMICategoryColor(category) : 'gray'

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="space-y-5">
          <RadioGroup
            name="system"
            value={system}
            onChange={setSystem}
            options={[
              { value: 'metric', label: t('metric') },
              { value: 'imperial', label: t('imperial') },
            ]}
          />

          {system === 'metric' ? (
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label={`${t('height')} (${t('cm')})`}
                id="heightCm"
                value={heightCm}
                onChange={setHeightCm}
                min={0}
                placeholder="170"
              />
              <NumberInput
                label={`${t('weight')} (${t('kg')})`}
                id="weightKg"
                value={weightKg}
                onChange={setWeightKg}
                min={0}
                placeholder="70"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <NumberInput
                  label={`${t('height')} (${t('ft')})`}
                  id="feet"
                  value={feet}
                  onChange={setFeet}
                  min={0}
                  step="1"
                  placeholder="5"
                />
                <NumberInput
                  label={t('in')}
                  id="inches"
                  value={inches}
                  onChange={setInches}
                  min={0}
                  max={11}
                  step="1"
                  placeholder="10"
                />
              </div>
              <NumberInput
                label={`${t('weight')} (${t('lbs')})`}
                id="pounds"
                value={pounds}
                onChange={setPounds}
                min={0}
                placeholder="154"
              />
            </div>
          )}
        </div>
      </Card>

      {bmi && (
        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            label={t('yourBmi')}
            value={formatNumber(bmi, 1)}
            color={color}
          />
          <ResultCard
            label={t('category')}
            value={t(category)}
            color={color}
          />
        </div>
      )}
    </ToolPageWrapper>
  )
}
