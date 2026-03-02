import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import NumberInput from '../../components/ui/NumberInput'
import ResultCard from '../../components/ui/ResultCard'
import { calculateAspectRatio } from '../../utils/calculations/aspect-ratio'

const presetRatios = [
  { label: '16:9', w: 16, h: 9 },
  { label: '4:3', w: 4, h: 3 },
  { label: '21:9', w: 21, h: 9 },
  { label: '1:1', w: 1, h: 1 },
  { label: '4:5', w: 4, h: 5 },
  { label: '9:16', w: 9, h: 16 },
]

export default function AspectRatioPage() {
  const { t } = useTranslation('aspect-ratio')
  const [ratioW, setRatioW] = useState('16')
  const [ratioH, setRatioH] = useState('9')
  const [isCustom, setIsCustom] = useState(false)
  const [width, setWidth] = useState('1920')
  const [height, setHeight] = useState('')
  const [lastEdited, setLastEdited] = useState('width')

  const activePreset = !isCustom
    ? presetRatios.find((r) => r.w === Number(ratioW) && r.h === Number(ratioH))
    : null

  const dimension = lastEdited === 'width' ? 'width' : 'height'
  const knownValue = lastEdited === 'width' ? width : height
  const result = calculateAspectRatio(ratioW, ratioH, dimension, knownValue)

  const computedWidth = result ? (lastEdited === 'width' ? width : String(result.width)) : ''
  const computedHeight = result ? (lastEdited === 'height' ? height : String(result.height)) : ''

  function selectPreset(preset) {
    setRatioW(String(preset.w))
    setRatioH(String(preset.h))
    setIsCustom(false)
  }

  function handleWidthChange(val) {
    setWidth(val)
    setLastEdited('width')
  }

  function handleHeightChange(val) {
    setHeight(val)
    setLastEdited('height')
  }

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="space-y-5">
          <div>
            <span className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">
              {t('selectRatio')}
            </span>
            <div className="flex gap-2 flex-wrap">
              {presetRatios.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => selectPreset(preset)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activePreset?.label === preset.label
                      ? 'bg-sunset-50 text-sunset'
                      : 'bg-cream-200/70 text-ink-600 hover:bg-cream-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <button
                onClick={() => setIsCustom(true)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isCustom
                    ? 'bg-sunset-50 text-sunset'
                    : 'bg-cream-200/70 text-ink-600 hover:bg-cream-200'
                }`}
              >
                {t('customRatio')}
              </button>
            </div>
          </div>

          {isCustom && (
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label={t('ratioWidth')}
                id="ratioW"
                value={ratioW}
                onChange={setRatioW}
                min={1}
                step="1"
                placeholder="16"
              />
              <NumberInput
                label={t('ratioHeight')}
                id="ratioH"
                value={ratioH}
                onChange={setRatioH}
                min={1}
                step="1"
                placeholder="9"
              />
            </div>
          )}

          <div>
            <span className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">
              {t('enterDimension')}
            </span>
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label={t('width')}
                id="width"
                value={lastEdited === 'width' ? width : computedWidth}
                onChange={handleWidthChange}
                min={1}
                step="1"
                placeholder="1920"
              />
              <NumberInput
                label={t('height')}
                id="height"
                value={lastEdited === 'height' ? height : computedHeight}
                onChange={handleHeightChange}
                min={1}
                step="1"
                placeholder="1080"
              />
            </div>
          </div>
        </div>
      </Card>

      {result && (
        <div className="grid grid-cols-3 gap-4">
          <ResultCard label={t('calculatedWidth')} value={computedWidth} />
          <ResultCard label={t('calculatedHeight')} value={computedHeight} color="green" />
          <ResultCard label={t('decimalRatio')} value={String(result.decimalRatio)} color="blue" />
        </div>
      )}
    </ToolPageWrapper>
  )
}
