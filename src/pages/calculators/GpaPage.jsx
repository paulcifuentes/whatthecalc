import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolPageWrapper from '../../components/shared/ToolPageWrapper'
import Card from '../../components/ui/Card'
import NumberInput from '../../components/ui/NumberInput'
import SelectInput from '../../components/ui/SelectInput'
import Button from '../../components/ui/Button'
import ResultCard from '../../components/ui/ResultCard'
import { calculateGPA, gradeOptions } from '../../utils/calculations/gpa'
import { formatNumber } from '../../utils/formatting'
import { Trash2, Plus } from 'lucide-react'

const emptyCourse = () => ({ name: '', credits: '3', grade: 'A' })

export default function GpaPage() {
  const { t } = useTranslation('gpa')
  const [courses, setCourses] = useState([emptyCourse(), emptyCourse(), emptyCourse()])

  const updateCourse = (index, field, value) => {
    setCourses((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    )
  }

  const addCourse = () => setCourses((prev) => [...prev, emptyCourse()])
  const removeCourse = (index) => setCourses((prev) => prev.filter((_, i) => i !== index))

  const result = calculateGPA(courses)
  const gradeOpts = gradeOptions.map((g) => ({ value: g, label: g }))

  return (
    <ToolPageWrapper title={t('title')} description={t('metaDescription')}>
      <Card>
        <div className="space-y-3">
          {courses.map((course, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                {i === 0 && <span className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">{t('courseName')}</span>}
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(i, 'name', e.target.value)}
                  placeholder={`${t('course')} ${i + 1}`}
                  className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 focus-ring hover:border-ink-300 transition-colors"
                />
              </div>
              <NumberInput
                label={i === 0 ? t('credits') : undefined}
                value={course.credits}
                onChange={(v) => updateCourse(i, 'credits', v)}
                min={0}
                step="1"
                className="w-20"
              />
              <SelectInput
                label={i === 0 ? t('grade') : undefined}
                value={course.grade}
                onChange={(v) => updateCourse(i, 'grade', v)}
                options={gradeOpts}
                className="w-24"
              />
              <button
                onClick={() => removeCourse(i)}
                disabled={courses.length <= 1}
                className="p-2 text-ink-300 hover:text-red-500 disabled:opacity-30 transition-colors"
                aria-label={t('removeCourse')}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <Button onClick={addCourse} variant="secondary" className="mt-4 flex items-center gap-2">
          <Plus className="w-4 h-4" /> {t('addCourse')}
        </Button>
      </Card>

      {result.totalCredits > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <ResultCard label={t('cumulativeGpa')} value={formatNumber(result.gpa)} color="blue" />
          <ResultCard label={t('totalCredits')} value={result.totalCredits} color="gray" />
          <ResultCard label={t('totalPoints')} value={formatNumber(result.totalPoints)} color="gray" />
        </div>
      )}
    </ToolPageWrapper>
  )
}
