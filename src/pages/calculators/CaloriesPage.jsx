import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import NumberInput from '../../components/ui/NumberInput'
import RadioGroup from '../../components/ui/RadioGroup'
import SelectInput from '../../components/ui/SelectInput'
import ResultCard from '../../components/ui/ResultCard'
import ResultRow from '../../components/ui/ResultRow'
import { calculateBMR, calculateTDEE, getCalorieGoals } from '../../utils/calculations/calories'
import { formatNumber } from '../../utils/formatting'

export default function CaloriesPage() {
  const { t } = useTranslation('calories')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('moderate')

  const canCalc = age && height && weight
  const bmr = canCalc ? calculateBMR(gender, Number(weight), Number(height), Number(age)) : null
  const tdee = bmr ? calculateTDEE(bmr, activity) : null
  const goals = tdee ? getCalorieGoals(tdee) : null

  const activityOptions = [
    { value: 'sedentary', label: t('sedentary') },
    { value: 'light', label: t('light') },
    { value: 'moderate', label: t('moderate') },
    { value: 'active', label: t('active') },
    { value: 'veryActive', label: t('veryActive') },
  ]

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="space-y-5">
          <RadioGroup
            label={t('gender')}
            name="gender"
            value={gender}
            onChange={setGender}
            options={[
              { value: 'male', label: t('male') },
              { value: 'female', label: t('female') },
            ]}
          />
          <div className="grid grid-cols-3 gap-4">
            <NumberInput label={t('age')} id="age" value={age} onChange={setAge} min={1} max={120} step="1" placeholder="25" />
            <NumberInput label={`${t('height')} (cm)`} id="height" value={height} onChange={setHeight} min={1} placeholder="170" />
            <NumberInput label={`${t('weight')} (kg)`} id="weight" value={weight} onChange={setWeight} min={1} placeholder="70" />
          </div>
          <SelectInput
            label={t('activityLevel')}
            id="activity"
            value={activity}
            onChange={setActivity}
            options={activityOptions}
          />
        </div>
      </Card>

      {goals && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <ResultCard label={t('bmr')} value={`${formatNumber(bmr, 0)} ${t('calPerDay')}`} color="gray" />
            <ResultCard label={t('maintenance')} value={`${formatNumber(goals.maintenance, 0)} ${t('calPerDay')}`} color="blue" />
          </div>
          <Card>
            <div className="divide-y divide-cream-200">
              <ResultRow label={t('mildLoss')} value={`${formatNumber(goals.mildLoss, 0)} ${t('calPerDay')}`} />
              <ResultRow label={t('weightLoss')} value={`${formatNumber(goals.weightLoss, 0)} ${t('calPerDay')}`} />
              <ResultRow label={t('mildGain')} value={`${formatNumber(goals.mildGain, 0)} ${t('calPerDay')}`} />
              <ResultRow label={t('weightGain')} value={`${formatNumber(goals.weightGain, 0)} ${t('calPerDay')}`} />
            </div>
          </Card>
        </>
      )}
    </ToolPageWrapper>
  )
}
