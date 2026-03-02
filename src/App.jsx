import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LanguageWrapper from './layouts/LanguageWrapper'
import RootLayout from './layouts/RootLayout'

const HomePage = lazy(() => import('./pages/HomePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const PercentagePage = lazy(() => import('./pages/calculators/PercentagePage'))
const BmiPage = lazy(() => import('./pages/calculators/BmiPage'))
const CaloriesPage = lazy(() => import('./pages/calculators/CaloriesPage'))
const AgePage = lazy(() => import('./pages/calculators/AgePage'))
const CompoundInterestPage = lazy(() => import('./pages/calculators/CompoundInterestPage'))
const GpaPage = lazy(() => import('./pages/calculators/GpaPage'))
const TipPage = lazy(() => import('./pages/calculators/TipPage'))
const AspectRatioPage = lazy(() => import('./pages/calculators/AspectRatioPage'))
const UnitsPage = lazy(() => import('./pages/converters/UnitsPage'))
const TimezonePage = lazy(() => import('./pages/converters/TimezonePage'))
const CookingPage = lazy(() => import('./pages/converters/CookingPage'))

function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/en/" replace />} />
          <Route path="/:lang" element={<LanguageWrapper />}>
            <Route element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="percentage" element={<PercentagePage />} />
              <Route path="bmi" element={<BmiPage />} />
              <Route path="calories" element={<CaloriesPage />} />
              <Route path="age" element={<AgePage />} />
              <Route path="compound-interest" element={<CompoundInterestPage />} />
              <Route path="gpa" element={<GpaPage />} />
              <Route path="tip" element={<TipPage />} />
              <Route path="aspect-ratio" element={<AspectRatioPage />} />
              <Route path="units" element={<UnitsPage />} />
              <Route path="timezone" element={<TimezonePage />} />
              <Route path="cooking" element={<CookingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
