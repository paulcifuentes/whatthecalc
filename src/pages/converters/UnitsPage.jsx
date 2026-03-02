import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import TabGroup from '../../components/ui/TabGroup'
import NumberInput from '../../components/ui/NumberInput'
import SelectInput from '../../components/ui/SelectInput'
import ResultCard from '../../components/ui/ResultCard'
import {
  convertLength, convertWeight, convertVolume, convertTemperature,
  lengthUnits, weightUnits, volumeUnits, temperatureUnits,
} from '../../utils/conversions/units'
import { formatNumber } from '../../utils/formatting'

const converters = {
  length: { units: lengthUnits, convert: convertLength, defaultFrom: 'cm', defaultTo: 'm' },
  weight: { units: weightUnits, convert: convertWeight, defaultFrom: 'kg', defaultTo: 'lb' },
  volume: { units: volumeUnits, convert: convertVolume, defaultFrom: 'l', defaultTo: 'gal' },
  temperature: { units: temperatureUnits, convert: convertTemperature, defaultFrom: 'c', defaultTo: 'f' },
}

export default function UnitsPage() {
  const { t } = useTranslation('units')
  const location = useLocation()

  const [tab, setTab] = useState('length')
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('cm')
  const [toUnit, setToUnit] = useState('m')

  useEffect(() => {
    const p = location.state?.prefill
    if (!p) return
    if (p.tab) setTab(p.tab)
    if (p.value != null) setValue(p.value)
    if (p.fromUnit) setFromUnit(p.fromUnit)
    if (p.toUnit) setToUnit(p.toUnit)
    window.history.replaceState({}, '')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (newTab) => {
    setTab(newTab)
    setValue('')
    setFromUnit(converters[newTab].defaultFrom)
    setToUnit(converters[newTab].defaultTo)
  }

  const config = converters[tab]
  const unitOptions = config.units.map((u) => ({
    value: u,
    label: t(`${tab}.${u}`),
  }))

  const result = value !== '' ? config.convert(Number(value), fromUnit, toUnit) : null

  const tabs = [
    { value: 'length', label: t('tabs.length') },
    { value: 'weight', label: t('tabs.weight') },
    { value: 'volume', label: t('tabs.volume') },
    { value: 'temperature', label: t('tabs.temperature') },
  ]

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <TabGroup tabs={tabs} activeTab={tab} onChange={handleTabChange} />

      <Card>
        <div className="space-y-4">
          <NumberInput
            label={t('value')}
            id="unitValue"
            value={value}
            onChange={setValue}
            placeholder="0"
          />
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label={t('from')}
              id="fromUnit"
              value={fromUnit}
              onChange={setFromUnit}
              options={unitOptions}
            />
            <SelectInput
              label={t('to')}
              id="toUnit"
              value={toUnit}
              onChange={setToUnit}
              options={unitOptions}
            />
          </div>
        </div>
      </Card>

      {result !== null && (
        <ResultCard
          label={t('result')}
          value={formatNumber(result, 6)}
          sublabel={`${value} ${t(`${tab}.${fromUnit}`)} = ${formatNumber(result, 6)} ${t(`${tab}.${toUnit}`)}`}
          color="green"
        />
      )}
    </ToolPageWrapper>
  )
}
