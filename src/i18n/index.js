import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import enTools from './locales/en/tools.json'
import enPercentage from './locales/en/percentage.json'
import enBmi from './locales/en/bmi.json'
import enCalories from './locales/en/calories.json'
import enAge from './locales/en/age.json'
import enCompoundInterest from './locales/en/compound-interest.json'
import enGpa from './locales/en/gpa.json'
import enTip from './locales/en/tip.json'
import enAspectRatio from './locales/en/aspect-ratio.json'
import enUnits from './locales/en/units.json'
import enTimezone from './locales/en/timezone.json'
import enCooking from './locales/en/cooking.json'

import esCommon from './locales/es/common.json'
import esTools from './locales/es/tools.json'
import esPercentage from './locales/es/percentage.json'
import esBmi from './locales/es/bmi.json'
import esCalories from './locales/es/calories.json'
import esAge from './locales/es/age.json'
import esCompoundInterest from './locales/es/compound-interest.json'
import esGpa from './locales/es/gpa.json'
import esTip from './locales/es/tip.json'
import esAspectRatio from './locales/es/aspect-ratio.json'
import esUnits from './locales/es/units.json'
import esTimezone from './locales/es/timezone.json'
import esCooking from './locales/es/cooking.json'

import frCommon from './locales/fr/common.json'
import frTools from './locales/fr/tools.json'
import frPercentage from './locales/fr/percentage.json'
import frBmi from './locales/fr/bmi.json'
import frCalories from './locales/fr/calories.json'
import frAge from './locales/fr/age.json'
import frCompoundInterest from './locales/fr/compound-interest.json'
import frGpa from './locales/fr/gpa.json'
import frTip from './locales/fr/tip.json'
import frAspectRatio from './locales/fr/aspect-ratio.json'
import frUnits from './locales/fr/units.json'
import frTimezone from './locales/fr/timezone.json'
import frCooking from './locales/fr/cooking.json'

import zhCommon from './locales/zh/common.json'
import zhTools from './locales/zh/tools.json'
import zhPercentage from './locales/zh/percentage.json'
import zhBmi from './locales/zh/bmi.json'
import zhCalories from './locales/zh/calories.json'
import zhAge from './locales/zh/age.json'
import zhCompoundInterest from './locales/zh/compound-interest.json'
import zhGpa from './locales/zh/gpa.json'
import zhTip from './locales/zh/tip.json'
import zhAspectRatio from './locales/zh/aspect-ratio.json'
import zhUnits from './locales/zh/units.json'
import zhTimezone from './locales/zh/timezone.json'
import zhCooking from './locales/zh/cooking.json'

import jaCommon from './locales/ja/common.json'
import jaTools from './locales/ja/tools.json'
import jaPercentage from './locales/ja/percentage.json'
import jaBmi from './locales/ja/bmi.json'
import jaCalories from './locales/ja/calories.json'
import jaAge from './locales/ja/age.json'
import jaCompoundInterest from './locales/ja/compound-interest.json'
import jaGpa from './locales/ja/gpa.json'
import jaTip from './locales/ja/tip.json'
import jaAspectRatio from './locales/ja/aspect-ratio.json'
import jaUnits from './locales/ja/units.json'
import jaTimezone from './locales/ja/timezone.json'
import jaCooking from './locales/ja/cooking.json'

export const supportedLanguages = ['en', 'es', 'fr', 'zh', 'ja']

export const languageNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
  ja: '日本語',
}

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon, tools: enTools, percentage: enPercentage, bmi: enBmi, calories: enCalories, age: enAge, 'compound-interest': enCompoundInterest, gpa: enGpa, tip: enTip, 'aspect-ratio': enAspectRatio, units: enUnits, timezone: enTimezone, cooking: enCooking },
    es: { common: esCommon, tools: esTools, percentage: esPercentage, bmi: esBmi, calories: esCalories, age: esAge, 'compound-interest': esCompoundInterest, gpa: esGpa, tip: esTip, 'aspect-ratio': esAspectRatio, units: esUnits, timezone: esTimezone, cooking: esCooking },
    fr: { common: frCommon, tools: frTools, percentage: frPercentage, bmi: frBmi, calories: frCalories, age: frAge, 'compound-interest': frCompoundInterest, gpa: frGpa, tip: frTip, 'aspect-ratio': frAspectRatio, units: frUnits, timezone: frTimezone, cooking: frCooking },
    zh: { common: zhCommon, tools: zhTools, percentage: zhPercentage, bmi: zhBmi, calories: zhCalories, age: zhAge, 'compound-interest': zhCompoundInterest, gpa: zhGpa, tip: zhTip, 'aspect-ratio': zhAspectRatio, units: zhUnits, timezone: zhTimezone, cooking: zhCooking },
    ja: { common: jaCommon, tools: jaTools, percentage: jaPercentage, bmi: jaBmi, calories: jaCalories, age: jaAge, 'compound-interest': jaCompoundInterest, gpa: jaGpa, tip: jaTip, 'aspect-ratio': jaAspectRatio, units: jaUnits, timezone: jaTimezone, cooking: jaCooking },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
