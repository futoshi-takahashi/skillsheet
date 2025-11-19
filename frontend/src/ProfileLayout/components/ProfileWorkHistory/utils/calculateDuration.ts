export type Duration = {
  years?: number
  months?: number
}

export const calculateDuration = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
): Duration => {
  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years > 0 && months > 0) {
    return { years, months }
  }

  if (years > 0) {
    return { years }
  }

  if (months > 0) {
    return { months }
  }

  return {}
}
