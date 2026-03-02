import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import NumberInput from '../../components/ui/NumberInput'
import SelectInput from '../../components/ui/SelectInput'
import ResultCard from '../../components/ui/ResultCard'
import { calculateCompoundInterest } from '../../utils/calculations/compoundInterest'
import { formatCurrency } from '../../utils/formatting'

export default function CompoundInterestPage() {
  const { t } = useTranslation('compound-interest')

  const [principal, setPrincipal] = useState('10000')
  const [monthly, setMonthly] = useState('200')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [frequency, setFrequency] = useState('monthly')

  const result = calculateCompoundInterest(
    Number(principal) || 0,
    Number(monthly) || 0,
    Number(rate) || 0,
    Number(years) || 0,
    frequency
  )

  const frequencyOptions = [
    { value: 'annually', label: t('annually') },
    { value: 'semiAnnually', label: t('semiAnnually') },
    { value: 'quarterly', label: t('quarterly') },
    { value: 'monthly', label: t('monthly') },
    { value: 'daily', label: t('daily') },
  ]

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label={t('principal')} id="principal" value={principal} onChange={setPrincipal} min={0} placeholder="10000" />
          <NumberInput label={t('monthlyContribution')} id="monthly" value={monthly} onChange={setMonthly} min={0} placeholder="200" />
          <NumberInput label={t('annualRate')} id="rate" value={rate} onChange={setRate} min={0} step="0.1" placeholder="7" />
          <NumberInput label={t('years')} id="years" value={years} onChange={setYears} min={1} max={50} step="1" placeholder="10" />
        </div>
        <SelectInput
          label={t('compoundFrequency')}
          id="frequency"
          value={frequency}
          onChange={setFrequency}
          options={frequencyOptions}
          className="mt-4"
        />
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultCard label={t('futureValue')} value={formatCurrency(result.futureValue)} color="green" />
        <ResultCard label={t('totalContributions')} value={formatCurrency(result.totalContributions)} color="blue" />
        <ResultCard label={t('totalInterest')} value={formatCurrency(result.totalInterest)} color="violet" />
      </div>

      {result.data.length > 1 && (
        <Card title={t('chartTitle')}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ee8c0" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2ee8c0" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5e7796" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#5e7796" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ebebef" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#5e7796' }} label={{ value: t('year'), position: 'insideBottom', offset: -2, fontSize: 12, fill: '#5e7796' }} />
                <YAxis tick={{ fontSize: 12, fill: '#5e7796' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: '12px', border: '1px solid #ebebef', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} />
                <Legend />
                <Area type="monotone" dataKey="balance" name={t('chartBalance')} stroke="#2ee8c0" fill="url(#balanceGrad)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="contributions" name={t('chartContributions')} stroke="#5e7796" fill="url(#contribGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </ToolPageWrapper>
  )
}
