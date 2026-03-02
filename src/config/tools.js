import {
  Percent,
  Heart,
  Flame,
  Cake,
  TrendingUp,
  GraduationCap,
  Receipt,
  Proportions,
  Ruler,
  Clock,
  CookingPot,
} from 'lucide-react'

const tools = [
  {
    id: 'percentage',
    path: 'percentage',
    icon: Percent,
    category: 'calculators',
    keywords: ['percent', 'ratio', 'increase', 'decrease', 'difference', 'markup', 'discount'],
  },
  {
    id: 'bmi',
    path: 'bmi',
    icon: Heart,
    category: 'calculators',
    keywords: ['body mass', 'weight', 'health', 'height', 'obesity', 'index'],
  },
  {
    id: 'calories',
    path: 'calories',
    icon: Flame,
    category: 'calculators',
    keywords: ['calorie', 'diet', 'nutrition', 'food', 'energy', 'tdee', 'bmr', 'exercise'],
  },
  {
    id: 'age',
    path: 'age',
    icon: Cake,
    category: 'calculators',
    keywords: ['birthday', 'birth date', 'years old', 'how old', 'date'],
  },
  {
    id: 'compound-interest',
    path: 'compound-interest',
    icon: TrendingUp,
    category: 'calculators',
    keywords: ['investment', 'savings', 'finance', 'money', 'interest rate', 'growth', 'bank'],
  },
  {
    id: 'gpa',
    path: 'gpa',
    icon: GraduationCap,
    category: 'calculators',
    keywords: ['grade', 'school', 'college', 'university', 'academic', 'score', 'grades'],
  },
  {
    id: 'tip',
    path: 'tip',
    icon: Receipt,
    category: 'calculators',
    keywords: ['restaurant', 'bill', 'split', 'gratuity', 'dining', 'waiter', 'service'],
  },
  {
    id: 'aspect-ratio',
    path: 'aspect-ratio',
    icon: Proportions,
    category: 'calculators',
    keywords: ['resolution', 'screen', 'video', 'image', 'width', 'height', 'display', '16:9'],
  },
  {
    id: 'units',
    path: 'units',
    icon: Ruler,
    category: 'converters',
    keywords: ['length', 'weight', 'volume', 'temperature', 'meter', 'feet', 'kg', 'pounds', 'convert'],
  },
  {
    id: 'timezone',
    path: 'timezone',
    icon: Clock,
    category: 'converters',
    keywords: ['time', 'zone', 'clock', 'utc', 'gmt', 'world', 'hours', 'schedule'],
  },
  {
    id: 'cooking',
    path: 'cooking',
    icon: CookingPot,
    category: 'converters',
    keywords: ['cups', 'tablespoon', 'teaspoon', 'milliliter', 'recipe', 'kitchen', 'baking', 'measure'],
  },
]

export const calculators = tools.filter((t) => t.category === 'calculators')
export const converters = tools.filter((t) => t.category === 'converters')
export default tools
