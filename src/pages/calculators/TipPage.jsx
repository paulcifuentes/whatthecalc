import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import NumberInput from '../../components/ui/NumberInput'
import ResultCard from '../../components/ui/ResultCard'
import { calculateTip } from '../../utils/calculations/tip'
import { formatCurrency } from '../../utils/formatting'

const presetTips = [10, 15, 18, 20, 25]

export default function TipPage() {
  const { t } = useTranslation('tip')
  const [bill, setBill] = useState('')
  const [tipPct, setTipPct] = useState(18)
  const [customTip, setCustomTip] = useState('')
  const [people, setPeople] = useState('1')

  const activeTip = customTip !== '' ? Number(customTip) : tipPct
  const result = calculateTip(bill, activeTip, people)
  const hasBill = bill !== '' && Number(bill) > 0

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="space-y-5">
          <NumberInput
            label={t('billAmount')}
            id="bill"
            value={bill}
            onChange={setBill}
            min={0}
            step="0.01"
            placeholder="0.00"
          />

          <div>
            <span className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">
              {t('tipPercentage')}
            </span>
            <div className="flex gap-2 flex-wrap">
              {presetTips.map((pct) => (
                <button
                  key={pct}
                  onClick={() => { setTipPct(pct); setCustomTip('') }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    customTip === '' && tipPct === pct
                      ? 'bg-gradient-to-r from-teal-accent to-teal-light text-white shadow-sm shadow-teal-accent/20'
                      : 'bg-cream-200/70 text-ink-600 hover:bg-cream-200'
                  }`}
                >
                  {pct}%
                </button>
              ))}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  placeholder={t('custom')}
                  className="w-20 px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 focus-ring hover:border-ink-300 transition-colors"
                  min={0}
                />
                <span className="text-sm text-ink-400">%</span>
              </div>
            </div>
          </div>

          <NumberInput
            label={t('numberOfPeople')}
            id="people"
            value={people}
            onChange={setPeople}
            min={1}
            step="1"
          />
        </div>
      </Card>

      {hasBill && (
        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            label={t('tipAmount')}
            value={formatCurrency(result.tipAmount)}
          />
          <ResultCard
            label={t('totalAmount')}
            value={formatCurrency(result.totalAmount)}
            color="green"
          />
          {Number(people) > 1 && (
            <>
              <ResultCard
                label={t('tipPerPerson')}
                value={formatCurrency(result.tipPerPerson)}
                color="gray"
              />
              <ResultCard
                label={t('totalPerPerson')}
                value={formatCurrency(result.totalPerPerson)}
                color="blue"
              />
            </>
          )}
        </div>
      )}
    </ToolPageWrapper>
  )
}
