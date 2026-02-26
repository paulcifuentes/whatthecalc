import {
  Percent,
  Heart,
  Flame,
  Cake,
  TrendingUp,
  GraduationCap,
  Receipt,
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
  },
  {
    id: 'bmi',
    path: 'bmi',
    icon: Heart,
    category: 'calculators',
  },
  {
    id: 'calories',
    path: 'calories',
    icon: Flame,
    category: 'calculators',
  },
  {
    id: 'age',
    path: 'age',
    icon: Cake,
    category: 'calculators',
  },
  {
    id: 'compound-interest',
    path: 'compound-interest',
    icon: TrendingUp,
    category: 'calculators',
  },
  {
    id: 'gpa',
    path: 'gpa',
    icon: GraduationCap,
    category: 'calculators',
  },
  {
    id: 'tip',
    path: 'tip',
    icon: Receipt,
    category: 'calculators',
  },
  {
    id: 'units',
    path: 'units',
    icon: Ruler,
    category: 'converters',
  },
  {
    id: 'timezone',
    path: 'timezone',
    icon: Clock,
    category: 'converters',
  },
  {
    id: 'cooking',
    path: 'cooking',
    icon: CookingPot,
    category: 'converters',
  },
]

export const calculators = tools.filter((t) => t.category === 'calculators')
export const converters = tools.filter((t) => t.category === 'converters')
export default tools
