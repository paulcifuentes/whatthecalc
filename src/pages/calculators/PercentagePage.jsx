import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import NumberInput from '../../components/ui/NumberInput'
import ResultCard from '../../components/ui/ResultCard'
import { whatIsXPercentOfY, xIsWhatPercentOfY, percentageChange } from '../../utils/calculations/percentage'
import { formatNumber, formatPercent } from '../../utils/formatting'

export default function PercentagePage() {
  const { t } = useTranslation('percentage')
  const location = useLocation()

  const [pct1, setPct1] = useState('')
  const [val1, setVal1] = useState('')

  const [val2, setVal2] = useState('')
  const [total2, setTotal2] = useState('')

  const [from3, setFrom3] = useState('')
  const [to3, setTo3] = useState('')

  useEffect(() => {
    const p = location.state?.prefill
    if (!p) return
    if (p.pct1 != null) setPct1(p.pct1)
    if (p.val1 != null) setVal1(p.val1)
    if (p.val2 != null) setVal2(p.val2)
    if (p.total2 != null) setTotal2(p.total2)
    if (p.from3 != null) setFrom3(p.from3)
    if (p.to3 != null) setTo3(p.to3)
    window.history.replaceState({}, '')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const result1 = pct1 !== '' && val1 !== '' ? whatIsXPercentOfY(Number(pct1), Number(val1)) : null
  const result2 = val2 !== '' && total2 !== '' ? xIsWhatPercentOfY(Number(val2), Number(total2)) : null
  const result3 = from3 !== '' && to3 !== '' ? percentageChange(Number(from3), Number(to3)) : null

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card title={t('whatIsXPercentOfY')}>
        <div className="flex items-end gap-3">
          <NumberInput id="pct1" value={pct1} onChange={setPct1} placeholder="10" className="w-24" />
          <span className="pb-2 text-ink-400 font-medium">%</span>
          <span className="pb-2 text-ink-400">{t('of')}</span>
          <NumberInput id="val1" value={val1} onChange={setVal1} placeholder="200" className="flex-1" />
        </div>
        {result1 !== null && (
          <ResultCard label={t('result')} value={formatNumber(result1)} className="mt-4" />
        )}
      </Card>

      <Card title={t('xIsWhatPercentOfY')}>
        <div className="flex items-end gap-3">
          <NumberInput id="val2" label={t('value')} value={val2} onChange={setVal2} placeholder="25" className="flex-1" />
          <NumberInput id="total2" label={t('total')} value={total2} onChange={setTotal2} placeholder="200" className="flex-1" />
        </div>
        {result2 !== null && (
          <ResultCard label={t('percentageResult')} value={formatPercent(result2)} className="mt-4" />
        )}
      </Card>

      <Card title={t('percentChange')}>
        <div className="flex items-end gap-3">
          <NumberInput id="from3" label={t('from')} value={from3} onChange={setFrom3} placeholder="100" className="flex-1" />
          <NumberInput id="to3" label={t('to')} value={to3} onChange={setTo3} placeholder="150" className="flex-1" />
        </div>
        {result3 !== null && (
          <ResultCard
            label={t('change')}
            value={formatPercent(Math.abs(result3))}
            sublabel={result3 >= 0 ? t('increase') : t('decrease')}
            color={result3 >= 0 ? 'green' : 'red'}
            className="mt-4"
          />
        )}
      </Card>
    </ToolPageWrapper>
  )
}
