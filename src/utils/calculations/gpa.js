const gradePoints = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0,
}

export const gradeOptions = Object.keys(gradePoints)

export function calculateGPA(courses) {
  const validCourses = courses.filter(
    (c) => c.credits > 0 && c.grade in gradePoints
  )
  if (validCourses.length === 0) return { gpa: 0, totalCredits: 0, totalPoints: 0 }

  let totalCredits = 0
  let totalPoints = 0

  for (const course of validCourses) {
    const credits = Number(course.credits)
    totalCredits += credits
    totalPoints += credits * gradePoints[course.grade]
  }

  return {
    gpa: totalCredits > 0 ? totalPoints / totalCredits : 0,
    totalCredits,
    totalPoints: Math.round(totalPoints * 100) / 100,
  }
}
